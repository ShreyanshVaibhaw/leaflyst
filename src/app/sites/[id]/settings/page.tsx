import { eq } from "drizzle-orm";
import { requireSite } from "@/server/auth";
import { db, schema } from "@/server/db/client";
import { integrationStatus } from "@/server/env";
import { ActionForm, SubmitButton } from "../../../components";
import { gscProperties, installGithubAction, saveSettings } from "../../../actions";

export default async function Settings({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; google?: string }>;
}) {
  const { id } = await params;
  const { error, google } = await searchParams;
  const { user, site } = await requireSite(id);
  const s = integrationStatus();
  // Repos from installations this user set up.
  const repos = await db()
    .select({ repo: schema.repos })
    .from(schema.repos)
    .innerJoin(
      schema.githubInstallations,
      eq(schema.githubInstallations.id, schema.repos.installationId),
    )
    .where(eq(schema.githubInstallations.userId, user.id));
  const gsc = await gscProperties(site.id);

  return (
    <div className="stack">
      {error === "google-no-refresh" ? (
        <p className="notice notice-error small">
          Google did not return a long-lived token. Remove Leaflyst from your Google account&apos;s
          third-party access, then connect again.
        </p>
      ) : null}
      {google === "connected" ? (
        <p className="notice notice-ok small">
          Google connected. Pick the Search Console property below and save.
        </p>
      ) : null}

      <div className="card stack">
        <h2>Connections</h2>
        <div className="row between">
          <div className="grow">
            <strong>GitHub repository</strong>
            <div className="small muted">
              Lets Leaflyst open pull requests. It asks for access to code, pull requests and checks
              on the repositories you choose, nothing else.
            </div>
          </div>
          {s.github ? (
            <form action={installGithubAction.bind(null, site.id)}>
              <SubmitButton small>
                {repos.length ? "Add or change repositories" : "Install the GitHub App"}
              </SubmitButton>
            </form>
          ) : (
            <span className="small muted">Not configured on this server</span>
          )}
        </div>
        <div className="row between">
          <div className="grow">
            <strong>Google Search Console</strong>
            <div className="small muted">
              Read-only. Used to rank findings by real traffic and to score each change.
            </div>
          </div>
          {s.google ? (
            <a className="btn btn-sm" href={`/api/google/connect?siteId=${site.id}`}>
              {site.googleConnectionId ? "Reconnect Google" : "Connect Google"}
            </a>
          ) : (
            <span className="small muted">Not configured on this server</span>
          )}
        </div>
        {gsc.error ? <p className="notice notice-error small">{gsc.error}</p> : null}
      </div>

      <div className="card stack">
        <h2>Site</h2>
        <ActionForm action={saveSettings.bind(null, site.id)} className="stack">
          <div className="grid-2">
            <label>
              Name
              <input type="text" name="name" defaultValue={site.name} required />
            </label>
            <label>
              Website address
              <input type="text" name="baseUrl" defaultValue={site.baseUrl} required />
            </label>
            <label>
              Brand name
              <span className="hint">The name AI answers are checked for.</span>
              <input type="text" name="brandName" defaultValue={site.brandName ?? ""} />
            </label>
            <label>
              AI visibility cost cap per run, in US dollars
              <input
                type="number"
                name="aiCostCapUsd"
                defaultValue={site.aiCostCapUsd}
                min={0}
                max={500}
                step="0.5"
              />
            </label>
            <label>
              Repository
              <select name="repoId" defaultValue={site.repoId ? String(site.repoId) : ""}>
                <option value="">None</option>
                {repos.map(({ repo }) => (
                  <option key={repo.id} value={repo.id}>
                    {repo.fullName}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Search Console property
              <select name="gscProperty" defaultValue={site.gscProperty ?? ""}>
                <option value="">None</option>
                {[
                  ...new Set([...(site.gscProperty ? [site.gscProperty] : []), ...gsc.properties]),
                ].map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Preview protection bypass secret
              <span className="hint">
                Only if your Vercel previews need a login.{" "}
                {site.previewBypassEnc
                  ? "One is saved. Enter a new one to replace it."
                  : "Stored encrypted."}
              </span>
              <input type="password" name="previewBypass" autoComplete="off" />
            </label>
          </div>
          <div>
            <SubmitButton primary>Save</SubmitButton>
          </div>
        </ActionForm>
      </div>

      <div className="card stack">
        <h2>What Leaflyst can access</h2>
        <ul className="small">
          <li>Your public website, read the same way search and AI crawlers read it.</li>
          <li>
            The repositories you select, to push a branch and open pull requests. It never pushes to
            your default branch and never merges.
          </li>
          <li>Search Console data, read-only.</li>
          <li>Ad reports you upload. It has no access to your ad account.</li>
          <li>
            Fixes run in a sandbox hosted by Anthropic, where your repository is processed. Session
            history is kept until Leaflyst deletes it.
          </li>
        </ul>
      </div>
    </div>
  );
}
