import type { Metadata } from "next";
import Link from "next/link";
import { desc, eq, sql } from "drizzle-orm";
import { requireUser } from "@/server/auth";
import { db, schema } from "@/server/db/client";
import { ActionForm, SubmitButton } from "../components";
import { createSite } from "../actions";
import { Empty } from "../ui";

export const metadata: Metadata = { title: "Sites" };

export default async function Sites() {
  const user = await requireUser();
  const sites = await db()
    .select({
      site: schema.sites,
      open: sql<number>`(select count(*)::int from ${schema.findings} f where f.site_id = ${schema.sites.id} and f.status = 'open')`,
      prs: sql<number>`(select count(*)::int from ${schema.changes} c where c.site_id = ${schema.sites.id} and c.pr_number is not null)`,
    })
    .from(schema.sites)
    .where(eq(schema.sites.userId, user.id))
    .orderBy(desc(schema.sites.createdAt));

  return (
    <div className="stack">
      <h1>Your sites</h1>
      {sites.length === 0 ? (
        <Empty>
          No sites yet. Add one below and Leaflyst starts the first audit straight away.
        </Empty>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Site</th>
                <th className="num">Open findings</th>
                <th className="num">Pull requests</th>
              </tr>
            </thead>
            <tbody>
              {sites.map(({ site, open, prs }) => (
                <tr key={site.id}>
                  <td>
                    <Link href={`/sites/${site.id}`}>{site.name}</Link>
                    <div className="small muted">{site.baseUrl}</div>
                  </td>
                  <td className="num">{open}</td>
                  <td className="num">{prs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="card stack">
        <h2>Add a site</h2>
        <ActionForm action={createSite} className="inline">
          <label>
            Name
            <input type="text" name="name" placeholder="Demo Ceramics" required />
          </label>
          <label>
            Website address
            <input type="text" name="baseUrl" placeholder="https://example.com" required />
          </label>
          <SubmitButton primary>Add and audit</SubmitButton>
        </ActionForm>
      </div>
    </div>
  );
}
