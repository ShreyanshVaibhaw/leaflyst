"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "", label: "Findings" },
  { href: "/changes", label: "Changes" },
  { href: "/crawlers", label: "Crawlers" },
  { href: "/ai", label: "AI visibility" },
  { href: "/ads", label: "Ads" },
  { href: "/report", label: "Weekly report" },
  { href: "/settings", label: "Settings" },
];

export function SiteTabs({ siteId }: { siteId: string }) {
  const path = usePathname();
  const base = `/sites/${siteId}`;
  return (
    <nav className="tabs" aria-label="Site sections">
      {TABS.map((t) => {
        const href = `${base}${t.href}`;
        const current =
          t.href === ""
            ? path === base || path.startsWith(`${base}/findings`)
            : path.startsWith(href);
        return (
          <Link key={t.href} href={href} aria-current={current ? "page" : undefined}>
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
