import { describe, expect, it } from "vitest";
import { computeVerdict, rng, selectControls } from "@/server/ledger/scoring/verdict";

function series(n: number, level: number, noise: number, seed: number) {
  const rand = rng(seed);
  return Array.from({ length: n }, () =>
    Math.max(0, Math.round(level * (1 + (rand() - 0.5) * noise))),
  );
}

describe("change verdict", () => {
  const control = { before: series(28, 200, 0.4, 1), after: series(28, 200, 0.4, 2) };

  it("improved when affected pages rise and controls do not", () => {
    const r = computeVerdict(
      { before: series(28, 100, 0.4, 3), after: series(28, 150, 0.4, 4) },
      control,
    );
    expect(r.verdict).toBe("improved");
    expect(r.effect).toBeGreaterThan(0.3);
    expect(r.low).toBeGreaterThan(0);
  });

  it("worse when affected pages fall against controls", () => {
    const r = computeVerdict(
      { before: series(28, 100, 0.4, 5), after: series(28, 60, 0.4, 6) },
      control,
    );
    expect(r.verdict).toBe("worse");
    expect(r.high).toBeLessThan(0);
  });

  it("no clear effect when the change is inside the noise", () => {
    const r = computeVerdict(
      { before: series(28, 100, 0.8, 7), after: series(28, 104, 0.8, 8) },
      control,
    );
    expect(r.verdict).toBe("no_clear_effect");
  });

  it("no clear effect, with a reason, for a tiny site", () => {
    const r = computeVerdict({ before: series(28, 2, 1, 9), after: series(28, 6, 1, 10) }, control);
    expect(r.verdict).toBe("no_clear_effect");
    expect(r.reason).toMatch(/too few/);
  });

  it("a site-wide rise is not credited to the change", () => {
    const r = computeVerdict(
      { before: series(28, 100, 0.3, 11), after: series(28, 150, 0.3, 12) },
      { before: series(28, 200, 0.3, 13), after: series(28, 300, 0.3, 14) },
    );
    expect(r.verdict).toBe("no_clear_effect");
  });

  it("is deterministic", () => {
    const a = { before: series(28, 100, 0.4, 3), after: series(28, 150, 0.4, 4) };
    expect(computeVerdict(a, control)).toEqual(computeVerdict(a, control));
  });

  it("selects controls from the same section with similar traffic", () => {
    const picked = selectControls(
      [
        { path: "/blog/a", impressions: 100 },
        { path: "/blog/b", impressions: 90 },
        { path: "/blog/c", impressions: 5000 },
        { path: "/shop/x", impressions: 95 },
        { path: "/blog/zero", impressions: 0 },
      ],
      ["/blog/a"],
      2,
    );
    expect(picked).toEqual(["/blog/b", "/blog/c"]);
  });
});
