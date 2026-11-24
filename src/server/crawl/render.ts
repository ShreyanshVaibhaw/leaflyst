import type { Browser } from "playwright";
import { BROWSER_UA } from "./identities";

let browserPromise: Promise<Browser> | null = null;

async function browser(): Promise<Browser> {
  browserPromise ??= import("playwright").then(({ chromium }) =>
    chromium.launch({ headless: true }),
  );
  return browserPromise;
}

/** Renders a page in headless Chromium and returns the final HTML. */
export async function renderPage(
  url: string,
  headers: Record<string, string> = {},
  timeoutMs = 20_000,
): Promise<{ html: string; error: string | null }> {
  const context = await (
    await browser()
  ).newContext({ userAgent: BROWSER_UA, extraHTTPHeaders: headers });
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: timeoutMs });
    return { html: await page.content(), error: null };
  } catch (error) {
    return { html: "", error: error instanceof Error ? error.message : String(error) };
  } finally {
    await context.close();
  }
}

export async function closeBrowser() {
  if (!browserPromise) return;
  const b = await browserPromise;
  browserPromise = null;
  await b.close();
}
