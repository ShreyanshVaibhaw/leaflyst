import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";
import { consumeState, requireUser } from "@/server/auth";
import { db, schema } from "@/server/db/client";
import { env } from "@/server/env";
import { installationClient } from "@/server/integrations/github/app";

// GitHub sends the user here after they install the app ("Setup URL" in the app settings).
export async function GET(req: NextRequest) {
  const user = await requireUser();
  const installationId = Number(req.nextUrl.searchParams.get("installation_id"));
  const siteId = await consumeState("install", req.nextUrl.searchParams.get("state"));
  if (!installationId) return NextResponse.redirect(new URL("/sites", env().APP_URL));
  const gh = await installationClient(installationId);
  const { data: inst } = await gh.request("GET /installation/repositories", { per_page: 100 });
  const account = inst.repositories[0]?.owner.login ?? "unknown";
  await db()
    .insert(schema.githubInstallations)
    .values({ id: installationId, userId: user.id, accountLogin: account })
    .onConflictDoUpdate({ target: schema.githubInstallations.id, set: { userId: user.id } });
  for (const r of inst.repositories) {
    await db()
      .insert(schema.repos)
      .values({
        id: Number(r.id),
        installationId,
        fullName: r.full_name,
        defaultBranch: r.default_branch,
      })
      .onConflictDoUpdate({
        target: schema.repos.id,
        set: { installationId, fullName: r.full_name, defaultBranch: r.default_branch },
      });
  }
  if (siteId && inst.repositories.length === 1 && inst.repositories[0]) {
    await db()
      .update(schema.sites)
      .set({ repoId: Number(inst.repositories[0].id) })
      .where(eq(schema.sites.id, siteId));
  }
  return NextResponse.redirect(
    new URL(siteId ? `/sites/${siteId}/settings` : "/sites", env().APP_URL),
  );
}
