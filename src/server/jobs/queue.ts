import { PgBoss } from "pg-boss";
import { env } from "@/server/env";

/** Every job Leaflyst runs, with the shape of its data. */
export interface JobData {
  "audit.run": { siteId: string; crawlRunId: string };
  "fix.run": { changeId: string };
  "verify.preview": { changeId: string; previewUrl: string; sha: string };
  "verify.live": { changeId: string; attempt: number };
  "ledger.score": { changeId: string; day: 14 | 28 };
  "gsc.sync": { siteId: string; days: number };
  "ai.run": { runId: string };
  "report.build": { siteId: string; weekStart: string };
  "daily.tick": Record<string, never>;
}

export type JobName = keyof JobData;

export const QUEUES: JobName[] = [
  "audit.run",
  "fix.run",
  "verify.preview",
  "verify.live",
  "ledger.score",
  "gsc.sync",
  "ai.run",
  "report.build",
  "daily.tick",
];

const g = globalThis as unknown as { __leaflystBoss?: Promise<PgBoss> };

export function boss(): Promise<PgBoss> {
  g.__leaflystBoss ??= (async () => {
    const b = new PgBoss(env().DATABASE_URL);
    b.on("error", (error) => console.error("pg-boss", error));
    await b.start();
    for (const name of QUEUES) await b.createQueue(name);
    return b;
  })();
  return g.__leaflystBoss;
}

export interface EnqueueOptions {
  startAfter?: Date | number;
  singletonKey?: string;
  retryLimit?: number;
}

export async function enqueue<N extends JobName>(
  name: N,
  data: JobData[N],
  opts: EnqueueOptions = {},
) {
  const b = await boss();
  return b.send(name, data, {
    retryLimit: opts.retryLimit ?? 3,
    retryDelay: 30,
    retryBackoff: true,
    singletonKey: opts.singletonKey,
    startAfter: opts.startAfter instanceof Date ? opts.startAfter : opts.startAfter,
  });
}
