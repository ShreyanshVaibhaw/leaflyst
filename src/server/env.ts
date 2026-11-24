import { z } from "zod";

// Empty strings in .env count as "not set", so optional integrations stay optional.
const optional = z
  .string()
  .optional()
  .transform((v) => (v && v.trim() !== "" ? v : undefined));

const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().default("postgres://localhost:5432/leaflyst"),
  APP_URL: z.string().url().default("http://localhost:3000"),
  ENCRYPTION_KEY: optional,
  SESSION_SECRET: optional,
  DEV_LOGIN: optional,
  GITHUB_APP_ID: optional,
  GITHUB_APP_SLUG: optional,
  GITHUB_APP_PRIVATE_KEY: optional,
  GITHUB_APP_CLIENT_ID: optional,
  GITHUB_APP_CLIENT_SECRET: optional,
  GITHUB_WEBHOOK_SECRET: optional,
  GOOGLE_CLIENT_ID: optional,
  GOOGLE_CLIENT_SECRET: optional,
  DATAFORSEO_LOGIN: optional,
  DATAFORSEO_PASSWORD: optional,
  ANTHROPIC_API_KEY: optional,
  FIX_AGENT_ID: optional,
  FIX_ENVIRONMENT_ID: optional,
});

export type Env = z.infer<typeof schema>;

let cached: Env | undefined;

export function env(): Env {
  cached ??= schema.parse(process.env);
  return cached;
}

/**
 * Dev login lets the product be used on localhost without a GitHub App.
 * It only works when the app itself is served from localhost, so a deployed
 * server cannot enable it by mistake.
 */
export function devLoginEnabled(): boolean {
  const e = env();
  const host = new URL(e.APP_URL).hostname;
  return e.DEV_LOGIN === "true" && (host === "localhost" || host === "127.0.0.1");
}

export function integrationStatus() {
  const e = env();
  return {
    github: Boolean(e.GITHUB_APP_ID && e.GITHUB_APP_PRIVATE_KEY && e.GITHUB_WEBHOOK_SECRET),
    githubLogin: Boolean(e.GITHUB_APP_CLIENT_ID && e.GITHUB_APP_CLIENT_SECRET),
    google: Boolean(e.GOOGLE_CLIENT_ID && e.GOOGLE_CLIENT_SECRET && e.ENCRYPTION_KEY),
    dataforseo: Boolean(e.DATAFORSEO_LOGIN && e.DATAFORSEO_PASSWORD),
    anthropic: Boolean(e.ANTHROPIC_API_KEY),
    fixAgent: Boolean(e.ANTHROPIC_API_KEY && e.FIX_AGENT_ID && e.FIX_ENVIRONMENT_ID),
  };
}
