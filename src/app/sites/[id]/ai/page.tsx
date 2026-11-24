import { and, asc, eq } from "drizzle-orm";
import { requireSite } from "@/server/auth";
import { db, schema } from "@/server/db/client";
import { integrationStatus } from "@/server/env";
import {
  ENGINES,
  estimateCost,
  latestRun,
  runResults,
  SAMPLES_PER_PROMPT,
} from "@/server/ai-visibility/service";
import { ActionForm, AutoRefresh, SubmitButton } from "../../../components";
import {
  addQuestionAction,
  confirmQuestionsAction,
  startAiRunAction,
  suggestQuestionsAction,
} from "../../../actions";
import { money, pct, RateBar, when } from "../../../ui";

const ENGINE_LABEL: Record<string, string> = {
  chatgpt: "ChatGPT",
  google_ai_mode: "Google AI Mode",
};

export default async function AiVisibility({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { site } = await requireSite(id);
  const prompts = await db()
    .select()
    .from(schema.aiPrompts)
    .where(and(eq(schema.aiPrompts.siteId, site.id), eq(schema.aiPrompts.active, true)))
    .orderBy(asc(schema.aiPrompts.createdAt));
  const unconfirmed = prompts.filter((p) => !p.confirmed);
  const confirmed = prompts.filter((p) => p.confirmed);
  const run = await latestRun(site.id);
  const results = run?.status === "done" ? await runResults(run.id) : [];
  const running = run?.status === "queued" || run?.status === "running";
  const dataforseo = integrationStatus().dataforseo;
  const estimate = estimateCost(confirmed.length);

  return (
    <div className="stack">
      <AutoRefresh active={running} everyMs={5000} />
      <p className="muted">
        Each question is asked {SAMPLES_PER_PROMPT} times on each engine, because AI answers change
        from one ask to the next. The bar shows how often the answer names{" "}
        <strong>{site.brandName ?? "your brand"}</strong>, and the lighter band is the range the
        true rate likely sits in.
      </p>

      {results.length ? (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Question</th>
                <th>Engine</th>
                <th>Names the brand</th>
                <th className="num">Cites the site</th>
                <th>Cited instead</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={`${r.promptId}-${r.engine}`}>
                  <td>{r.text}</td>
                  <td className="small">{ENGINE_LABEL[r.engine] ?? r.engine}</td>
                  <td style={{ minWidth: 160 }}>
                    <RateBar {...r.mention} />
                    <div className="small muted">
                      {pct(r.mention.rate)} ({pct(r.mention.low)} to {pct(r.mention.high)}),{" "}
                      {r.answered} answers{r.failed ? `, ${r.failed} failed` : ""}
                    </div>
                    {r.cached ? (
                      <div className="small cell-no">
                        All answers were identical, so they may be cached.
                      </div>
                    ) : null}
                  </td>
                  <td className="num small">{pct(r.citation.rate)}</td>
                  <td className="small">
                    {r.topSources.map((s) => `${s.domain} (${s.count})`).join(", ") || (
                      <span className="muted">none</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      <div className="card stack">
        <div className="row between">
          <h2>Questions</h2>
          <ActionForm action={suggestQuestionsAction.bind(null, site.id)}>
            <SubmitButton small>Suggest questions</SubmitButton>
          </ActionForm>
        </div>
        {unconfirmed.length ? (
          <form action={confirmQuestionsAction.bind(null, site.id)} className="stack">
            <p className="small">
              Keep the questions real buyers would ask. Unticked ones are removed.
            </p>
            {unconfirmed.map((p) => (
              <label key={p.id} className="row" style={{ fontWeight: 400 }}>
                <input type="checkbox" name="keep" value={p.id} defaultChecked /> {p.text}
                {p.topic ? <span className="badge st-neutral">{p.topic}</span> : null}
              </label>
            ))}
            <div>
              <SubmitButton primary>Confirm questions</SubmitButton>
            </div>
          </form>
        ) : null}
        {confirmed.length ? (
          <ol className="small">
            {confirmed.map((p) => (
              <li key={p.id}>{p.text}</li>
            ))}
          </ol>
        ) : (
          <p className="small muted">No confirmed questions yet.</p>
        )}
        <ActionForm action={addQuestionAction.bind(null, site.id)} className="inline">
          <label>
            Add a question
            <input
              type="text"
              name="text"
              placeholder="Where can I buy handmade stoneware mugs online?"
            />
          </label>
          <SubmitButton>Add</SubmitButton>
        </ActionForm>
      </div>

      <div className="card stack">
        <h2>Run</h2>
        <p className="small">
          {confirmed.length} questions × {ENGINES.length} engines × {SAMPLES_PER_PROMPT} answers
          costs about {money(estimate)}, capped at {money(site.aiCostCapUsd)} for this site.
        </p>
        {!dataforseo ? (
          <p className="notice small">
            DataForSEO is not configured on this server, so runs are off.
          </p>
        ) : null}
        {!site.brandName ? (
          <p className="notice small">Set the brand name in Settings first.</p>
        ) : null}
        {run ? (
          <p className="small muted">
            Last run: {run.status} {when(run.finishedAt ?? run.createdAt)}
            {run.status === "done" ? `, cost ${money(run.costUsd)}` : ""}
          </p>
        ) : null}
        <ActionForm action={startAiRunAction.bind(null, site.id)} className="row">
          <SubmitButton
            primary
            disabled={!dataforseo || running || confirmed.length === 0 || !site.brandName}
          >
            {running ? "Running" : "Run now"}
          </SubmitButton>
        </ActionForm>
      </div>
    </div>
  );
}
