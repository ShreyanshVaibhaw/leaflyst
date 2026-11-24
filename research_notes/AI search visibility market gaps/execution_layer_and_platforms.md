# Execution layer of the SEO / GEO / AEO market and platform built-ins (state as of 22 November 2026)

Label key used on every finding.
[vendor] is a claim from the vendor's own page, docs or press release.
[independent] is a third party that tested or observed the product.
[competitor] is a review written by a competing vendor.
[press] is news coverage.
[secondary] is an aggregator or blog that I could not check against a primary source.

## 1. Agents that change websites: who ships what, by which mechanism, with what quality

### Takeaway
Three delivery mechanisms exist, and each has a hard limit.
GitHub pull-request agents (Ahrefs Letaido / Agent A, Align, 4SEO, SEOmatic, Seology) only touch a short list of head-tag and schema fixes, mostly on Next.js or plain HTML, and stop at "PR opened".
JavaScript-pixel and edge tools (Search Atlas OTTO, Alli AI, Ahrefs Patches, Adobe Optimize at Edge, Botify PageWorkers, Scrunch Agent Pages) deploy without a developer, but the change lives outside the customer's source, may be invisible to AI crawlers that skip JavaScript, and can vanish on cancellation.
I found no independent hands-on test of any PR agent's output quality, and the indie entrants show almost no public traction.

### Cited findings

Ahrefs Agent A / Letaido
- (Jun to Aug 2026) Agent A now runs inside a product called Letaido.
  An Ahrefs Japan guide says Agent A was renamed Letaido in June 2026, and SiliconANGLE reports the public launch of Letaido as an "agent-powered marketing workspace" on 12 August 2026.
  An independent reviewer says it is "not a simple one-to-one rename" and that the invite, the auth screen and the workspace used different names. - [Ahrefs JP guide, vendor](https://ahrefs.com/ja/blog/ahrefs-letaido-seo/); [SiliconANGLE, press](https://siliconangle.com/2026/08/12/ahrefs-launches-ai-agent-workspace-letaido-marketers-agencies/); [Feisworld review, independent](https://www.feisworld.com/blog/ahrefs-agent-a-letaido-review)
- (Nov 2026 page state) [vendor] Letaido is one plan at $99/month with unlimited users, "plenty of AI credits", one free hosted domain and native Ahrefs data at no extra API cost.
  An Ahrefs subscription is needed for the native data connection. - [Ahrefs Agent A page](https://ahrefs.com/agent-a)
- (15 Jul 2026) [independent] The reviewer's account showed $50/month of AI credits inside the $99 plan, top-ups carry a 25% service charge, and extra workspaces cost $29 to $169 each. - [Feisworld review](https://www.feisworld.com/blog/ahrefs-agent-a-letaido-review)
- (17 Jun 2026) [vendor] The Site Audit to GitHub workflow is a scheduled job (example: every Sunday) that pulls the latest audit, ranks issues, groups them by fix type, opens one PR per group for high-severity issues and skips issues already in an open PR.
  The article does not name supported frameworks or repos, and says "a developer picks up the PR". - [Ahrefs blog, 11 ways to automate SEO](https://ahrefs.com/blog/agent-a-for-seo/)
- (5 Jun 2026) [vendor] Ahrefs' only worked example is its own developer fixing one broken image.
  The developer gave the agent "temporary access to the site's GitHub repo", the agent opened a PR, and after merge it ran a fresh crawl to confirm the issue was gone.
  The same article advises against letting automations "run free" and keeps an approval gate on every pipeline. - [Ahrefs blog, automated SEO](https://ahrefs.com/blog/automated-seo/)
- (15 Jul 2026) [independent] The one hands-on review I found did not run the GitHub PR workflow ("We did not run all of these").
  It did find that Ahrefs traffic estimates disagreed with Google Search Console on all three "declining" pages it checked, that Brand Radar data stayed unavailable after retries, and that the UI still said "early preview". - [Feisworld review](https://www.feisworld.com/blog/ahrefs-agent-a-letaido-review)
- (12 Aug 2026) [press] SiliconANGLE lists Letaido connectors as Notion, Slack, HubSpot, Google Ads and WordPress and does not mention GitHub.
  It reports Ahrefs at over $100M ARR, bootstrapped and profitable. - [SiliconANGLE](https://siliconangle.com/2026/08/12/ahrefs-launches-ai-agent-workspace-letaido-marketers-agencies/)
- (3 Sep 2026) [vendor] Ahrefs Patches is a separate, non-PR mechanism.
  It deploys through a JavaScript snippet (client-side, raw HTML unchanged), a Cloudflare Worker that Ahrefs installs in the customer's account (server-side, raw HTML changed), or a manual export.
  It supports only title and meta description today.
  Redirects, canonicals, robots meta and internal links are "planned".
  Publishing needs a Project Boost add-on, 2FA and verified ownership, and patches can be unpublished at any time. - [Ahrefs help, how Patches work](https://help.ahrefs.com/en/articles/9775727-how-patches-work-in-site-audit)
- (Nov 2026 page state) [vendor] Ahrefs base plans are $129, $249 and $449 per month, and the Project Boost Max add-on that includes Patches is $200/month per project (figures from a search snippet of the pricing page, not a full page read). - [Ahrefs pricing](https://ahrefs.com/pricing)

4SEO
- (21 Feb 2026) [vendor] 4SEO describes itself as "the first SEO automation platform built specifically for React, Next.js, and modern JavaScript frameworks".
  It connects to GitHub, detects issues and opens PRs.
  The Product Hunt launch shows 2 upvote points, 2 followers and no comments. - [Product Hunt launch](https://www.producthunt.com/products/4seo-ai/launches/4seo-ai)
- (Feb to Mar 2026) [vendor, from search snippet; the page returned HTTP 403 on fetch] The founder's Indie Hackers post says every change goes through a PR, nothing is pushed to production, and the product monitors performance after merge and suggests rollbacks. - [Indie Hackers post](https://www.indiehackers.com/post/i-posted-4seo-here-last-week-here-s-what-changed-XmQec7c0Bw6cTOuiZvcY)

Align SEO Agent
- (26 Jan 2026) [vendor] Align launched on Product Hunt as an agent that connects to GitHub, writes the code fix and opens a PR. - [Product Hunt launch](https://www.producthunt.com/products/align-waitlist-beta-tools/launches/align-seo-agent)
- (Nov 2026 page state) [vendor] Scope is metadata, OG and Twitter cards, canonicals and indexability, robots and sitemaps, JSON-LD and llms.txt.
  Content strategy and backlinks are explicitly out of scope.
  "Safe mode" uses deterministic fixes by default, and lint or build checks run before the PR "where supported".
  After merge it re-scans, counts issues resolved per PR and sends regression alerts, and it says keyword and AI metrics are "directional, not guaranteed".
  The site is hosted on a vercel.app subdomain and shows no customer counts. - [Align home](https://alignagent.vercel.app)
- (Nov 2026 page state) [vendor] Pricing is Starter $29/month (1 site, 5 PR packs), Growth $79 (3 sites, 20 PR packs), Team $199 (10 sites, 50 PR packs) and custom Enterprise, with a 7-day trial.
  A "PR pack" is one PR that bundles one or more fixes. - [Align pricing](https://alignagent.vercel.app/pricing)
- (Nov 2026) Conflict: Align's feature page, per a search snippet, says the full agent with automated PR creation is on a waitlist and will launch at $149/month, which does not match the pricing page above. - [Align AI SEO agent page](https://alignagent.vercel.app/features/ai-seo-agent)

Other PR-based entrants
- (Nov 2026 page state) [vendor] SEOmatic installs a GitHub App on one repo with access to contents and pull requests only.
  It maps each live URL to the file that produces it by matching the page title, falls back to path, and leaves a note instead of a guessed edit when the match is unclear.
  It edits plain HTML (title, description, canonical, structured data, content in the main element) and Markdown or MDX front matter only.
  It never edits Next.js React pages and sends a written recommendation instead.
  It refuses to commit to the default branch, offers a "restore pull request" for rollback, and counts a change as applied only after it sees the new value on the live page.
  Paid plans start at $99/month and one repo can be connected. - [SEOmatic GitHub integration](https://seomatic.ai/integrations/github)
- (Nov 2026 page state) [vendor] Seology opens one branch, one file and one commit per fix, and never merges.
  The repo scan reads up to 50 files.
  Fixable items are missing title or metadata export, meta description, alt text, Open Graph tags, JSON-LD, robots.txt sitemap line and `poweredByHeader`.
  Missing or duplicate h1 and hardcoded localhost URLs are reported but not fixed.
  WordPress is audit-only.
  Shopify fixes are written directly, with three approval modes and a 90-day undo.
  Seology states it "does not monitor or guarantee citations in AI search answers". - [Seology automatic fixes](https://seology.ai/features/automatic-fixes)
- (25 Mar 2026) [competitor, self-ranking] Frase claims a read-write MCP server (Claude, Cursor, Windsurf, Lovable, Replit) and a "Content Guard" that applies fixes with one click, at $49, $129 and $299 per month.
  The same table lists the Ahrefs and Semrush MCP servers as read-only at that date. - [Frase, best AI SEO agents 2026](https://www.frase.io/blog/best-ai-seo-agents-2026)
- (Nov 2026) [independent] Open-source alternatives exist.
  `Ethan5767/seo_agent` reads a repo and opens SEO and AEO PRs.
  `iannuttall/seo` (Apache-2.0, 642 stars) is an MCP server and CLI that gives a coding agent real Search Console, Analytics, Bing and crawl data and checks the live site after a change, because "Agents trust their own edits" and a page can still be noindexed or redirecting after an agent reports it fixed. - [Ethan5767/seo_agent](https://github.com/Ethan5767/seo_agent); [iannuttall/seo](https://github.com/iannuttall/seo)
- (Nov 2026) I found no Semrush feature that implements site changes.
  Site Audit explains fixes and hands them to a Trello board, and a third-party Semrush MCP plus Claude Code walkthrough produced a plan, not site changes. - [Semrush Site Audit, vendor](https://www.semrush.com/features/site-audit); [Geekflare walkthrough, independent](https://geekflare.com/guides/semrush-mcp-claude-code-seo-audit/)

Search Atlas OTTO (JavaScript pixel, optional Cloudflare and CMS routes)
- (Nov 2026 page state) [vendor] OTTO runs through "a single script" in the site header and lists WordPress, Shopify, Webflow, Squarespace, Wix, ClickFunnels, GHL, GTM and custom sites.
  Change types are technical fixes, schema, meta tags, content creation and optimization, custom HTML edits and Google Business Profile posts and replies.
  The page says you can "roll back anything, anytime".
  If the pixel is removed, technical fixes, content optimizations, custom HTML and schema "may disappear", and the stated ways to keep them are a CSV export or a push to Cloudflare.
  The page lists Growth at $199/month with a 7-day trial. - [Search Atlas OTTO pixel](https://searchatlas.com/otto-pixel/)
- (30 Sep 2026) [independent, no campaign test] Annual-billing prices were Starter $79, Growth $159, Pro $319 and Agency from $999 per month.
  In August 2026 OTTO was metered separately at $99 per site per month.
  Trustpilot was 3.9 across 359 reviews, with 24.9% one-star in August.
  The Shopify App Store rating was 1.8 with 9 of 12 ratings at one star.
  The author coded 79 of 84 one-star Trustpilot reviews: about two-thirds cited support, about two-thirds cited billing or refunds, and fewer than half cited poor SEO output.
  The author states he did not run OTTO on a site for a full campaign.
  A customer claim that "every optimization vanishes instantly" on cancellation conflicts with the pricing page's "keep every edit even after cancellation", and the author calls the question unresolved. - [Ryan Doser review](https://ryandoser.com/search-atlas-review/)
- (4 Aug 2026) [competitor, no hands-on test] CrawlRaven says pixel fixes sit in a browser-rendered overlay, Googlebot sees them after rendering, and GPTBot, ClaudeBot and PerplexityBot generally do not run JavaScript and so do not see them.
  It says the Cloudflare Worker route rewrites HTML at the edge and the CMS connectors write into content that persists.
  It reports generic AI-written descriptions, deployment of meta keywords tags, and "occasional ranking dips after bulk deployment" from review sites.
  It gives Trustpilot as 3.3/5, which conflicts with the 3.9 above. - [CrawlRaven OTTO review](https://crawlraven.com/blog/otto-seo-review)
- (Nov 2026) [vendor] Search Atlas' own help center lists pixel "Not Installed" or "Not Detected" failures caused by CDN or firewall blocking, duplicate scripts and www mismatches. - [Search Atlas help center](https://help.searchatlas.com/en/articles/11844932-troubleshooting-otto-pixel-plugin-issues-across-all-platforms)
- (2026) [independent, single user] A G2 reviewer described five months of OTTO as "highly disappointing". - [G2 Search Atlas reviews](https://www.g2.com/products/searchatlas/reviews)

Alli AI
- (Nov 2026 page state) [vendor] Alli AI now calls itself an "AI Search Visibility Platform".
  It installs through a WordPress plugin "or other integration methods" with no source changes, and pre-renders pages for AI crawlers.
  It lists WordPress, Shopify, Salesforce, HubSpot, Webflow, Cloudflare, Lovable, Akamai, CloudFront, Nginx and Apache among supported platforms.
  It deploys page titles, schema, internal links and "AI-readable structure", with rules by URL path.
  The homepage does not mention rollback or list prices.
  A testimonial citing "17,000,000 code fixes" is unverified. - [Alli AI home](https://www.alliai.com/)
- (2026) [independent] G2 shows 3.6/5 across 11 reviews.
  A separate tester notes Alli AI's optimizations stay live only while the subscription is active. - [G2 Alli AI reviews](https://www.g2.com/products/alli-ai/reviews); [eesel automated SEO tools test](https://www.eesel.ai/blog/automated-seo-tools)

Enterprise edge deployers
- (26 Aug 2026) [vendor] Adobe's Optimize at Edge serves changes only to LLM user agents at the CDN layer and "does not impact either human users or SEO bots".
  Details are in section 4. - [Adobe Experience League](https://experienceleague.adobe.com/en/docs/llm-optimizer/using/resources/optimize-at-edge/overview)
- (Jul 2026) [vendor] Botify's "PageWorkers at Edge" is in open beta and uses server-side delivery so AI bots see optimized content, alongside the existing PageWorkers JavaScript snippet.
  Botify's June 2026 notes preview Markdown delivery to AI bots in SpeedWorkers. - [Botify July 2026 release notes](https://www.botify.com/product-releases/july-2026-release-highlights); [Botify June 2026 release notes](https://www.botify.com/product-releases/june-2026-release-highlights)
- (8 Jul 2026) [vendor] Scrunch's Agent Experience Platform creates an AI-optimized version of existing pages and delivers it to AI agents at the edge, and its FAQ says Agent Pages "doesn't publish new content".
  Sitecore acquired Scrunch in June 2026 for a reported $225M. - [Scrunch AXP blog](https://origin.scrunchai.com/blog/agent-experience-platform); [Scrunch FAQ](https://origin.scrunchai.com/faqs/how-does-scrunchs-axp-approach-compare-to-publishing-ai-friendly-content-directly-in-the-cms); [Value Add VC, secondary](https://valueaddvc.com/blog/ai-search-optimization-startups-2026-geo-aeo-funding-investors)
- (5 Feb 2026) [press] Asked about serving separate Markdown or JSON pages to bots, Google's John Mueller replied "Why would they want to see a page that no user sees?" and Bing's Fabrice Canel said "We'll crawl anyway to check similarity".
  Neither used the word cloaking, and the cloaking link is the article's framing.
  A Conductor guide names Adobe LLM Optimizer and Scrunch AXP as tools built to serve different content to humans and bots. - [PPC Land](https://ppc.land/google-and-bing-say-no-separate-markdown-pages-for-ai-violate-search-policies/); [Conductor, competitor](https://www.conductor.com/academy/aeo-cloaking/)

Quality of what gets shipped
- (May 2026) [vendor study] Ahrefs analysed 137K domains and found 97% of llms.txt files received zero traffic in May 2026.
  llms.txt generation is a headline fix in Align, Yoast, Wix and Webflow. - [Ahrefs llms.txt study](https://ahrefs.com/blog/llmstxt-study/)
- (Oct 2025, cited Aug 2026) [press] Gartner found 81% of marketing technology leaders piloting or deploying AI agents, and 45% said vendor-supplied agents had not delivered the promised business performance. - [SiliconANGLE](https://siliconangle.com/2026/08/12/ahrefs-launches-ai-agent-workspace-letaido-marketers-agencies/)

### Inferences
- PR agents fix what is cheap to detect and cheap to patch: head tags, JSON-LD, robots, sitemap lines, alt text.
  Nothing in the sources shows a PR agent restructuring page content, fixing rendering, or editing component code in an arbitrary framework.
- "Measures the result" in this group means "the audit issue is gone on re-crawl" (Ahrefs, Align, SEOmatic, Seology).
  Only 4SEO claims performance tracking after merge, and that claim has no independent confirmation.
- Pixel and edge tools trade ownership for speed.
  The change is rented, and the AI-crawler visibility of a JavaScript-only change is the open technical risk that competitors use against OTTO.
- The independent indie entrants (4SEO, Align) look pre-traction: 2 upvotes, a vercel.app domain, inconsistent pricing pages.
  The only PR agent with distribution is Ahrefs, and its PR skill is one of eleven workflows inside a general marketing workspace.
- Edge tools that serve bot-only content (Adobe, Scrunch, Botify, Alli AI) carry a policy risk that Google and Bing have signalled but not formalised in the quotes I could verify.

### Gaps
- No independent hands-on test of the Ahrefs PR workflow, Align, 4SEO, SEOmatic or Seology on a real repository was found, so merge rates, wrong-file edits and build breakage are unknown.
- 4SEO pricing and customer numbers are unknown; its site failed a TLS check and the Indie Hackers post returned 403.
- Alli AI's current price is unverified; third-party listings range from $18 to $249 per month and its pricing page was not retrieved.
- Reddit could not be searched from this environment, and no Hacker News thread on these agents turned up, so first-hand breakage reports are thin and come mostly from Trustpilot summaries.
- A "Sunbeam" autonomous agent from daydream (reported as private beta with Webflow and GitHub limits) appears only on low-quality aggregator pages and is unverified.
- I could not confirm Search Atlas' claim that OTTO injects schema and canonicals into initial HTML at the edge by default.

## 2. Content engineering and AEO content tools: what is automated and what a human still does

### Takeaway
AirOps, Profound Agents, Writesonic, Surfer and Jasper automate research, drafting, refresh and CMS publishing, and every one keeps a human approval step as the default.
The customer still builds the workflows, supplies brand context, checks facts and decides what to publish, and none of the tools changes site code or templates.

### Cited findings

AirOps
- (2025 to 2026) [secondary estimate] Sacra estimates AirOps at $13M ARR in 2025, up from about $2.5M at the end of 2024, with annual contracts of $60K to $250K.
  Components are Insights (tracking), Opportunities (a queue of create, refresh, outreach and community tasks), Grids (bulk workflows and publishing), Brand Kits, the Quill agent and Offsite, which includes a managed service that handles outreach end to end.
  Publishing goes to Webflow, Contentful and WordPress, and outputs are routed for human review before publishing. - [Sacra AirOps profile](https://sacra.com/c/airops)
- (Nov 2026) [vendor, from search snippet] AirOps says its agents "research, create, publish, review, monitor, and refresh your content". - [AirOps Quill page](https://www.airops.com/product/quill)
- (23 Jun 2026) [competitor] Rankability reports a free Solo plan with 1,000 tasks per month, paid plans from $99/month, overage of about $9 per 1,000 tasks on Pro, and sales-call pricing for Scale and Enterprise.
  It lists what stays manual: teams "build workflows and craft prompts", configure Brand Kits and Knowledge Bases, and add review checkpoints.
  Complaints are the learning curve, opaque pricing above the free tier, and a workflow-first design that feels heavy for in-editor scoring. - [Rankability AirOps review](https://www.rankability.com/blog/airops-review/)
- (2026) [independent] An Octave review rates AirOps 3.8/5 and says some G2 reviews cite bugs and unresponsive features. - [Octave AirOps review](https://www.octavehq.com/post/airops-review-2026-scaling-ai-content-at-quality)

Profound Agents (execution features only)
- (3 Feb 2026) [vendor] Profound renamed Workflows to Agents and added native WordPress and Sanity connections. - [Profound changelog](https://product.tryprofound.com/en/changelog/workflows-are-now-agents-january-roundup)
- (2026) [vendor] With Webflow, Agents can get, create, update and publish CMS items, and publishing can be a human-review step "or the Agent can publish automatically".
  A Contentful node lets Agents create and update content in a Contentful space. - [Profound Webflow integration](https://www.tryprofound.com/blog/webflow-now-integrates-with-profound-agents); [Profound Contentful integration](https://www.tryprofound.com/blog/profound-agents-now-directly-integrate-with-contentful-cms)
- (Nov 2026 page state) [vendor] Agents run on demand, on a schedule or on a trigger, are available on all plans, and cover drafting and optimizing content for topics where visibility is falling, drafting outreach messages to sources that repeat inaccurate claims, and recurring reports.
  The docs do not mention technical site changes or measuring published content back in Profound. - [Profound Agents docs](https://docs.tryprofound.com/agents/about)
- (Nov 2026) Conflict: Profound's Agents product page, per a search snippet, says every Agent run includes an approval step before anything publishes, while the Webflow post above allows automatic publishing. - [Profound Agents page](https://tryprofound.com/features/agents)
- (16 Oct 2026) [secondary] Profound raised a $180M Series D on 15 September 2026 at a $1.8B valuation, has about $335M in total funding, and "now sells AI marketing agents". - [Value Add VC](https://valueaddvc.com/blog/ai-search-optimization-startups-2026-geo-aeo-funding-investors)

Writesonic
- (2026) [vendor] The Action Center is a prioritized queue of new content, page refreshes, technical fixes and outreach with unresolved, in-progress and resolved states, and the vendor says each insight comes with "templates, workflows, and automated fixes".
  For some action types the docs tell the user to follow a guided workflow. - [Writesonic Action Center](https://writesonic.com/ai-visibility-action-center); [Writesonic docs](https://docs.writesonic.com/docs/action-center-actionables)
- (2026) [secondary] A third-party directory entry says the Growth plan caps automation at five on-page and five off-page automated fixes per month, with full access on Enterprise. - [Umbrex Writesonic entry](https://umbrex.com/resources/generative-engine-optimization-resource-directory/writesonic/)

Surfer
- (Jun 2026) [vendor] Auto-Optimize and Insert Facts merged into one button that fills missing entities and adds facts from SERPs and LLMs, and a June 2026 update "makes fewer, more targeted changes". - [Surfer June 2026 roundup](https://www.surferseo.com/blog/whats-new-at-surfer-june-2026-product-roundup/)
- (Aug 2026) [vendor] Surfer MCP (beta) lets agents such as Claude and ChatGPT plan, write, score and optimize with Surfer data.
  The sources do not describe publishing by Surfer itself. - [Surfer August 2026 roundup](https://surferseo.com/blog/whats-new-at-surfer-august-2026-product-roundup/)
- (2026) [independent] A Unite.ai hands-on test found Auto-Optimize raised a content score from 54 to 84 but added pricing data without verification, only partly updated a product rebrand, and produced a high-scoring draft with incorrect statistics. - [Unite.ai Surfer review](https://www.unite.ai/surfer-seo-review/)

Jasper
- (16 Jun 2026) [vendor] Jasper's GEO Agent became available on 16 June 2026 with GEO Hub as its command center, and it can direct other Jasper agents to run optimization tasks. - [Jasper GEO Agent announcement](https://jasper.ai/blog/geo-agent-and-geo-hub); [CMSWire, press release](https://www.cmswire.com/the-wire/jasper-launches-end-to-end-geo-agent-for-enterprise-marketers/)
- (Nov 2026 page state) [vendor] Jasper's Optimization Agent turns data into SEO, AEO and GEO content briefs, audits a page against top-ranking results, and connects to Semrush data. - [Jasper Optimization Agent](https://www.jasper.ai/agents/optimization)
- (25 Mar 2026) [competitor] Frase's stage table credits Jasper with 1 of 6 stages (write), Surfer with 3 of 6 and Writesonic with 2 of 6, and says a tool covering two stages "still requires you to manage the other 4 manually". - [Frase](https://www.frase.io/blog/best-ai-seo-agents-2026)

### Inferences
- The content tools close the loop only from "tracker says we lose a prompt" to "draft exists in the CMS".
  The publish decision, the fact check and the page template stay with the customer.
- AirOps' $60K to $250K contracts and "build your own workflows" model put it out of reach of small teams, and its managed Offsite service suggests software alone does not deliver the off-site part.
- The one independent quality test (Surfer) shows the typical failure: a higher optimization score with unverified or wrong facts.
- No content tool in the sources reports back whether a specific published or refreshed page changed citations or rankings.

### Gaps
- AirOps' reported March 2026 CMS additions (Contentful, Sanity, ContentStack, Ghost, Strapi) appeared in a search snippet that I could not pin to a primary page.
- No independent review of Profound Agents' or Jasper GEO Agent's output quality was found.
- Per-plan limits on Profound Agent runs and credits are not in the public docs I read.
- Writesonic's automated-fix caps come from a directory entry, not from Writesonic's pricing page.

## 3. Done-for-you and "AI SEO employee" startups and productized services

### Takeaway
The funded done-for-you players sell an outcome through an agency or managed-service wrapper: daydream ($21M raised) pairs agents with a human Growth Lead, and Gushwork ($11M raised, from $800/month) runs content and backlinks for US SMBs.
The only recent YC company doing execution is Theo (F2026, $69.99/month, solo founder), and it builds and hosts the site itself instead of working on a customer's existing codebase.
No source shows a product branded and funded as a self-serve "AI SEO employee" that works inside an arbitrary customer stack.

### Cited findings
- (2 Apr 2026) [vendor press release] daydream raised a $15M Series A led by WndrCo with First Round Capital and Basis Set Ventures, for $21M in total.
  It calls itself an "AI-native agency for organic search" that combines a seven-lever method, SEO agents and "a dedicated Growth Lead for each customer".
  The release gives no price, no named customers, no quantified results and no description of what the customer does. - [PR Newswire](https://www.prnewswire.com/il/news-releases/daydream-raises-15m-series-a-to-build-the-worlds-best-ai-native-agency-for-seo-302732323.html)
- (14 Oct 2026) [secondary] A market guide classes daydream as an agency and contrasts it with trackers: a dashboard "tells you where you stand", while an agency model or workflow tool is "meant to move the number". - [Deepak Gupta GEO tooling guide](https://guptadeepak.com/geo-compass/guides/geo-tooling-market-2026/)
- (25 Feb 2026) [press, company-supplied numbers] Gushwork raised a $9M seed led by SIG and Lightspeed, for $11M in total and a reported $33M post-money valuation.
  Its agents create and update content, build about 10 to 20 backlinks per customer through 200 to 300 partner sites, and track leads through an integrated CMS.
  Subscriptions start at $800/month.
  It reported over 300 paying customers, about 95% in the US, and about $1.5M in annualized revenue.
  TechCrunch notes the results are internal data, and the stated price times the customer count does not match the stated ARR. - [TechCrunch](https://techcrunch.com/2026/02/25/gushwork-bets-on-ai-search-for-customer-leads-and-early-results-are-emerging/)
- (Nov 2026 page state) [vendor] Theo (YC Fall 2026, New York, solo founder) is "an AI agent that builds your small business website in minutes, then works on it every week".
  It publishes new pages and posts and fixes existing problems on the site it built.
  It costs $69.99/month and positions against roughly $1,000/month agency retainers.
  It claims over 10,000 sites built since July 2026 and an average traffic increase of over 50%, both unverified. - [YC Theo page](https://www.ycombinator.com/companies/theo)
- (Nov 2026 page state) [independent directory] YC's SEO industry page lists six companies: Theo (F2026), Armature (P2026, Paris, 3 people, helps developer tools get chosen by coding agents), Openbenchmarks (F2024), Siftly (W2022, 4 people, AI assistant visibility), DemandSphere (S2010) and Positional (S2021, acquired). - [YC SEO directory](https://www.ycombinator.com/companies/industry/SEO)
- (Nov 2026) [secondary, from search snippet] AthenaHQ (YC W2025, $2.2M seed in June 2025) is marked acquired on its YC page, with Bloomreach reported as the acquirer on 16 November 2026. - [YC AthenaHQ page](https://www.ycombinator.com/companies/athenahq)
- (18 May 2026) [press, company-supplied numbers] Searchable raised $14M led by Headline at an $85M valuation and calls itself an "AI performance marketing" company.
  It says it reached $2M in revenue and nearly 1,000 customers within 4.5 months.
  Coverage describes agents that turn search data into recommended actions and a content engine, and none says the agents change a client's website. - [TechStartups](https://techstartups.com/2026/05/18/searchable-raises-14m-to-help-brands-win-visibility-in-the-age-of-ai-search/)
- (17 Mar 2026) [press] Search OS (Korea) raised an undisclosed seed from Futureplay to automate AI search optimization for large platforms, from search infrastructure setup to content structure and analytics. - [WowTale](https://en.wowtale.net/2026/03/17/233689/)
- (2025 to 2026) [secondary estimate] AirOps sells a managed Offsite service that handles outreach and negotiation end to end, alongside its software. - [Sacra](https://sacra.com/c/airops)
- (16 Oct 2026) [secondary] Value Add VC counts about $619M in disclosed funding across 10 GEO and AEO startups, with Profound holding about $335M.
  Others listed are Bluefish ($68M total, $43M Series B on 14 April 2026, "agentic marketing"), AirOps ($62.5M), Peec AI ($40M), Brandlight ($36M), Scrunch (about $26M, acquired), Evertune ($19M), Searchable (about $18M), geoSurge ($12M seed, July 2026) and AthenaHQ ($2.2M).
  The page title in search results says $604M, so the total differs between versions of the article. - [Value Add VC](https://valueaddvc.com/blog/ai-search-optimization-startups-2026-geo-aeo-funding-investors)
- (2025 to 2026) [vendor, press] Consolidation so far: Adobe closed its roughly $1.9B Semrush acquisition on 28 April 2026, Sitecore bought Scrunch in June 2026 for a reported $225M, and HubSpot announced the XFunnel acquisition in late 2025. - [Adobe newsroom](https://news.adobe.com/news/2026/04/adobe-completes-semrush-acquisition); [Value Add VC](https://valueaddvc.com/blog/ai-search-optimization-startups-2026-geo-aeo-funding-investors); [HubSpot newsroom](https://www.hubspot.com/company-news/hubspot-to-acquire-xfunnel)

### Inferences
- Capital went to measurement first (Profound, Peec, Bluefish, Brandlight) and to content workflow second (AirOps).
  Execution on the customer's own site has drawn seed-scale money at most.
- The funded execution players avoid the customer's codebase.
  daydream uses humans, Gushwork and Theo host the content or the whole site themselves, and AirOps writes to a CMS.
- Price points cluster at two ends: $70 to $200 per month self-serve tools with unproven output, and $800 per month and up services with a human in the loop.
  The middle, a product that does agency-grade work inside an existing repo or CMS without a human account lead, has no funded occupant in these sources.
- Trackers are being absorbed by platforms (Semrush to Adobe, Scrunch to Sitecore, XFunnel to HubSpot, AthenaHQ to Bloomreach), which makes standalone measurement a weaker position than execution.

### Gaps
- No pricing for daydream and no named customers.
- No YC 2025 or 2026 company with a disclosed seed or Series A for an execution agent was found beyond Theo, whose funding is not public.
- Relixir (described in directories as a GEO assistant with roughly $300K to $500K raised) is listed only on low-quality directories and is unverified.
- What customers of daydream, Gushwork and Theo must still do (approvals, access, subject expertise) is not stated in any source read.
- Dealroom's GEO market map needs a login, so its funding and exit data could not be used.

## 4. Platform built-ins that encroach on execution vendors

### Takeaway
Every major platform now ships AI-visibility reporting, and three (Webflow, HubSpot, Adobe) ship execution for content they host or front.
Google Search Console's generative AI report, worldwide since 31 August 2026, shows impressions only, with AI Overviews and AI Mode combined and no queries or clicks.
Bing shows citations and grounding queries but no clicks, and OpenAI's Business Hub (beta, about 10 November 2026) shows mentions and clicks but no prompts.

### Cited findings

Google Search Console
- (3 Jun 2026, updated 31 Aug 2026) [vendor] Google introduced generative AI performance reports that show impressions for a site's URLs in generative AI features in Search and Discover.
  Dimensions are pages, countries, devices (Search only) and dates.
  The post says the data also stays in the overall performance report and that more metrics are planned.
  A note says the reports reached all websites worldwide as of 31 August 2026. - [Google Search Central blog](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports)
- (4 Aug 2026) [press] The Search report "currently includes impressions from AI Overviews and AI Mode" with no filter to split them, and it excludes queries, clicks, click-through rate and average position.
  Google is also testing a Search Console setting to include or exclude a site from AI Overviews, AI Mode and generative AI features in Discover, with inclusion as the default. - [Search Engine Journal](https://searchenginejournal.com/google-reports-ai-search-impressions-how-to-read-them/582824)
- (6 Aug 2026) [press] AI Mode follow-up prompts such as "yes, pricing" show up as queries in the standard performance report, and John Mueller said "Search Console includes information on AI Overviews and AI Mode in the general performance report". - [Search Engine Roundtable](https://seroundtable.com/google-search-console-ai-mode-queries-41821.html)

Bing Webmaster Tools
- (10 Feb 2026) [vendor] Microsoft launched AI Performance in public preview, covering citations in Microsoft Copilot, AI summaries in Bing and select partner integrations. - [Bing Webmaster blog](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview)
- (Feb 2026) [press] Metrics are total citations, average cited pages, grounding queries, page-level citation activity and trends, and the report does not show clicks. - [Search Engine Land](https://searchengineland.com/bing-webmaster-tools-ai-performance-report-468751); [Search Engine Journal](https://www.searchenginejournal.com/bing-webmaster-tools-adds-ai-citation-performance-data/566874/)
- (16 Jun 2026) [vendor] Microsoft added Intents, Topics, Citation Share (the site's share of all citations for a grounding query, without naming competitors) and Compare (period over period), all in preview.
  Microsoft says Compare trends "may not be attributable to a single cause" because of model changes, freshness signals and partner refresh cycles. - [Bing search blog](https://blogs.bing.com/search/June-2026/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare)
- (2026) [independent] There is no option to filter by a single channel and no way to identify the partners. - [Practical Ecommerce](https://www.practicalecommerce.com/bings-improved-ai-performance-section)

OpenAI
- (about 10 Nov 2026) [press quoting vendor] OpenAI launched "Businesses in ChatGPT" in beta, with a Business Hub to claim and manage a listing, an insights dashboard and Business Agents "starting with eligible ecommerce and online service businesses in the U.S.".
  Insights show mentions, website clicks and discovery topics, and a tooltip says "Clicks don't confirm website visits or conversions".
  Verification is by text or call to the business number or by DNS.
  A week after launch, the reporter still had no data in his own account. - [Search Engine Roundtable, 18 Nov update](https://seroundtable.com/chatgpt-business-hub-42505.html)
- (Nov 2026) [secondary] Insights cover the past 28 days, show no prompts and no competitors, and a mention counts only when ChatGPT references the website. - [BrightLocal guide](https://www.brightlocal.com/learn/chatgpt-business-hub/)
- (6 Nov 2026) [press] Before launch the tool was reported as a Search Console-style dashboard without prompt data, user data or competitive benchmarks. - [Search Engine Roundtable](https://seroundtable.com/chatgpt-tools-for-business-42476.html)
- (Nov 2026 page state) [vendor] OpenAI's publisher FAQ says sites that allow OAI-SearchBot can track ChatGPT referrals in their own analytics, and ChatGPT adds `utm_source=chatgpt.com` to referral URLs. - [OpenAI Publishers and Developers FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq)
- (Mar to Oct 2026) [secondary, conflicting] OpenAI reportedly scaled Instant Checkout back in March 2026 to a discovery-and-redirect model, saying the first version "did not offer the level of flexibility" it wanted.
  Later reports say in-chat buying relaunched for Shopify merchants.
  The Agentic Commerce Protocol continues as an Apache 2.0 standard with a 2026-04-17 snapshot, and the merchant product feed remains the main input. - [Digital Silk](https://www.digitalsilk.com/digital-trends/digital-trends-chatgpt-ecommerce/); [UCP blog](https://universalcommerceprotocol.blog/en/openai-instant-checkout/); [Shhots ACP guide](https://shhots.ai/blog/agentic-commerce-protocol/)

Shopify
- (24 Mar 2026) [vendor] Agentic Storefronts gives merchants access to ChatGPT, Microsoft Copilot, AI Mode in Google Search and the Gemini app from the Shopify admin, and products are discoverable in ChatGPT by default.
  Shopify Catalog syndicates structured product data with real-time price and inventory.
  The Agentic plan opens Catalog to brands that do not run their store on Shopify and is publicly available worldwide, with no price stated.
  Google AI Mode and Gemini selling is limited to select brands through the Universal Commerce Protocol, co-developed with Google.
  Reporting is limited to orders arriving in the admin with ChatGPT referral attribution. - [Shopify news](https://shopify.com/news/agentic-commerce-momentum); [Shopify Agentic Storefronts](https://shopify.com/agentic-storefronts)

Adobe (LLM Optimizer, now Adobe Brand Visibility, plus Semrush)
- (28 Apr 2026) [vendor] Adobe completed the roughly $1.9B Semrush acquisition and said it will combine Semrush with AEM, LLM Optimizer, Adobe Commerce and Brand Concierge. - [Adobe newsroom](https://news.adobe.com/news/2026/04/adobe-completes-semrush-acquisition)
- (26 Aug 2026) [vendor] Optimize at Edge applies changes at the CDN layer, leaves the origin CMS unchanged, and targets ChatGPT, Perplexity and Claude agents only.
  Change types are a pre-rendered HTML snapshot for client-side-rendered pages, enriched product detail pages for Adobe Commerce, LLM-friendly summaries, FAQs, simplified content, tables of contents and transcript summaries.
  It supports the AEM managed CDN (Fastly) and bring-your-own Fastly, Akamai, Cloudflare, CloudFront, Azure Front Door and Apache.
  The flow is side-by-side preview, edit, deploy within minutes, "View Live" as the agent sees it, and one-click rollback.
  When the source page changes, the optimization pauses for human review.
  Trial customers can deploy one opportunity to up to 10 pages.
  The page does not name outcome metrics. - [Adobe Experience League](https://experienceleague.adobe.com/en/docs/llm-optimizer/using/resources/optimize-at-edge/overview)
- (2026) [vendor] Newer copies of the same docs sit under the "Adobe Brand Visibility" name. - [Adobe Brand Visibility docs](https://experienceleague.adobe.com/en/docs/brand-visibility/using/resources/optimize-at-edge/overview)

HubSpot
- (14 Apr 2026) [vendor] HubSpot AEO launched as a $50/month standalone product and inside Marketing Hub Pro and Enterprise, covering ChatGPT, Gemini and Perplexity.
  The launch post says "the ability to act on recommendations directly inside the tool is coming later this year". - [HubSpot newsroom](https://www.hubspot.com/company-news/hubspot-aeo)
- (Nov 2026 page state) [vendor] The product page is still labelled beta, includes 25 prompts, and lists recommendation types as creating a page, fixing a technical gap, publishing a video or reaching out to third-party sites.
  It reports visibility score, share of voice, sentiment and citations, and does not report traffic, leads or revenue from AI answers. - [HubSpot AEO product page](https://www.hubspot.com/products/aeo)
- (2026) [vendor] Generating content from an AEO recommendation costs 1,000 HubSpot Credits and needs edit and publish permissions for blog posts.
  A community post from April 2026 said "Content Actions" would be available from June 2026, and I found no release note confirming it shipped. - [HubSpot knowledge base](https://knowledge.hubspot.com/seo/review-and-manage-aeo-recommendations); [HubSpot community](https://community.hubspot.com/t/introducing-hubspot-aeo/148129)

Webflow
- (13 Apr 2026) [vendor press release] Webflow announced Webflow AEO as "a closed-loop agentic answer engine optimization solution". - [Press release via AOL](https://lite.aol.com/pf/story/0022/20260413/9688587.htm)
- (Nov 2026 page state) [vendor] AEO agents scan the site and rank fixes for metadata, schema, alt text and broken links under Insights > Recommendations.
  The user accepts, edits or dismisses each suggestion or uses "Accept all", and accepted changes go live on the next site publish.
  Broken-link items are flagged with no suggested fix.
  Agents need a Team or Enterprise plan and consume Webflow AI credits, and content agents need Enterprise plus the Analyze add-on. - [Webflow AEO agents overview](https://help.webflow.com/hc/en-us/articles/51704193319955-AEO-agents-overview); [Webflow AEO overview](https://help.webflow.com/hc/en-us/articles/51703818404243-Webflow-AEO-overview)
- (28 Jul 2026) [vendor] Webflow lists content optimization agents as a later addition. - [Webflow updates](https://webflow.com/updates/aeo-content-optimization-agents)
- (2025 to 2026) [vendor] Webflow has supported llms.txt upload since July 2025 and its own blog calls the file a signal, not a control mechanism. - [Webflow llms.txt update](https://webflow.com/updates/introducing-llmstxt); [Webflow blog](https://webflow.com/blog/llms-txt)
- (2026) [secondary] A third-party analysis notes Webflow AEO can see external citations but does not control third-party publications or the AI engines. - [Umbrex Webflow AEO entry](https://umbrex.com/resources/generative-engine-optimization-resource-directory/webflow-aeo/)

Wix
- (Jul 2025) [vendor] Wix launched AI Visibility Overview, which tracks citations, sentiment, competitor visibility and AI traffic. - [Wix press room](https://www.wix.com/press-room/home/post/wix-launches-ai-visibility-overview-with-full-generative-engine-optimization-support-for-ai-powered)
- (updated 30 Apr, year not shown, likely 2026) [vendor] Wix's GEO feature list adds NLWeb (user must switch it on), automatic llms.txt on premium eCommerce plans, AI Bot Log Reports, IndexNow and an AI Marketing Agent that proposes strategy and tasks for the user to review and implement.
  The page lists no auto-fix feature. - [Wix GEO features](https://www.wix.com/studio/ai-search-lab/wix-geo-features)

WordPress and Yoast
- (Feb to Mar 2026) [vendor] WordPress shipped the Abilities API in 6.9 and an official MCP Adapter that exposes those abilities as MCP tools.
  The adapter provides no AI features itself.
  WordPress 7.0 added a client-side Abilities API for browser agents and WebMCP. - [WordPress developer blog](https://developer.wordpress.org/news/2026/02/from-abilities-to-ai-agents-introducing-the-wordpress-mcp-adapter/); [Make WordPress Core](https://make.wordpress.org/core/2026/03/24/)
- (3 Mar 2026) [vendor] Yoast shipped Schema Aggregation, which consolidates a site's schema graph into one site-level output for AI systems, on all four tiers.
  Yoast has generated llms.txt in the free plugin since mid-2025. - [Yoast March 2026 release](https://yoast.com/yoast-seo-march-3-2026); [Yoast June 2025 release](https://yoast.com/yoast-seo-june-10-2025/)

Vercel
- (28 Oct 2026) [vendor] Vercel Observability added AI Traffic insights: requests by verified AI bot, most-crawled pages, assistant retrievals, Markdown requests and errors.
  CLI queries need Observability Plus.
  The feature is monitoring only, and I found no Vercel AEO agent or fix feature. - [Vercel changelog](https://vercel.com/changelog/ai-traffic-insights-now-available-in-vercel-observability)

Cloudflare
- (2025 to 2026) [vendor] AI Crawl Control is generally available.
  Pay per crawl was labelled private beta on 10 December 2025, and a 16 June 2026 entry added path exclusions and dynamic pricing through a `crawler-price` header without stating a new release stage.
  On 9 February 2026 Cloudflare added a "Referrals over time" chart for AI-driven referral traffic.
  On 17 April 2026 it added redirects of AI training crawlers to canonical URLs, a Content Format chart and a link to an Agent Readiness score. - [Cloudflare AI Crawl Control changelog](https://developers.cloudflare.com/changelog/product/ai-crawl-control/); [Cloudflare blog](https://blog.cloudflare.com/introducing-ai-crawl-control/)
- (12 Feb and 17 Apr 2026) [vendor] Markdown for Agents converts origin HTML to Markdown when a client sends `Accept: text/markdown`.
  The Agent Readiness score and isitagentready.com launched on 17 April 2026. - [Cloudflare changelog, Markdown for Agents](https://developers.cloudflare.com/changelog/post/2026-02-12-markdown-for-agents/); [Cloudflare blog, Agent Readiness](https://blog.cloudflare.com/agent-readiness/)

### Inferences
- First-party AI visibility data is now free, which removes the base case for paying a tracker for "are we cited at all".
  What the platforms withhold is the part an optimizer needs: Google gives no queries or clicks and no AI Overview versus AI Mode split, Bing gives no clicks, OpenAI gives no prompts.
  No first-party source can be joined to another on a common key.
- Platform execution stops at the platform's wall.
  Webflow fixes Webflow sites, HubSpot drafts HubSpot blog posts, Adobe rewrites at an Adobe-routed CDN, Shopify syndicates Shopify Catalog.
  A custom-coded site on Next.js, Astro or Rails hosted on Vercel or Cloudflare gets monitoring from its platform and no fixes.
- Vercel and Cloudflare hold the two things a code-level fixer needs (deploy previews with rollback, and bot-level traffic logs) and neither ships an optimizer.
- The WordPress MCP Adapter and read-write MCP servers lower the cost of building an execution agent for CMS sites, which makes CMS-side execution a crowded, low-moat area.
- Commerce is moving to feed and protocol work (Shopify Catalog, ACP, UCP) that the storefront platform does by default, which leaves little room for a third-party fixer on Shopify stores.

### Gaps
- Whether the Search Console generative AI report is available through the API or bulk export is not stated in any source read.
- I found no 2026 announcement moving Cloudflare pay per crawl to general availability, and its current stage label is unconfirmed.
- Whether HubSpot "Content Actions" shipped is unconfirmed.
- The Shopify Agentic plan price is not public in the sources read.
- OpenAI's own announcement page for Businesses in ChatGPT was not retrieved; the details come from Search Engine Roundtable and secondary guides.
- The status of ChatGPT Instant Checkout is contested between secondary sources.
- Webflow's own AEO launch pages failed to load, so plan and date details come from help-center pages and a press release.

## 5. Which steps of the find -> fix -> deploy -> measure loop no product covers end to end

### Takeaway
Finding issues and drafting a fix are covered many times over.
The steps that stay uncovered are mapping an issue to the right source in an arbitrary repo, a safe deploy that the fixer itself owns, attribution of one specific change to a ranking or citation outcome, and off-site work without a human service.
No product in these sources runs all four steps on a customer-owned codebase.

### Cited findings

Mapping an issue to the right source file
- (Nov 2026) [vendor] SEOmatic is the only vendor that documents its URL-to-file mapping, and the method is a title match with a path fallback and a note when unsure.
  It will not edit Next.js React pages or Markdown bodies. - [SEOmatic GitHub integration](https://seomatic.ai/integrations/github)
- (Nov 2026) [vendor] Seology's repo scan reads at most 50 files and its fixes target Next.js metadata exports and standard HTML meta tags only. - [Seology](https://seology.ai/features/automatic-fixes)
- (17 Jun 2026) [vendor] Ahrefs does not state which frameworks or repo layouts its PR skill supports, and its one published example is a single broken image on its own site. - [Ahrefs blog](https://ahrefs.com/blog/agent-a-for-seo/); [Ahrefs blog](https://ahrefs.com/blog/automated-seo/)
- (Feb 2026) [vendor] 4SEO limits itself to React, Next.js and "modern JavaScript frameworks". - [Product Hunt](https://www.producthunt.com/products/4seo-ai/launches/4seo-ai)

Safe deploy with preview and rollback
- (Nov 2026) [vendor] Every PR agent stops at the PR and relies on the customer's own review, CI and preview builds.
  SEOmatic says merging "is the approval" and changes appear only after the customer's site builds and deploys.
  Seology "never merges" and tells users to revert the commit in git.
  Align runs lint or build checks "where supported". - [SEOmatic](https://seomatic.ai/integrations/github); [Seology](https://seology.ai/features/automatic-fixes); [Align](https://alignagent.vercel.app)
- (2026) [vendor] One-click preview, deploy and rollback exist only where the vendor controls a serving layer: Adobe Optimize at Edge, OTTO's pixel and Ahrefs Patches (unpublish). - [Adobe](https://experienceleague.adobe.com/en/docs/llm-optimizer/using/resources/optimize-at-edge/overview); [Search Atlas](https://searchatlas.com/otto-pixel/); [Ahrefs help](https://help.ahrefs.com/en/articles/9775727-how-patches-work-in-site-audit)
- (Oct 2026) [vendor] Vercel exposes AI bot traffic per page and offers no SEO or AEO action on it. - [Vercel changelog](https://vercel.com/changelog/ai-traffic-insights-now-available-in-vercel-observability)

Measuring the effect of a specific change
- (2026) [vendor] Post-change checks confirm the fix is present, not that it worked.
  Ahrefs re-crawls after merge, Align re-scans and counts issues resolved per PR, SEOmatic confirms the new title or description on the live page, and Seology re-scans and says citation monitoring is the user's job. - [Ahrefs blog](https://ahrefs.com/blog/automated-seo/); [Align](https://alignagent.vercel.app); [SEOmatic](https://seomatic.ai/integrations/github); [Seology](https://seology.ai/features/automatic-fixes)
- (Nov 2026) [independent] An open-source project exists because of this gap: "Agents trust their own edits", and a page can still be noindexed, redirecting or missing from Google after the agent reports success. - [iannuttall/seo](https://github.com/iannuttall/seo)
- (2026) [vendor] SearchPilot runs page-group A/B tests for GEO on product and category pages and measures incremental visits, which is controlled testing for large templated sites and not per-change attribution for a small site. - [SearchPilot AI](https://www.searchpilot.com/ai)
- (2026) [vendor, press] First-party data cannot support attribution on its own: Google's report has impressions only with no queries, Bing has citations without clicks and warns that trend changes "may not be attributable to a single cause", and ChatGPT's hub has no prompts. - [Google](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports); [Bing](https://blogs.bing.com/search/June-2026/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare); [Search Engine Roundtable](https://seroundtable.com/chatgpt-business-hub-42505.html)
- (2026) [vendor experiment, single source] An Otterly talk reported that sitewide schema raised AI Overview citations by 1,500% and AI Mode citations by 377% and lowered citations on ChatGPT, Gemini and Copilot, so one change moved engines in opposite directions. - [GEO experiments 2026 deck](https://speakerdeck.com/thomaspeham/geo-experiments-2026-what-we-tested-what-failed-and-what-actually-works)
- (15 Jul 2026) [independent] In the Letaido review, the agent's "declining page" calls rested on Ahrefs estimates that Search Console contradicted in magnitude, and the reviewer warned that "a polished dashboard can make an uncertain recommendation look more final than it really is". - [Feisworld](https://www.feisworld.com/blog/ahrefs-agent-a-letaido-review)

Off-site work
- (2026) [vendor] The code-level agents exclude it: Align says content strategy and backlinks are out of scope. - [Align](https://alignagent.vercel.app)
- (2026) [vendor, secondary] Where off-site work is offered, a human service or a partner network does it: AirOps' managed Offsite service, Gushwork's 200 to 300 partner sites, daydream's Growth Leads.
  Profound Agents draft outreach messages, and the docs do not say they send them. - [Sacra](https://sacra.com/c/airops); [TechCrunch](https://techcrunch.com/2026/02/25/gushwork-bets-on-ai-search-for-customer-leads-and-early-results-are-emerging/); [PR Newswire](https://www.prnewswire.com/il/news-releases/daydream-raises-15m-series-a-to-build-the-worlds-best-ai-native-agency-for-seo-302732323.html); [Profound docs](https://docs.tryprofound.com/agents/about)
- (2026) [vendor, secondary] Platform recommendations name off-site actions and stop there: HubSpot lists "reach out to third-party sites" as a recommendation type, and Webflow AEO sees external citations but cannot act on third-party publications. - [HubSpot](https://www.hubspot.com/products/aeo); [Umbrex](https://umbrex.com/resources/generative-engine-optimization-resource-directory/webflow-aeo/)

Prioritisation and judgement
- (30 Sep 2026) [independent] The OTTO reviewer's verdict for a single-site operator is that the tool buys execution capacity while the harder question is deciding which changes are worth making. - [Ryan Doser](https://ryandoser.com/search-atlas-review/)
- (25 Mar 2026) [competitor] Even a vendor claiming 6 of 6 stages says humans keep strategy, positioning, editorial quality control and data interpretation. - [Frase](https://www.frase.io/blog/best-ai-seo-agents-2026)

### Inferences
- Coverage by step, across everything above:
  find is saturated (audits, trackers, free first-party reports);
  draft fix is saturated for head tags, schema and blog content;
  map-to-source is solved only for trivial cases (static HTML, Next.js metadata exports, CMS fields);
  deploy is either "your problem after the PR" or "rented at our edge";
  verify means "the tag is there";
  measure is absent at the per-change level;
  off-site is human-delivered.
- The most defensible unmet need is a change ledger joined to outcomes: each merged or deployed change recorded with its target pages and date, then compared against Search Console, Bing citation and AI-bot log data for those pages versus untouched pages.
  No vendor in these sources claims this, and the first-party data needed for it (page-level AI impressions from Google since mid-2026, page-level citations from Bing, per-page bot retrievals from Vercel and Cloudflare) only became available during 2026.
- The second gap is source mapping for real codebases: component-driven pages, CMS-backed routes, i18n, generated metadata.
  Vendors that tried have fenced it off (SEOmatic refuses Next.js pages), which suggests it is hard and unsolved, not ignored.
- The third gap is ownership of the deploy for sites not on Webflow, Shopify, HubSpot or AEM.
  A fixer that integrates with the host's preview and rollback (Vercel, Cloudflare, Netlify) would close the "PR opened, nothing happened" hole without renting changes at an edge layer.
- The pixel and bot-only edge approaches are exposed on two sides: AI crawlers that skip JavaScript, and Google's and Bing's stated doubts about pages "no user sees".
  Fixes that land in the customer's source avoid both.
- Small teams sit between a $29 to $199 tool with unproven output and an $800-plus service.
  Enterprises are served by Adobe, Botify, Profound and AirOps.

### Gaps
- No public data on PR merge rates, time to merge, or share of agent PRs that break a build for any vendor.
- No source measures how often JavaScript-injected changes are seen by AI crawlers in practice; the claim rests on competitor reviews and general crawler behaviour.
- I found no product that joins a change log to first-party AI citation data, but absence in search results is not proof that none exists; enterprise suites (Conductor, seoClarity, BrightEdge) were not examined in depth.
- Whether Vercel, Cloudflare or Netlify plan optimizer features is unknown.
- Customer-side effort (hours per week, approvals, access setup) is not quantified by any vendor or reviewer.
