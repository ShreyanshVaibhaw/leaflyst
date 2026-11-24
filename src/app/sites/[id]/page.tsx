import Link from "next/link";
import { and, desc, eq, inArray, sql } from "drizzle-orm";
import { requireSite } from "@/server/auth";
import { db, schema } from "@/server/db/client";
import { integrationStatus } from "@/server/env";
import { AutoRefresh, SubmitButton } from "../../components";
import { runAuditAction } from "../../actions";
import { Empty, SeverityBadge, StatusBadge, when } from "../../ui";

const OPEN = [
  "open",
  "queued",
  "fixing",
  "pr_open",
  "merged",
  "failed_verification",
  "needs_human",
];

export default async function SiteFindings({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ show?: string }>;
}) {
  const { id } = await params;
  const { show } = await searchParams;
  const { site } = await requireSite(id);
  const d = db();
  const [run] = await d
    .select()
    .from(schema.crawlRuns)
    .where(eq(schema.crawlRuns.siteId, site.id))
    .orderBy(desc(schema.crawlRuns.createdAt))
    .limit(1);
  const statuses = show === "all" ? null : OPEN;
  const findings = await d
    .select()
    .from(schema.findings)
    .where(
      statuses
        ? and(eq(schema.findings.siteId, site.id), inArray(schema.findings.status, statuses))
        : eq(schema.findings.siteId, site.id),
    )
    .orderBy(desc(schema.findings.score));
  const [closed] = await d
    .select({ n: sql<number>`count(*)::int` })
    .from(schema.findings)
    .where(and(eq(schema.findings.siteId, site.id), sql`${schema.findings.status} not in ${OPEN}`));
  const running = run?.status === "queued" || run?.status === "running";
  const s = integrationStatus();
  const setup = [
    { done: true, label: "Site added" },
    { done: run?.status === "done", label: "First audit finished" },
    {
      done: Boolean(site.repoId),
      label: "GitHub repository connected, so Leaflyst can open pull requests",
    },
    {
      done: Boolean(site.gscProperty),
      label: "Search Console connected, so findings are ranked by real traffic",
    },
  ];

  return (
    <div className="stack">
      <AutoRefresh active={running} />
      <div className="grid-2">
        <div className="card stack">
          <div className="row between">
            <h2>Audit</h2>
            <form action={runAuditAction.bind(null, site.id)}>
              <SubmitButton small disabled={running}>
                {running ? "Audit running" : "Run audit again"}
              </SubmitButton>
            </form>
          </div>
          {!run ? <p className="muted">No audit yet.</p> : null}
          {running ? (
            <p className="notice">
              Crawling the site as search and AI crawlers see it. This usually takes one to three
              minutes.
            </p>
          ) : null}
          {run?.status === "done" ? (
            <p className="small muted">
              Last audit {when(run.finishedAt)}, {run.pageCount} pages checked.
            </p>
          ) : null}
          {run?.status === "failed" ? (
            <p className="notice notice-error small">The last audit failed: {run.error}</p>
          ) : null}
        </div>
        <div className="card stack">
          <h2>Setup</h2>
          <ul className="checklist">
            {setup.map((item) => (
              <li key={item.label}>
                <span className={`dot${item.done ? " done" : ""}`} aria-hidden="true" />
                <span className={item.done ? "" : "muted"}>{item.label}</span>
              </li>
            ))}
          </ul>
          {!site.repoId || !site.gscProperty ? (
            <Link className="small" href={`/sites/${site.id}/settings`}>
              Finish setup in Settings
            </Link>
          ) : null}
          {!s.fixAgent ? (
            <p className="small muted">
              The fix agent is not configured on this server, so Fix buttons are off.
            </p>
          ) : null}
        </div>
      </div>

      <div className="row between">
        <h2 style={{ margin: 0 }}>Findings, most important first</h2>
        <Link
          className="small"
          href={show === "all" ? `/sites/${site.id}` : `/sites/${site.id}?show=all`}
        >
          {show === "all" ? "Show open only" : `Show all (${closed?.n ?? 0} closed)`}
        </Link>
      </div>
      {findings.length === 0 ? (
        <Empty>
          {running || !run
            ? "Findings appear here when the audit finishes."
            : "Nothing open. The latest audit found no problems Leaflyst checks for."}
        </Empty>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Severity</th>
                <th>Finding</th>
                <th>Status</th>
                <th>Fix</th>
              </tr>
            </thead>
            <tbody>
              {findings.map((f) => (
                <tr key={f.id}>
                  <td>
                    <SeverityBadge severity={f.severity} />
                  </td>
                  <td>
                    <Link href={`/sites/${site.id}/findings/${f.id}`}>{f.title}</Link>
                    <div className="small muted">{f.expectedEffect}</div>
                  </td>
                  <td>
                    <StatusBadge status={f.status} />
                  </td>
                  <td className="small">
                    {f.fixType ? (
                      <span className="badge st-neutral">Leaflyst can fix</span>
                    ) : (
                      <span className="muted">Needs a person</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
