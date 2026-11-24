import { and, eq, sql } from "drizzle-orm";
import { db, schema } from "@/server/db/client";
import { loadGscData } from "@/server/integrations/google/search-console";
import { toPath } from "@/server/crawl/crawl";
import { parseAdsCsv } from "./parse";

/**
 * Where ad data comes from. CSV upload now; the Google Ads API plugs in behind
 * the same shape once access is granted.
 */
export interface AdsSource {
  name: "csv" | "google_ads_api";
}

export async function importAdsCsv(siteId: string, filename: string, text: string) {
  const parsed = parseAdsCsv(text);
  const d = db();
  const [imp] = await d
    .insert(schema.adsImports)
    .values({
      siteId,
      kind: parsed.kind,
      filename,
      rowCount: parsed.rows.length,
      currency: parsed.currency,
      periodStart: parsed.periodStart,
      periodEnd: parsed.periodEnd,
    })
    .returning();
  if (!imp) throw new Error("could not save import");
  const metrics = (r: (typeof parsed.rows)[number]) => ({
    clicks: Math.round(r.clicks),
    impressions: Math.round(r.impressions),
    cost: r.cost,
    conversions: r.conversions,
  });
  for (let i = 0; i < parsed.rows.length; i += 1000) {
    const chunk = parsed.rows.slice(i, i + 1000);
    if (parsed.kind === "search_terms") {
      await d.insert(schema.adsSearchTerms).values(
        chunk.map((r) => ({
          importId: imp.id,
          siteId,
          term: r.term as string,
          matchType: r.matchType ?? null,
          campaign: r.campaign ?? null,
          ...metrics(r),
        })),
      );
    } else if (parsed.kind === "landing_pages") {
      await d
        .insert(schema.adsLandingPages)
        .values(
          chunk.map((r) => ({ importId: imp.id, siteId, url: r.url as string, ...metrics(r) })),
        );
    } else {
      await d.insert(schema.adsCampaignDays).values(
        chunk.map((r) => ({
          importId: imp.id,
          siteId,
          campaign: r.campaign as string,
          day: r.day as string,
          ...metrics(r),
        })),
      );
    }
  }
  return {
    importId: imp.id,
    kind: parsed.kind,
    rows: parsed.rows.length,
    skipped: parsed.skippedRows,
  };
}

export interface TermRow {
  term: string;
  cost: number;
  clicks: number;
  conversions: number;
  organicPosition: number | null;
  organicClicks: number;
  advice: "test_pausing" | "add_organic_page" | "wasted" | null;
}

// Below this spend a term with no conversions is too small to call.
export const WASTED_MIN_COST = 20;

/** Paid and organic side by side per search term, plus the advice for each. */
export async function termTable(siteId: string): Promise<{
  rows: TermRow[];
  totals: { cost: number; conversions: number };
  hasOrganic: boolean;
}> {
  const paid = await db()
    .select({
      term: sql<string>`lower(${schema.adsSearchTerms.term})`,
      cost: sql<number>`sum(${schema.adsSearchTerms.cost})`,
      clicks: sql<number>`sum(${schema.adsSearchTerms.clicks})::int`,
      conversions: sql<number>`sum(${schema.adsSearchTerms.conversions})`,
    })
    .from(schema.adsSearchTerms)
    .where(eq(schema.adsSearchTerms.siteId, siteId))
    .groupBy(sql`lower(${schema.adsSearchTerms.term})`);
  const gsc = await loadGscData(siteId);
  const organic = new Map<string, { position: number | null; clicks: number }>();
  for (const q of gsc?.queries ?? []) {
    const key = q.query.toLowerCase();
    const prev = organic.get(key);
    // Keep the best ranking page for each query.
    if (!prev || (q.position ?? 999) < (prev.position ?? 999))
      organic.set(key, { position: q.position, clicks: q.clicks + (prev?.clicks ?? 0) });
  }
  const rows = paid.map((p): TermRow => {
    const o = organic.get(p.term);
    let advice: TermRow["advice"] = null;
    if (o?.position !== undefined && o.position !== null && o.position <= 1.5)
      advice = "test_pausing";
    else if (p.cost >= WASTED_MIN_COST && p.conversions === 0) advice = "wasted";
    // Without Search Console data, "ranks nowhere" cannot be told from "unknown".
    else if (gsc && p.conversions > 0 && (!o || (o.position ?? 99) > 20))
      advice = "add_organic_page";
    return {
      term: p.term,
      cost: p.cost,
      clicks: p.clicks,
      conversions: p.conversions,
      organicPosition: o?.position ?? null,
      organicClicks: o?.clicks ?? 0,
      advice,
    };
  });
  rows.sort((a, b) => b.cost - a.cost);
  return {
    rows,
    totals: {
      cost: rows.reduce((s, r) => s + r.cost, 0),
      conversions: rows.reduce((s, r) => s + r.conversions, 0),
    },
    hasOrganic: gsc !== null,
  };
}

/** Landing pages with paid clicks, joined to what the latest crawl saw on them. */
export async function landingHealth(siteId: string) {
  const d = db();
  const [site] = await d.select().from(schema.sites).where(eq(schema.sites.id, siteId));
  if (!site) return [];
  const origin = new URL(site.baseUrl).origin;
  const pages = await d
    .select({
      url: schema.adsLandingPages.url,
      cost: sql<number>`sum(${schema.adsLandingPages.cost})`,
      clicks: sql<number>`sum(${schema.adsLandingPages.clicks})::int`,
      conversions: sql<number>`sum(${schema.adsLandingPages.conversions})`,
    })
    .from(schema.adsLandingPages)
    .where(eq(schema.adsLandingPages.siteId, siteId))
    .groupBy(schema.adsLandingPages.url);
  const [run] = await d
    .select()
    .from(schema.crawlRuns)
    .where(and(eq(schema.crawlRuns.siteId, siteId), eq(schema.crawlRuns.status, "done")))
    .orderBy(sql`${schema.crawlRuns.createdAt} desc`)
    .limit(1);
  const fetches = run
    ? await d
        .select()
        .from(schema.pageFetches)
        .where(
          and(
            eq(schema.pageFetches.crawlRunId, run.id),
            eq(schema.pageFetches.identity, "googlebot"),
          ),
        )
    : [];
  const byPath = new Map(fetches.map((f) => [f.path, f]));
  return pages
    .map((p) => {
      const path = toPath(p.url, origin);
      const f = path ? byPath.get(path) : undefined;
      const problem = !f
        ? null
        : f.status !== 200
          ? `returns ${f.status}`
          : f.redirects.length > 0
            ? `redirects ${f.redirects.length} time(s)`
            : null;
      return { ...p, path, crawled: Boolean(f), problem };
    })
    .sort((a, b) => b.cost - a.cost);
}

export async function adsImports(siteId: string) {
  return db()
    .select()
    .from(schema.adsImports)
    .where(eq(schema.adsImports.siteId, siteId))
    .orderBy(sql`${schema.adsImports.createdAt} desc`);
}
