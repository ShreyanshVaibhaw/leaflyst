import * as cheerio from "cheerio";

export interface PageMeta {
  title: string | null;
  titleCount: number;
  description: string | null;
  descriptionCount: number;
  canonical: string | null;
  canonicalCount: number;
  metaRobots: string | null;
  h1: string[];
  links: string[];
  scripts: string[];
  inlineScripts: string[];
}

export function parseMeta(html: string): PageMeta {
  const $ = cheerio.load(html);
  const titles = $("head title");
  const descriptions = $('meta[name="description" i]');
  const canonicals = $('link[rel="canonical" i]');
  return {
    title: titles.first().text().trim() || null,
    titleCount: titles.length,
    description: descriptions.first().attr("content")?.trim() || null,
    descriptionCount: descriptions.length,
    canonical: canonicals.first().attr("href")?.trim() || null,
    canonicalCount: canonicals.length,
    metaRobots:
      $('meta[name="robots" i]')
        .map((_, el) => $(el).attr("content") ?? "")
        .get()
        .join(", ") || null,
    h1: $("h1")
      .map((_, el) => $(el).text().trim())
      .get()
      .filter(Boolean),
    links: $("a[href]")
      .map((_, el) => $(el).attr("href") ?? "")
      .get(),
    scripts: $("script[src]")
      .map((_, el) => $(el).attr("src") ?? "")
      .get(),
    inlineScripts: $("script:not([src])")
      .map((_, el) => $(el).text())
      .get(),
  };
}

/**
 * Visible main text of a page: <main> or <article> if present, else <body>,
 * without scripts, styles, navigation, headers and footers.
 */
export function mainText(html: string): string {
  const $ = cheerio.load(html);
  $(
    "script, style, noscript, template, svg, nav, header, footer, [hidden], [aria-hidden=true]",
  ).remove();
  const root = $("main").first().length
    ? $("main").first()
    : $("article").first().length
      ? $("article").first()
      : $("body");
  return root.text().replace(/\s+/g, " ").trim();
}

export function words(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter((w) => w.length > 1);
}

/**
 * Share of the rendered page's words that the raw HTML does not contain.
 * Counts are per word with multiplicity, so repeated words are compared fairly.
 */
export function renderGap(rawHtml: string, renderedHtml: string) {
  const raw = words(mainText(rawHtml));
  const rendered = words(mainText(renderedHtml));
  if (rendered.length === 0) return { rawWords: raw.length, renderedWords: 0, gap: 0 };
  const available = new Map<string, number>();
  for (const w of raw) available.set(w, (available.get(w) ?? 0) + 1);
  let missing = 0;
  for (const w of rendered) {
    const n = available.get(w) ?? 0;
    if (n > 0) available.set(w, n - 1);
    else missing++;
  }
  return { rawWords: raw.length, renderedWords: rendered.length, gap: missing / rendered.length };
}

/** Same-site links as paths, without fragments. */
export function internalPaths(links: string[], pageUrl: string, origin: string): string[] {
  const out = new Set<string>();
  for (const href of links) {
    if (!href || href.startsWith("#") || /^(mailto|tel|javascript):/i.test(href)) continue;
    try {
      const u = new URL(href, pageUrl);
      if (u.origin !== origin) continue;
      out.add(u.pathname + u.search);
    } catch {
      // Ignore malformed hrefs.
    }
  }
  return [...out];
}
