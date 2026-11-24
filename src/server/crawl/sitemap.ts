import * as cheerio from "cheerio";
import { fetchPage } from "./fetch";
import { BROWSER_UA } from "./identities";

export interface SitemapResult {
  found: boolean;
  urls: string[];
  sources: string[];
  errors: string[];
}

/**
 * Reads sitemaps listed in robots.txt, falling back to /sitemap.xml.
 * Follows sitemap index files one level deep.
 */
export async function readSitemaps(
  origin: string,
  declared: string[],
  headers: Record<string, string> = {},
  limit = 2000,
): Promise<SitemapResult> {
  const queue = declared.length > 0 ? [...declared] : [`${origin}/sitemap.xml`];
  const seen = new Set<string>();
  const urls = new Set<string>();
  const sources: string[] = [];
  const errors: string[] = [];

  while (queue.length > 0 && seen.size < 20 && urls.size < limit) {
    const loc = queue.shift() as string;
    if (seen.has(loc)) continue;
    seen.add(loc);
    let res = await fetchPage(loc, { userAgent: BROWSER_UA, headers });
    // A sitemap declared on another host (production, seen from a preview) is read from this host instead.
    if (res.status !== 200 && URL.canParse(loc) && new URL(loc).origin !== origin) {
      const u = new URL(loc);
      res = await fetchPage(`${origin}${u.pathname}${u.search}`, {
        userAgent: BROWSER_UA,
        headers,
      });
    }
    if (res.status !== 200) {
      errors.push(`${loc} returned ${res.status ?? res.error}`);
      continue;
    }
    const $ = cheerio.load(res.body, { xml: true });
    const childSitemaps = $("sitemapindex > sitemap > loc")
      .map((_, el) => $(el).text().trim())
      .get();
    if (childSitemaps.length > 0) {
      queue.push(...childSitemaps);
      sources.push(loc);
      continue;
    }
    const locs = $("urlset > url > loc")
      .map((_, el) => $(el).text().trim())
      .get();
    if (locs.length === 0) {
      errors.push(`${loc} has no <url> entries`);
      continue;
    }
    sources.push(loc);
    for (const u of locs) urls.add(u);
  }
  return { found: sources.length > 0, urls: [...urls].slice(0, limit), sources, errors };
}
