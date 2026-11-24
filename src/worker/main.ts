import { isNotNull } from "drizzle-orm";
import { boss, enqueue, type JobData, type JobName } from "@/server/jobs/queue";
import { db, schema } from "@/server/db/client";
import { runAudit } from "@/server/findings/audit";
import { runFix } from "@/server/fixes/service";
import { verifyLive, verifyPreview } from "@/server/verify/service";
import { scoreChange } from "@/server/ledger/baseline";
import { syncSearchConsole } from "@/server/integrations/google/search-console";
import { executeRun } from "@/server/ai-visibility/service";
import { weekStartOf, writeReport } from "@/server/reports/service";

type Handlers = { [N in JobName]: (data: JobData[N]) => Promise<unknown> };

const handlers: Handlers = {
  "audit.run": ({ siteId, crawlRunId }) => runAudit(siteId, crawlRunId),
  "fix.run": ({ changeId }) => runFix(changeId),
  "verify.preview": ({ changeId, previewUrl, sha }) => verifyPreview(changeId, previewUrl, sha),
  "verify.live": ({ changeId, attempt }) => verifyLive(changeId, attempt),
  "ledger.score": ({ changeId, day }) => scoreChange(changeId, day),
  "gsc.sync": ({ siteId, days }) => syncSearchConsole(siteId, days),
  "ai.run": ({ runId }) => executeRun(runId),
  "report.build": ({ siteId, weekStart }) => writeReport(siteId, weekStart),
  // Once a day: refresh Search Console for every connected site and rebuild this week's report.
  "daily.tick": async () => {
    const sites = await db()
      .select({ id: schema.sites.id })
      .from(schema.sites)
      .where(isNotNull(schema.sites.gscProperty));
    for (const s of sites)
      await enqueue("gsc.sync", { siteId: s.id, days: 5 }, { singletonKey: `gsc-${s.id}` });
    const all = await db().select({ id: schema.sites.id }).from(schema.sites);
    for (const s of all)
      await enqueue(
        "report.build",
        { siteId: s.id, weekStart: weekStartOf() },
        { startAfter: 600 },
      );
  },
};

async function main() {
  const b = await boss();
  for (const name of Object.keys(handlers) as JobName[]) {
    // Fix sessions and crawls are slow; give them more time before pg-boss expires the job.
    const expireInSeconds =
      name === "fix.run" ? 30 * 60 : name === "audit.run" || name === "ai.run" ? 20 * 60 : 5 * 60;
    await b.updateQueue(name, { expireInSeconds });
    await b.work(name, { batchSize: 1 }, async ([job]) => {
      if (!job) return;
      const started = Date.now();
      console.log(`[job] ${name} ${job.id} started`);
      try {
        const out = await (handlers[name] as (d: unknown) => Promise<unknown>)(job.data);
        console.log(`[job] ${name} ${job.id} done in ${Date.now() - started}ms`);
        return out;
      } catch (error) {
        // The change or site was deleted after the job was queued: nothing left to do, so do not retry.
        if (error instanceof Error && /^(change|site|run) not found$/.test(error.message)) {
          console.warn(`[job] ${name} ${job.id} skipped: ${error.message}`);
          return;
        }
        console.error(`[job] ${name} ${job.id} failed`, error);
        throw error;
      }
    });
  }
  await b.schedule("daily.tick", "15 6 * * *");
  console.log("worker ready");

  const shutdown = async () => {
    await b.stop({ graceful: true, timeout: 30_000 });
    process.exit(0);
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
