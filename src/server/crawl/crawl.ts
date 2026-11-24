import type {
  CrawledPage,
  CrawlerFetch,
  GscData,
  LinkTarget,
  RenderResult,
  SiteContext,
} from "@/server/checks/types";
import { fetchPage, mapLimit, type FetchResult } from "./fetch";
import { internalPaths, parseMeta, renderGap } from "./html";
import { BROWSER_UA, IDENTITIES } from "./identities";
import { renderPage } from "./render";
import { isAllowed, parseRobots } from "./robots";
import { readSitemaps } from "./sitemap";

export interface CrawlOptions {
  baseUrl: string;
  headers?: Record<string, string>;
  gsc?: GscData | null;
  paidLandingPaths?: SiteContext["paidLandingPaths"];
  maxPages?: number;
  // Pages fetched once per crawler identity and rendered in a browser, most important first.
  crawlerPages?: number;
  renderPages?: number;
  render?: boolean;
  concurrency?: number;
  onProgress?: (message: string) => void;
}

export function normalizeBase(baseUrl: string): { base: string; origin: string } {
  const u = new URL(baseUrl);
  return { base: `${u.origin}${u.pathname.replace(/\/$/, "")}`, origin: u.origin };
}

export function toPath(url: string, origin: string): string | null {
  try {
    const u = new URL(url, origin);
    if (u.origin !== origin) return null;
    return u.pathname || "/";
  } catch {
    return null;
  }
}

/**
 * Builds the page list: Search Console pages by impressions, then sitemap URLs,
 * then links found on the home page. Capped at maxPages.
 */
export function buildInventory(
  origin: string,
  gsc: GscData | null,
  sitemapUrls: string[],
  homeLinks: string[],
  maxPages: number,
): { path: string; sources: string[] }[] {
  const entries = new Map<string, Set<string>>();
  const add = (path: string | null, source: string) => {
    if (!path) return;
    const set = entries.get(path) ?? new Set<string>();
    set.add(source);
    entries.set(path, set);
  };
  add("/", "home");
  const byImpressions = [...(gsc?.pages ?? [])].sort((a, b) => b.impressions - a.impressions);
  for (const row of byImpressions) add(toPath(row.page, origin), "search-console");
  for (const url of sitemapUrls) add(toPath(url, origin), "sitemap");
  for (const path of homeLinks) add(path.split("?")[0] ?? path, "home-links");
  return [...entries.entries()].slice(0, maxPages).map(([path, s]) => ({ path, sources: [...s] }));
}

function headerNoindex(res: FetchResult): string | null {
  return res.headers["x-robots-tag"] ?? null;
}

export async function crawlSite(opts: CrawlOptions): Promise<SiteContext> {
  const { base, origin } = normalizeBase(opts.baseUrl);
  const headers = opts.headers ?? {};
  const concurrency = opts.concurrency ?? 6;
  const log = opts.onProgress ?? (() => {});

  log("reading robots.txt");
  const robotsRes = await fetchPage(`${origin}/robots.txt`, { userAgent: BROWSER_UA, headers });
  const robotsText = robotsRes.status === 200 ? robotsRes.body : null;
  const robots = parseRobots(robotsText ?? "");

  log("reading sitemaps");
  const sitemap = await readSitemaps(origin, robots.sitemaps, headers);

  const home = await fetchPage(`${base}/`, { userAgent: BROWSER_UA, headers });
  const homeLinks = internalPaths(parseMeta(home.body).links, home.finalUrl, origin);
  const inventory = buildInventory(
    origin,
    opts.gsc ?? null,
    sitemap.urls,
    homeLinks,
    opts.maxPages ?? 200,
  );

  log(`fetching ${inventory.length} pages`);
  const pages: CrawledPage[] = await mapLimit(inventory, concurrency, async ({ path }) => {
    const res =
      path === "/" ? home : await fetchPage(`${origin}${path}`, { userAgent: BROWSER_UA, headers });
    const meta = parseMeta(res.body);
    return {
      path,
      fetch: res,
      meta,
      internalLinks: internalPaths(meta.links, res.finalUrl, origin),
    };
  });

  // Crawler identities: robots verdict for every page, live fetches for the top pages.
  const crawlerTop = pages.slice(0, opts.crawlerPages ?? 30);
  log(`fetching ${crawlerTop.length} pages as each crawler`);
  const jobs = crawlerTop.flatMap((page) =>
    IDENTITIES.filter((i) => i.fetches).map((identity) => ({ page, identity })),
  );
  const fetched = await mapLimit(
    jobs,
    concurrency,
    async ({ page, identity }): Promise<CrawlerFetch> => {
      const res = await fetchPage(`${origin}${page.path}`, {
        userAgent: identity.userAgent,
        headers,
      });
      return {
        path: page.path,
        identityId: identity.id,
        status: res.status,
        redirects: res.redirects,
        robotsAllowed: isAllowed(robots, identity.robotsToken, page.path).allowed,
        xRobotsTag: headerNoindex(res),
        metaRobots: parseMeta(res.body).metaRobots,
        bytes: res.body.length,
        error: res.error,
      };
    },
  );
  // The plain browser fetch, kept so a crawler-only error can be told apart from a page that fails for everyone.
  const browserRows: CrawlerFetch[] = pages.map((page) => ({
    path: page.path,
    identityId: "browser",
    status: page.fetch.status,
    redirects: page.fetch.redirects,
    robotsAllowed: true,
    xRobotsTag: page.fetch.headers["x-robots-tag"] ?? null,
    metaRobots: page.meta.metaRobots,
    bytes: page.fetch.body.length,
    error: page.fetch.error,
  }));
  const verdictOnly: CrawlerFetch[] = pages.flatMap((page) =>
    IDENTITIES.filter((i) => !i.fetches || !crawlerTop.includes(page)).map((identity) => ({
      path: page.path,
      identityId: identity.id,
      status: null,
      redirects: [],
      robotsAllowed: isAllowed(robots, identity.robotsToken, page.path).allowed,
      xRobotsTag: null,
      metaRobots: null,
      bytes: 0,
      error: null,
    })),
  );

  let renders: RenderResult[] = [];
  if (opts.render !== false) {
    const toRender = pages.filter((p) => p.fetch.status === 200).slice(0, opts.renderPages ?? 20);
    log(`rendering ${toRender.length} pages`);
    renders = await mapLimit(toRender, 3, async (page) => {
      const rendered = await renderPage(`${origin}${page.path}`, headers);
      if (rendered.error)
        return { path: page.path, rawWords: 0, renderedWords: 0, gap: 0, error: rendered.error };
      return { path: page.path, ...renderGap(page.fetch.body, rendered.html), error: null };
    });
  }

  // Internal link targets not already fetched.
  const known = new Map(pages.map((p) => [p.path, p]));
  const linkedFrom = new Map<string, Set<string>>();
  for (const page of pages) {
    for (const target of page.internalLinks) {
      const path = target.split("?")[0] ?? target;
      const set = linkedFrom.get(path) ?? new Set<string>();
      set.add(page.path);
      linkedFrom.set(path, set);
    }
  }
  const targets = [...linkedFrom.keys()].slice(0, 400);
  log(`checking ${targets.length} internal links`);
  const links: LinkTarget[] = await mapLimit(targets, concurrency, async (path) => {
    const page = known.get(path);
    const res =
      page?.fetch ?? (await fetchPage(`${origin}${path}`, { userAgent: BROWSER_UA, headers }));
    return {
      path,
      status: res.status,
      redirects: res.redirects.map((u) => toPath(u, origin) ?? u),
      finalPath: toPath(res.finalUrl, origin),
      linkedFrom: [...(linkedFrom.get(path) ?? [])],
    };
  });

  return {
    baseUrl: base,
    origin,
    headers,
    robotsStatus: robotsRes.status,
    robotsText,
    robots,
    sitemap,
    pages,
    crawlerFetches: [...fetched, ...verdictOnly, ...browserRows],
    renders,
    links,
    gsc: opts.gsc ?? null,
    paidLandingPaths: opts.paidLandingPaths ?? [],
  };
}
