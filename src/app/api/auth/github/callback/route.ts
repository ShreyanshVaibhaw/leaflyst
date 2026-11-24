import { NextResponse, type NextRequest } from "next/server";
import { consumeState, createSession } from "@/server/auth";
import { db, schema } from "@/server/db/client";
import { env } from "@/server/env";
import { exchangeCode } from "@/server/integrations/github/oauth";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const ok = await consumeState("github", req.nextUrl.searchParams.get("state"));
  if (!code || !ok) return NextResponse.redirect(new URL("/login?error=state", env().APP_URL));
  const gh = await exchangeCode(code);
  const [user] = await db()
    .insert(schema.users)
    .values({ githubId: gh.id, login: gh.login, name: gh.name, email: gh.email })
    .onConflictDoUpdate({
      target: schema.users.githubId,
      set: { login: gh.login, name: gh.name, email: gh.email },
    })
    .returning();
  if (!user) throw new Error("could not save user");
  await createSession(user.id);
  return NextResponse.redirect(new URL("/sites", env().APP_URL));
}
