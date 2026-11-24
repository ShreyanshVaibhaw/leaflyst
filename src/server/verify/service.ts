import { and, eq, isNotNull } from "drizzle-orm";
import { db, schema } from "@/server/db/client";
import { verifyFinding } from "@/server/checks/registry";
import { siteHeaders } from "@/server/findings/audit";
import { installationClient, splitRepo } from "@/server/integrations/github/app";
import { loadChange } from "@/server/fixes/service";

const CHECK_NAME = "Leaflyst verification";
// Wait up to 30 minutes for the production deployment: 6 checks, 5 minutes apart.
export const LIVE_ATTEMPTS = 6;
export const LIVE_INTERVAL_MS = 5 * 60_000;

async function runCheck(changeId: string, kind: "preview" | "live", baseUrl: string) {
  const { finding, site } = await loadChange(changeId);
  const result = await verifyFinding(finding.checkId, {
    baseUrl,
    paths: finding.affectedPaths,
    evidence: finding.evidence as Record<string, unknown>,
    headers: await siteHeaders(site),
  });
  await db()
    .insert(schema.verifications)
    .values({
      changeId,
      kind,
      baseUrl,
      passed: result.passed,
      details: { summary: result.summary, ...result.details },
    });
  return result;
}

/** Runs the finding's own check against a preview deployment and reports it on the pull request. */
export async function verifyPreview(changeId: string, previewUrl: string, sha: string) {
  const { change, repo } = await loadChange(changeId);
  const result = await runCheck(changeId, "preview", previewUrl);
  if (repo && change.prNumber) {
    const { owner, repo: name } = splitRepo(repo.fullName);
    const gh = await installationClient(repo.installationId);
    await gh.rest.checks.create({
      owner,
      repo: name,
      name: CHECK_NAME,
      head_sha: sha,
      status: "completed",
      conclusion: result.passed ? "success" : "failure",
      output: {
        title: result.passed ? "The fix works on the preview" : "The fix does not pass yet",
        summary: `${result.summary}\n\nChecked: ${previewUrl}`,
      },
    });
    await gh.rest.issues.createComment({
      owner,
      repo: name,
      issue_number: change.prNumber,
      body: `${result.passed ? "Passed" : "Failed"}: Leaflyst re-ran its check on the preview (${previewUrl}).\n\n${result.summary}`,
    });
  }
  return result;
}

/** After merge: checks production, retrying while the deploy finishes, then schedules scoring. */
export async function verifyLive(changeId: string, attempt: number) {
  const { change, finding, site, repo } = await loadChange(changeId);
  if (change.status === "verified") return { status: "verified" as const, result: null };
  const result = await runCheck(changeId, "live", site.baseUrl);
  const d = db();
  if (result.passed) {
    const now = new Date();
    await d
      .update(schema.changes)
      .set({ status: "verified", verifiedAt: now, deployedAt: change.deployedAt ?? now })
      .where(eq(schema.changes.id, changeId));
    await d
      .update(schema.findings)
      .set({ status: "verified", statusReason: null })
      .where(eq(schema.findings.id, finding.id));
    const { enqueue } = await import("@/server/jobs/queue");
    await enqueue(
      "ledger.score",
      { changeId, day: 14 },
      { startAfter: new Date(now.getTime() + 16 * 86_400_000) },
    );
    await enqueue(
      "ledger.score",
      { changeId, day: 28 },
      { startAfter: new Date(now.getTime() + 30 * 86_400_000) },
    );
    return { status: "verified" as const, result };
  }
  if (attempt + 1 < LIVE_ATTEMPTS) {
    const { enqueue } = await import("@/server/jobs/queue");
    await enqueue(
      "verify.live",
      { changeId, attempt: attempt + 1 },
      { startAfter: new Date(Date.now() + LIVE_INTERVAL_MS) },
    );
    return { status: "waiting" as const, result };
  }
  await d
    .update(schema.changes)
    .set({ status: "failed_verification" })
    .where(eq(schema.changes.id, changeId));
  await d
    .update(schema.findings)
    .set({ status: "failed_verification", statusReason: result.summary })
    .where(eq(schema.findings.id, finding.id));
  if (repo && change.prNumber) {
    const { owner, repo: name } = splitRepo(repo.fullName);
    const gh = await installationClient(repo.installationId);
    await gh.rest.issues.createComment({
      owner,
      repo: name,
      issue_number: change.prNumber,
      body: `Leaflyst could not confirm this fix on production (${site.baseUrl}) within 30 minutes of the merge.\n\n${result.summary}`,
    });
  }
  return { status: "failed" as const, result };
}

export async function changeByHeadSha(sha: string) {
  const [row] = await db()
    .select()
    .from(schema.changes)
    .where(and(eq(schema.changes.commitSha, sha), isNotNull(schema.changes.prNumber)));
  return row ?? null;
}
