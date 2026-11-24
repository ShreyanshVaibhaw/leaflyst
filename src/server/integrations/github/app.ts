import { App } from "@octokit/app";
import { Octokit } from "@octokit/rest";
import { verify } from "@octokit/webhooks-methods";
import { env } from "@/server/env";

let cachedApp: App | null = null;

export function githubApp(): App {
  const e = env();
  if (!e.GITHUB_APP_ID || !e.GITHUB_APP_PRIVATE_KEY)
    throw new Error("GitHub App is not configured");
  cachedApp ??= new App({
    appId: e.GITHUB_APP_ID,
    // Private keys pasted into .env usually have literal "\n".
    privateKey: e.GITHUB_APP_PRIVATE_KEY.replace(/\\n/g, "\n"),
    Octokit: Octokit.defaults({ userAgent: "leaflyst" }),
  });
  return cachedApp;
}

/** A REST client acting as one installation. */
export async function installationClient(installationId: number): Promise<Octokit> {
  return (await githubApp().getInstallationOctokit(installationId)) as unknown as Octokit;
}

/**
 * A short-lived token for one repository, with only the permissions a fix needs.
 * Minted per job and never stored.
 */
export async function mintRepoToken(installationId: number, repoId: number): Promise<string> {
  const res = await githubApp().octokit.request(
    "POST /app/installations/{installation_id}/access_tokens",
    {
      installation_id: installationId,
      repository_ids: [repoId],
      permissions: { contents: "write", pull_requests: "write", metadata: "read" },
    },
  );
  return (res.data as { token: string }).token;
}

export async function verifyWebhook(body: string, signature: string | null): Promise<boolean> {
  const secret = env().GITHUB_WEBHOOK_SECRET;
  if (!secret || !signature) return false;
  try {
    return await verify(secret, body, signature);
  } catch {
    return false;
  }
}

export function splitRepo(fullName: string): { owner: string; repo: string } {
  const [owner, repo] = fullName.split("/");
  if (!owner || !repo) throw new Error(`bad repo name ${fullName}`);
  return { owner, repo };
}

export function installUrl(state: string): string | null {
  const slug = env().GITHUB_APP_SLUG;
  return slug
    ? `https://github.com/apps/${slug}/installations/new?state=${encodeURIComponent(state)}`
    : null;
}
