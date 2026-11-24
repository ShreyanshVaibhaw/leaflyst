import { and, eq, gte, sql } from "drizzle-orm";
import { z } from "zod";
import { db, schema } from "@/server/db/client";
import { env } from "@/server/env";
import { decrypt } from "@/server/lib/crypto";
import type { GscData } from "@/server/checks/types";

// https://developers.google.com/webmaster-tools/v1/searchanalytics/query
export const GOOGLE_SCOPES = [
  "openid",
  "email",
  "https://www.googleapis.com/auth/webmasters.readonly",
  "https://www.googleapis.com/auth/analytics.readonly",
];

export function googleAuthUrl(state: string): string {
  const e = env();
  const u = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  u.searchParams.set("client_id", e.GOOGLE_CLIENT_ID ?? "");
  u.searchParams.set("redirect_uri", `${e.APP_URL}/api/google/callback`);
  u.searchParams.set("response_type", "code");
  u.searchParams.set("scope", GOOGLE_SCOPES.join(" "));
  // offline + consent: we need a refresh token for daily syncs.
  u.searchParams.set("access_type", "offline");
  u.searchParams.set("prompt", "consent");
  u.searchParams.set("state", state);
  return u.toString();
}

const tokenSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string().optional(),
  scope: z.string().optional(),
  id_token: z.string().optional(),
});

export async function exchangeGoogleCode(code: string) {
  const e = env();
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: e.GOOGLE_CLIENT_ID ?? "",
      client_secret: e.GOOGLE_CLIENT_SECRET ?? "",
      redirect_uri: `${e.APP_URL}/api/google/callback`,
      grant_type: "authorization_code",
    }),
  });
  if (!res.ok) throw new Error(`Google token exchange returned ${res.status}`);
  const token = tokenSchema.parse(await res.json());
  let email: string | null = null;
  if (token.id_token) {
    const payload = JSON.parse(
      Buffer.from(token.id_token.split(".")[1] ?? "", "base64url").toString(),
    ) as { email?: string };
    email = payload.email ?? null;
  }
  return { ...token, email };
}

async function accessToken(connectionId: string): Promise<string> {
  const e = env();
  const [conn] = await db()
    .select()
    .from(schema.googleConnections)
    .where(eq(schema.googleConnections.id, connectionId));
  if (!conn) throw new Error("Google connection not found");
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: e.GOOGLE_CLIENT_ID ?? "",
      client_secret: e.GOOGLE_CLIENT_SECRET ?? "",
      refresh_token: decrypt(conn.refreshTokenEnc, e.ENCRYPTION_KEY),
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok)
    throw new Error(`Google refresh returned ${res.status}. The account may need to reconnect.`);
  return tokenSchema.parse(await res.json()).access_token;
}

export async function listProperties(connectionId: string): Promise<string[]> {
  const token = await accessToken(connectionId);
  const res = await fetch("https://www.googleapis.com/webmasters/v3/sites", {
    headers: { authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Search Console sites returned ${res.status}`);
  const body = (await res.json()) as { siteEntry?: { siteUrl: string; permissionLevel: string }[] };
  return (body.siteEntry ?? [])
    .filter((s) => s.permissionLevel !== "siteUnverifiedUser")
    .map((s) => s.siteUrl);
}

const rowSchema = z.object({
  keys: z.array(z.string()),
  clicks: z.number(),
  impressions: z.number(),
  position: z.number(),
});

async function query(token: string, property: string, body: Record<string, unknown>) {
  const rows: z.infer<typeof rowSchema>[] = [];
  // The API returns at most 25,000 rows per call.
  for (let startRow = 0; startRow < 200_000; startRow += 25_000) {
    const res = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/searchAnalytics/query`,
      {
        method: "POST",
        headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
        body: JSON.stringify({ ...body, rowLimit: 25_000, startRow, dataState: "final" }),
      },
    );
    if (!res.ok)
      throw new Error(
        `Search Console query returned ${res.status}: ${(await res.text()).slice(0, 300)}`,
      );
    const page = z.object({ rows: z.array(rowSchema).optional() }).parse(await res.json());
    rows.push(...(page.rows ?? []));
    if ((page.rows?.length ?? 0) < 25_000) break;
  }
  return rows;
}

function isoDay(d: Date) {
  return d.toISOString().slice(0, 10);
}

/** Pulls daily rows by page, and by query and page, into metric_daily. Safe to rerun. */
export async function syncSearchConsole(siteId: string, days: number) {
  const [site] = await db().select().from(schema.sites).where(eq(schema.sites.id, siteId));
  if (!site?.googleConnectionId || !site.gscProperty)
    return { rows: 0, skipped: "Search Console is not connected" };
  const token = await accessToken(site.googleConnectionId);
  const end = new Date(Date.now() - 2 * 86_400_000);
  const start = new Date(end.getTime() - (days - 1) * 86_400_000);
  const range = { startDate: isoDay(start), endDate: isoDay(end), type: "web" };

  const byPage = await query(token, site.gscProperty, { ...range, dimensions: ["date", "page"] });
  const byQuery = await query(token, site.gscProperty, {
    ...range,
    dimensions: ["date", "query", "page"],
  });
  const values = [
    ...byPage.map((r) => ({ date: r.keys[0] ?? "", page: r.keys[1] ?? "", query: "", r })),
    ...byQuery.map((r) => ({
      date: r.keys[0] ?? "",
      query: r.keys[1] ?? "",
      page: r.keys[2] ?? "",
      r,
    })),
  ].map(({ date, page, query: q, r }) => ({
    siteId,
    source: "gsc",
    date,
    page,
    query: q,
    clicks: r.clicks,
    impressions: r.impressions,
    position: r.position,
  }));
  for (let i = 0; i < values.length; i += 1000) {
    await db()
      .insert(schema.metricDaily)
      .values(values.slice(i, i + 1000))
      .onConflictDoUpdate({
        target: [
          schema.metricDaily.siteId,
          schema.metricDaily.source,
          schema.metricDaily.date,
          schema.metricDaily.page,
          schema.metricDaily.query,
        ],
        set: {
          clicks: sql`excluded.clicks`,
          impressions: sql`excluded.impressions`,
          position: sql`excluded.position`,
        },
      });
  }
  return { rows: values.length };
}

/** The last 28 days of stored Search Console data, shaped for the checks. */
export async function loadGscData(siteId: string, days = 28): Promise<GscData | null> {
  const since = isoDay(new Date(Date.now() - (days + 2) * 86_400_000));
  const d = db();
  const where = and(
    eq(schema.metricDaily.siteId, siteId),
    eq(schema.metricDaily.source, "gsc"),
    gte(schema.metricDaily.date, since),
  );
  const pages = await d
    .select({
      page: schema.metricDaily.page,
      clicks: sql<number>`sum(${schema.metricDaily.clicks})::int`,
      impressions: sql<number>`sum(${schema.metricDaily.impressions})::int`,
      position: sql<number>`sum(${schema.metricDaily.position} * ${schema.metricDaily.impressions}) / nullif(sum(${schema.metricDaily.impressions}), 0)`,
    })
    .from(schema.metricDaily)
    .where(and(where, eq(schema.metricDaily.query, "")))
    .groupBy(schema.metricDaily.page);
  if (pages.length === 0) return null;
  const queries = await d
    .select({
      query: schema.metricDaily.query,
      page: schema.metricDaily.page,
      clicks: sql<number>`sum(${schema.metricDaily.clicks})::int`,
      impressions: sql<number>`sum(${schema.metricDaily.impressions})::int`,
      position: sql<number>`sum(${schema.metricDaily.position} * ${schema.metricDaily.impressions}) / nullif(sum(${schema.metricDaily.impressions}), 0)`,
    })
    .from(schema.metricDaily)
    .where(and(where, sql`${schema.metricDaily.query} <> ''`))
    .groupBy(schema.metricDaily.query, schema.metricDaily.page);
  return { pages, queries };
}
