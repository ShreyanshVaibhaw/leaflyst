import { eq } from "drizzle-orm";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { FindingDraft } from "@/server/checks/types";
import { db, schema } from "@/server/db/client";
import { runMigrations } from "@/server/db/migrate";
import { saveFindings } from "@/server/findings/persist";
import { handleWebhook } from "@/server/integrations/github/webhooks";
import { boss } from "@/server/jobs/queue";
import { recordBaseline, scoreChange } from "@/server/ledger/baseline";

// Runs against the test database set in vitest.config.ts.
const draft = (fingerprint: string, extra: Partial<FindingDraft> = {}): FindingDraft => ({
  checkId: "metadata",
  fingerprint,
  severity: "high",
  title: `Finding ${fingerprint}`,
  affectedPaths: ["/a"],
  evidence: { kind: "title-missing" },
  expectedEffect: "Better.",
  fixType: "F2",
  confidence: 1,
  trafficAtStake: 0,
  ...extra,
});

describe("database-backed flows", () => {
  let siteId: string;
  let runId: string;
  const repoId = 9_000_000 + Math.floor(Math.random() * 1_000_000);
  const installationId = repoId + 1;

  beforeAll(async () => {
    await runMigrations(process.env.DATABASE_URL);
    const d = db();
    const [user] = await d
      .insert(schema.users)
      .values({ login: `test-${repoId}` })
      .returning();
    const [site] = await d
      .insert(schema.sites)
      .values({ userId: user!.id, name: "T", baseUrl: "https://t.example" })
      .returning();
    siteId = site!.id;
    const [run] = await d.insert(schema.crawlRuns).values({ siteId }).returning();
    runId = run!.id;
  }, 60_000);

  afterAll(async () => {
    await db().delete(schema.sites).where(eq(schema.sites.id, siteId));
    await (await boss()).stop({ graceful: false });
    await db().$client.end();
  });

  const statusOf = async (fp: string) =>
    (await db().select().from(schema.findings).where(eq(schema.findings.siteId, siteId))).find(
      (f) => f.fingerprint === fp,
    )?.status;

  it("upserts findings, resolves ones that disappear, and reopens ones that return", async () => {
    await saveFindings(siteId, runId, [draft("a"), draft("b")]);
    expect(await statusOf("a")).toBe("open");
    await saveFindings(siteId, runId, [draft("a")]);
    expect(await statusOf("b")).toBe("resolved");
    await saveFindings(siteId, runId, [draft("a"), draft("b")]);
    expect(await statusOf("b")).toBe("open");
    const rows = await db()
      .select()
      .from(schema.findings)
      .where(eq(schema.findings.siteId, siteId));
    expect(rows).toHaveLength(2);
  });

  it("an audit never reopens a dismissed finding", async () => {
    await db()
      .update(schema.findings)
      .set({ status: "dismissed" })
      .where(eq(schema.findings.fingerprint, "b"));
    await saveFindings(siteId, runId, [draft("a"), draft("b")]);
    expect(await statusOf("b")).toBe("dismissed");
    await saveFindings(siteId, runId, [draft("a")]);
    expect(await statusOf("b")).toBe("dismissed");
  });

  it("webhooks sync an installation and mark a merged pull request", async () => {
    const d = db();
    await handleWebhook("installation", {
      action: "created",
      installation: { id: installationId, account: { login: "acme" } },
      repositories: [{ id: repoId, full_name: "acme/site" }],
    });
    const [repo] = await d.select().from(schema.repos).where(eq(schema.repos.id, repoId));
    expect(repo?.fullName).toBe("acme/site");
    await d.update(schema.sites).set({ repoId }).where(eq(schema.sites.id, siteId));

    const [finding] = (
      await d.select().from(schema.findings).where(eq(schema.findings.siteId, siteId))
    ).filter((f) => f.fingerprint === "a");
    const [change] = await d
      .insert(schema.changes)
      .values({
        siteId,
        findingId: finding!.id,
        fixType: "F2",
        status: "pr_open",
        prNumber: 12,
        commitSha: "abc",
      })
      .returning();

    const pr = (action: string, merged: boolean) => ({
      action,
      pull_request: {
        number: 12,
        merged,
        merge_commit_sha: merged ? "mergesha" : null,
        head: { sha: "abc" },
      },
      repository: { id: repoId, full_name: "acme/site" },
    });
    expect(await handleWebhook("pull_request", pr("closed", true))).toBe("merged");
    const [after] = await d.select().from(schema.changes).where(eq(schema.changes.id, change!.id));
    expect(after).toMatchObject({ status: "merged", mergeSha: "mergesha" });
    expect(await statusOf("a")).toBe("merged");

    // A pull request Leaflyst did not open is ignored.
    expect(
      await handleWebhook("pull_request", {
        ...pr("closed", true),
        pull_request: { ...pr("closed", true).pull_request, number: 99 },
      }),
    ).toBe("not a Leaflyst pull request");
    await handleWebhook("installation", {
      action: "deleted",
      installation: { id: installationId },
    });
    expect(await d.select().from(schema.repos).where(eq(schema.repos.id, repoId))).toHaveLength(0);
  });

  it("records a baseline and scores a change from stored search data", async () => {
    const d = db();
    const day = 86_400_000;
    const verifiedAt = new Date(Date.now() - 20 * day);
    await d.insert(schema.pages).values([
      { siteId, path: "/a", impressions28d: 2800 },
      { siteId, path: "/c", impressions28d: 2800 },
    ]);
    // 60 days of data: /a doubles after the change, /c stays flat.
    const rows = [];
    for (let i = 60; i >= 2; i--) {
      const date = new Date(Date.now() - i * day);
      const iso = date.toISOString().slice(0, 10);
      const after = date > verifiedAt;
      rows.push({
        siteId,
        source: "gsc",
        date: iso,
        page: "https://t.example/a",
        query: "",
        impressions: after ? 200 + (i % 5) : 100 + (i % 5),
        clicks: 1,
      });
      rows.push({
        siteId,
        source: "gsc",
        date: iso,
        page: "https://t.example/c",
        query: "",
        impressions: 100 + (i % 7),
        clicks: 1,
      });
    }
    await d.insert(schema.metricDaily).values(rows);
    const [change] = await d.select().from(schema.changes).where(eq(schema.changes.siteId, siteId));
    // Baseline as it would have been recorded when the pull request opened.
    const baseline = await recordBaseline(change!.id);
    expect(baseline.control.paths).toEqual(["/c"]);
    const before = Array.from({ length: 28 }, (_, i) => 100 + (i % 5));
    await d
      .update(schema.changes)
      .set({
        verifiedAt,
        baseline: {
          ...baseline,
          affected: { ...baseline.affected, perDay: before },
          control: { ...baseline.control, perDay: before },
        },
      })
      .where(eq(schema.changes.id, change!.id));
    const score = await scoreChange(change!.id, 14);
    expect(score?.verdict).toBe("improved");
    expect(score?.effect).toBeGreaterThan(0.7);
  });
});
