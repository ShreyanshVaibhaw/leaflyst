import { describe, expect, it } from "vitest";
import { internalPaths, mainText, parseMeta, renderGap } from "@/server/crawl/html";
import { scoreFinding } from "@/server/findings/score";
import { termCoverage } from "@/server/checks/search-console";

describe("html helpers", () => {
  it("reads titles, descriptions, canonicals and robots meta", () => {
    const meta =
      parseMeta(`<html><head><title> Hi there </title><meta name="Description" content="d">
      <link rel="canonical" href="/x"><meta name="robots" content="noindex"></head><body><h1>A</h1><a href="/b">b</a></body></html>`);
    expect(meta).toMatchObject({
      title: "Hi there",
      description: "d",
      canonical: "/x",
      metaRobots: "noindex",
      h1: ["A"],
      links: ["/b"],
    });
  });

  it("main text skips nav, footer and scripts", () => {
    const text = mainText(
      "<body><nav>menu</nav><main>Real words here<script>x()</script></main><footer>f</footer></body>",
    );
    expect(text).toBe("Real words here");
  });

  it("render gap is high when content is added by JavaScript", () => {
    const raw = "<body><main><h1>Shop</h1><p>Loading</p></main></body>";
    const rendered =
      "<body><main><h1>Shop</h1><ul><li>Speckled morning mug glaze handle</li><li>Deep ramen bowl celadon</li></ul></main></body>";
    expect(renderGap(raw, rendered).gap).toBeGreaterThan(0.8);
    expect(renderGap(rendered, rendered).gap).toBe(0);
  });

  it("internal paths drop other origins, fragments and mailto", () => {
    expect(
      internalPaths(
        ["/a", "#top", "mailto:x@y.z", "https://other.com/b", "https://s.com/c?d=1", "e"],
        "https://s.com/dir/page",
        "https://s.com",
      ),
    ).toEqual(["/a", "/c?d=1", "/dir/e"]);
  });
});

describe("scoring", () => {
  it("ranks severity, traffic and confidence", () => {
    const base = { severity: "high" as const, trafficAtStake: 0, confidence: 1, fixType: null };
    expect(scoreFinding({ ...base, severity: "critical" })).toBeGreaterThan(scoreFinding(base));
    expect(scoreFinding({ ...base, trafficAtStake: 10_000 })).toBeGreaterThan(scoreFinding(base));
    expect(scoreFinding({ ...base, confidence: 0.4 })).toBeLessThan(scoreFinding(base));
  });

  it("term coverage ignores stopwords", () => {
    expect(termCoverage("best handmade mugs", "Handmade mugs and bowls")).toBe(1);
    expect(termCoverage("ramen bowl", "Shop")).toBe(0);
  });
});
