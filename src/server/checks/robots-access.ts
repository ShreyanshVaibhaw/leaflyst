import { fetchPage } from "@/server/crawl/fetch";
import { BROWSER_UA, IDENTITIES, visibilityCritical } from "@/server/crawl/identities";
import { isAllowed, parseRobots } from "@/server/crawl/robots";
import { normalizeBase } from "@/server/crawl/crawl";
import type { Check, FindingDraft, SiteContext } from "./types";

function impressionsFor(site: SiteContext, paths: string[]): number {
  const set = new Set(paths);
  return (site.gsc?.pages ?? [])
    .filter((p) => set.has(new URL(p.page, site.origin).pathname))
    .reduce((sum, p) => sum + p.impressions, 0);
}

/**
 * robots.txt rules that keep search or AI search crawlers away from pages.
 * Training crawlers are left to the owner and only shown in the crawler report.
 */
export const robotsAccess: Check = {
  id: "robots-access",
  detect(site) {
    const critical = IDENTITIES.filter(visibilityCritical);
    const blocked: { identity: string; token: string; paths: string[] }[] = [];
    for (const identity of critical) {
      const paths = site.pages
        .map((p) => p.path)
        .filter((path) => !isAllowed(site.robots, identity.robotsToken, path).allowed);
      if (paths.length > 0)
        blocked.push({ identity: identity.id, token: identity.robotsToken, paths });
    }
    if (blocked.length === 0) return [];
    const allPaths = [...new Set(blocked.flatMap((b) => b.paths))];
    const homeBlocked = allPaths.includes("/");
    const draft: FindingDraft = {
      checkId: "robots-access",
      fingerprint: `robots-access:${blocked
        .map((b) => b.token)
        .sort()
        .join(",")}`,
      severity: homeBlocked ? "critical" : "high",
      title: `robots.txt blocks ${blocked.map((b) => b.token).join(", ")}`,
      affectedPaths: allPaths.slice(0, 50),
      evidence: {
        blocked: blocked.map((b) => ({ ...b, paths: b.paths.slice(0, 20), count: b.paths.length })),
        robotsTxt: site.robotsText?.slice(0, 4000) ?? null,
      },
      expectedEffect:
        "These crawlers can read the pages again, so the site becomes eligible to appear in their search results and AI answers.",
      fixType: "F1",
      confidence: 1,
      trafficAtStake: impressionsFor(site, allPaths),
    };
    return [draft];
  },
  async verify({ baseUrl, evidence, headers }) {
    const { origin } = normalizeBase(baseUrl);
    const res = await fetchPage(`${origin}/robots.txt`, { userAgent: BROWSER_UA, headers });
    const robots = parseRobots(res.status === 200 ? res.body : "");
    const blocked = (evidence.blocked as { token: string; paths: string[] }[] | undefined) ?? [];
    const stillBlocked = blocked.flatMap((b) =>
      b.paths.filter((p) => !isAllowed(robots, b.token, p).allowed).map((p) => `${b.token} ${p}`),
    );
    return {
      passed: stillBlocked.length === 0,
      summary:
        stillBlocked.length === 0
          ? "robots.txt now allows every crawler on the affected pages."
          : `Still blocked: ${stillBlocked.slice(0, 5).join("; ")}`,
      details: { robotsStatus: res.status, stillBlocked },
    };
  },
};
