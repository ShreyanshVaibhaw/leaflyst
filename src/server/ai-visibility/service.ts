import { and, eq, sql } from "drizzle-orm";
import { z } from "zod";
import { db, schema } from "@/server/db/client";
import {
  askEngine,
  EST_COST_PER_ANSWER,
  type AiEngine,
} from "@/server/integrations/dataforseo/client";
import { llmAvailable, structured } from "@/server/integrations/anthropic/llm";
import { loadGscData } from "@/server/integrations/google/search-console";
import { mapLimit } from "@/server/crawl/fetch";
import { sha256 } from "@/server/lib/crypto";
import { citesDomain, looksCached, mentionsBrand, wilson } from "./stats";

export const ENGINES: AiEngine[] = ["chatgpt", "google_ai_mode"];
// One answer is not a measurement: the same question rarely returns the same brands twice.
export const SAMPLES_PER_PROMPT = 10;
export const MAX_PROMPTS = 15;

const suggestionSchema = z.object({
  questions: z.array(z.object({ text: z.string(), topic: z.string() })).max(20),
});

/** Buyer questions drawn from Search Console queries and the site's own pages. */
export async function suggestQuestions(siteId: string) {
  const [site] = await db().select().from(schema.sites).where(eq(schema.sites.id, siteId));
  if (!site) throw new Error("site not found");
  const gsc = await loadGscData(siteId);
  const topQueries = [...(gsc?.queries ?? [])]
    .filter((q) => !site.brandName || !mentionsBrand(q.query, site.brandName))
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 60)
    .map((q) => q.query);
  const pages = await db()
    .select({ path: schema.pages.path })
    .from(schema.pages)
    .where(eq(schema.pages.siteId, siteId))
    .limit(60);

  if (!llmAvailable()) {
    // Without a model, turn the top non-brand queries into plain questions.
    return topQueries
      .slice(0, 12)
      .map((q) => ({ text: `What are the best options for ${q}?`, topic: "search queries" }));
  }
  const out = await structured({
    purpose: "ai-questions",
    siteId,
    system:
      "You write the questions real buyers type into ChatGPT or Google AI Mode when looking for a product or service like this business sells. Questions are neutral: they never name the business or its competitors. Each is one natural sentence. Group them into two or three topics.",
    prompt: [
      `Business website: ${site.baseUrl}`,
      site.brandName ? `Brand name, which must not appear in any question: ${site.brandName}` : "",
      `Pages on the site: ${pages.map((p) => p.path).join(", ") || "unknown"}`,
      `Search queries people already use to find the site: ${topQueries.join("; ") || "none available"}`,
      "",
      `Write ${MAX_PROMPTS} questions.`,
    ].join("\n"),
    schema: suggestionSchema,
    effort: "low",
  });
  return out.questions
    .filter((q) => !site.brandName || !mentionsBrand(q.text, site.brandName))
    .slice(0, MAX_PROMPTS);
}

export function estimateCost(promptCount: number, engines = ENGINES, samples = SAMPLES_PER_PROMPT) {
  return engines.reduce((s, e) => s + EST_COST_PER_ANSWER[e] * promptCount * samples, 0);
}

export async function startRun(siteId: string) {
  const d = db();
  const [site] = await d.select().from(schema.sites).where(eq(schema.sites.id, siteId));
  if (!site) throw new Error("site not found");
  if (!site.brandName)
    throw new Error("Set the brand name first, so answers can be checked for it.");
  const prompts = await d
    .select()
    .from(schema.aiPrompts)
    .where(
      and(
        eq(schema.aiPrompts.siteId, siteId),
        eq(schema.aiPrompts.active, true),
        eq(schema.aiPrompts.confirmed, true),
      ),
    );
  if (prompts.length === 0) throw new Error("Confirm at least one question first.");
  const estimated = estimateCost(prompts.length);
  if (estimated > site.aiCostCapUsd) {
    throw new Error(
      `This run would cost about $${estimated.toFixed(2)}, above the site's cap of $${site.aiCostCapUsd.toFixed(2)}.`,
    );
  }
  const [run] = await d
    .insert(schema.aiRuns)
    .values({
      siteId,
      samplesPerPrompt: SAMPLES_PER_PROMPT,
      engines: ENGINES,
      estimatedCostUsd: estimated,
    })
    .returning();
  if (!run) throw new Error("could not create run");
  const { enqueue } = await import("@/server/jobs/queue");
  await enqueue("ai.run", { runId: run.id }, { retryLimit: 0 });
  return run.id;
}

export async function executeRun(runId: string) {
  const d = db();
  const [run] = await d.select().from(schema.aiRuns).where(eq(schema.aiRuns.id, runId));
  if (!run) throw new Error("run not found");
  const [site] = await d.select().from(schema.sites).where(eq(schema.sites.id, run.siteId));
  if (!site?.brandName) throw new Error("site or brand missing");
  const prompts = await d
    .select()
    .from(schema.aiPrompts)
    .where(
      and(
        eq(schema.aiPrompts.siteId, site.id),
        eq(schema.aiPrompts.active, true),
        eq(schema.aiPrompts.confirmed, true),
      ),
    );
  await d
    .update(schema.aiRuns)
    .set({ status: "running", startedAt: new Date() })
    .where(eq(schema.aiRuns.id, runId));
  const domain = new URL(site.baseUrl).hostname;
  const jobs = prompts.flatMap((p) =>
    run.engines.flatMap((engine) =>
      Array.from({ length: run.samplesPerPrompt }, (_, i) => ({
        p,
        engine: engine as AiEngine,
        i,
      })),
    ),
  );
  let spent = 0;
  await mapLimit(jobs, 4, async ({ p, engine, i }) => {
    // Hard stop at the cap, even if the estimate was low.
    if (spent >= site.aiCostCapUsd) return;
    try {
      const answer = await askEngine(engine, p.text);
      spent += answer.costUsd;
      const domains = answer.sources.map((s) => s.domain);
      await d.insert(schema.aiSamples).values({
        runId,
        promptId: p.id,
        engine,
        sampleIndex: i,
        ok: true,
        mentioned: mentionsBrand(answer.text, site.brandName as string),
        cited: citesDomain(domains, domain),
        citedDomains: [...new Set(domains)],
        answerHash: sha256(answer.text),
        answer: answer.text.slice(0, 20_000),
        costUsd: answer.costUsd,
      });
    } catch (error) {
      await d.insert(schema.aiSamples).values({
        runId,
        promptId: p.id,
        engine,
        sampleIndex: i,
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  });
  await d
    .update(schema.aiRuns)
    .set({ status: "done", finishedAt: new Date(), costUsd: spent })
    .where(eq(schema.aiRuns.id, runId));
}

export interface PromptResult {
  promptId: string;
  text: string;
  engine: string;
  answered: number;
  failed: number;
  mention: ReturnType<typeof wilson>;
  citation: ReturnType<typeof wilson>;
  topSources: { domain: string; count: number }[];
  cached: boolean;
}

/** Presence rates with Wilson intervals, per question and engine, for one run. */
export async function runResults(runId: string): Promise<PromptResult[]> {
  const rows = await db()
    .select({ sample: schema.aiSamples, prompt: schema.aiPrompts })
    .from(schema.aiSamples)
    .innerJoin(schema.aiPrompts, eq(schema.aiPrompts.id, schema.aiSamples.promptId))
    .where(eq(schema.aiSamples.runId, runId));
  const groups = new Map<string, typeof rows>();
  for (const r of rows) {
    const key = `${r.prompt.id}|${r.sample.engine}`;
    groups.set(key, [...(groups.get(key) ?? []), r]);
  }
  return [...groups.values()].map((g) => {
    const ok = g.filter((r) => r.sample.ok);
    const counts = new Map<string, number>();
    for (const r of ok)
      for (const dmn of r.sample.citedDomains) counts.set(dmn, (counts.get(dmn) ?? 0) + 1);
    const first = g[0] as (typeof g)[number];
    return {
      promptId: first.prompt.id,
      text: first.prompt.text,
      engine: first.sample.engine,
      answered: ok.length,
      failed: g.length - ok.length,
      mention: wilson(ok.filter((r) => r.sample.mentioned).length, ok.length),
      citation: wilson(ok.filter((r) => r.sample.cited).length, ok.length),
      topSources: [...counts.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([domain, count]) => ({ domain, count })),
      cached: looksCached(ok.map((r) => r.sample.answerHash ?? "")),
    };
  });
}

export async function latestRun(siteId: string) {
  const [run] = await db()
    .select()
    .from(schema.aiRuns)
    .where(eq(schema.aiRuns.siteId, siteId))
    .orderBy(sql`${schema.aiRuns.createdAt} desc`)
    .limit(1);
  return run ?? null;
}
