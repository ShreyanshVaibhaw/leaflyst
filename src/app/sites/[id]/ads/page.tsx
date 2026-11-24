import { requireSite } from "@/server/auth";
import { adsImports, landingHealth, termTable, type TermRow } from "@/server/ads/service";
import { ActionForm, SubmitButton } from "../../../components";
import { uploadAdsAction } from "../../../actions";
import { Empty, money, when } from "../../../ui";

const ADVICE: Record<
  NonNullable<TermRow["advice"]>,
  { label: string; cls: string; help: string }
> = {
  test_pausing: {
    label: "Test pausing",
    cls: "st-ok",
    help: "You already rank first organically. Pause briefly and watch whether total clicks hold.",
  },
  wasted: {
    label: "No conversions",
    cls: "sev-high",
    help: "Spend with no conversions in this period.",
  },
  add_organic_page: {
    label: "Needs an organic page",
    cls: "sev-medium",
    help: "It converts in ads but ranks nowhere organically.",
  },
};

export default async function Ads({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { site } = await requireSite(id);
  const [imports, terms, landing] = await Promise.all([
    adsImports(site.id),
    termTable(site.id),
    landingHealth(site.id),
  ]);
  const currency = imports.find((i) => i.currency)?.currency ?? "USD";

  return (
    <div className="stack">
      <div className="card stack">
        <h2>Upload Google Ads reports</h2>
        <p className="small muted">
          In Google Ads, download the Search terms, Landing pages and Campaigns by day reports as
          CSV, then upload them here. Leaflyst only reads them and never changes your ad account.
        </p>
        <ActionForm action={uploadAdsAction.bind(null, site.id)} className="inline">
          <label>
            CSV files
            <input type="file" name="file" accept=".csv,text/csv" multiple />
          </label>
          <SubmitButton primary>Upload</SubmitButton>
        </ActionForm>
        {imports.length ? (
          <p className="small muted">
            {imports.length} imports, latest {imports[0]?.filename} on {when(imports[0]?.createdAt)}
            .
          </p>
        ) : null}
      </div>

      {terms.rows.length === 0 ? (
        <Empty>Upload a Search terms report to see paid and organic results side by side.</Empty>
      ) : (
        <>
          <h2>Paid and organic, by search term</h2>
          <p className="small muted">
            {money(terms.totals.cost, currency)} spent, {terms.totals.conversions} conversions.{" "}
            {terms.hasOrganic
              ? "Organic positions come from Search Console for the same query."
              : "Connect Search Console in Settings to fill in the organic columns."}
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Search term</th>
                  <th className="num">Spend</th>
                  <th className="num">Clicks</th>
                  <th className="num">Conversions</th>
                  <th className="num">Organic position</th>
                  <th className="num">Organic clicks</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {terms.rows.slice(0, 200).map((r) => (
                  <tr key={r.term}>
                    <td>{r.term}</td>
                    <td className="num">{money(r.cost, currency)}</td>
                    <td className="num">{r.clicks}</td>
                    <td className="num">{Math.round(r.conversions * 10) / 10}</td>
                    <td className="num">
                      {r.organicPosition ? (
                        r.organicPosition.toFixed(1)
                      ) : (
                        <span className="muted">-</span>
                      )}
                    </td>
                    <td className="num">{r.organicClicks}</td>
                    <td>
                      {r.advice ? (
                        <span
                          className={`badge ${ADVICE[r.advice].cls}`}
                          title={ADVICE[r.advice].help}
                        >
                          {ADVICE[r.advice].label}
                        </span>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {landing.length ? (
        <>
          <h2>Landing pages that receive paid clicks</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Page</th>
                  <th className="num">Spend</th>
                  <th className="num">Conversions</th>
                  <th>What the last audit saw</th>
                </tr>
              </thead>
              <tbody>
                {landing.map((l) => (
                  <tr key={l.url}>
                    <td className="mono small">{l.path ?? l.url}</td>
                    <td className="num">{money(l.cost, currency)}</td>
                    <td className="num">{Math.round(l.conversions * 10) / 10}</td>
                    <td className="small">
                      {!l.crawled ? (
                        <span className="muted">Not crawled yet. Run an audit.</span>
                      ) : l.problem ? (
                        <span className="cell-no">{l.problem}</span>
                      ) : (
                        <span className="cell-yes">Loads cleanly</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : null}
    </div>
  );
}
