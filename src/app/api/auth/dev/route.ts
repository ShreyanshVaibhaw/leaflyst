import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { createSession } from "@/server/auth";
import { db, schema } from "@/server/db/client";
import { devLoginEnabled, env } from "@/server/env";

// Local sign-in for development, when no GitHub App is set up. Works on localhost only.
export async function POST() {
  if (!devLoginEnabled()) return new NextResponse("Not found", { status: 404 });
  let [user] = await db().select().from(schema.users).where(eq(schema.users.login, "dev"));
  user ??= (
    await db().insert(schema.users).values({ login: "dev", name: "Local developer" }).returning()
  )[0];
  if (!user) throw new Error("could not create dev user");
  await createSession(user.id);
  return NextResponse.redirect(new URL("/sites", env().APP_URL), 303);
}
