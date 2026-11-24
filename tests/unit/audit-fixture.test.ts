import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { crawlSite } from "@/server/crawl/crawl";
import { closeBrowser } from "@/server/crawl/render";
import { detectAll, verifyFinding } from "@/server/checks/registry";
import type { FindingDraft, SiteContext } from "@/server/checks/types";
import { FIXTURE_DIR, serveSite } from "../fixture-server";

// Crawls the real demo site and expects every planted problem to be found.
describe("audit of the demo site", () => {
  let server: Awaited<ReturnType<typeof serveSite>>;
  let site: SiteContext;
  let drafts: FindingDraft[];

  beforeAll(async () => {
    server = await serveSite(FIXTURE_DIR, 3101);
    site = await crawlSite({ baseUrl: server.url, gsc: null });
    ({ drafts } = await detectAll(site));
  }, 180_000);

  afterAll(async () => {
    await closeBrowser();
    server?.stop();
  });

  const find = (fp: string) => drafts.find((d) => d.fingerprint.startsWith(fp));

  it("finds the robots.txt block on search crawlers but not on GPTBot alone", () => {
    const f = find("robots-access");
    expect(f?.title).toContain("OAI-SearchBot");
    expect(f?.title).toContain("PerplexityBot");
    expect(f?.title).not.toContain("GPTBot");
    expect(f?.severity).toBe("critical");
    // GPTBot is still visible in the crawler report.
    expect(site.crawlerFetches.some((c) => c.identityId === "gptbot" && !c.robotsAllowed)).toBe(
      true,
    );
  });

  it("finds the missing sitemap", () => {
    expect(find("sitemap:missing")?.fixType).toBe("F3");
  });

  it("finds the page with no title and the shared blog title", () => {
    expect(find("metadata:title-missing")?.affectedPaths).toContain("/about");
    const dup = find("metadata:title-duplicate:");
    expect(dup?.affectedPaths.sort()).toEqual(["/blog/first-post", "/blog/second-post"]);
  });

  it("finds the broken link and the redirect chain", () => {
    const errors = find("broken-links:errors");
    expect(JSON.stringify(errors?.evidence)).toContain("/old-page");
    const chains = find("broken-links:chains");
    expect(JSON.stringify(chains?.evidence)).toContain("/legacy");
  });

  it("finds the page that needs JavaScript", () => {
    expect(find("render-gap")?.affectedPaths).toContain("/products");
  });

  it("flags the missing analytics tag", () => {
    expect(find("tracking:site-no-tags")).toBeTruthy();
  });

  it("verify fails on the unfixed site for every fixable finding", async () => {
    for (const d of drafts.filter((x) => x.fixType && x.fixType !== "F5")) {
      const result = await verifyFinding(d.checkId, {
        baseUrl: server.url,
        paths: d.affectedPaths,
        evidence: d.evidence,
      });
      expect(result.passed, `${d.fingerprint} should fail before the fix`).toBe(false);
    }
  }, 60_000);
});
