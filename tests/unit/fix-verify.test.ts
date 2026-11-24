import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { crawlSite } from "@/server/crawl/crawl";
import { closeBrowser } from "@/server/crawl/render";
import { detectAll, verifyFinding } from "@/server/checks/registry";
import type { FindingDraft } from "@/server/checks/types";
import { copyFixture, FIXTURE_DIR, serveSite } from "../fixture-server";

/**
 * The loop without the agent: find problems on the demo site, apply the changes a
 * correct fix would make to a copy of it, build and serve that copy as the
 * "preview", and expect every finding's own verify to pass there.
 */
const FIXED_DIR = path.resolve(FIXTURE_DIR, "../.fixed-site");

function write(rel: string, content: string) {
  const file = path.join(FIXED_DIR, rel);
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, content);
}

function applyFixes() {
  // F1 and F3: unblock search crawlers (GPTBot stays blocked, that is the owner's choice) and declare the sitemap.
  write(
    "app/robots.ts",
    `import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }, { userAgent: "GPTBot", disallow: "/" }],
    sitemap: "https://demo-ceramics.example/sitemap.xml",
  };
}
`,
  );
  write(
    "app/sitemap.ts",
    `import type { MetadataRoute } from "next";
const BASE = "https://demo-ceramics.example";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/about", "/blog/first-post", "/blog/second-post", "/products", "/landing"].map((p) => ({ url: BASE + p }));
}
`,
  );
  // F2: titles and descriptions.
  write(
    "app/about/page.tsx",
    `import type { Metadata } from "next";
export const metadata: Metadata = { title: "About the studio - Demo Ceramics", description: "A two person ceramics studio making every piece by hand." };
export default function About() {
  return (<><h1>About the studio</h1><p>Demo Ceramics is a two person studio. We started with a secondhand kiln and a single wheel.</p></>);
}
`,
  );
  for (const [slug, title, body] of [
    [
      "first-post",
      "How we glaze our mugs",
      "We dip each mug twice, first in a liner glaze and then in the outer colour.",
    ],
    [
      "second-post",
      "Caring for stoneware",
      "Stoneware is dishwasher safe, but sudden temperature changes can crack it.",
    ],
  ] as const) {
    write(
      `app/blog/${slug}/page.tsx`,
      `import type { Metadata } from "next";
export const metadata: Metadata = { title: "${title} - Demo Ceramics", description: "${body}" };
export default function Post() {
  return (<article><h1>${title}</h1><p>${body}</p></article>);
}
`,
    );
  }
  // F4: the dead link is removed and the chained link points at its destination.
  write(
    "app/page.tsx",
    `import type { Metadata } from "next";
export const metadata: Metadata = { title: "Demo Ceramics - Handmade mugs and bowls", description: "Handmade stoneware mugs, bowls and plates, thrown and glazed in a small studio." };
export default function Home() {
  return (<><h1>Handmade ceramics for everyday use</h1>
    <p>Every mug and bowl is thrown on the wheel, trimmed by hand and fired twice.</p>
    <ul>
      <li><a href="/about">About the studio</a></li>
      <li><a href="/blog/first-post">How we glaze our mugs</a></li>
      <li><a href="/blog/second-post">Caring for stoneware</a></li>
      <li><a href="/products">Shop the collection</a></li>
      <li><a href="/about">Studio history</a></li>
      <li><a href="/landing">Spring sale</a></li>
    </ul></>);
}
`,
  );
  // F5: the product list is rendered on the server.
  write(
    "app/products/page.tsx",
    `import type { Metadata } from "next";
export const metadata: Metadata = { title: "Shop handmade mugs and bowls - Demo Ceramics", description: "Browse handmade stoneware mugs, bowls and plates." };
const PRODUCTS = [
  { name: "Speckled morning mug", description: "A twelve ounce mug in speckled oatmeal glaze with a wide comfortable handle that fits three fingers.", price: "$32" },
  { name: "Deep ramen bowl", description: "A deep stoneware bowl for noodles and soups, glazed in a dark celadon green that pools in the throwing lines.", price: "$48" },
  { name: "Dinner plate set", description: "Four ten inch plates with an unglazed rim and a satin white centre that shows off every meal.", price: "$140" },
  { name: "Pour over coffee dripper", description: "A cone dripper that fits standard filters, with three holes for an even pour and a saucer for the counter.", price: "$38" },
];
export default function Products() {
  return (<><h1>Shop</h1><ul>{PRODUCTS.map((p) => (<li key={p.name}><h2>{p.name}</h2><p>{p.description}</p><p>{p.price}</p></li>))}</ul></>);
}
`,
  );
}

describe("verify on a fixed copy of the demo site", () => {
  let original: Awaited<ReturnType<typeof serveSite>>;
  let fixed: Awaited<ReturnType<typeof serveSite>>;
  let drafts: FindingDraft[];

  beforeAll(async () => {
    original = await serveSite(FIXTURE_DIR, 3103);
    ({ drafts } = await detectAll(await crawlSite({ baseUrl: original.url, gsc: null })));
    copyFixture(FIXED_DIR);
    applyFixes();
    fixed = await serveSite(FIXED_DIR, 3102, { build: true });
  }, 300_000);

  afterAll(async () => {
    await closeBrowser();
    original?.stop();
    fixed?.stop();
  });

  it("every fixable finding passes its own check on the fixed site", async () => {
    const fixable = drafts.filter((d) => d.fixType);
    expect(fixable.length).toBeGreaterThanOrEqual(7);
    for (const d of fixable) {
      const result = await verifyFinding(d.checkId, {
        baseUrl: fixed.url,
        paths: d.affectedPaths,
        evidence: d.evidence,
      });
      expect(result.passed, `${d.fingerprint}: ${result.summary}`).toBe(true);
    }
  }, 120_000);

  it("a fresh audit of the fixed site finds nothing fixable", async () => {
    const { drafts: after } = await detectAll(await crawlSite({ baseUrl: fixed.url, gsc: null }));
    expect(after.filter((d) => d.fixType).map((d) => d.fingerprint)).toEqual([]);
  }, 120_000);
});
