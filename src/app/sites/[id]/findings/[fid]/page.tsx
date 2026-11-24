import Link from "next/link";
import { and, desc, eq } from "drizzle-orm";
import { requireSite } from "@/server/auth";
import { db, schema } from "@/server/db/client";
import { fixBlockers } from "@/server/fixes/service";
import { ActionForm, AutoRefresh, SubmitButton } from "../../../../components";
import { dismissAction, fixAction, reopenAction } from "../../../../actions";
import { SeverityBadge, StatusBadge, when } from "../../../../ui";

const FIX_LABEL: Record<string, string> = {
  F1: "Edit robots.txt rules",
  F2: "Add or correct page titles, descriptions and canonical tags",
  F3: "Add or fix the sitemap",
  F4: "Point internal links straight at live pages",
  F5: "Render the page content on the server",
  F6: "Add internal links",
};

export default async function FindingPage({
  params,
}: {
  params: Promise<{ id: string; fid: string }>;
}) {
  const { id, fid } = await params;
  const { site } = await requireSite(id);
  const d = db();
  const [finding] = await d
    .select()
    .from(schema.findings)
    .where(and(eq(schema.findings.id, fid), eq(schema.findings.siteId, site.id)));
  if (!finding) return <p className="notice">This finding does not exist.</p>;
  const changes = await d
    .select()
    .from(schema.changes)
    .where(eq(schema.changes.findingId, finding.id))
    .orderBy(desc(schema.changes.createdAt));
  const blockers = fixBlockers(site, finding);
  const busy = ["queued", "fixing"].includes(finding.status);

  return (
    <div className="stack">
      <AutoRefresh active={busy} everyMs={5000} />
      <Link href={`/sites/${site.id}`} className="small">
        Back to findings
      </Link>
      <div className="card stack">
        <div className="row">
          <SeverityBadge severity={finding.severity} />
          <StatusBadge status={finding.status} />
        </div>
        <h2>{finding.title}</h2>
        <p>{finding.expectedEffect}</p>
        {finding.statusReason ? <p className="notice small">{finding.statusReason}</p> : null}
        <div>
          <h3>Affected pages</h3>
          <ul className="small">
            {finding.affectedPaths.map((p) => (
              <li key={p}>
                <a href={`${site.baseUrl}${p}`} target="_blank" rel="noreferrer" className="mono">
                  {p}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card stack">
        <h2>Fix</h2>
        {finding.fixType ? (
          <>
            <p>
              Leaflyst will {FIX_LABEL[finding.fixType]?.toLowerCase() ?? "make the change"} in a
              new branch, open one pull request for you to review, and check the result on the
              preview and on the live site. It never merges for you.
            </p>
            {blockers.length ? (
              <ul className="small muted">
                {blockers.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            ) : null}
            <ActionForm action={fixAction.bind(null, site.id, finding.id)} className="row">
              <SubmitButton primary disabled={blockers.length > 0}>
                Fix with a pull request
              </SubmitButton>
            </ActionForm>
          </>
        ) : (
          <p>
            This one needs a person: Leaflyst cannot check a code change for it automatically, so it
            reports the problem and the evidence only.
          </p>
        )}
        <div className="row">
          {finding.status === "open" ? (
            <form action={dismissAction.bind(null, site.id, finding.id)}>
              <SubmitButton small>Dismiss</SubmitButton>
            </form>
          ) : null}
          {["dismissed", "needs_human"].includes(finding.status) ? (
            <form action={reopenAction.bind(null, site.id, finding.id)}>
              <SubmitButton small>Reopen</SubmitButton>
            </form>
          ) : null}
        </div>
      </div>

      {changes.length ? (
        <div className="card stack">
          <h2>Changes for this finding</h2>
          <ul className="small">
            {changes.map((c) => (
              <li key={c.id}>
                <StatusBadge status={c.status} /> {when(c.createdAt)}{" "}
                {c.prUrl ? (
                  <a href={c.prUrl} target="_blank" rel="noreferrer">
                    pull request #{c.prNumber}
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="card stack">
        <h2>Evidence</h2>
        <p className="small muted">What the crawler saw, exactly as recorded.</p>
        <pre>{JSON.stringify(finding.evidence, null, 2)}</pre>
      </div>
    </div>
  );
}
