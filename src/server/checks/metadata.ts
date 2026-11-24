import { fetchPage, mapLimit } from "@/server/crawl/fetch";
import { parseMeta, type PageMeta } from "@/server/crawl/html";
import { BROWSER_UA } from "@/server/crawl/identities";
import { normalizeBase } from "@/server/crawl/crawl";
import type { Check, FindingDraft, SiteContext } from "./types";

export const TITLE_MIN = 15;
export const TITLE_MAX = 65;
export const DESCRIPTION_MAX = 160;

type Kind =
  "title-missing" | "title-duplicate" | "title-length" | "description-missing" | "canonical";

function pageProblems(meta: PageMeta, path: string, origin: string): Kind[] {
  const out: Kind[] = [];
  if (!meta.title) out.push("title-missing");
  else if (meta.title.length < TITLE_MIN || meta.title.length > TITLE_MAX) out.push("title-length");
  if (!meta.description) out.push("description-missing");
  if (meta.canonicalCount > 1) out.push("canonical");
  else if (meta.canonical) {
    try {
      const c = new URL(meta.canonical, origin);
      if (c.origin !== origin && !meta.canonical.startsWith("/")) out.push("canonical");
      else if (c.pathname !== path) out.push("canonical");
    } catch {
      out.push("canonical");
    }
  }
  return out;
}

function impressions(site: SiteContext, path: string): number {
  return (site.gsc?.pages ?? [])
    .filter((p) => new URL(p.page, site.origin).pathname === path)
    .reduce((s, p) => s + p.impressions, 0);
}

const LABEL: Record<Kind, { title: string; severity: FindingDraft["severity"]; effect: string }> = {
  "title-missing": {
    title: "Pages with no title",
    severity: "high",
    effect: "Search engines and AI answers get a clear name for each page instead of guessing one.",
  },
  "title-duplicate": {
    title: "Pages share the same title",
    severity: "medium",
    effect:
      "Each page gets a distinct title, so search engines stop treating them as the same thing.",
  },
  "title-length": {
    title: "Titles that are too short or too long",
    severity: "low",
    effect: "Titles fit in search results without being cut off.",
  },
  "description-missing": {
    title: "Pages with no meta description",
    severity: "low",
    effect: "Search results show a description written for the page instead of a random snippet.",
  },
  canonical: {
    title: "Wrong or conflicting canonical tags",
    severity: "high",
    effect:
      "Each page points search engines at itself, so its rankings are not credited elsewhere.",
  },
};

/** Titles, meta descriptions and canonical tags in the raw HTML. */
export const metadata: Check = {
  id: "metadata",
  detect(site) {
    // Redirected URLs are judged at their destination, not twice.
    const ok = site.pages.filter(
      (p) =>
        p.fetch.status === 200 &&
        p.fetch.redirects.length === 0 &&
        !/noindex/i.test(p.meta.metaRobots ?? ""),
    );
    const byKind = new Map<Kind, string[]>();
    for (const page of ok) {
      for (const kind of pageProblems(page.meta, page.path, site.origin)) {
        byKind.set(kind, [...(byKind.get(kind) ?? []), page.path]);
      }
    }
    const drafts: FindingDraft[] = [];
    for (const [kind, paths] of byKind) {
      drafts.push({
        checkId: "metadata",
        fingerprint: `metadata:${kind}`,
        severity: LABEL[kind].severity,
        title: `${LABEL[kind].title} (${paths.length})`,
        affectedPaths: paths.slice(0, 10),
        evidence: {
          kind,
          pages: paths.slice(0, 10).map((path) => {
            const meta = ok.find((p) => p.path === path)?.meta;
            return {
              path,
              title: meta?.title ?? null,
              description: meta?.description ?? null,
              canonical: meta?.canonical ?? null,
            };
          }),
          total: paths.length,
        },
        expectedEffect: LABEL[kind].effect,
        fixType: "F2",
        confidence: 0.95,
        trafficAtStake: paths.reduce((s, p) => s + impressions(site, p), 0),
      });
    }
    // Duplicate titles, one finding per group of pages sharing a title.
    const byTitle = new Map<string, string[]>();
    for (const page of ok) {
      if (!page.meta.title) continue;
      const key = page.meta.title.toLowerCase();
      byTitle.set(key, [...(byTitle.get(key) ?? []), page.path]);
    }
    for (const [title, paths] of byTitle) {
      if (paths.length < 2) continue;
      const shown = ok.find((p) => p.path === paths[0])?.meta.title ?? title;
      drafts.push({
        checkId: "metadata",
        fingerprint: `metadata:title-duplicate:${title}`,
        severity: "medium",
        title: `${paths.length} pages share the title "${shown.slice(0, 60)}"`,
        affectedPaths: paths.slice(0, 10),
        evidence: {
          kind: "title-duplicate",
          title,
          pages: paths.slice(0, 10).map((path) => ({ path })),
        },
        expectedEffect: LABEL["title-duplicate"].effect,
        fixType: "F2",
        confidence: 0.9,
        trafficAtStake: paths.reduce((s, p) => s + impressions(site, p), 0),
      });
    }
    return drafts;
  },
  async verify({ baseUrl, paths, evidence, headers }) {
    const { origin } = normalizeBase(baseUrl);
    const kind = evidence.kind as Kind;
    const metas = await mapLimit(paths, 4, async (path) => {
      const res = await fetchPage(`${origin}${path}`, { userAgent: BROWSER_UA, headers });
      return { path, status: res.status, meta: parseMeta(res.body) };
    });
    const failures: string[] = [];
    for (const { path, status, meta } of metas) {
      if (status !== 200) {
        failures.push(`${path} returned ${status}`);
        continue;
      }
      if (kind === "title-duplicate") continue;
      if (pageProblems(meta, path, origin).includes(kind)) failures.push(`${path}: ${kind}`);
    }
    if (kind === "title-duplicate") {
      const titles = metas.map((m) => (m.meta.title ?? "").toLowerCase());
      if (titles.some((t) => !t)) failures.push("a page has no title");
      if (new Set(titles).size !== titles.length) failures.push("titles are still shared");
    }
    return {
      passed: failures.length === 0,
      summary:
        failures.length === 0
          ? `All ${paths.length} pages now pass.`
          : failures.slice(0, 5).join("; "),
      details: {
        failures,
        pages: metas.map((m) => ({
          path: m.path,
          title: m.meta.title,
          description: m.meta.description,
          canonical: m.meta.canonical,
        })),
      },
    };
  },
};
