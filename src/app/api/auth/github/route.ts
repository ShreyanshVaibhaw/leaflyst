import { NextResponse } from "next/server";
import { issueState } from "@/server/auth";
import { authorizeUrl } from "@/server/integrations/github/oauth";

export async function GET() {
  const state = await issueState("github", "login");
  return NextResponse.redirect(authorizeUrl(state));
}
