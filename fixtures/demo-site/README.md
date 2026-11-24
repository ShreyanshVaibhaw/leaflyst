# Demo site

A small Next.js site that Leaflyst audits and fixes in tests.
It stands in for a customer repo.

Planted problems, each one a Leaflyst finding:

| Problem | Where |
|---|---|
| robots.txt blocks OAI-SearchBot everywhere and PerplexityBot on /blog | `app/robots.ts` |
| robots.txt also blocks GPTBot (a training crawler, shown but not flagged) | `app/robots.ts` |
| No sitemap, and no Sitemap line in robots.txt | missing `app/sitemap.ts` |
| /about has no title or description | `app/about/page.tsx` |
| Both blog posts share one title | `app/blog/*/page.tsx` |
| A link to /old-page, which does not exist | `app/page.tsx` |
| /legacy redirects twice before reaching /about | `next.config.ts` |
| /products shows its content only after JavaScript runs | `app/products/page.tsx` |
| No analytics tag on any page | everywhere |

Do not fix these by hand.
Tests depend on them.
