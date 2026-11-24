import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: "0 auto", maxWidth: 720, padding: 24 }}>
        <nav>
          <a href="/">Home</a> · <a href="/about">About</a> · <a href="/products">Products</a>
        </nav>
        <main>{children}</main>
        <footer>Demo Ceramics, a test site for Leaflyst.</footer>
      </body>
    </html>
  );
}
