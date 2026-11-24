import { and, eq, inArray, notInArray, sql } from "drizzle-orm";
import type { FindingDraft } from "@/server/checks/types";
import { db, schema } from "@/server/db/client";
import { rankFindings } from "./score";

// Findings in these states are handled by the fix loop and are never reopened by an audit.
const ACTIVE = [
  "queued",
  "fixing",
  "pr_open",
  "merged",
  "verified",
  "failed_verification",
  "dismissed",
  "reverted",
];

/**
 * Upserts this audit's findings by fingerprint. A problem that is no longer seen
 * and was never acted on is closed as resolved.
 */
export async function saveFindings(siteId: string, crawlRunId: string, drafts: FindingDraft[]) {
  const d = db();
  const ranked = rankFindings(drafts);
  for (const f of ranked) {
    await d
      .insert(schema.findings)
      .values({
        siteId,
        crawlRunId,
        checkId: f.checkId,
        fingerprint: f.fingerprint,
        severity: f.severity,
        title: f.title,
        affectedPaths: f.affectedPaths,
        evidence: f.evidence,
        expectedEffect: f.expectedEffect,
        fixType: f.fixType,
        score: f.score,
      })
      .onConflictDoUpdate({
        target: [schema.findings.siteId, schema.findings.fingerprint],
        set: {
          crawlRunId,
          severity: f.severity,
          title: f.title,
          affectedPaths: f.affectedPaths,
          evidence: f.evidence,
          expectedEffect: f.expectedEffect,
          fixType: f.fixType,
          score: f.score,
          lastSeenAt: new Date(),
          // A resolved finding that comes back is open again.
          status: sql`case when ${schema.findings.status} in ('resolved', 'needs_human') then 'open' else ${schema.findings.status} end`,
        },
      });
  }
  const seen = ranked.map((f) => f.fingerprint);
  await d
    .update(schema.findings)
    .set({ status: "resolved", statusReason: "No longer found by the latest audit." })
    .where(
      and(
        eq(schema.findings.siteId, siteId),
        eq(schema.findings.status, "open"),
        seen.length ? notInArray(schema.findings.fingerprint, seen) : sql`true`,
      ),
    );
  return ranked.length;
}

export async function setFindingStatus(
  ids: string[],
  status: string,
  reason: string | null = null,
) {
  if (ids.length === 0) return;
  await db()
    .update(schema.findings)
    .set({ status, statusReason: reason })
    .where(inArray(schema.findings.id, ids));
}

export { ACTIVE as ACTIVE_FINDING_STATES };
