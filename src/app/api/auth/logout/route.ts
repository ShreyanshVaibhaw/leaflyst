import { NextResponse } from "next/server";
import { destroySession } from "@/server/auth";
import { env } from "@/server/env";

export async function POST() {
  await destroySession();
  return NextResponse.redirect(new URL("/login", env().APP_URL), 303);
}
