import type { FetchResult } from "@/server/crawl/fetch";
import type { PageMeta } from "@/server/crawl/html";
import type { ParsedRobots } from "@/server/crawl/robots";
import type { SitemapResult } from "@/server/crawl/sitemap";

export type Severity = "critical" | "high" | "medium" | "low";
export type FixType = "F1" | "F2" | "F3" | "F4" | "F5" | "F6";

export interface CrawledPage {
  path: string;
  fetch: FetchResult;
  meta: PageMeta;
  internalLinks: string[];
}

export interface CrawlerFetch {
  path: string;
  identityId: string;
  status: number | null;
  redirects: string[];
  robotsAllowed: boolean;
  xRobotsTag: string | null;
  metaRobots: string | null;
  bytes: number;
  error: string | null;
}

export interface RenderResult {
  path: string;
  rawWords: number;
  renderedWords: number;
  gap: number;
  error: string | null;
}

export interface LinkTarget {
  path: string;
  status: number | null;
  redirects: string[];
  finalPath: string | null;
  linkedFrom: string[];
}

export interface GscPageRow {
  page: string;
  clicks: number;
  impressions: number;
  position: number | null;
}

export interface GscQueryRow extends GscPageRow {
  query: string;
}

export interface GscData {
  pages: GscPageRow[];
  queries: GscQueryRow[];
}

/** Everything a check needs to look at a site. Built once per audit. */
export interface SiteContext {
  baseUrl: string;
  origin: string;
  headers: Record<string, string>;
  robotsStatus: number | null;
  robotsText: string | null;
  robots: ParsedRobots;
  sitemap: SitemapResult;
  pages: CrawledPage[];
  crawlerFetches: CrawlerFetch[];
  renders: RenderResult[];
  links: LinkTarget[];
  gsc: GscData | null;
  // Landing pages that received paid clicks, from ads imports. Paths only.
  paidLandingPaths: { path: string; clicks: number; cost: number }[];
}

export interface FindingDraft {
  checkId: string;
  fingerprint: string;
  severity: Severity;
  title: string;
  affectedPaths: string[];
  evidence: Record<string, unknown>;
  expectedEffect: string;
  fixType: FixType | null;
  // 0 to 1: how sure the check is that this is a real problem.
  confidence: number;
  // Impressions or clicks that the problem puts at risk, when known.
  trafficAtStake: number;
}

export interface VerifyInput {
  baseUrl: string;
  paths: string[];
  evidence: Record<string, unknown>;
  headers?: Record<string, string>;
}

export interface VerifyResult {
  passed: boolean;
  summary: string;
  details: Record<string, unknown>;
}

export interface Check {
  id: string;
  // A check without verify cannot have a fix type.
  detect(site: SiteContext): FindingDraft[] | Promise<FindingDraft[]>;
  verify?(input: VerifyInput): Promise<VerifyResult>;
}
