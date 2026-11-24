import { and, eq, sql } from "drizzle-orm";
import { db, schema } from "@/server/db/client";
import { crawlSite } from "@/server/crawl/crawl";
import { closeBrowser } from "@/server/crawl/render";
import { detectAll } from "@/server/checks/registry";
import { loadGscData } from "@/server/integrations/google/search-console";
import { env } from "@/server/env";
import { decrypt } from "@/server/lib/crypto";
import { toPath } from "@/server/crawl/crawl";
import { saveFindings } from "./persist";

export async function siteHeaders(
  site: typeof schema.sites.$inferSelect,
): Promise<Record<string, string>> {
  return site.previewBypassEnc
    ? { "x-vercel-protection-bypass": decrypt(site.previewBypassEnc, env().ENCRYPTION_KEY) }
    : {};
}

async function paidLandingPaths(siteId: string, origin: string) {
  const rows = await db()
    .select({
      url: schema.adsLandingPages.url,
      clicks: sql<number>`sum(${schema.adsLandingPages.clicks})::int`,
      cost: sql<number>`sum(${schema.adsLandingPages.cost})`,
    })
    .from(schema.adsLandingPages)
    .where(eq(schema.adsLandingPages.siteId, siteId))
    .groupBy(schema.adsLandingPages.url);
  return rows
    .map((r) => ({ path: toPath(r.url, origin), clicks: r.clicks, cost: r.cost }))
    .filter((r): r is { path: string; clicks: number; cost: number } => r.path !== null);
}

/** Crawl, run every check, store pages, crawler fetches, renders and findings. */
export async function runAudit(siteId: string, crawlRunId: string) {
  const d = db();
  const [site] = await d.select().from(schema.sites).where(eq(schema.sites.id, siteId));
  if (!site) throw new Error("site not found");
  await d
    .update(schema.crawlRuns)
    .set({ status: "running", startedAt: new Date() })
    .where(eq(schema.crawlRuns.id, crawlRunId));
  try {
    const origin = new URL(site.baseUrl).origin;
    const ctx = await crawlSite({
      baseUrl: site.baseUrl,
      headers: await siteHeaders(site),
      gsc: await loadGscData(siteId),
      paidLandingPaths: await paidLandingPaths(siteId, origin),
    });
    const { drafts, errors } = await detectAll(ctx);

    for (const page of ctx.pages) {
      const gscImpr = (ctx.gsc?.pages ?? [])
        .filter((p) => toPath(p.page, origin) === page.path)
        .reduce((s, p) => s + p.impressions, 0);
      await d
        .insert(schema.pages)
        .values({ siteId, path: page.path, sources: [], impressions28d: gscImpr })
        .onConflictDoUpdate({
          target: [schema.pages.siteId, schema.pages.path],
          set: { impressions28d: gscImpr },
        });
    }
    if (ctx.crawlerFetches.length) {
      for (let i = 0; i < ctx.crawlerFetches.length; i += 500) {
        await d.insert(schema.pageFetches).values(
          ctx.crawlerFetches.slice(i, i + 500).map((f) => ({
            crawlRunId,
            siteId,
            path: f.path,
            identity: f.identityId,
            status: f.status,
            redirects: f.redirects,
            robotsAllowed: f.robotsAllowed,
            xRobotsTag: f.xRobotsTag,
            metaRobots: f.metaRobots,
            bytes: f.bytes,
            error: f.error,
          })),
        );
      }
    }
    if (ctx.renders.length) {
      await d.insert(schema.pageRenders).values(
        ctx.renders
          .filter((r) => !r.error)
          .map((r) => ({
            crawlRunId,
            siteId,
            path: r.path,
            rawWords: r.rawWords,
            renderedWords: r.renderedWords,
            gap: r.gap,
          })),
      );
    }
    const count = await saveFindings(siteId, crawlRunId, drafts);
    await d
      .update(schema.crawlRuns)
      .set({
        status: "done",
        finishedAt: new Date(),
        pageCount: ctx.pages.length,
        error: errors.length ? JSON.stringify(errors) : null,
      })
      .where(eq(schema.crawlRuns.id, crawlRunId));
    return { pages: ctx.pages.length, findings: count, checkErrors: errors };
  } catch (error) {
    await d
      .update(schema.crawlRuns)
      .set({
        status: "failed",
        finishedAt: new Date(),
        error: error instanceof Error ? error.message : String(error),
      })
      .where(eq(schema.crawlRuns.id, crawlRunId));
    throw error;
  } finally {
    await closeBrowser();
  }
}

export async function startAudit(siteId: string) {
  const d = db();
  const [running] = await d
    .select()
    .from(schema.crawlRuns)
    .where(
      and(
        eq(schema.crawlRuns.siteId, siteId),
        sql`${schema.crawlRuns.status} in ('queued','running')`,
      ),
    );
  if (running) return running.id;
  const [run] = await d.insert(schema.crawlRuns).values({ siteId }).returning();
  if (!run) throw new Error("could not create crawl run");
  const { enqueue } = await import("@/server/jobs/queue");
  await enqueue("audit.run", { siteId, crawlRunId: run.id }, { retryLimit: 1 });
  return run.id;
}
