import type { FindingDraft, Severity } from "@/server/checks/types";

const WEIGHT: Record<Severity, number> = { critical: 100, high: 60, medium: 30, low: 10 };

/**
 * Ranking score: severity, scaled up by the traffic at stake (log, so one huge
 * page does not drown everything else), times how sure the check is.
 * Fixable findings get a small boost because Leaflyst can act on them now.
 */
export function scoreFinding(
  d: Pick<FindingDraft, "severity" | "trafficAtStake" | "confidence" | "fixType">,
): number {
  const traffic = 1 + Math.log10(1 + Math.max(0, d.trafficAtStake));
  const fixable = d.fixType ? 1.15 : 1;
  return Math.round(WEIGHT[d.severity] * traffic * d.confidence * fixable * 10) / 10;
}

export function rankFindings<T extends FindingDraft>(drafts: T[]): (T & { score: number })[] {
  return drafts.map((d) => ({ ...d, score: scoreFinding(d) })).sort((a, b) => b.score - a.score);
}
