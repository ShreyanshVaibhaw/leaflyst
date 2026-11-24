import { and, desc, eq } from "drizzle-orm";
import { requireSite } from "@/server/auth";
import { db, schema } from "@/server/db/client";
import { IDENTITIES } from "@/server/crawl/identities";
import { Empty, pct, when } from "../../../ui";

const PURPOSE: Record<string, string> = {
  search: "Search",
  "ai-search": "AI search",
  "ai-training": "AI training",
  "ai-user": "AI on request",
};

export default async function Crawlers({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { site } = await requireSite(id);
  const d = db();
  const [run] = await d
    .select()
    .from(schema.crawlRuns)
    .where(and(eq(schema.crawlRuns.siteId, site.id), eq(schema.crawlRuns.status, "done")))
    .orderBy(desc(schema.crawlRuns.createdAt))
    .limit(1);
  if (!run) return <Empty>The crawler report appears after the first audit.</Empty>;
  const fetches = await d
    .select()
    .from(schema.pageFetches)
    .where(eq(schema.pageFetches.crawlRunId, run.id));
  const renders = await d
    .select()
    .from(schema.pageRenders)
    .where(eq(schema.pageRenders.crawlRunId, run.id));
  const paths = [...new Set(fetches.map((f) => f.path))];
  const browserOk = new Set(
    fetches.filter((f) => f.identity === "browser" && f.status === 200).map((f) => f.path),
  );
  const byKey = new Map(fetches.map((f) => [`${f.path}|${f.identity}`, f]));
  const gaps = new Map(renders.map((r) => [r.path, r]));

  return (
    <div className="stack">
      <p className="muted">
        How each crawler sees the site, from the audit on {when(run.finishedAt)}. A robots.txt block
        is certain. An error status seen only under a crawler&apos;s name is possible, because our
        requests come from our own servers, so confirm it in your host or CDN logs.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Page</th>
              <th
                className="num"
                title="Share of the visible text missing from the HTML sent to crawlers"
              >
                Needs JS
              </th>
              {IDENTITIES.map((i) => (
                <th key={i.id} title={`${i.operator}, ${PURPOSE[i.purpose]}`}>
                  {i.robotsToken}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paths.map((path) => {
              const gap = gaps.get(path);
              return (
                <tr key={path}>
                  <td className="mono small" style={{ whiteSpace: "nowrap" }}>
                    {path}
                  </td>
                  <td className="num small">
                    {gap ? (
                      <span className={gap.gap >= 0.5 ? "cell-no" : ""}>{pct(gap.gap)}</span>
                    ) : (
                      <span className="muted">-</span>
                    )}
                  </td>
                  {IDENTITIES.map((i) => {
                    const f = byKey.get(`${path}|${i.id}`);
                    if (!f)
                      return (
                        <td key={i.id} className="muted small">
                          -
                        </td>
                      );
                    if (!f.robotsAllowed) {
                      return (
                        <td key={i.id} className="cell-no small" title="Disallowed by robots.txt">
                          Blocked
                        </td>
                      );
                    }
                    if (f.status === null)
                      return (
                        <td
                          key={i.id}
                          className="cell-yes small"
                          title="Allowed by robots.txt, not fetched"
                        >
                          Allowed
                        </td>
                      );
                    const bad = f.status >= 400 || Boolean(f.error);
                    // Only a "possible block" when a browser gets the page and this crawler does not.
                    const blockish = bad && browserOk.has(path);
                    return (
                      <td
                        key={i.id}
                        className={`small ${blockish ? "cell-no" : bad ? "muted" : "cell-yes"}`}
                        title={
                          f.error ??
                          (blockish
                            ? "Possible block, confirm in your logs"
                            : bad
                              ? "The page fails for browsers too"
                              : "Fetched")
                        }
                      >
                        {f.status}
                        {blockish ? " possible" : ""}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="small muted">
        Training crawlers (GPTBot, ClaudeBot, Google-Extended) are your choice to allow or block, so
        Leaflyst shows them here but does not raise findings for them.
      </p>
    </div>
  );
}
