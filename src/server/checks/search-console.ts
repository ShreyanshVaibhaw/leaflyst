import { fetchPage, mapLimit } from "@/server/crawl/fetch";
import { parseMeta, words } from "@/server/crawl/html";
import { BROWSER_UA } from "@/server/crawl/identities";
import { normalizeBase, toPath } from "@/server/crawl/crawl";
import type { Check, FindingDraft, GscQueryRow, SiteContext } from "./types";

const STOPWORDS = new Set([
  "the",
  "and",
  "for",
  "with",
  "how",
  "what",
  "best",
  "near",
  "me",
  "to",
  "in",
  "of",
  "on",
  "is",
  "a",
  "vs",
  "my",
  "your",
  "can",
  "do",
  "does",
]);

export function queryTerms(query: string): string[] {
  return words(query).filter((w) => !STOPWORDS.has(w));
}

/** Share of a query's meaningful terms that appear in a piece of text. */
export function termCoverage(query: string, text: string): number {
  const terms = queryTerms(query);
  if (terms.length === 0) return 1;
  const have = new Set(words(text));
  return terms.filter((t) => have.has(t)).length / terms.length;
}

function pathOf(site: SiteContext, page: string) {
  return toPath(page, site.origin);
}

/**
 * S1: queries where a page sits just off the top results (average position 5 to 20)
 * with real impressions, but its title and H1 do not use the query's words.
 */
export const strikingDistance: Check = {
  id: "striking-distance",
  detect(site) {
    if (!site.gsc) return [];
    const pages = new Map(site.pages.map((p) => [p.path, p]));
    const candidates: (GscQueryRow & { path: string; coverage: number })[] = [];
    for (const row of site.gsc.queries) {
      if (row.position === null || row.position < 5 || row.position > 20 || row.impressions < 50)
        continue;
      const path = pathOf(site, row.page);
      const page = path ? pages.get(path) : undefined;
      if (!page || !path) continue;
      const coverage = termCoverage(
        row.query,
        `${page.meta.title ?? ""} ${page.meta.h1.join(" ")}`,
      );
      if (coverage < 0.6) candidates.push({ ...row, path, coverage });
    }
    // One finding per page, carrying its best queries.
    const byPath = new Map<string, typeof candidates>();
    for (const c of candidates) byPath.set(c.path, [...(byPath.get(c.path) ?? []), c]);
    const drafts: FindingDraft[] = [];
    for (const [path, rows] of byPath) {
      rows.sort((a, b) => b.impressions - a.impressions);
      const top = rows.slice(0, 5);
      const page = pages.get(path);
      drafts.push({
        checkId: "striking-distance",
        fingerprint: `striking-distance:${path}`,
        severity: "medium",
        title: `${path} ranks on page 1 or 2 for "${top[0]?.query}" but its title does not say so`,
        affectedPaths: [path],
        evidence: {
          kind: "striking-distance",
          currentTitle: page?.meta.title ?? null,
          currentH1: page?.meta.h1 ?? [],
          queries: top.map((r) => ({
            query: r.query,
            impressions: r.impressions,
            clicks: r.clicks,
            position: r.position,
          })),
        },
        expectedEffect:
          "A title and heading that match what people search for usually raise click-through and can lift the page into the top results.",
        fixType: "F2",
        confidence: 0.6,
        trafficAtStake: top.reduce((s, r) => s + r.impressions, 0),
      });
    }
    return drafts;
  },
  async verify({ baseUrl, paths, evidence, headers }) {
    const { origin } = normalizeBase(baseUrl);
    const queries = (evidence.queries ?? []) as { query: string }[];
    const results = await mapLimit(paths, 2, async (path) => {
      const res = await fetchPage(`${origin}${path}`, { userAgent: BROWSER_UA, headers });
      const meta = parseMeta(res.body);
      const text = `${meta.title ?? ""} ${meta.h1.join(" ")}`;
      const coverage = queries[0] ? termCoverage(queries[0].query, text) : 1;
      return {
        path,
        status: res.status,
        title: meta.title,
        coverage,
        titleLength: meta.title?.length ?? 0,
      };
    });
    const failures = results.filter(
      (r) => r.status !== 200 || r.coverage < 0.6 || r.titleLength === 0 || r.titleLength > 65,
    );
    return {
      passed: failures.length === 0,
      summary:
        failures.length === 0
          ? "The title and heading now use the main query's words."
          : "The title still misses the main query's words or is too long.",
      details: { results },
    };
  },
};

/** S5: two or more pages splitting impressions for one query. Reported only. */
export const cannibalization: Check = {
  id: "cannibalization",
  detect(site) {
    if (!site.gsc) return [];
    const byQuery = new Map<string, GscQueryRow[]>();
    for (const row of site.gsc.queries)
      byQuery.set(row.query, [...(byQuery.get(row.query) ?? []), row]);
    const drafts: FindingDraft[] = [];
    for (const [query, rows] of byQuery) {
      const total = rows.reduce((s, r) => s + r.impressions, 0);
      const strong = rows.filter((r) => r.impressions >= Math.max(30, total * 0.2));
      if (strong.length < 2 || total < 200) continue;
      drafts.push({
        checkId: "cannibalization",
        fingerprint: `cannibalization:${query}`,
        severity: "low",
        title: `${strong.length} pages compete for "${query}"`,
        affectedPaths: strong.map((r) => pathOf(site, r.page) ?? r.page),
        evidence: {
          query,
          pages: strong.map((r) => ({
            page: r.page,
            impressions: r.impressions,
            position: r.position,
          })),
        },
        expectedEffect:
          "Choosing one page for this query and linking the others to it usually lets that page rank higher.",
        fixType: null,
        confidence: 0.5,
        trafficAtStake: total,
      });
    }
    return drafts.sort((a, b) => b.trafficAtStake - a.trafficAtStake).slice(0, 10);
  },
};

/** S6: pages that Google shows people, but which tell search engines not to index them. */
export const noindexWithImpressions: Check = {
  id: "noindex-impressions",
  detect(site) {
    if (!site.gsc) return [];
    const impressions = new Map<string, number>();
    for (const p of site.gsc.pages) {
      const path = pathOf(site, p.page);
      if (path) impressions.set(path, (impressions.get(path) ?? 0) + p.impressions);
    }
    const bad = site.pages.filter(
      (p) =>
        (impressions.get(p.path) ?? 0) > 0 &&
        (/noindex/i.test(p.meta.metaRobots ?? "") ||
          /noindex/i.test(p.fetch.headers["x-robots-tag"] ?? "")),
    );
    if (bad.length === 0) return [];
    return [
      {
        checkId: "noindex-impressions",
        fingerprint: "noindex-impressions",
        severity: "high",
        title: `${bad.length} pages with search impressions are set to noindex`,
        affectedPaths: bad.map((b) => b.path).slice(0, 20),
        evidence: {
          pages: bad.slice(0, 20).map((b) => ({
            path: b.path,
            impressions: impressions.get(b.path),
            metaRobots: b.meta.metaRobots,
            xRobotsTag: b.fetch.headers["x-robots-tag"] ?? null,
          })),
        },
        expectedEffect:
          "If these pages should be found, removing noindex keeps them in search results. If not, nothing is lost by confirming it.",
        fixType: null,
        confidence: 0.7,
        trafficAtStake: bad.reduce((s, b) => s + (impressions.get(b.path) ?? 0), 0),
      },
    ];
  },
};
