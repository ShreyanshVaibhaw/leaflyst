"use server";

import { and, eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireSite, requireUser, issueState } from "@/server/auth";
import { db, schema } from "@/server/db/client";
import { env } from "@/server/env";
import { encrypt } from "@/server/lib/crypto";
import { startAudit } from "@/server/findings/audit";
import { requestFix, requestRevert } from "@/server/fixes/service";
import { importAdsCsv } from "@/server/ads/service";
import { AdsParseError } from "@/server/ads/parse";
import { MAX_PROMPTS, startRun, suggestQuestions } from "@/server/ai-visibility/service";
import { listProperties } from "@/server/integrations/google/search-console";
import { installUrl } from "@/server/integrations/github/app";
import { enqueue } from "@/server/jobs/queue";
import { weekStartOf, writeReport } from "@/server/reports/service";

export interface ActionState {
  ok?: boolean;
  error?: string;
  message?: string;
}

function fail(error: unknown): ActionState {
  return { error: error instanceof Error ? error.message : String(error) };
}

const urlSchema = z
  .string()
  .trim()
  .transform((v) => (/^https?:\/\//i.test(v) ? v : `https://${v}`))
  .pipe(z.string().url());

export async function createSite(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await requireUser();
  const parsed = z
    .object({ name: z.string().trim().min(1, "Give the site a name."), baseUrl: urlSchema })
    .safeParse({
      name: form.get("name"),
      baseUrl: form.get("baseUrl"),
    });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Check the fields." };
  const base = new URL(parsed.data.baseUrl);
  const [site] = await db()
    .insert(schema.sites)
    .values({
      userId: user.id,
      name: parsed.data.name,
      baseUrl: `${base.origin}${base.pathname.replace(/\/$/, "")}`,
      brandName: parsed.data.name,
    })
    .returning();
  if (!site) return { error: "Could not save the site." };
  await startAudit(site.id);
  redirect(`/sites/${site.id}`);
}

export async function runAuditAction(siteId: string) {
  await requireSite(siteId);
  await startAudit(siteId);
  revalidatePath(`/sites/${siteId}`);
}

export async function fixAction(siteId: string, findingId: string): Promise<ActionState> {
  const { user } = await requireSite(siteId);
  try {
    await requestFix(findingId, user.id);
  } catch (error) {
    return fail(error);
  }
  revalidatePath(`/sites/${siteId}`);
  return { ok: true, message: "Fix queued. The pull request usually opens within 10 minutes." };
}

export async function dismissAction(siteId: string, findingId: string) {
  const { site } = await requireSite(siteId);
  await db()
    .update(schema.findings)
    .set({ status: "dismissed", statusReason: "Dismissed by the site owner." })
    .where(and(eq(schema.findings.id, findingId), eq(schema.findings.siteId, site.id)));
  revalidatePath(`/sites/${siteId}`);
}

export async function reopenAction(siteId: string, findingId: string) {
  const { site } = await requireSite(siteId);
  await db()
    .update(schema.findings)
    .set({ status: "open", statusReason: null })
    .where(
      and(
        eq(schema.findings.id, findingId),
        eq(schema.findings.siteId, site.id),
        inArray(schema.findings.status, ["dismissed", "needs_human"]),
      ),
    );
  revalidatePath(`/sites/${siteId}`);
}

export async function revertAction(siteId: string, changeId: string): Promise<ActionState> {
  const { user } = await requireSite(siteId);
  try {
    const url = await requestRevert(changeId, user.id);
    return { ok: true, message: `Revert pull request opened: ${url}` };
  } catch (error) {
    return fail(error);
  }
}

export async function saveSettings(
  siteId: string,
  _: ActionState,
  form: FormData,
): Promise<ActionState> {
  const { site } = await requireSite(siteId);
  const parsed = z
    .object({
      name: z.string().trim().min(1),
      baseUrl: urlSchema,
      brandName: z.string().trim().max(100),
      repoId: z.string().optional(),
      gscProperty: z.string().optional(),
      aiCostCapUsd: z.coerce.number().min(0).max(500),
      previewBypass: z.string().optional(),
    })
    .safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Check the fields." };
  const v = parsed.data;
  const base = new URL(v.baseUrl);
  const update: Partial<typeof schema.sites.$inferInsert> = {
    name: v.name,
    baseUrl: `${base.origin}${base.pathname.replace(/\/$/, "")}`,
    brandName: v.brandName || null,
    aiCostCapUsd: v.aiCostCapUsd,
  };
  if (v.repoId !== undefined) update.repoId = v.repoId ? Number(v.repoId) : null;
  if (v.gscProperty !== undefined) update.gscProperty = v.gscProperty || null;
  if (v.previewBypass) {
    if (!env().ENCRYPTION_KEY)
      return { error: "ENCRYPTION_KEY must be set on the server before saving secrets." };
    update.previewBypassEnc = encrypt(v.previewBypass, env().ENCRYPTION_KEY);
  }
  await db().update(schema.sites).set(update).where(eq(schema.sites.id, site.id));
  if (v.gscProperty && v.gscProperty !== site.gscProperty)
    await enqueue("gsc.sync", { siteId: site.id, days: 90 });
  revalidatePath(`/sites/${siteId}`, "layout");
  return { ok: true, message: "Saved." };
}

export async function gscProperties(
  siteId: string,
): Promise<{ properties: string[]; error?: string }> {
  const { site } = await requireSite(siteId);
  if (!site.googleConnectionId) return { properties: [] };
  try {
    return { properties: await listProperties(site.googleConnectionId) };
  } catch (error) {
    return { properties: [], error: error instanceof Error ? error.message : String(error) };
  }
}

export async function installGithubAction(siteId: string) {
  await requireSite(siteId);
  const state = await issueState("install", siteId);
  const url = installUrl(state);
  if (!url) throw new Error("GITHUB_APP_SLUG is not set");
  redirect(url);
}

export async function uploadAdsAction(
  siteId: string,
  _: ActionState,
  form: FormData,
): Promise<ActionState> {
  const { site } = await requireSite(siteId);
  const files = form.getAll("file").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length === 0) return { error: "Choose at least one CSV file." };
  const messages: string[] = [];
  for (const file of files) {
    if (file.size > 20_000_000) return { error: `${file.name} is larger than 20 MB.` };
    try {
      const r = await importAdsCsv(site.id, file.name, await file.text());
      messages.push(`${file.name}: ${r.rows} rows of ${r.kind.replace("_", " ")}`);
    } catch (error) {
      return {
        error:
          error instanceof AdsParseError ? `${file.name}: ${error.message}` : fail(error).error,
      };
    }
  }
  revalidatePath(`/sites/${siteId}/ads`);
  return { ok: true, message: `Imported ${messages.join("; ")}.` };
}

export async function suggestQuestionsAction(siteId: string): Promise<ActionState> {
  const { site } = await requireSite(siteId);
  try {
    const qs = await suggestQuestions(site.id);
    if (qs.length === 0)
      return { error: "No questions could be suggested yet. Add your own below." };
    await db()
      .insert(schema.aiPrompts)
      .values(qs.map((q) => ({ siteId: site.id, text: q.text, topic: q.topic })));
  } catch (error) {
    return fail(error);
  }
  revalidatePath(`/sites/${siteId}/ai`);
  return { ok: true };
}

export async function addQuestionAction(
  siteId: string,
  _: ActionState,
  form: FormData,
): Promise<ActionState> {
  const { site } = await requireSite(siteId);
  const text = String(form.get("text") ?? "").trim();
  if (text.length < 8) return { error: "Write the question as a full sentence." };
  const existing = await db()
    .select({ id: schema.aiPrompts.id })
    .from(schema.aiPrompts)
    .where(and(eq(schema.aiPrompts.siteId, site.id), eq(schema.aiPrompts.active, true)));
  if (existing.length >= MAX_PROMPTS)
    return { error: `A site can track up to ${MAX_PROMPTS} questions.` };
  await db().insert(schema.aiPrompts).values({ siteId: site.id, text, confirmed: true });
  revalidatePath(`/sites/${siteId}/ai`);
  return { ok: true };
}

export async function confirmQuestionsAction(siteId: string, form: FormData) {
  const { site } = await requireSite(siteId);
  const keep = form.getAll("keep").map(String);
  const prompts = await db()
    .select()
    .from(schema.aiPrompts)
    .where(and(eq(schema.aiPrompts.siteId, site.id), eq(schema.aiPrompts.active, true)));
  for (const p of prompts) {
    await db()
      .update(schema.aiPrompts)
      .set(keep.includes(p.id) ? { confirmed: true } : { active: false })
      .where(eq(schema.aiPrompts.id, p.id));
  }
  revalidatePath(`/sites/${siteId}/ai`);
}

export async function startAiRunAction(siteId: string): Promise<ActionState> {
  const { site } = await requireSite(siteId);
  try {
    await startRun(site.id);
  } catch (error) {
    return fail(error);
  }
  revalidatePath(`/sites/${siteId}/ai`);
  return { ok: true, message: "Run started." };
}

export async function buildReportAction(siteId: string) {
  const { site } = await requireSite(siteId);
  await writeReport(site.id, weekStartOf());
  revalidatePath(`/sites/${siteId}/report`);
}
