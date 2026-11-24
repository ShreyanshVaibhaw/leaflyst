export interface FetchResult {
  url: string;
  finalUrl: string;
  status: number | null;
  redirects: string[];
  headers: Record<string, string>;
  body: string;
  error: string | null;
  ms: number;
}

export interface FetchOptions {
  userAgent: string;
  maxRedirects?: number;
  timeoutMs?: number;
  // Extra headers, e.g. a Vercel protection bypass secret for preview URLs.
  headers?: Record<string, string>;
  maxBytes?: number;
}

/**
 * GET with manual redirect handling, so every hop is recorded.
 * Never throws: network failures come back as `error`.
 */
export async function fetchPage(url: string, opts: FetchOptions): Promise<FetchResult> {
  const started = Date.now();
  const redirects: string[] = [];
  const maxRedirects = opts.maxRedirects ?? 5;
  const maxBytes = opts.maxBytes ?? 3_000_000;
  let current = url;
  try {
    for (let hop = 0; hop <= maxRedirects; hop++) {
      const res = await fetch(current, {
        redirect: "manual",
        headers: {
          "user-agent": opts.userAgent,
          accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          ...opts.headers,
        },
        signal: AbortSignal.timeout(opts.timeoutMs ?? 20_000),
      });
      const headers: Record<string, string> = {};
      res.headers.forEach((v, k) => (headers[k] = v));
      const location = res.headers.get("location");
      if (res.status >= 300 && res.status < 400 && location) {
        redirects.push(current);
        current = new URL(location, current).toString();
        await res.body?.cancel();
        continue;
      }
      const text = await res.text();
      return {
        url,
        finalUrl: current,
        status: res.status,
        redirects,
        headers,
        body: text.length > maxBytes ? text.slice(0, maxBytes) : text,
        error: null,
        ms: Date.now() - started,
      };
    }
    return {
      url,
      finalUrl: current,
      status: null,
      redirects,
      headers: {},
      body: "",
      error: `more than ${maxRedirects} redirects`,
      ms: Date.now() - started,
    };
  } catch (error) {
    return {
      url,
      finalUrl: current,
      status: null,
      redirects,
      headers: {},
      body: "",
      error: error instanceof Error ? error.message : String(error),
      ms: Date.now() - started,
    };
  }
}

/** Runs tasks with a fixed number in flight. */
export async function mapLimit<T, R>(
  items: T[],
  limit: number,
  fn: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results: R[] = Array.from({ length: items.length });
  let next = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i] as T, i);
    }
  });
  await Promise.all(workers);
  return results;
}
