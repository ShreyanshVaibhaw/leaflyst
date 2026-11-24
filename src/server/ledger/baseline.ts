import { and, eq, gte, inArray, lt, sql } from "drizzle-orm";
import { db, schema } from "@/server/db/client";
import { computeVerdict, selectControls, type DailySeries } from "./scoring/verdict";

const DAY = 86_400_000;
const iso = (d: Date) => d.toISOString().slice(0, 10);

/** Daily impressions summed over a set of paths, one value per day from start (inclusive) to end (exclusive). */
export async function dailyImpressions(
  siteId: string,
  origin: string,
  paths: string[],
  start: Date,
  end: Date,
): Promise<number[]> {
  const days = Math.max(0, Math.round((end.getTime() - start.getTime()) / DAY));
  if (paths.length === 0 || days === 0) return [];
  const pages = paths.map((p) => `${origin}${p}`);
  const rows = await db()
    .select({
      date: schema.metricDaily.date,
      impressions: sql<number>`sum(${schema.metricDaily.impressions})::int`,
    })
    .from(schema.metricDaily)
    .where(
      and(
        eq(schema.metricDaily.siteId, siteId),
        eq(schema.metricDaily.source, "gsc"),
        eq(schema.metricDaily.query, ""),
        inArray(schema.metricDaily.page, pages),
        gte(schema.metricDaily.date, iso(start)),
        lt(schema.metricDaily.date, iso(end)),
      ),
    )
    .groupBy(schema.metricDaily.date);
  const byDay = new Map(rows.map((r) => [r.date, r.impressions]));
  return Array.from(
    { length: days },
    (_, i) => byDay.get(iso(new Date(start.getTime() + i * DAY))) ?? 0,
  );
}

async function pageImpressions(siteId: string) {
  return db()
    .select({ path: schema.pages.path, impressions: schema.pages.impressions28d })
    .from(schema.pages)
    .where(eq(schema.pages.siteId, siteId));
}

/**
 * Stored when the pull request opens: 28 days of search data for the affected
 * pages and for the chosen control pages. Search Console lags about 2 days.
 */
export async function recordBaseline(changeId: string) {
  const d = db();
  const [row] = await d
    .select({ change: schema.changes, finding: schema.findings, site: schema.sites })
    .from(schema.changes)
    .innerJoin(schema.findings, eq(schema.findings.id, schema.changes.findingId))
    .innerJoin(schema.sites, eq(schema.sites.id, schema.changes.siteId))
    .where(eq(schema.changes.id, changeId));
  if (!row) throw new Error("change not found");
  const origin = new URL(row.site.baseUrl).origin;
  const affected = row.finding.affectedPaths;
  const controls = selectControls(await pageImpressions(row.site.id), affected);
  const end = new Date(Date.now() - 2 * DAY);
  const start = new Date(end.getTime() - 28 * DAY);
  const a = await dailyImpressions(row.site.id, origin, affected, start, end);
  const c = await dailyImpressions(row.site.id, origin, controls, start, end);
  const baseline = {
    window: { start: iso(start), end: iso(end) },
    affected: { paths: affected, total: a.reduce((s, x) => s + x, 0), perDay: a },
    control: { paths: controls, total: c.reduce((s, x) => s + x, 0), perDay: c },
    hasSearchData: a.some((x) => x > 0),
  };
  await d
    .update(schema.changes)
    .set({ baseline, controlPaths: controls })
    .where(eq(schema.changes.id, changeId));
  return baseline;
}

/** Scores a change N days after live verification against its stored baseline. */
export async function scoreChange(changeId: string, day: 14 | 28) {
  const d = db();
  const [row] = await d
    .select({ change: schema.changes, finding: schema.findings, site: schema.sites })
    .from(schema.changes)
    .innerJoin(schema.findings, eq(schema.findings.id, schema.changes.findingId))
    .innerJoin(schema.sites, eq(schema.sites.id, schema.changes.siteId))
    .where(eq(schema.changes.id, changeId));
  if (!row?.change.verifiedAt) return null;
  const origin = new URL(row.site.baseUrl).origin;
  const base = row.change.baseline as {
    affected: { perDay: number[] };
    control: { perDay: number[] };
  } | null;
  const start = new Date(row.change.verifiedAt.getTime() + DAY);
  const end = new Date(start.getTime() + day * DAY);
  const controls = row.change.controlPaths ?? [];
  const affected: DailySeries = {
    before: base?.affected.perDay ?? [],
    after: await dailyImpressions(row.site.id, origin, row.finding.affectedPaths, start, end),
  };
  const control: DailySeries = {
    before: base?.control.perDay ?? [],
    after: await dailyImpressions(row.site.id, origin, controls, start, end),
  };
  const result = { ...computeVerdict(affected, control), day, scoredAt: new Date().toISOString() };
  await d
    .update(schema.changes)
    .set(day === 14 ? { score14: result } : { score28: result })
    .where(eq(schema.changes.id, changeId));
  return result;
}
