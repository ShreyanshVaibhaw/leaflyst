import type { FixTask } from "./briefs";

export interface FixRunInput {
  task: FixTask;
  repoUrl: string;
  repoToken: string;
}

export interface FixRunResult {
  status: "pushed" | "needs_human";
  summary: string;
  reason?: string;
  files?: string[];
  sessionId?: string;
  costUsd?: number;
}

/** Anything that turns a fix task into a pushed branch. */
export interface FixRunner {
  run(input: FixRunInput): Promise<FixRunResult>;
}
