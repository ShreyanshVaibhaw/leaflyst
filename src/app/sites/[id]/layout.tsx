import type { ReactNode } from "react";
import { requireSite } from "@/server/auth";
import { SiteTabs } from "./tabs";

export default async function SiteLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { site } = await requireSite(id);
  return (
    <>
      <div className="row between">
        <div>
          <h1 style={{ marginBottom: 2 }}>{site.name}</h1>
          <a className="small" href={site.baseUrl} target="_blank" rel="noreferrer">
            {site.baseUrl}
          </a>
        </div>
      </div>
      <SiteTabs siteId={site.id} />
      {children}
    </>
  );
}
