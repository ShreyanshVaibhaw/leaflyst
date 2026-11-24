import { and, desc, eq, gte, inArray, lt, sql } from "drizzle-orm";
import { z } from "zod";
import { db, schema } from "@/server/db/client";
import { latestRun, runResults } from "@/server/ai-visibility/service";
import { adsImports, termTable } from "@/server/ads/service";
import { llmAvailable, structured } from "@/server/integrations/anthropic/llm";

export function weekStartOf(date = new Date()): string {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = (d.getUTCDay() + 6) % 7; // Monday = 0
  d.setUTCDate(d.getUTCDate() - day);
  return d.toISOString().slice(0, 10);
}

export async function buildReportData(siteId: string, weekStart: string) {
  const d = db();
  const start = new Date(`${weekStart}T00:00:00Z`);
  const end = new Date(start.getTime() + 7 * 86_400_000);
  const changes = await d
    .select({ change: schema.changes, finding: schema.findings })
    .from(schema.changes)
    .innerJoin(schema.findings, eq(schema.findings.id, schema.changes.findingId))
    .where(and(eq(schema.changes.siteId, siteId), gte(schema.changes.createdAt, start), lt(schema.changes.createdAt, end)));
  const next = await d
    .select()
    .from(schema.findings)
    .where(and(eq(schema.findings.siteId, siteId), inArray(schema.findings.status, ["open", "needs_human"])))
    .orderBy(desc(schema.findings.score))
    .limit(3);
  const [openCount] = await d
    .select({ n: sql<number>`count(*)::int` })
    .from(schema.findings)
    .where(and(eq(schema.findings.siteId, siteId), eq(schema.findings.status, "open")));
  const run = await latestRun(siteId);
  const ai = run?.status === "done" ? await runResults(run.id) : [];
  const ads = await termTable(siteId);
  const currency = (await adsImports(siteId)).find((i) => i.currency)?.currency ?? "";
  return {
    weekStart,
    changes: changes.map(({ change, finding }) => ({
      title: finding.title,
      status: change.status,
      prUrl: change.prUrl,
      verified: Boolean(change.verifiedAt),
      baselineImpressions: (change.baseline as { affected?: { total?: number } } | null)?.affected?.total ?? null,
    })),
    openFindings: openCount?.n ?? 0,
    next: next.map((f) => ({ title: f.title, severity: f.severity, fixable: Boolean(f.fixType) })),
    ai: ai.map((r) => ({ question: r.text, engine: r.engine, mentionPct: Math.round(r.mention.rate * 100), lowPct: Math.round(r.mention.low * 100), highPct: Math.round(r.mention.high * 100), answers: r.answered })),
    ads: {
      currency,
      wastedTerms: ads.rows.filter((r) => r.advice === "wasted").length,
      wastedCost: Math.round(ads.rows.filter((r) => r.advice === "wasted").reduce((s, r) => s + r.cost, 0)),
      testPausing: ads.rows.filter((r) => r.advice === "test_pausing").length,
    },
  };
}

export type ReportData = Awaited<ReturnType<typeof buildReportData>>;

/** Every number in the text must appear somewhere in the data. Dates and list markers are exempt. */
export function numbersNotInData(text: string, data: unknown): string[] {
  const allowed = new Set((JSON.stringify(data).match(/\d+(\.\d+)?/g) ?? []).map((n) => String(Number(n))));
  const found = text.replace(/\b\d{4}-\d{2}-\d{2}\b/g, "").match(/\d+(\.\d+)?/g) ?? [];
  return [...new Set(found.map((n) => String(Number(n))))].filter((n) => !allowed.has(n));
}

export function templateSummary(data: ReportData): string {
  const lines: string[] = [];
  const opened = data.changes.length;
  const verified = data.changes.filter((c) => c.verified).length;
  lines.push(opened ? `Leaflyst opened ${opened} change${opened === 1 ? "" : "s"} this week, and ${verified} ${verified === 1 ? "is" : "are"} verified on the live site.` : "No changes were opened this week.");
  lines.push(`${data.openFindings} finding${data.openFindings === 1 ? " is" : "s are"} still open.`);
  if (data.next[0]) lines.push(`Next up: ${data.next[0].title}.`);
  if (data.ads.wastedTerms) lines.push(`${data.ads.wastedTerms} ad search terms spent ${data.ads.currency} ${data.ads.wastedCost} with no conversions.`);
  return lines.join(" ");
}

const summarySchema = z.object({ summary: z.string() });

export async function writeReport(siteId: string, weekStart = weekStartOf()) {
  const data = await buildReportData(siteId, weekStart);
  let summary = templateSummary(data);
  if (llmAvailable()) {
    try {
      const out = await structured({
        purpose: "weekly-report",
        siteId,
        system:
          "You write a short weekly update for a website owner about SEO and AI search work done on their site. Plain language, three to five sentences, no jargon, no hype. Use only facts and numbers from the data. If something is not in the data, do not mention it.",
        prompt: `Data for the week starting ${weekStart}:\n${JSON.stringify(data)}`,
        schema: summarySchema,
        effort: "low",
      });
      // A sentence with a number we did not supply is a made-up number.
      if (numbersNotInData(out.summary, data).length === 0) summary = out.summary;
    } catch {
      // keep the template text
    }
  }
  await db()
    .insert(schema.reports)
    .values({ siteId, weekStart, data, summary })
    .onConflictDoUpdate({ target: [schema.reports.siteId, schema.reports.weekStart], set: { data, summary, createdAt: new Date() } });
  return { data, summary };
}
