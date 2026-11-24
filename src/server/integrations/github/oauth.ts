import { z } from "zod";
import { env } from "@/server/env";

// GitHub App user authorization, used for "Sign in with GitHub".
// https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app

export function authorizeUrl(state: string): string {
  const e = env();
  if (!e.GITHUB_APP_CLIENT_ID) throw new Error("GitHub sign-in is not configured");
  const u = new URL("https://github.com/login/oauth/authorize");
  u.searchParams.set("client_id", e.GITHUB_APP_CLIENT_ID);
  u.searchParams.set("redirect_uri", `${e.APP_URL}/api/auth/github/callback`);
  u.searchParams.set("state", state);
  return u.toString();
}

const tokenSchema = z.object({ access_token: z.string() });
const userSchema = z.object({
  id: z.number(),
  login: z.string(),
  name: z.string().nullable(),
  email: z.string().nullable(),
});

export async function exchangeCode(code: string) {
  const e = env();
  const res = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/json" },
    body: JSON.stringify({
      client_id: e.GITHUB_APP_CLIENT_ID,
      client_secret: e.GITHUB_APP_CLIENT_SECRET,
      code,
    }),
  });
  const { access_token } = tokenSchema.parse(await res.json());
  const userRes = await fetch("https://api.github.com/user", {
    headers: {
      authorization: `Bearer ${access_token}`,
      accept: "application/vnd.github+json",
      "user-agent": "leaflyst",
    },
  });
  if (!userRes.ok) throw new Error(`GitHub /user returned ${userRes.status}`);
  return userSchema.parse(await userRes.json());
}
