import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { db, schema } from "@/server/db/client";
import { env } from "@/server/env";

export const MODEL = "claude-opus-5-5";

let client: Anthropic | null = null;
function anthropic() {
  client ??= new Anthropic({ apiKey: env().ANTHROPIC_API_KEY });
  return client;
}

export function llmAvailable() {
  return Boolean(env().ANTHROPIC_API_KEY);
}

/**
 * One structured call: the model returns JSON matching the zod schema, which we
 * validate before use. Refusals and truncation become errors, and Anthropic's
 * server-side fallback handles policy declines.
 */
export async function structured<T extends z.ZodType>(opts: {
  purpose: string;
  siteId?: string;
  system: string;
  prompt: string;
  schema: T;
  effort?: "low" | "medium" | "high";
  maxTokens?: number;
}): Promise<z.infer<T>> {
  const res = await anthropic().beta.messages.create({
    model: MODEL,
    max_tokens: opts.maxTokens ?? 8000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    system: [{ type: "text", text: opts.system, cache_control: { type: "ephemeral" } }],
    messages: [{ role: "user", content: opts.prompt }],
    output_config: {
      effort: opts.effort ?? "medium",
      format: {
        type: "json_schema",
        schema: z.toJSONSchema(opts.schema) as Record<string, unknown>,
      },
    },
  });
  await db()
    .insert(schema.llmUsage)
    .values({
      siteId: opts.siteId ?? null,
      purpose: opts.purpose,
      model: res.model,
      inputTokens: res.usage.input_tokens,
      outputTokens: res.usage.output_tokens,
      cacheReadTokens: res.usage.cache_read_input_tokens ?? 0,
    })
    .catch(() => {});
  if (res.stop_reason === "refusal") throw new Error("The model declined this request.");
  if (res.stop_reason === "max_tokens") throw new Error("The model's answer was cut off.");
  const text = res.content.flatMap((b) => (b.type === "text" ? [b.text] : [])).join("");
  return opts.schema.parse(JSON.parse(text));
}
