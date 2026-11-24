import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { currentUser } from "@/server/auth";
import { devLoginEnabled, integrationStatus } from "@/server/env";

export const metadata: Metadata = { title: "Sign in" };

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await currentUser()) redirect("/sites");
  const { error } = await searchParams;
  const github = integrationStatus().githubLogin;
  const dev = devLoginEnabled();
  return (
    <div style={{ maxWidth: 420, margin: "48px auto" }} className="stack">
      <div>
        <h1>Sign in to Leaflyst</h1>
        <p className="muted">
          Leaflyst finds what holds back your search and AI visibility, fixes it in your repo, and
          shows what changed.
        </p>
      </div>
      {error ? (
        <p className="notice notice-error small">Sign-in did not complete. Try again.</p>
      ) : null}
      <div className="card stack">
        {github ? (
          <a className="btn btn-primary" href="/api/auth/github">
            Sign in with GitHub
          </a>
        ) : (
          <p className="small muted">GitHub sign-in is not configured on this server yet.</p>
        )}
        {dev ? (
          <form action="/api/auth/dev" method="post">
            <button className="btn" type="submit" style={{ width: "100%" }}>
              Continue as local developer
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
}
