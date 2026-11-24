import { NextResponse, type NextRequest } from "next/server";
import { issueState, requireSite } from "@/server/auth";
import { googleAuthUrl } from "@/server/integrations/google/search-console";

export async function GET(req: NextRequest) {
  const { site } = await requireSite(req.nextUrl.searchParams.get("siteId") ?? "");
  const state = await issueState("google", site.id);
  return NextResponse.redirect(googleAuthUrl(state));
}
