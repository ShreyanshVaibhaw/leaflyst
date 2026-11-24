import type { FixTask } from "./briefs";

export interface PrBodyInput {
  task: FixTask;
  summary: string;
  findingUrl: string;
  diffStats: { files: number; additions: number; deletions: number };
}

function evidenceLines(evidence: Record<string, unknown>): string[] {
  const lines: string[] = [];
  for (const [key, value] of Object.entries(evidence)) {
    if (value === null || value === undefined || key === "robotsTxt") continue;
    const text = typeof value === "string" ? value : JSON.stringify(value);
    lines.push(`- **${key}**: ${text.length > 400 ? `${text.slice(0, 400)}...` : text}`);
    if (lines.length >= 8) break;
  }
  return lines;
}

/** Every Leaflyst pull request has the same five parts. */
export function buildPrBody(input: PrBodyInput): string {
  const { task, diffStats } = input;
  return [
    "## What changed",
    input.summary,
    "",
    `${diffStats.files} file${diffStats.files === 1 ? "" : "s"}, +${diffStats.additions} / -${diffStats.deletions} lines.`,
    "",
    "## Why",
    `${task.title}.`,
    task.expectedEffect,
    "",
    "## Evidence",
    `Affected pages: ${task.affectedPaths.map((p) => `\`${p}\``).join(", ")}`,
    ...evidenceLines(task.evidence),
    "",
    `Full details: ${input.findingUrl}`,
    "",
    "## How it is verified",
    "Leaflyst runs the same check that found this problem against the preview deployment of this branch and reports it as the **Leaflyst verification** check.",
    "After merge it runs the check again on production.",
    "",
    "## How to revert",
    "Revert this pull request on GitHub, or press Revert on the change in Leaflyst, which opens a revert pull request for you.",
  ].join("\n");
}

export function prTitle(task: FixTask): string {
  const t = `Leaflyst: ${task.title}`;
  return t.length > 120 ? `${t.slice(0, 117)}...` : t;
}

export function branchName(findingId: string, title: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40)
    .replace(/-$/, "");
  return `leaflyst/${findingId.slice(0, 8)}-${slug || "fix"}`;
}
