import { fetchPage, mapLimit } from "@/server/crawl/fetch";
import { BROWSER_UA } from "@/server/crawl/identities";
import { parseRobots } from "@/server/crawl/robots";
import { readSitemaps } from "@/server/crawl/sitemap";
import { normalizeBase, toPath } from "@/server/crawl/crawl";
import { parseMeta } from "@/server/crawl/html";
import type { Check, FindingDraft } from "./types";

/** Sitemap present, declared in robots.txt, and listing the right pages. */
export const sitemap: Check = {
  id: "sitemap",
  detect(site) {
    const indexable = site.pages
      .filter((p) => p.fetch.status === 200 && p.fetch.redirects.length === 0)
      .filter(
        (p) =>
          !/noindex/i.test(p.meta.metaRobots ?? "") &&
          !/noindex/i.test(p.fetch.headers["x-robots-tag"] ?? ""),
      )
      .map((p) => p.path);

    if (!site.sitemap.found) {
      return [
        {
          checkId: "sitemap",
          fingerprint: "sitemap:missing",
          severity: "medium",
          title: "The site has no sitemap",
          affectedPaths: ["/sitemap.xml"],
          evidence: {
            kind: "missing",
            expectedPaths: indexable.slice(0, 200),
            errors: site.sitemap.errors,
          },
          expectedEffect:
            "Search and AI crawlers get a complete list of pages, so new and deep pages are found sooner.",
          fixType: "F3",
          confidence: 0.95,
          trafficAtStake: 0,
        },
      ];
    }

    const drafts: FindingDraft[] = [];
    if (site.robots.sitemaps.length === 0) {
      drafts.push({
        checkId: "sitemap",
        fingerprint: "sitemap:not-in-robots",
        severity: "low",
        title: "robots.txt does not point to the sitemap",
        affectedPaths: ["/robots.txt"],
        evidence: { kind: "not-in-robots", sitemaps: site.sitemap.sources },
        expectedEffect:
          "Crawlers that read robots.txt find the sitemap without guessing its address.",
        fixType: "F3",
        confidence: 0.9,
        trafficAtStake: 0,
      });
    }
    // Compared by path, so a sitemap written for the production host still matches on a preview.
    const listed = new Set(
      site.sitemap.urls.filter((u) => URL.canParse(u)).map((u) => new URL(u).pathname),
    );
    const crawled = new Map(site.pages.map((p) => [p.path, p]));
    const badListed = [...listed].filter((path) => {
      const page = crawled.get(path);
      return (
        page &&
        (page.fetch.status !== 200 ||
          page.fetch.redirects.length > 0 ||
          /noindex/i.test(page.meta.metaRobots ?? ""))
      );
    });
    const withImpressions = new Set(
      (site.gsc?.pages ?? [])
        .filter((p) => p.impressions > 0)
        .map((p) => toPath(p.page, site.origin)),
    );
    const missing = indexable.filter(
      (p) => !listed.has(p) && (withImpressions.has(p) || site.gsc === null),
    );
    if (badListed.length > 0 || missing.length > 0) {
      drafts.push({
        checkId: "sitemap",
        fingerprint: "sitemap:stale",
        severity: "medium",
        title: `Sitemap is out of date (${badListed.length} bad entries, ${missing.length} pages missing)`,
        affectedPaths: [...badListed, ...missing].slice(0, 50),
        evidence: {
          kind: "stale",
          badListed: badListed.slice(0, 50),
          missing: missing.slice(0, 50),
          sitemaps: site.sitemap.sources,
        },
        expectedEffect: "The sitemap lists only live pages and includes every page that matters.",
        fixType: "F3",
        confidence: 0.85,
        trafficAtStake: 0,
      });
    }
    return drafts;
  },
  async verify({ baseUrl, evidence, headers }) {
    const { origin } = normalizeBase(baseUrl);
    const robotsRes = await fetchPage(`${origin}/robots.txt`, { userAgent: BROWSER_UA, headers });
    const robots = parseRobots(robotsRes.status === 200 ? robotsRes.body : "");
    // Sitemap URLs in robots.txt are absolute production URLs; check the preview's own copy.
    const declared = robots.sitemaps.map((s) => {
      const path = toPath(s, new URL(s).origin) ?? "/sitemap.xml";
      return `${origin}${path}`;
    });
    const result = await readSitemaps(origin, declared, headers);
    const failures: string[] = [];
    if (!result.found) failures.push("no sitemap found");
    if (evidence.kind === "not-in-robots" && robots.sitemaps.length === 0)
      failures.push("robots.txt still has no Sitemap line");
    const listed = new Set(result.urls.map((u) => new URL(u).pathname));
    const expected = ((evidence.expectedPaths ?? evidence.missing ?? []) as string[]).slice(0, 200);
    const stillMissing = expected.filter((p) => !listed.has(p));
    if (stillMissing.length > 0)
      failures.push(`missing from sitemap: ${stillMissing.slice(0, 5).join(", ")}`);
    // Every listed URL must load on this deployment.
    const checks = await mapLimit([...listed].slice(0, 100), 5, async (path) => {
      const res = await fetchPage(`${origin}${path}`, { userAgent: BROWSER_UA, headers });
      return {
        path,
        ok:
          res.status === 200 &&
          res.redirects.length === 0 &&
          !/noindex/i.test(parseMeta(res.body).metaRobots ?? ""),
      };
    });
    const bad = checks.filter((c) => !c.ok).map((c) => c.path);
    if (bad.length > 0)
      failures.push(`sitemap lists pages that do not load cleanly: ${bad.slice(0, 5).join(", ")}`);
    return {
      passed: failures.length === 0,
      summary:
        failures.length === 0
          ? `Sitemap lists ${listed.size} pages and each returns 200.`
          : failures.join("; "),
      details: { failures, listed: listed.size, sources: result.sources },
    };
  },
};
