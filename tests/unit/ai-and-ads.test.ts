import { describe, expect, it } from "vitest";
import { citesDomain, looksCached, mentionsBrand, wilson } from "@/server/ai-visibility/stats";
import { parseAnswer } from "@/server/integrations/dataforseo/client";
import { AdsParseError, parseAdsCsv, parseNumber } from "@/server/ads/parse";

describe("AI visibility statistics", () => {
  it("wilson interval matches known values", () => {
    const r = wilson(3, 10);
    expect(r.rate).toBeCloseTo(0.3);
    expect(r.low).toBeCloseTo(0.1078, 3);
    expect(r.high).toBeCloseTo(0.6032, 3);
    expect(wilson(0, 10).low).toBe(0);
    expect(wilson(0, 0)).toEqual({ rate: 0, low: 0, high: 0 });
  });

  it("detects brand mentions as whole words", () => {
    expect(mentionsBrand("Try Demo Ceramics for mugs.", "Demo Ceramics")).toBe(true);
    expect(mentionsBrand("demo ceramics is great", "Demo Ceramics")).toBe(true);
    expect(mentionsBrand("Acmeville shop", "Acme")).toBe(false);
    expect(mentionsBrand("anything", " ")).toBe(false);
  });

  it("matches cited domains and subdomains", () => {
    expect(citesDomain(["shop.example.com"], "www.example.com")).toBe(true);
    expect(citesDomain(["notexample.com"], "example.com")).toBe(false);
  });

  it("flags identical answers as cached", () => {
    expect(looksCached(["a", "a", "a"])).toBe(true);
    expect(looksCached(["a", "b", "a"])).toBe(false);
  });

  it("parses both engines' answers", () => {
    const chat = parseAnswer(
      "chatgpt",
      {
        markdown: "Use Demo Ceramics",
        sources: [{ url: "https://www.demo.com/a", domain: "www.demo.com", title: "A" }],
      },
      0.002,
    );
    expect(chat).toEqual({
      text: "Use Demo Ceramics",
      sources: [{ url: "https://www.demo.com/a", domain: "demo.com", title: "A" }],
      costUsd: 0.002,
    });
    const mode = parseAnswer(
      "google_ai_mode",
      {
        items: [
          {
            type: "ai_overview",
            markdown: "Answer",
            references: [{ url: "https://x.org/p", title: null }, { url: "https://x.org/p" }],
          },
        ],
      },
      0.004,
    );
    expect(mode.text).toBe("Answer");
    expect(mode.sources).toEqual([{ url: "https://x.org/p", domain: "x.org", title: null }]);
  });
});

describe("Google Ads CSV import", () => {
  it("reads numbers in export formats", () => {
    expect(parseNumber("1,234.56")).toBe(1234.56);
    expect(parseNumber("$12.30")).toBe(12.3);
    expect(parseNumber("--")).toBe(0);
    expect(parseNumber("12,5")).toBe(12.5);
  });

  it("skips the title, date line and totals rows", () => {
    const csv = [
      "Search terms report",
      '"November 1, 2026 - November 21, 2026"',
      "Search term,Match type,Campaign,Clicks,Impr.,Currency code,Cost,Conversions",
      "handmade mugs,Phrase match,Mugs,40,900,USD,52.10,3.00",
      '"ceramic ramen bowl",Exact match,Bowls,12,300,USD,"1,020.00",0.00',
      "Total: Search terms,,,52,1200,USD,1072.10,3.00",
      "Total: Account,,,52,1200,USD,1072.10,3.00",
    ].join("\n");
    const r = parseAdsCsv(csv);
    expect(r.kind).toBe("search_terms");
    expect(r.rows).toHaveLength(2);
    expect(r.rows[1]).toMatchObject({
      term: "ceramic ramen bowl",
      cost: 1020,
      clicks: 12,
      conversions: 0,
    });
    expect(r.currency).toBe("USD");
    expect(r.periodStart).toBe("2026-11-01");
    expect(r.periodEnd).toBe("2026-11-21");
    expect(r.skippedRows).toBe(2);
  });

  it("recognises landing page and campaign reports", () => {
    expect(
      parseAdsCsv(
        "Landing page,Clicks,Impr.,Cost,Conversions\nhttps://demo.com/landing,10,100,5.00,1",
      ).kind,
    ).toBe("landing_pages");
    const days = parseAdsCsv(
      "Day,Campaign,Clicks,Impr.,Cost,Conversions\n2026-11-02,Mugs,3,50,4.10,0",
    );
    expect(days.rows[0]).toMatchObject({ day: "2026-11-02", campaign: "Mugs", cost: 4.1 });
  });

  it("gives a clear error for the wrong file", () => {
    expect(() => parseAdsCsv("name,email\na,b")).toThrow(AdsParseError);
    expect(() => parseAdsCsv("Keyword,Clicks,Cost\nx,1,2")).toThrow(/Unsupported report/);
  });
});
