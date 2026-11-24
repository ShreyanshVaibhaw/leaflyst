import { fetchPage, mapLimit } from "@/server/crawl/fetch";
import { internalPaths, parseMeta } from "@/server/crawl/html";
import { BROWSER_UA } from "@/server/crawl/identities";
import { normalizeBase, toPath } from "@/server/crawl/crawl";
import type { Check, FindingDraft } from "./types";

interface BadLink {
  target: string;
  status: number | null;
  hops: number;
  finalPath: string | null;
  linkedFrom: string[];
}

/** Internal links that lead to errors or through more than one redirect. */
export const brokenLinks: Check = {
  id: "broken-links",
  detect(site) {
    const broken: BadLink[] = [];
    const chains: BadLink[] = [];
    for (const link of site.links) {
      const item = {
        target: link.path,
        status: link.status,
        hops: link.redirects.length,
        finalPath: link.finalPath,
        linkedFrom: link.linkedFrom.slice(0, 10),
      };
      if (link.status === null || link.status >= 400) broken.push(item);
      else if (link.redirects.length > 1) chains.push(item);
    }
    const drafts: FindingDraft[] = [];
    if (broken.length > 0) {
      drafts.push({
        checkId: "broken-links",
        fingerprint: "broken-links:errors",
        severity: broken.length > 5 ? "high" : "medium",
        title:
          broken.length === 1
            ? "1 internal link leads to an error"
            : `${broken.length} internal links lead to errors`,
        affectedPaths: [...new Set(broken.flatMap((b) => b.linkedFrom))].slice(0, 10),
        evidence: { kind: "errors", links: broken.slice(0, 30) },
        expectedEffect:
          "Visitors and crawlers stop hitting dead ends, and link value flows to live pages.",
        fixType: "F4",
        confidence: 0.95,
        trafficAtStake: 0,
      });
    }
    if (chains.length > 0) {
      drafts.push({
        checkId: "broken-links",
        fingerprint: "broken-links:chains",
        severity: "low",
        title:
          chains.length === 1
            ? "1 internal link goes through a redirect chain"
            : `${chains.length} internal links go through redirect chains`,
        affectedPaths: [...new Set(chains.flatMap((b) => b.linkedFrom))].slice(0, 10),
        evidence: { kind: "chains", links: chains.slice(0, 30) },
        expectedEffect:
          "Links point straight at the final page, so crawlers waste no requests on redirects.",
        fixType: "F4",
        confidence: 0.9,
        trafficAtStake: 0,
      });
    }
    return drafts;
  },
  async verify({ baseUrl, paths, evidence, headers }) {
    const { origin } = normalizeBase(baseUrl);
    const flagged = new Set(((evidence.links ?? []) as BadLink[]).map((l) => l.target));
    // Re-read the linking pages on this deployment and follow every link that was flagged before.
    const pages = await mapLimit(paths, 4, async (path) => {
      const res = await fetchPage(`${origin}${path}`, { userAgent: BROWSER_UA, headers });
      return internalPaths(parseMeta(res.body).links, res.finalUrl, origin).map(
        (l) => l.split("?")[0] ?? l,
      );
    });
    const stillLinked = [...new Set(pages.flat())].filter((t) => flagged.has(t));
    const results = await mapLimit(stillLinked, 5, async (target) => {
      const res = await fetchPage(`${origin}${target}`, { userAgent: BROWSER_UA, headers });
      return {
        target,
        status: res.status,
        hops: res.redirects.length,
        finalPath: toPath(res.finalUrl, origin),
      };
    });
    const failures = results.filter((r) => r.status === null || r.status >= 400 || r.hops > 1);
    return {
      passed: failures.length === 0,
      summary:
        failures.length === 0
          ? "No flagged link on the affected pages still errors or chains."
          : `${failures.length} flagged links still fail: ${failures
              .slice(0, 5)
              .map((f) => f.target)
              .join(", ")}`,
      details: { failures, rechecked: results.length },
    };
  },
};
