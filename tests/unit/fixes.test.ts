import { describe, expect, it } from "vitest";
import { checkGuardrails } from "@/server/fixes/guardrails";
import { branchName, buildPrBody } from "@/server/fixes/pr-body";
import { parseFinalMessage } from "@/server/fixes/managed-agent-runner";
import type { FixTask } from "@/server/fixes/briefs";

const task: FixTask = {
  findingId: "0f8fad5b-d9cb-469f-a165-70867728950e",
  checkId: "metadata",
  fixType: "F2",
  title: "Pages with no title (1)",
  affectedPaths: ["/about"],
  evidence: { kind: "title-missing", pages: [{ path: "/about", title: null }] },
  expectedEffect: "Search engines get a clear name for each page.",
  siteUrl: "https://example.com",
  branch: "leaflyst/0f8fad5b-pages-with-no-title-1",
  defaultBranch: "main",
};

describe("guardrails", () => {
  it("accepts a small change", () => {
    expect(
      checkGuardrails([{ filename: "app/about/page.tsx", additions: 4, deletions: 0 }]).ok,
    ).toBe(true);
  });

  it("rejects an oversized diff", () => {
    const files = Array.from({ length: 11 }, (_, i) => ({
      filename: `app/p${i}/page.tsx`,
      additions: 1,
      deletions: 0,
    }));
    expect(checkGuardrails(files).problems.join()).toMatch(/11 files/);
    expect(
      checkGuardrails([
        { filename: "app/page.tsx", additions: 250, deletions: 60 },
      ]).problems.join(),
    ).toMatch(/310 lines/);
  });

  it("rejects protected paths", () => {
    for (const filename of [
      ".github/workflows/ci.yml",
      ".env.local",
      "pnpm-lock.yaml",
      "package.json",
      "app/checkout/page.tsx",
      "lib/auth.ts",
      "middleware.ts",
    ]) {
      expect(checkGuardrails([{ filename, additions: 1, deletions: 0 }]).ok, filename).toBe(false);
    }
    expect(
      checkGuardrails([
        { filename: "app/blog/authentication-tips/page.tsx", additions: 1, deletions: 0 },
      ]).ok,
    ).toBe(true);
  });

  it("rejects an empty branch", () => {
    expect(checkGuardrails([]).ok).toBe(false);
  });
});

describe("pull request text", () => {
  it("has all five parts", () => {
    const body = buildPrBody({
      task,
      summary: "Added a title.",
      findingUrl: "https://app/x",
      diffStats: { files: 1, additions: 4, deletions: 0 },
    });
    for (const heading of [
      "## What changed",
      "## Why",
      "## Evidence",
      "## How it is verified",
      "## How to revert",
    ]) {
      expect(body).toContain(heading);
    }
    expect(body).not.toContain("—");
  });

  it("makes safe branch names", () => {
    expect(branchName(task.findingId, 'robots.txt blocks "OAI-SearchBot"!')).toBe(
      "leaflyst/0f8fad5b-robots-txt-blocks-oai-searchbot",
    );
  });

  it("reads the agent's final JSON", () => {
    expect(
      parseFinalMessage('Done.\n{"status": "pushed", "summary": "ok", "files": ["a"]}'),
    ).toEqual({ status: "pushed", summary: "ok", files: ["a"] });
    expect(parseFinalMessage("no json here")).toBeNull();
  });
});
