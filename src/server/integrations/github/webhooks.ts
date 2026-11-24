import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { db, schema } from "@/server/db/client";
import { enqueue } from "@/server/jobs/queue";
import { changeByHeadSha } from "@/server/verify/service";

const repoSchema = z.object({
  id: z.number(),
  full_name: z.string(),
  default_branch: z.string().optional(),
});

async function upsertRepos(installationId: number, repos: z.infer<typeof repoSchema>[]) {
  for (const r of repos) {
    await db()
      .insert(schema.repos)
      .values({
        id: r.id,
        installationId,
        fullName: r.full_name,
        defaultBranch: r.default_branch ?? "main",
      })
      .onConflictDoUpdate({
        target: schema.repos.id,
        set: { installationId, fullName: r.full_name },
      });
  }
}

/** Handles one verified GitHub webhook delivery. Unknown events are ignored. */
export async function handleWebhook(event: string, payload: unknown) {
  const d = db();
  if (event === "installation" || event === "installation_repositories") {
    const p = z
      .object({
        action: z.string(),
        installation: z.object({
          id: z.number(),
          account: z.object({ login: z.string() }).nullable().optional(),
        }),
        repositories: z.array(repoSchema).optional(),
        repositories_added: z.array(repoSchema).optional(),
        repositories_removed: z.array(z.object({ id: z.number() })).optional(),
      })
      .parse(payload);
    if (p.action === "deleted") {
      await d
        .delete(schema.githubInstallations)
        .where(eq(schema.githubInstallations.id, p.installation.id));
      return "installation removed";
    }
    await d
      .insert(schema.githubInstallations)
      .values({
        id: p.installation.id,
        accountLogin: p.installation.account?.login ?? "unknown",
        suspended: p.action === "suspend",
      })
      .onConflictDoUpdate({
        target: schema.githubInstallations.id,
        set: { suspended: p.action === "suspend" },
      });
    await upsertRepos(p.installation.id, [
      ...(p.repositories ?? []),
      ...(p.repositories_added ?? []),
    ]);
    for (const r of p.repositories_removed ?? [])
      await d.delete(schema.repos).where(eq(schema.repos.id, r.id));
    return "installation synced";
  }

  if (event === "pull_request") {
    const p = z
      .object({
        action: z.string(),
        pull_request: z.object({
          number: z.number(),
          merged: z.boolean().nullable().optional(),
          merge_commit_sha: z.string().nullable().optional(),
          head: z.object({ sha: z.string() }),
        }),
        repository: repoSchema,
      })
      .parse(payload);
    const [change] = await d
      .select({ change: schema.changes, site: schema.sites })
      .from(schema.changes)
      .innerJoin(schema.sites, eq(schema.sites.id, schema.changes.siteId))
      .where(
        and(
          eq(schema.changes.prNumber, p.pull_request.number),
          eq(schema.sites.repoId, p.repository.id),
        ),
      );
    if (!change) return "not a Leaflyst pull request";
    if (p.action === "synchronize") {
      await d
        .update(schema.changes)
        .set({ commitSha: p.pull_request.head.sha })
        .where(eq(schema.changes.id, change.change.id));
      return "head updated";
    }
    if (p.action === "closed" && p.pull_request.merged) {
      await d
        .update(schema.changes)
        .set({
          status: "merged",
          mergedAt: new Date(),
          mergeSha: p.pull_request.merge_commit_sha ?? null,
        })
        .where(eq(schema.changes.id, change.change.id));
      await d
        .update(schema.findings)
        .set({ status: "merged" })
        .where(eq(schema.findings.id, change.change.findingId));
      // First live check after 3 minutes; verifyLive keeps retrying for 30 minutes.
      await enqueue(
        "verify.live",
        { changeId: change.change.id, attempt: 0 },
        { startAfter: new Date(Date.now() + 3 * 60_000) },
      );
      return "merged";
    }
    if (p.action === "closed") {
      await d
        .update(schema.changes)
        .set({ status: "closed" })
        .where(eq(schema.changes.id, change.change.id));
      await d
        .update(schema.findings)
        .set({ status: "open", statusReason: "The pull request was closed without merging." })
        .where(eq(schema.findings.id, change.change.findingId));
      return "closed";
    }
    return "ignored";
  }

  if (event === "deployment_status") {
    const p = z
      .object({
        deployment_status: z.object({
          state: z.string(),
          environment_url: z.string().nullable().optional(),
          target_url: z.string().nullable().optional(),
        }),
        deployment: z.object({
          sha: z.string(),
          environment: z.string(),
          production_environment: z.boolean().optional(),
        }),
      })
      .parse(payload);
    if (p.deployment_status.state !== "success") return "not a successful deployment";
    const url = p.deployment_status.environment_url ?? p.deployment_status.target_url;
    const isProduction =
      p.deployment.production_environment ?? /^production$/i.test(p.deployment.environment);
    if (isProduction) {
      const [change] = await d
        .select()
        .from(schema.changes)
        .where(eq(schema.changes.mergeSha, p.deployment.sha));
      if (!change) return "no change for this production deploy";
      await d
        .update(schema.changes)
        .set({ deployedAt: new Date() })
        .where(eq(schema.changes.id, change.id));
      await enqueue(
        "verify.live",
        { changeId: change.id, attempt: 0 },
        { singletonKey: `live-${change.id}-deployed` },
      );
      return "production deploy recorded";
    }
    const change = await changeByHeadSha(p.deployment.sha);
    if (!change || !url) return "no change for this preview";
    await enqueue("verify.preview", {
      changeId: change.id,
      previewUrl: url,
      sha: p.deployment.sha,
    });
    return "preview verification queued";
  }
  return "ignored";
}
