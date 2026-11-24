import { and, eq } from "drizzle-orm";
import { requireSite } from "@/server/auth";
import { db, schema } from "@/server/db/client";
import { weekStartOf, type ReportData } from "@/server/reports/service";
import { SubmitButton } from "../../../components";
import { buildReportAction } from "../../../actions";
import { Empty, StatusBadge, when } from "../../../ui";

export default async function Report({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { site } = await requireSite(id);
  const week = weekStartOf();
  const [report] = await db()
    .select()
    .from(schema.reports)
    .where(and(eq(schema.reports.siteId, site.id), eq(schema.reports.weekStart, week)));
  const data = report?.data as ReportData | undefined;

  return (
    <div className="stack">
      <div className="row between">
        <h2 style={{ margin: 0 }}>
          Week of{" "}
          {new Date(`${week}T00:00:00Z`).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </h2>
        <form action={buildReportAction.bind(null, site.id)}>
          <SubmitButton small>{report ? "Rebuild" : "Build report"}</SubmitButton>
        </form>
      </div>
      {!report || !data ? (
        <Empty>The report is built every morning. Build it now to see this week so far.</Empty>
      ) : (
        <>
          <div className="card">
            <p style={{ margin: 0 }}>{report.summary}</p>
            <p className="small muted" style={{ margin: "8px 0 0" }}>
              Built {when(report.createdAt)}. Every number comes from the tables below.
            </p>
          </div>
          <div className="grid-2">
            <div className="card stack">
              <h3>Shipped this week</h3>
              {data.changes.length ? (
                <ul className="small">
                  {data.changes.map((c, i) => (
                    <li key={i}>
                      <StatusBadge status={c.status} />{" "}
                      {c.prUrl ? <a href={c.prUrl}>{c.title}</a> : c.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="small muted">No changes this week.</p>
              )}
            </div>
            <div className="card stack">
              <h3>Next in the queue</h3>
              {data.next.length ? (
                <ol className="small">
                  {data.next.map((n, i) => (
                    <li key={i}>{n.title}</li>
                  ))}
                </ol>
              ) : (
                <p className="small muted">Nothing open.</p>
              )}
              <p className="small muted">{data.openFindings} open findings in total.</p>
            </div>
            <div className="card stack">
              <h3>AI visibility</h3>
              {data.ai.length ? (
                <ul className="small">
                  {data.ai.map((a, i) => (
                    <li key={i}>
                      {a.question} ({a.engine}): {a.mentionPct}% of {a.answers} answers, range{" "}
                      {a.lowPct}% to {a.highPct}%
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="small muted">No AI visibility run yet.</p>
              )}
            </div>
            <div className="card stack">
              <h3>Ads</h3>
              <p className="small">
                {data.ads.wastedTerms} terms with spend and no conversions ({data.ads.currency}{" "}
                {data.ads.wastedCost} spent). {data.ads.testPausing} terms where you already rank
                first organically.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
