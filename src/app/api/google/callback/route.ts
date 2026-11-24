import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";
import { consumeState, requireSite } from "@/server/auth";
import { db, schema } from "@/server/db/client";
import { env } from "@/server/env";
import { encrypt } from "@/server/lib/crypto";
import { exchangeGoogleCode } from "@/server/integrations/google/search-console";

export async function GET(req: NextRequest) {
  const siteId = await consumeState("google", req.nextUrl.searchParams.get("state"));
  const code = req.nextUrl.searchParams.get("code");
  if (!siteId || !code) return NextResponse.redirect(new URL("/sites", env().APP_URL));
  const { user, site } = await requireSite(siteId);
  const token = await exchangeGoogleCode(code);
  if (!token.refresh_token) {
    return NextResponse.redirect(
      new URL(`/sites/${site.id}/settings?error=google-no-refresh`, env().APP_URL),
    );
  }
  const [conn] = await db()
    .insert(schema.googleConnections)
    .values({
      userId: user.id,
      email: token.email,
      refreshTokenEnc: encrypt(token.refresh_token, env().ENCRYPTION_KEY),
      scopes: token.scope ?? "",
    })
    .returning();
  if (!conn) throw new Error("could not save Google connection");
  await db()
    .update(schema.sites)
    .set({ googleConnectionId: conn.id })
    .where(eq(schema.sites.id, site.id));
  return NextResponse.redirect(
    new URL(`/sites/${site.id}/settings?google=connected`, env().APP_URL),
  );
}
