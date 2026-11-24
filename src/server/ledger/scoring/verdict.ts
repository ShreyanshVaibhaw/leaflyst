/**
 * Did a change help? A difference-in-differences on daily search impressions:
 * the change in the affected pages minus the change in similar untouched pages,
 * on a log scale so big and small pages count alike. The interval comes from
 * resampling days, and the verdict is "improved" or "worse" only when the whole
 * 90% interval sits on one side of zero.
 */

export interface DailySeries {
  // One value per day in the window, in order. Missing days count as 0.
  before: number[];
  after: number[];
}

export type Verdict = "improved" | "no_clear_effect" | "worse";

export interface VerdictResult {
  verdict: Verdict;
  // Relative effect, e.g. 0.12 means about 12% more than the control pages predict.
  effect: number;
  low: number;
  high: number;
  reason: string;
  affected: { beforeMean: number; afterMean: number };
  control: { beforeMean: number; afterMean: number };
}

// Below this many impressions per day before the change, small sites give only noise.
export const MIN_DAILY_IMPRESSIONS = 5;
const RESAMPLES = 2000;

function mean(xs: number[]): number {
  return xs.length === 0 ? 0 : xs.reduce((a, b) => a + b, 0) / xs.length;
}

/** Small deterministic generator so the same data always gives the same interval. */
export function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return (s >>> 0) / 4294967296;
  };
}

function resampleMean(xs: number[], rand: () => number): number {
  let sum = 0;
  for (let i = 0; i < xs.length; i++) sum += xs[Math.floor(rand() * xs.length)] ?? 0;
  return sum / xs.length;
}

const pct = (x: number) => Math.exp(x) - 1;

function did(aBefore: number, aAfter: number, cBefore: number, cAfter: number): number {
  return Math.log((aAfter + 1) / (aBefore + 1)) - Math.log((cAfter + 1) / (cBefore + 1));
}

export function computeVerdict(
  affected: DailySeries,
  control: DailySeries,
  seed = 7,
): VerdictResult {
  const a = { beforeMean: mean(affected.before), afterMean: mean(affected.after) };
  const c = { beforeMean: mean(control.before), afterMean: mean(control.after) };
  const base = { affected: a, control: c };

  if (affected.after.length < 7 || affected.before.length < 7) {
    return {
      ...base,
      verdict: "no_clear_effect",
      effect: 0,
      low: 0,
      high: 0,
      reason: "Fewer than 7 days of data on one side of the change.",
    };
  }
  if (a.beforeMean < MIN_DAILY_IMPRESSIONS) {
    return {
      ...base,
      verdict: "no_clear_effect",
      effect: 0,
      low: 0,
      high: 0,
      reason: `The affected pages had ${a.beforeMean.toFixed(1)} search impressions a day before the change, too few to tell a real effect from noise.`,
    };
  }
  if (control.before.length === 0 || c.beforeMean === 0) {
    return {
      ...base,
      verdict: "no_clear_effect",
      effect: 0,
      low: 0,
      high: 0,
      reason: "No comparable untouched pages, so a site-wide trend cannot be ruled out.",
    };
  }

  const point = did(a.beforeMean, a.afterMean, c.beforeMean, c.afterMean);
  const rand = rng(seed);
  const draws: number[] = [];
  for (let i = 0; i < RESAMPLES; i++) {
    draws.push(
      did(
        resampleMean(affected.before, rand),
        resampleMean(affected.after, rand),
        resampleMean(control.before, rand),
        resampleMean(control.after, rand),
      ),
    );
  }
  draws.sort((x, y) => x - y);
  const lowLog = draws[Math.floor(RESAMPLES * 0.05)] ?? point;
  const highLog = draws[Math.floor(RESAMPLES * 0.95)] ?? point;
  const effect = pct(point);
  const low = pct(lowLog);
  const high = pct(highLog);

  let verdict: Verdict = "no_clear_effect";
  let reason = `The 90% range runs from ${(low * 100).toFixed(0)}% to ${(high * 100).toFixed(0)}%, which includes no change.`;
  if (lowLog > 0) {
    verdict = "improved";
    reason = `Impressions rose about ${(effect * 100).toFixed(0)}% more than on comparable pages (90% range ${(low * 100).toFixed(0)}% to ${(high * 100).toFixed(0)}%).`;
  } else if (highLog < 0) {
    verdict = "worse";
    reason = `Impressions fell about ${(Math.abs(effect) * 100).toFixed(0)}% against comparable pages (90% range ${(low * 100).toFixed(0)}% to ${(high * 100).toFixed(0)}%).`;
  }
  return { ...base, verdict, effect, low, high, reason };
}

export interface ControlCandidate {
  path: string;
  impressions: number;
}

/**
 * Picks untouched pages to compare against: same first path segment where possible,
 * then the closest in baseline impressions.
 */
export function selectControls(
  candidates: ControlCandidate[],
  affected: string[],
  target = 10,
): string[] {
  const touched = new Set(affected);
  const sections = new Set(affected.map((p) => p.split("/")[1] ?? ""));
  const affectedImpr = candidates
    .filter((c) => touched.has(c.path))
    .reduce((s, c) => s + c.impressions, 0);
  const perPage = affected.length ? affectedImpr / affected.length : 0;
  return candidates
    .filter((c) => !touched.has(c.path) && c.impressions > 0)
    .map((c) => ({
      path: c.path,
      sameSection: sections.has(c.path.split("/")[1] ?? "") ? 0 : 1,
      distance: Math.abs(Math.log((c.impressions + 1) / (perPage + 1))),
    }))
    .sort((x, y) => x.sameSection - y.sameSection || x.distance - y.distance)
    .slice(0, target)
    .map((c) => c.path);
}
