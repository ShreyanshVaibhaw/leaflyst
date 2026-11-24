import { IDENTITIES, visibilityCritical } from "@/server/crawl/identities";
import type { Check } from "./types";

/**
 * Pages that answer a browser but refuse a crawler identity.
 * Our requests come from our own servers, so a firewall that checks crawler IP
 * addresses can treat us differently from the real crawler. This is "possible",
 * to be confirmed in the host's logs, never "certain".
 */
export const crawlerStatus: Check = {
  id: "crawler-status",
  detect(site) {
    const browserOk = new Set(site.pages.filter((p) => p.fetch.status === 200).map((p) => p.path));
    const critical = new Set(IDENTITIES.filter(visibilityCritical).map((i) => i.id));
    const refused = site.crawlerFetches.filter(
      (f) =>
        f.status !== null &&
        f.robotsAllowed &&
        browserOk.has(f.path) &&
        (f.status >= 400 || f.error) &&
        critical.has(f.identityId),
    );
    if (refused.length === 0) return [];
    const identities = [...new Set(refused.map((r) => r.identityId))];
    return [
      {
        checkId: "crawler-status",
        fingerprint: `crawler-status:${identities.sort().join(",")}`,
        severity: "medium",
        title: `Possible block: ${identities.join(", ")} got errors where a browser did not`,
        affectedPaths: [...new Set(refused.map((r) => r.path))].slice(0, 20),
        evidence: {
          certainty: "possible",
          note: "Seen from Leaflyst's servers. Confirm in your host or CDN logs before changing anything.",
          responses: refused
            .slice(0, 30)
            .map((r) => ({ path: r.path, identity: r.identityId, status: r.status })),
        },
        expectedEffect:
          "If a firewall rule is blocking these crawlers, allowing them makes the pages eligible for their results.",
        fixType: null,
        confidence: 0.4,
        trafficAtStake: 0,
      },
    ];
  },
};
