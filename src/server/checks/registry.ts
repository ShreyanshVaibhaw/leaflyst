import { brokenLinks } from "./broken-links";
import { crawlerStatus } from "./crawler-status";
import { metadata } from "./metadata";
import { renderGap } from "./render-gap";
import { robotsAccess } from "./robots-access";
import { cannibalization, noindexWithImpressions, strikingDistance } from "./search-console";
import { sitemap } from "./sitemap";
import { tracking } from "./tracking";
import type { Check, FindingDraft, SiteContext, VerifyInput, VerifyResult } from "./types";

/** The single list of checks. The audit and verification both go through it. */
export const CHECKS: Check[] = [
  robotsAccess,
  crawlerStatus,
  renderGap,
  metadata,
  strikingDistance,
  sitemap,
  brokenLinks,
  noindexWithImpressions,
  cannibalization,
  tracking,
];

export function getCheck(id: string): Check {
  const check = CHECKS.find((c) => c.id === id);
  if (!check) throw new Error(`unknown check ${id}`);
  return check;
}

export async function detectAll(
  site: SiteContext,
): Promise<{ drafts: FindingDraft[]; errors: { checkId: string; error: string }[] }> {
  const drafts: FindingDraft[] = [];
  const errors: { checkId: string; error: string }[] = [];
  for (const check of CHECKS) {
    try {
      drafts.push(...(await check.detect(site)));
    } catch (error) {
      errors.push({
        checkId: check.id,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
  return { drafts, errors };
}

export async function verifyFinding(checkId: string, input: VerifyInput): Promise<VerifyResult> {
  const check = getCheck(checkId);
  if (!check.verify)
    return { passed: false, summary: `${checkId} cannot be verified automatically`, details: {} };
  return check.verify(input);
}
