import { and, eq, inArray } from "drizzle-orm";
import { db, schema } from "@/server/db/client";
import { env, integrationStatus } from "@/server/env";
import { installationClient, mintRepoToken, splitRepo } from "@/server/integrations/github/app";
import { recordBaseline } from "@/server/ledger/baseline";
import type { FixType } from "@/server/checks/types";
import type { FixTask } from "./briefs";
import { checkGuardrails } from "./guardrails";
import { ManagedAgentFixRunner } from "./managed-agent-runner";
import { branchName, buildPrBody, prTitle } from "./pr-body";
import type { FixRunner } from "./runner";

// Fix types that a machine can verify, and so may ship in v1.
export const SUPPORTED_FIX_TYPES: FixType[] = ["F1", "F2", "F3", "F4", "F5"];

export async function loadChange(changeId: string) {
  const [row] = await db()
    .select({
      change: schema.changes,
      finding: schema.findings,
      site: schema.sites,
      repo: schema.repos,
    })
    .from(schema.changes)
    .innerJoin(schema.findings, eq(schema.findings.id, schema.changes.findingId))
    .innerJoin(schema.sites, eq(schema.sites.id, schema.changes.siteId))
    .leftJoin(schema.repos, eq(schema.repos.id, schema.sites.repoId))
    .where(eq(schema.changes.id, changeId));
  if (!row) throw new Error("change not found");
  return row;
}

export function fixBlockers(
  site: { repoId: number | null },
  finding: { fixType: string | null; status: string },
): string[] {
  const s = integrationStatus();
  const out: string[] = [];
  if (!finding.fixType) out.push("This finding needs a person to act on it.");
  else if (!SUPPORTED_FIX_TYPES.includes(finding.fixType as FixType))
    out.push("Leaflyst cannot fix this type of problem yet.");
  if (!["open", "needs_human", "failed_verification"].includes(finding.status))
    out.push("A fix for this finding is already under way.");
  if (!site.repoId) out.push("Connect a GitHub repository for this site first.");
  if (!s.github) out.push("The GitHub App is not configured on this server.");
  if (!s.fixAgent) out.push("The fix agent is not configured on this server.");
  return out;
}

/** Creates the change and queues the fix job. */
export async function requestFix(findingId: string, userId: string) {
  const d = db();
  const [row] = await d
    .select({ finding: schema.findings, site: schema.sites })
    .from(schema.findings)
    .innerJoin(schema.sites, eq(schema.sites.id, schema.findings.siteId))
    .where(and(eq(schema.findings.id, findingId), eq(schema.sites.userId, userId)));
  if (!row) throw new Error("finding not found");
  const blockers = fixBlockers(row.site, row.finding);
  if (blockers.length) throw new Error(blockers.join(" "));
  const [change] = await d
    .insert(schema.changes)
    .values({
      siteId: row.site.id,
      findingId,
      fixType: row.finding.fixType as string,
      branch: branchName(findingId, row.finding.title),
    })
    .returning();
  if (!change) throw new Error("could not create change");
  await d
    .update(schema.findings)
    .set({ status: "queued", statusReason: null })
    .where(eq(schema.findings.id, findingId));
  await d.insert(schema.auditLog).values({
    userId,
    siteId: row.site.id,
    action: "fix.requested",
    details: { findingId, changeId: change.id },
  });
  const { enqueue } = await import("@/server/jobs/queue");
  await enqueue("fix.run", { changeId: change.id }, { retryLimit: 0, singletonKey: findingId });
  return change.id;
}

async function markNeedsHuman(changeId: string, findingId: string, reason: string) {
  await db()
    .update(schema.changes)
    .set({ status: "needs_human" })
    .where(eq(schema.changes.id, changeId));
  await db()
    .update(schema.findings)
    .set({ status: "needs_human", statusReason: reason })
    .where(eq(schema.findings.id, findingId));
}

/** The fix job: agent session, guardrails on the pushed branch, then our own pull request. */
export async function runFix(changeId: string, runner: FixRunner = new ManagedAgentFixRunner()) {
  const { change, finding, site, repo } = await loadChange(changeId);
  if (!repo) return markNeedsHuman(changeId, finding.id, "No repository is connected.");
  const d = db();
  await d
    .update(schema.findings)
    .set({ status: "fixing" })
    .where(eq(schema.findings.id, finding.id));
  const { owner, repo: name } = splitRepo(repo.fullName);
  const task: FixTask = {
    findingId: finding.id,
    checkId: finding.checkId,
    fixType: finding.fixType as FixType,
    title: finding.title,
    affectedPaths: finding.affectedPaths,
    evidence: finding.evidence as Record<string, unknown>,
    expectedEffect: finding.expectedEffect,
    siteUrl: site.baseUrl,
    branch: change.branch ?? branchName(finding.id, finding.title),
    defaultBranch: repo.defaultBranch,
  };

  const token = await mintRepoToken(repo.installationId, repo.id);
  const result = await runner.run({
    task,
    repoUrl: `https://github.com/${repo.fullName}`,
    repoToken: token,
  });
  await d
    .update(schema.changes)
    .set({ agentSessionId: result.sessionId ?? null, agentCostUsd: result.costUsd ?? null })
    .where(eq(schema.changes.id, changeId));
  if (result.status !== "pushed")
    return markNeedsHuman(changeId, finding.id, `${result.summary} ${result.reason ?? ""}`.trim());

  const gh = await installationClient(repo.installationId);
  let compare;
  try {
    compare = await gh.rest.repos.compareCommits({
      owner,
      repo: name,
      base: repo.defaultBranch,
      head: task.branch,
    });
  } catch {
    return markNeedsHuman(
      changeId,
      finding.id,
      `The agent said it pushed ${task.branch}, but the branch was not found.`,
    );
  }
  const files = (compare.data.files ?? []).map((f) => ({
    filename: f.filename,
    additions: f.additions,
    deletions: f.deletions,
  }));
  const guard = checkGuardrails(files);
  if (!guard.ok) {
    await gh.rest.git.deleteRef({ owner, repo: name, ref: `heads/${task.branch}` }).catch(() => {});
    return markNeedsHuman(
      changeId,
      finding.id,
      `Change rejected by guardrails: ${guard.problems.join("; ")}.`,
    );
  }

  const headSha = compare.data.commits.at(-1)?.sha ?? null;
  const pr = await gh.rest.pulls.create({
    owner,
    repo: name,
    head: task.branch,
    base: repo.defaultBranch,
    title: prTitle(task),
    body: buildPrBody({
      task,
      summary: result.summary,
      findingUrl: `${env().APP_URL}/sites/${site.id}/findings/${finding.id}`,
      diffStats: guard.stats,
    }),
  });
  await gh.rest.issues
    .addLabels({
      owner,
      repo: name,
      issue_number: pr.data.number,
      labels: ["leaflyst", task.fixType],
    })
    .catch(() => {});
  await d
    .update(schema.changes)
    .set({
      status: "pr_open",
      prNumber: pr.data.number,
      prUrl: pr.data.html_url,
      commitSha: headSha,
      diffStats: guard.stats,
      openedAt: new Date(),
    })
    .where(eq(schema.changes.id, changeId));
  await d
    .update(schema.findings)
    .set({ status: "pr_open", statusReason: null })
    .where(eq(schema.findings.id, finding.id));
  await recordBaseline(changeId);
  return { prUrl: pr.data.html_url };
}

/** Opens a pull request that reverts a merged change. */
export async function requestRevert(changeId: string, userId: string) {
  const { change, site, repo } = await loadChange(changeId);
  if (site.userId !== userId) throw new Error("not allowed");
  if (!repo || !change.prNumber || !change.mergeSha)
    throw new Error("Only merged changes can be reverted.");
  const { owner, repo: name } = splitRepo(repo.fullName);
  const gh = await installationClient(repo.installationId);
  const base = await gh.rest.repos.getBranch({ owner, repo: name, branch: repo.defaultBranch });
  const merge = await gh.rest.git.getCommit({ owner, repo: name, commit_sha: change.mergeSha });
  const parent = merge.data.parents[0]?.sha;
  if (!parent) throw new Error("merge commit has no parent");
  // Restores the tree from before the merge for the files this change touched only.
  const diff = await gh.rest.repos.compareCommits({
    owner,
    repo: name,
    base: parent,
    head: change.mergeSha,
  });
  const tree = await gh.rest.git.createTree({
    owner,
    repo: name,
    base_tree: base.data.commit.commit.tree.sha,
    tree: await Promise.all(
      (diff.data.files ?? []).map(async (f) => {
        if (f.status === "added")
          return { path: f.filename, mode: "100644" as const, type: "blob" as const, sha: null };
        const old = await gh.rest.repos.getContent({
          owner,
          repo: name,
          path: f.previous_filename ?? f.filename,
          ref: parent,
        });
        const sha = Array.isArray(old.data) ? null : old.data.sha;
        return { path: f.filename, mode: "100644" as const, type: "blob" as const, sha };
      }),
    ),
  });
  const commit = await gh.rest.git.createCommit({
    owner,
    repo: name,
    message: `Revert Leaflyst change #${change.prNumber}`,
    tree: tree.data.sha,
    parents: [base.data.commit.sha],
  });
  const branch = `${change.branch ?? "leaflyst/change"}-revert`;
  await gh.rest.git.createRef({
    owner,
    repo: name,
    ref: `refs/heads/${branch}`,
    sha: commit.data.sha,
  });
  const pr = await gh.rest.pulls.create({
    owner,
    repo: name,
    head: branch,
    base: repo.defaultBranch,
    title: `Revert Leaflyst change #${change.prNumber}`,
    body: `This reverts #${change.prNumber}, requested from Leaflyst.`,
  });
  await db()
    .insert(schema.auditLog)
    .values({
      userId,
      siteId: site.id,
      action: "change.revert_requested",
      details: { changeId, pr: pr.data.number },
    });
  return pr.data.html_url;
}

export async function changesForFindings(ids: string[]) {
  if (!ids.length) return [];
  return db().select().from(schema.changes).where(inArray(schema.changes.findingId, ids));
}
