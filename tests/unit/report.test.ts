import { describe, expect, it } from "vitest";
import {
  numbersNotInData,
  templateSummary,
  weekStartOf,
  type ReportData,
} from "@/server/reports/service";

const data: ReportData = {
  weekStart: "2026-11-23",
  changes: [
    {
      title: "Pages with no title (1)",
      status: "verified",
      prUrl: "https://github.com/o/r/pull/4",
      verified: true,
      baselineImpressions: 120,
    },
  ],
  openFindings: 6,
  next: [{ title: "robots.txt blocks OAI-SearchBot", severity: "critical", fixable: true }],
  ai: [],
  ads: { currency: "USD", wastedTerms: 2, wastedCost: 85, testPausing: 0 },
};

describe("weekly report", () => {
  it("rejects text with a number that is not in the data", () => {
    expect(numbersNotInData("We opened 1 change and 6 findings remain.", data)).toEqual([]);
    expect(numbersNotInData("Traffic grew 40% this week.", data)).toEqual(["40"]);
  });

  it("the template uses only data numbers", () => {
    const text = templateSummary(data);
    expect(numbersNotInData(text, data)).toEqual([]);
    expect(text).toContain("robots.txt blocks OAI-SearchBot");
  });

  it("weeks start on Monday", () => {
    expect(weekStartOf(new Date("2026-11-26T12:00:00Z"))).toBe("2026-11-23");
    expect(weekStartOf(new Date("2026-11-23T00:00:00Z"))).toBe("2026-11-23");
    expect(weekStartOf(new Date("2026-11-29T23:00:00Z"))).toBe("2026-11-23");
  });
});
