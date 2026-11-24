import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { currentUser } from "@/server/auth";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Leaflyst", template: "%s - Leaflyst" },
  description:
    "Finds what holds back your search and AI visibility, fixes it in your repo, and proves the result.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default async function RootLayout({ children }: { children: ReactNode }) {
  const user = await currentUser();
  return (
    <html lang="en">
      <body>
        <header className="topbar">
          <div className="topbar-inner">
            <Link href={user ? "/sites" : "/"} className="brand">
              <span className="brand-mark" aria-hidden="true" />
              Leaflyst
            </Link>
            <span className="spacer" />
            {user ? (
              <>
                <Link href="/sites" className="small">
                  Sites
                </Link>
                <span className="muted small">{user.login}</span>
                <form action="/api/auth/logout" method="post">
                  <button className="btn btn-sm" type="submit">
                    Sign out
                  </button>
                </form>
              </>
            ) : null}
          </div>
        </header>
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
