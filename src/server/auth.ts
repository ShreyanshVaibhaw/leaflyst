import { and, eq, gt } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db, schema } from "@/server/db/client";
import { env } from "@/server/env";
import { randomToken, sha256 } from "@/server/lib/crypto";

const COOKIE = "leaflyst_session";
const MAX_AGE_DAYS = 30;

export async function createSession(userId: string) {
  const token = randomToken();
  const expiresAt = new Date(Date.now() + MAX_AGE_DAYS * 86_400_000);
  await db()
    .insert(schema.sessions)
    .values({ tokenHash: sha256(token), userId, expiresAt });
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: env().APP_URL.startsWith("https://"),
    path: "/",
    expires: expiresAt,
  });
}

export async function currentUser() {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const [row] = await db()
    .select({ user: schema.users })
    .from(schema.sessions)
    .innerJoin(schema.users, eq(schema.users.id, schema.sessions.userId))
    .where(
      and(eq(schema.sessions.tokenHash, sha256(token)), gt(schema.sessions.expiresAt, new Date())),
    );
  return row?.user ?? null;
}

export async function requireUser() {
  const user = await currentUser();
  if (!user) redirect("/login");
  return user;
}

export async function destroySession() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (token)
    await db()
      .delete(schema.sessions)
      .where(eq(schema.sessions.tokenHash, sha256(token)));
  jar.delete(COOKIE);
}

/** Every page and action that touches a site goes through this, so users only see their own sites. */
export async function requireSite(siteId: string) {
  const user = await requireUser();
  if (!/^[0-9a-f-]{36}$/i.test(siteId)) redirect("/sites");
  const [site] = await db()
    .select()
    .from(schema.sites)
    .where(and(eq(schema.sites.id, siteId), eq(schema.sites.userId, user.id)));
  if (!site) redirect("/sites");
  return { user, site };
}

/** CSRF-safe state for OAuth round trips: a random value kept in a short-lived cookie. */
export async function issueState(name: string, payload: string) {
  const nonce = randomToken(16);
  (await cookies()).set(`leaflyst_${name}_state`, `${nonce}.${payload}`, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });
  return `${nonce}.${payload}`;
}

export async function consumeState(name: string, returned: string | null): Promise<string | null> {
  const jar = await cookies();
  const stored = jar.get(`leaflyst_${name}_state`)?.value;
  jar.delete(`leaflyst_${name}_state`);
  if (!stored || !returned || stored !== returned) return null;
  return stored.slice(stored.indexOf(".") + 1);
}
