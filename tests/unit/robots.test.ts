import { describe, expect, it } from "vitest";
import { groupFor, isAllowed, parseRobots } from "@/server/crawl/robots";

describe("robots.txt", () => {
  const robots = parseRobots(`
# comment
User-agent: *
Disallow: /private
Allow: /private/open

User-agent: GPTBot
User-agent: ClaudeBot
Disallow: /

User-agent: PerplexityBot
Disallow: /blog
Allow: /blog$

Sitemap: https://example.com/sitemap.xml
`);

  it("collects sitemaps", () => {
    expect(robots.sitemaps).toEqual(["https://example.com/sitemap.xml"]);
  });

  it("groups consecutive user-agent lines", () => {
    expect(groupFor(robots, "claudebot")?.rules).toEqual([{ allow: false, pattern: "/" }]);
  });

  it("uses the specific group instead of *", () => {
    expect(isAllowed(robots, "GPTBot", "/").allowed).toBe(false);
    expect(isAllowed(robots, "Googlebot", "/").allowed).toBe(true);
  });

  it("longest match wins and allow wins a tie", () => {
    expect(isAllowed(robots, "Googlebot", "/private/x").allowed).toBe(false);
    expect(isAllowed(robots, "Googlebot", "/private/open/page").allowed).toBe(true);
    const tie = parseRobots("User-agent: *\nDisallow: /a\nAllow: /a");
    expect(isAllowed(tie, "x", "/a").allowed).toBe(true);
  });

  it("supports $ anchors and * wildcards", () => {
    expect(isAllowed(robots, "PerplexityBot", "/blog").allowed).toBe(true);
    expect(isAllowed(robots, "PerplexityBot", "/blog/post").allowed).toBe(false);
    const wild = parseRobots("User-agent: *\nDisallow: /*.pdf$");
    expect(isAllowed(wild, "x", "/files/a.pdf").allowed).toBe(false);
    expect(isAllowed(wild, "x", "/files/a.pdf?x=1").allowed).toBe(true);
  });

  it("treats an empty Disallow and a missing file as allow-all", () => {
    expect(isAllowed(parseRobots("User-agent: *\nDisallow:"), "x", "/").allowed).toBe(true);
    expect(isAllowed(parseRobots(""), "GPTBot", "/").allowed).toBe(true);
  });

  it("matches product tokens without case or version", () => {
    expect(isAllowed(robots, "gptbot", "/anything").allowed).toBe(false);
  });
});
