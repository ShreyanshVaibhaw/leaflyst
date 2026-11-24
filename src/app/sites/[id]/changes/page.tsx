import Link from "next/link";
import { desc, eq, inArray } from "drizzle-orm";
import { requireSite } from "@/server/auth";
import { db, schema } from "@/server/db/client";
import type { VerdictResult } from "@/server/ledger/scoring/verdict";
import { ActionForm, SubmitButton } from "../../../components";
import { revertAction } from "../../../actions";
import { Empty, StatusBadge, when } from "../../../ui";

function Score({
  label,
  value,
  due,
}: {
  label: string;
  value: VerdictResult | null;
  due: Date | null;
}) {
  if (!value)
    return (
      <div className="small muted">
        {label}:{" "}
        {due
          ? `scored on ${due.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`
          : "after live verification"}
      </div>
    );
  const cls =
    value.verdict === "improved"
      ? "st-ok"
      : value.verdict === "worse"
        ? "sev-critical"
        : "st-neutral";
  return (
    <div className="small">
      {label}: <span className={`badge ${cls}`}>{value.verdict.replace(/_/g, " ")}</span>{" "}
      {value.reason}
    </div>
  );
}

export default async function Changes({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { site } = await requireSite(id);
  const d = db();
  const rows = await d
    .select({ change: schema.changes, finding: schema.findings })
    .from(schema.changes)
    .innerJoin(schema.findings, eq(schema.findings.id, schema.changes.findingId))
    .where(eq(schema.changes.siteId, site.id))
    .orderBy(desc(schema.changes.createdAt));
  const ids = rows.map((r) => r.change.id);
  const verifications = ids.length
    ? await d
        .select()
        .from(schema.verifications)
        .where(inArray(schema.verifications.changeId, ids))
        .orderBy(desc(schema.verifications.createdAt))
    : [];

  if (rows.length === 0)
    return (
      <Empty>
        Every change Leaflyst makes is recorded here with its evidence, its checks and, after 14 and
        28 days, whether it helped.
      </Empty>
    );

  return (
    <div className="stack">
      <p className="muted">
        Each change is compared with similar pages that were not touched, so a site-wide rise or
        fall is not credited to the change. Small sites often get &quot;no clear effect&quot;, and
        Leaflyst says so instead of guessing.
      </p>
      {rows.map(({ change, finding }) => {
        const v = verifications.filter((x) => x.changeId === change.id);
        const baseline = change.baseline as {
          affected?: { total?: number; paths?: string[] };
          control?: { paths?: string[] };
          hasSearchData?: boolean;
        } | null;
        const day = 86_400_000;
        const due14 = change.verifiedAt ? new Date(change.verifiedAt.getTime() + 16 * day) : null;
        const due28 = change.verifiedAt ? new Date(change.verifiedAt.getTime() + 30 * day) : null;
        return (
          <div key={change.id} className="card stack">
            <div className="row between">
              <div>
                <Link href={`/sites/${site.id}/findings/${finding.id}`}>{finding.title}</Link>
                <div className="small muted">
                  {change.fixType} · started {when(change.createdAt)}
                  {change.diffStats
                    ? ` · ${change.diffStats.files} files, +${change.diffStats.additions} / -${change.diffStats.deletions}`
                    : ""}
                </div>
              </div>
              <StatusBadge status={change.status} />
            </div>
            <div className="small">
              {change.prUrl ? (
                <a href={change.prUrl} target="_blank" rel="noreferrer">
                  Pull request #{change.prNumber}
                </a>
              ) : (
                <span className="muted">No pull request yet.</span>
              )}
              {change.mergedAt ? ` · merged ${when(change.mergedAt)}` : ""}
              {change.verifiedAt ? ` · verified live ${when(change.verifiedAt)}` : ""}
            </div>
            {v.length ? (
              <ul className="small" style={{ margin: 0 }}>
                {v.slice(0, 4).map((x) => (
                  <li key={x.id}>
                    <span className={x.passed ? "cell-yes" : "cell-no"}>
                      {x.passed ? "Passed" : "Failed"}
                    </span>{" "}
                    {x.kind} check {when(x.createdAt)}:{" "}
                    {(x.details as { summary?: string }).summary}
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="small">
              Baseline:{" "}
              {baseline
                ? baseline.hasSearchData
                  ? `${baseline.affected?.total ?? 0} search impressions on the affected pages in the 28 days before, compared against ${baseline.control?.paths?.length ?? 0} untouched pages.`
                  : "no Search Console data for the affected pages, so the change can be verified but not scored."
                : "recorded when the pull request opens."}
            </div>
            <Score label="14 days" value={change.score14 as VerdictResult | null} due={due14} />
            <Score label="28 days" value={change.score28 as VerdictResult | null} due={due28} />
            {change.mergeSha ? (
              <ActionForm action={revertAction.bind(null, site.id, change.id)} className="row">
                <SubmitButton small>Open a revert pull request</SubmitButton>
              </ActionForm>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
