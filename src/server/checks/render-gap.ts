import { fetchPage, mapLimit } from "@/server/crawl/fetch";
import { renderGap as gapOf } from "@/server/crawl/html";
import { BROWSER_UA } from "@/server/crawl/identities";
import { renderPage } from "@/server/crawl/render";
import { normalizeBase } from "@/server/crawl/crawl";
import type { Check } from "./types";

// A gap above this means most of the page is invisible to crawlers that do not run JavaScript.
export const GAP_THRESHOLD = 0.5;
const MIN_RENDERED_WORDS = 40;

/** Main content that only appears after JavaScript runs. AI crawlers do not run it. */
export const renderGap: Check = {
  id: "render-gap",
  detect(site) {
    const bad = site.renders.filter(
      (r) => !r.error && r.renderedWords >= MIN_RENDERED_WORDS && r.gap >= GAP_THRESHOLD,
    );
    if (bad.length === 0) return [];
    return [
      {
        checkId: "render-gap",
        fingerprint: "render-gap",
        severity: "high",
        title:
          bad.length === 1
            ? "1 page shows its content only after JavaScript runs"
            : `${bad.length} pages show their content only after JavaScript runs`,
        affectedPaths: bad.map((b) => b.path).slice(0, 10),
        evidence: { pages: bad.slice(0, 10) },
        expectedEffect:
          "GPTBot, ClaudeBot and PerplexityBot do not run JavaScript, so they will see the page content once it is in the HTML.",
        fixType: "F5",
        confidence: 0.85,
        trafficAtStake: 0,
      },
    ];
  },
  async verify({ baseUrl, paths, headers }) {
    const { origin } = normalizeBase(baseUrl);
    const results = await mapLimit(paths, 2, async (path) => {
      const raw = await fetchPage(`${origin}${path}`, { userAgent: BROWSER_UA, headers });
      const rendered = await renderPage(`${origin}${path}`, headers ?? {});
      return { path, ...gapOf(raw.body, rendered.html) };
    });
    const failures = results.filter((r) => r.gap >= GAP_THRESHOLD);
    return {
      passed: failures.length === 0,
      summary:
        failures.length === 0
          ? "The main content is now in the raw HTML."
          : `${failures.length} pages still depend on JavaScript.`,
      details: { results },
    };
  },
};
