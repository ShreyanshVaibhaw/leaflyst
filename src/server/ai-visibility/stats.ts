/**
 * Wilson score interval for a proportion. Better than "p plus or minus 2 standard
 * errors" for small samples and for rates near 0 or 1, which is most of AI visibility.
 */
export function wilson(
  successes: number,
  n: number,
  z = 1.96,
): { rate: number; low: number; high: number } {
  if (n === 0) return { rate: 0, low: 0, high: 0 };
  const p = successes / n;
  const z2 = z * z;
  const center = (p + z2 / (2 * n)) / (1 + z2 / n);
  const margin = (z * Math.sqrt((p * (1 - p)) / n + z2 / (4 * n * n))) / (1 + z2 / n);
  return { rate: p, low: Math.max(0, center - margin), high: Math.min(1, center + margin) };
}

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Brand named as a whole word or phrase, ignoring case. "Acme" does not match "Acmeville". */
export function mentionsBrand(text: string, brand: string): boolean {
  const name = brand.trim();
  if (!name) return false;
  return new RegExp(`(^|[^\\p{L}\\p{N}])${escapeRegex(name)}($|[^\\p{L}\\p{N}])`, "iu").test(text);
}

/** The site's domain or any subdomain of it among the cited sources. */
export function citesDomain(sourceDomains: string[], siteDomain: string): boolean {
  const d = siteDomain.replace(/^www\./, "").toLowerCase();
  return sourceDomains.some((s) => {
    const x = s.replace(/^www\./, "").toLowerCase();
    return x === d || x.endsWith(`.${d}`);
  });
}

/**
 * If every answer for a prompt is identical, the supplier may be serving a cached copy,
 * and the samples are not independent.
 */
export function looksCached(answerHashes: string[]): boolean {
  return answerHashes.length >= 3 && new Set(answerHashes).size === 1;
}
