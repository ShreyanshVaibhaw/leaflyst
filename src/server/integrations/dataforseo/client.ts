import { z } from "zod";
import { env } from "@/server/env";

// Endpoints and request shape follow DataForSEO's docs and OpenSEO's client (MIT):
// https://docs.dataforseo.com/v3/ai_optimization/chat_gpt/llm_scraper/overview/
// https://docs.dataforseo.com/v3/serp/google/ai_mode/overview/
export type AiEngine = "chatgpt" | "google_ai_mode";

const ENDPOINT: Record<AiEngine, string> = {
  chatgpt: "/v3/ai_optimization/chat_gpt/llm_scraper/live/advanced",
  google_ai_mode: "/v3/serp/google/ai_mode/live/advanced",
};

// List prices per answer in US dollars, read on 2026-11-23 and undated on the vendor's page.
// The actual charge comes back on each task as `cost` and is what we record.
export const EST_COST_PER_ANSWER: Record<AiEngine, number> = {
  chatgpt: 0.0024,
  google_ai_mode: 0.004,
};

export interface AiAnswer {
  text: string;
  sources: { url: string; domain: string; title: string | null }[];
  costUsd: number;
}

const sourceSchema = z
  .object({
    url: z.string().nullable().optional(),
    domain: z.string().nullable().optional(),
    title: z.string().nullable().optional(),
  })
  .passthrough();
const itemSchema: z.ZodType<{
  type?: string;
  markdown?: string | null;
  text?: string | null;
  references?: z.infer<typeof sourceSchema>[] | null;
  sections?: { text?: string | null }[] | null;
  items?: unknown[] | null;
}> = z
  .object({
    type: z.string().optional(),
    markdown: z.string().nullable().optional(),
    text: z.string().nullable().optional(),
    references: z.array(sourceSchema).nullable().optional(),
    sections: z
      .array(z.object({ text: z.string().nullable().optional() }).passthrough())
      .nullable()
      .optional(),
    items: z.array(z.unknown()).nullable().optional(),
  })
  .passthrough();
const resultSchema = z
  .object({
    markdown: z.string().nullable().optional(),
    sources: z.array(sourceSchema).nullable().optional(),
    items: z.array(itemSchema).nullable().optional(),
  })
  .passthrough();
const responseSchema = z.object({
  status_code: z.number(),
  status_message: z.string().optional(),
  tasks: z
    .array(
      z
        .object({
          status_code: z.number(),
          status_message: z.string().optional(),
          cost: z.number().optional(),
          result: z.array(resultSchema).nullable().optional(),
        })
        .passthrough(),
    )
    .optional(),
});

function domainOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

/** Normalises both engines' results into answer text plus cited sources. */
export function parseAnswer(
  engine: AiEngine,
  result: z.infer<typeof resultSchema> | undefined,
  cost: number,
): AiAnswer {
  const sources: AiAnswer["sources"] = [];
  const addSource = (s: z.infer<typeof sourceSchema>) => {
    if (!s.url) return;
    sources.push({
      url: s.url,
      domain: (s.domain ?? domainOf(s.url)).replace(/^www\./, ""),
      title: s.title ?? null,
    });
  };
  let text = "";
  if (engine === "google_ai_mode") {
    const overviews = (result?.items ?? []).filter((i) => i.type === "ai_overview");
    text = overviews.map((o) => o.markdown ?? o.text ?? "").join("\n\n");
    for (const o of overviews) (o.references ?? []).forEach(addSource);
  } else {
    text =
      result?.markdown ??
      (result?.items ?? [])
        .filter((i) => i.type === "message")
        .flatMap((i) => (i.sections ?? []).map((s) => s.text ?? ""))
        .join("\n\n");
    (result?.sources ?? []).forEach(addSource);
  }
  const seen = new Set<string>();
  return {
    text,
    sources: sources.filter((s) => (seen.has(s.url) ? false : (seen.add(s.url), true))),
    costUsd: cost,
  };
}

export async function askEngine(
  engine: AiEngine,
  prompt: string,
  market = { locationCode: 2840, languageCode: "en" },
): Promise<AiAnswer> {
  const e = env();
  if (!e.DATAFORSEO_LOGIN || !e.DATAFORSEO_PASSWORD)
    throw new Error("DataForSEO is not configured");
  const res = await fetch(`https://api.dataforseo.com${ENDPOINT[engine]}`, {
    method: "POST",
    headers: {
      authorization: `Basic ${Buffer.from(`${e.DATAFORSEO_LOGIN}:${e.DATAFORSEO_PASSWORD}`).toString("base64")}`,
      "content-type": "application/json",
    },
    // DataForSEO decodes %-escapes in keywords, so literal % and + are escaped.
    body: JSON.stringify([
      {
        keyword: prompt.replace(/%/g, "%25").replace(/\+/g, "%2B"),
        location_code: market.locationCode,
        language_code: market.languageCode,
      },
    ]),
    signal: AbortSignal.timeout(150_000),
  });
  if (!res.ok) throw new Error(`DataForSEO returned HTTP ${res.status}`);
  const body = responseSchema.parse(await res.json());
  const task = body.tasks?.[0];
  if (body.status_code !== 20000 || !task)
    throw new Error(`DataForSEO error ${body.status_code}: ${body.status_message ?? ""}`);
  if (task.status_code !== 20000)
    throw new Error(`DataForSEO task error ${task.status_code}: ${task.status_message ?? ""}`);
  return parseAnswer(engine, task.result?.[0], task.cost ?? 0);
}
