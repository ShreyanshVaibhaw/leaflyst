import { fetchPage, mapLimit } from "@/server/crawl/fetch";
import type { PageMeta } from "@/server/crawl/html";
import { BROWSER_UA } from "@/server/crawl/identities";
import type { Check, FindingDraft } from "./types";

const TAG_PATTERNS: { name: string; test: (m: PageMeta) => boolean }[] = [
  {
    name: "Google tag (gtag.js)",
    test: (m) => m.scripts.some((s) => /googletagmanager\.com\/gtag\/js/.test(s)),
  },
  {
    name: "Google Tag Manager",
    test: (m) =>
      m.scripts.some((s) => /googletagmanager\.com\/gtm\.js/.test(s)) ||
      m.inlineScripts.some((s) => /googletagmanager\.com\/gtm\.js|GTM-[A-Z0-9]+/.test(s)),
  },
  {
    name: "Inline gtag config",
    test: (m) => m.inlineScripts.some((s) => /gtag\(\s*['"]config['"]/.test(s)),
  },
];

export function detectTags(meta: PageMeta): string[] {
  return TAG_PATTERNS.filter((p) => p.test(meta)).map((p) => p.name);
}

// The click ids ad platforms append. Losing one on a redirect breaks conversion tracking.
const PARAMS = { gclid: "leaflyst-test", utm_source: "leaflyst" };

/** Tracking on pages that receive paid clicks: tags present, click ids kept through redirects. */
export const tracking: Check = {
  id: "tracking",
  async detect(site) {
    const pages = new Map(site.pages.map((p) => [p.path, p]));
    const landing = site.paidLandingPaths.length > 0 ? site.paidLandingPaths : [];
    const drafts: FindingDraft[] = [];

    const untagged = landing.filter((l) => {
      const p = pages.get(l.path);
      return p && p.fetch.status === 200 && detectTags(p.meta).length === 0;
    });
    if (untagged.length > 0) {
      drafts.push({
        checkId: "tracking",
        fingerprint: "tracking:no-tags",
        severity: "high",
        title: `${untagged.length} paid landing pages load no analytics or conversion tag`,
        affectedPaths: untagged.map((u) => u.path).slice(0, 20),
        evidence: { kind: "no-tags", pages: untagged.slice(0, 20) },
        expectedEffect:
          "Conversions from these pages get recorded, so ad and search results can be measured.",
        fixType: null,
        confidence: 0.75,
        trafficAtStake: untagged.reduce((s, u) => s + u.clicks, 0),
      });
    }
    if (
      site.paidLandingPaths.length === 0 &&
      site.pages.length > 0 &&
      site.pages.every((p) => detectTags(p.meta).length === 0)
    ) {
      drafts.push({
        checkId: "tracking",
        fingerprint: "tracking:site-no-tags",
        severity: "low",
        title: "No Google analytics tag found on any crawled page",
        affectedPaths: ["/"],
        evidence: { kind: "site-no-tags", checked: site.pages.length },
        expectedEffect:
          "With a tag in place, Leaflyst can tie each change to visits and conversions, not only to search data.",
        fixType: null,
        confidence: 0.5,
        trafficAtStake: 0,
      });
    }

    const redirecting = landing
      .filter((l) => (pages.get(l.path)?.fetch.redirects.length ?? 0) > 0)
      .slice(0, 20);
    const lost = await mapLimit(redirecting, 4, async (l) => {
      const url = new URL(`${site.origin}${l.path}`);
      for (const [k, v] of Object.entries(PARAMS)) url.searchParams.set(k, v);
      const res = await fetchPage(url.toString(), { userAgent: BROWSER_UA, headers: site.headers });
      const final = new URL(res.finalUrl);
      const missing = Object.keys(PARAMS).filter((k) => !final.searchParams.has(k));
      return { path: l.path, finalUrl: res.finalUrl, missing };
    });
    const dropped = lost.filter((l) => l.missing.length > 0);
    if (dropped.length > 0) {
      drafts.push({
        checkId: "tracking",
        fingerprint: "tracking:params-dropped",
        severity: "high",
        title: `Redirects drop ad click ids on ${dropped.length} landing pages`,
        affectedPaths: dropped.map((d) => d.path),
        evidence: { kind: "params-dropped", pages: dropped },
        expectedEffect:
          "Click ids survive the redirect, so the ad platform can match conversions to clicks.",
        fixType: null,
        confidence: 0.85,
        trafficAtStake: 0,
      });
    }
    return drafts;
  },
};
