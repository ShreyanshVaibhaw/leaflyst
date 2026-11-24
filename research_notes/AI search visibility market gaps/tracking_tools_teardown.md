# Tracking tools teardown: AI search visibility monitoring products

State of the market as of 22 November 2026.
Every finding carries the date of the source, or "read 2026-11-22" when the page shows no date.
Confidence labels used below: "primary" means the vendor's own docs, changelog or press release; "independent" means press or a practitioner with no product in the comparison; "vendor comparison, low confidence" means a competitor wrote it.
Most page contents were read through a fetch tool that summarizes long pages, so exact quotes are limited to the strings shown in quotation marks.

## 1. What each product measures, which engines it covers, refresh cadence and sample sizes

### Takeaway

The products report the same small set of numbers (mention rate called "visibility", citations, share of voice, sentiment, position) and almost all of them run each tracked prompt once per day.
Only Evertune publishes a repeated-sampling design (100 runs per prompt) with margins of error, and Ahrefs refreshes its four chatbot datasets monthly, not daily.

### Cited findings

Summary table (details and sources in the bullets under it).

| Product | Core metrics | Engines named by vendor | Cadence | Stated sample or limits |
|---|---|---|---|---|
| Profound | Visibility, sentiment, citations, query fanouts, bot visits, prompt volumes | ChatGPT, Perplexity, Claude, Gemini, AI Overviews, Copilot, plus Grok, DeepSeek, Qwen, Muse Spark, Exa | Daily | $99 plan: 50 prompts, ChatGPT only. $399 plan: 100 prompts, 3 engines |
| Peec AI | Visibility, position, sentiment, share of voice, citations by source type, ChatGPT ad share | ChatGPT, Gemini, Claude, Perplexity, AI Mode | Daily, weekly optional on top agency plans | 1 prompt x 1 model x 1 day = 1 credit. $95 for 50 prompts to $495 for 350 |
| AthenaHQ | Mentions, competitors named, sources cited | 5 on free plan, 11 on Starter | Not disclosed | 1 credit = 1 AI response. Starter $295 with 3,600 credits a month |
| Scrunch | Brand presence, misrepresentation, agent traffic, AI referrals | ChatGPT, Perplexity, Gemini, Claude, Meta AI | Not disclosed | Not disclosed |
| Otterly.ai | Mentions, citations, domain sources, GEO audit score | ChatGPT, AI Overviews, AI Mode, Perplexity, Gemini, Copilot, Claude | Daily, one run per prompt. Weekly optional on Premium and Enterprise | Standard $189 with 100 prompts (third-party listing) |
| Ahrefs Brand Radar | AI share of voice, mentions (string match), citations (linked URLs), estimated impressions | ChatGPT, Perplexity, Gemini, Copilot, AI Overviews, AI Mode, Grok | Chatbots monthly with a 90-day window. Google surfaces continuous | About 13M to 14.6M prompts per chatbot a month, 282M for AI Overviews |
| Semrush AI Visibility Toolkit | AI Visibility Score (0-100), prompt tracking, brand performance | AI Mode, AI Overviews, Gemini, ChatGPT Search | Prompt tracking daily. Other reports weekly or monthly | $99 a month. 25 prompts or 10 per LLM depending on the help page |
| Adobe Brand Visibility | Brand presence, competitive benchmark, audience reach, prompt research | ChatGPT, AI Mode, Copilot, Perplexity | Not disclosed | "nearly 300 million" prompt database |
| SE Visible (SE Ranking) | Position-weighted visibility, share of voice, average position, net sentiment, citations | ChatGPT, Gemini, AI Mode, AI Overviews, Perplexity | Daily default, weekly optional | 42 countries. Runs per check not disclosed |
| Evertune | Visibility with margin of error, AI Brand Index (0-100) | "every major model" | Not disclosed | 100 runs per prompt |
| HubSpot AEO | Visibility score, share of voice, sentiment, citations | ChatGPT, Gemini, Perplexity | Not disclosed | $50 a month standalone |

Profound

- Profound's help docs define visibility as presence in a response: "Profound tracks whether or not your brand appears in an answer engine response."
  The docs do not publish the weighting or aggregation formula.
  Read 2026-11-22, primary. - [Profound help, Interpret Answer Engine Insights](https://help.tryprofound.com/articles/6240000968-interpret-answer-engine-insights)
- Profound says "we run every tracked prompt daily so your visibility score reflects your true average across all responses."
  It does not state how many times a prompt runs per day.
  Read 2026-11-22, primary. - [Profound Answer Engine Insights page](https://www.tryprofound.com/features/answer-engine-insights)
- Engine additions by changelog date: Grok (21 Jul 2025), DeepSeek (24 Jul 2025, nine engines), Claude (25 Aug 2025, ten engines), Qwen (17 Apr 2026), Hong Kong support for seven models including Qwen and DeepSeek (5 Jun 2026), Exa (4 Sep 2026), Muse Spark (6 Nov 2026).
  Primary. - [Profound changelog](https://www.tryprofound.com/changelog)
- Pricing as reported on 1 May 2026: $99 a month starter (ChatGPT only, 50 prompts), $399 a month (three answer engines, 100 prompts, six optimized articles), custom enterprise.
  Independent. - [Digiday](https://digiday.com/marketing/marketers-question-expensive-ai-visibility-tools-as-inconsistent-results-fuel-skepticism/)
- Prompt Volumes covers ChatGPT, Gemini and Perplexity, updates weekly with "data latency of less than two weeks", and has US history from January 2025 and other regions from January 2026.
  Read 2026-11-22, primary. - [Profound docs, Prompt Volumes FAQ](https://docs.tryprofound.com/prompt-volumes/faq)
- Prompt Volumes expanded to 35 countries on 28 Aug 2026, and a 1 May 2026 entry cites "1.5+ billion real user prompts" behind Prompt Research Reports.
  Primary. - [Profound changelog](https://www.tryprofound.com/changelog)

Peec AI

- Peec's docs name the metrics visibility, sentiment, position and share of voice, plus citation counts split into source types (Your pages, Editorial, UGC, Wikis and references, Other).
  Read 2026-11-22, primary. - [Peec docs](https://docs.peec.ai/llms-full.txt)
- Peec runs customer projects daily by default ("Daily runs your prompts every 24 hours").
  Weekly tracking is an option on the Scale and Comprehensive agency plans and "uses one-third of the credits required for daily tracking."
  The credit unit is "1 prompt x 1 model x 1 day = 1 credit."
  Read 2026-11-22, primary. - [Peec docs](https://docs.peec.ai/llms-full.txt)
- Peec tracks ChatGPT ads (ad coverage, ad visibility, ad share), "currently available for ChatGPT only", in the US, UK, Canada, Australia, New Zealand, Japan and South Korea.
  Read 2026-11-22, primary. - [Peec docs](https://docs.peec.ai/llms-full.txt)
- Sacra describes Peec as running marketers' questions through ChatGPT, Gemini, Claude and Perplexity, priced from $95 a month for 50 prompts to $495 for 350, with free seats.
  14 Jul 2026, independent analyst (figures are Sacra estimates). - [Sacra](https://sacra.com/research/peec-vs-profound/)
- The Next Web reports Peec pricing from EUR 75 a month and coverage of 115 languages.
  29 Jun 2026, independent. - [The Next Web](https://thenextweb.com/news/peec-ai-200m-valuation-geo-ai-search)

AthenaHQ

- AthenaHQ's pricing page lists Essential (free, 300 credits), Starter ($295 a month, 3,600 credits) and Enterprise (custom), and defines "1 credit = 1 AI response."
  Essential covers ChatGPT, Perplexity, AI Overviews, Gemini and Copilot.
  Starter covers 11 models, adding AI Mode, Claude, Grok, DeepSeek, Meta AI and Mistral.
  Refresh cadence is not stated on the page.
  Read 2026-11-22, primary. - [AthenaHQ pricing](https://athenahq.ai/pricing)

Scrunch

- Scrunch's AXP post names ChatGPT, Perplexity, Gemini and Claude and says its Signals feature "continuously assesses how AI agents represent your brand in answers."
  It does not specify prompt sets, polling cadence or collection method.
  Dated "07.08.2026" (day and month order unclear), primary. - [Scrunch blog](https://origin.scrunchai.com/blog/agent-experience-platform)
- TechTarget says Scrunch monitors AI search platforms including ChatGPT, Perplexity and Meta AI.
  4 Jun 2026, independent. - [TechTarget](https://www.techtarget.com/searchcustomerexperience/news/366643973/Sitecore-acquires-Scrunch-for-answer-engine-optimization)

Otterly.ai

- Otterly monitors "every day by default", one run per prompt per day, across ChatGPT, Google AI Overviews and AI Mode, Perplexity, Gemini, Microsoft Copilot and Claude.
  Premium and Enterprise can switch a workspace to weekly tracking "to cover more prompts with the same credits."
  Manual runs are not available.
  Read 2026-11-22, primary. - [Otterly help, monitoring interval](https://help.otterly.ai/monitoring-interval)
- Third-party listings disagree on Otterly's plans: Lite $29 a month, Standard $189 a month with 100 prompts, Premium $489 a month with 400 prompts.
  Read 2026-11-22, aggregator and competitor pages, low confidence. - [GetApp](https://www.getapp.com/all-software/a/otterly-ai/); [Gracker comparison](https://gracker.ai/gracker-vs-otterly/)

Ahrefs Brand Radar

- Brand Radar's approximate monthly prompt volumes are ChatGPT 14.5M, Perplexity 14.6M, Gemini 14.6M, Copilot 13.3M, AI Overviews 282M, AI Mode 24M and Grok 13M.
  ChatGPT, Perplexity, Gemini and Copilot refresh monthly with a 90-day reporting window.
  AI Overviews and AI Mode update continuously with the keyword database.
  Updated 26 Feb 2026, primary. - [Ahrefs Brand Radar methodology](https://ahrefs.com/blog/brand-radar-methodology/)
- Brand Radar's metrics are AI share of voice, citations (linked URLs), mentions (string matches) and "Estimated Impressions", which "weight mentions by Google search volume to model potential exposure."
  Updated 26 Feb 2026, primary. - [Ahrefs Brand Radar methodology](https://ahrefs.com/blog/brand-radar-methodology/)
- Ahrefs plan tiers reported on 1 May 2026 include only 5, 10 and 20 tracked custom prompts at $129, $249 and $449 a month.
  Independent. - [Digiday](https://digiday.com/marketing/marketers-question-expensive-ai-visibility-tools-as-inconsistent-results-fuel-skepticism/)

Semrush AI Visibility Toolkit and Adobe Brand Visibility

- Semrush's toolkit costs $99 a month, tracks prompts daily across Google AI Mode, AI Overviews, Gemini and ChatGPT Search, and sells 50 extra prompts for $60 a month.
  The AI Visibility Score "reflects how often your brand is mentioned in AI-generated answers compared to the median number of mentions for your top industry competitors."
  Semrush help pages conflict on the base limit (25 prompts on one page, 10 prompts per LLM on another) and on country coverage (US only on one page, six countries on another).
  Read 2026-11-22, primary. - [Semrush KB, AI Visibility Toolkit](https://www.semrush.com/kb/1493-ai-visibility-toolkit)
- Adobe Brand Visibility covers ChatGPT, Google AI Mode, Microsoft Copilot and Perplexity and draws on "nearly 300 million real-world AI search prompts."
  It measures audience reach as the number of times people viewed an LLM response that included the brand.
  17 Jun 2026, primary. - [Adobe newsroom](https://news.adobe.com/news/2026/06/introducing-adobe-brand-visibility)
- The Semrush prompt database figure differs by page and date: more than 213 million (20 Apr 2026 coverage), over 261 million (Adobe AIO page), more than 289 million (Adobe docs), nearly 300 million (17 Jun 2026).
  Mixed primary and press. - [The Next Web](https://thenextweb.com/news/semrush-brand-visibility-framework-ai-search); [Adobe Semrush Enterprise AIO](https://business.adobe.com/products/semrush/enterprise/aio.html); [Adobe Experience League](https://experienceleague.adobe.com/en/docs/brand-visibility/using/dashboards/ai-visibility)

SE Ranking (SE Visible)

- SE Visible tracks ChatGPT, Gemini, AI Mode and AI Overviews on all plans, with Claude and Copilot planned.
  The article says "five answer engines" but names four, and another SE Ranking page lists Perplexity as the fifth.
  Checks run daily by default and can switch to weekly on some plans, across 42 countries.
  29 Sep 2026, primary. - [SE Visible, how it works](https://visible.seranking.com/blog/how-se-visible-works/)
- SE Visible's visibility score is position-weighted: the first-named brand scores 1.0, the last of N brands scores 1/N, and an answer with no mention scores zero.
  It also reports share of voice, average position and net sentiment from -100 to +100, and counts citations separately from visibility.
  29 Sep 2026, primary. - [SE Visible, how it works](https://visible.seranking.com/blog/how-se-visible-works/)

Evertune

- Evertune's methodology page samples each of 100 prompts 100 times (10,000 responses) and reports margins of error of plus or minus 1 point overall and 2 points per topic.
  The same 100 prompts asked once give plus or minus 9 points overall and 31 points per topic.
  A single prompt asked once has plus or minus 44 points, 25 times plus or minus 20, 100 times about plus or minus 10.
  Analysis dated July 2026, primary. - [Evertune methodology](https://www.evertune.ai/platform/methodology)
- Evertune's AI Brand Index is a 0 to 100 score built from unaided prompts that never name the brand, combining mention frequency and rank.
  Read 2026-11-22, primary. - [Evertune FAQ](https://docs.evertune.ai/en/articles/12278285-evertune-faqs)
- Evertune claims over one million AI responses per brand a month, and a comparison page describes 125 prompts run 100 times each across 10+ engines.
  A software listing puts the starting price at $3,000 a month.
  Read 2026-11-22, vendor comparison and aggregator, low confidence. - [Evertune vs AthenaHQ](https://www.evertune.ai/resources/insights-on-ai/evertune-vs-athena-hq-which-geo-platform-delivers-the-best-results); [SourceForge listing](https://sourceforge.net/software/product/Evertune)

Bluefish, Goodie, Gauge, Relixir, HubSpot AEO

- Bluefish describes four pillars: AI Monitoring, AI Optimization, AI Orchestration and AI Measurement.
  27 Oct 2026, press release reprint. - [CMSWire](https://www.cmswire.com/the-wire/bluefish-expands-agentic-marketing-platform-into-paid-media-to-unite-the-ai-marketing-funnel/)
- Goodie describes a loop of research, monitoring, action and measurement, with an AI Optimization Hub, an AEO Content Writer and traffic and attribution dashboards.
  Goodie 2.0 shipped around late April to early May 2026.
  Primary. - [Goodie 2.0 post](https://higoodie.com/blog/introducing-goodie-2-0/); [Goodie site](https://higoodie.com/)
- Gauge pulls GA4, Google Search Console, keywords, prompts and ads data and "can run keyword research, analyze the competition, and track prompts over time for you."
  The launch page names Supabase, PostHog and Mux as customers and does not list engines or cadence.
  Launch posted about 8 months before 22 Nov 2026, primary. - [YC launch page for Gauge](https://www.ycombinator.com/launches/Pgl-gauge-your-marketing-agent-for-organic-paid-and-ai-search)
- Relixir (YC X25) sells an agent called Rex that monitors AI search visibility and generates and publishes content.
  Read 2026-11-22, primary. - [YC launch page for Relixir](https://www.ycombinator.com/launches/NZH-relixir-the-ai-geo-generative-engine-optimization-platform)
- HubSpot AEO tracks a visibility score, sentiment, competitor share of voice and citations across ChatGPT, Gemini and Perplexity for $50 a month standalone, and ships inside Marketing Hub Pro and Enterprise.
  14 Apr 2026, primary. - [HubSpot company news](https://www.hubspot.com/company-news/hubspot-aeo)

### Inferences

- One run per prompt per day is the industry default (Profound, Peec, Otterly, SE Visible, Semrush prompt tracking).
  By Evertune's own table, a single ask per prompt carries a margin of plus or minus 44 points on that prompt, so per-prompt numbers in daily trackers only become readable after averaging many days or many prompts.
- Prompt allowances on self-serve plans are small (50 to 400 prompts, and 5 to 20 custom prompts on Ahrefs tiers), so each customer's "share of voice" rests on a prompt set the customer picked.
- Evertune's "1,250,000 monthly prompts per brand" does not follow from 125 prompts x 100 runs x 10 engines, which equals 125,000.
  An undisclosed monthly refresh multiplier of about ten would close the difference, but Evertune's pages do not state its cadence.
  This is my arithmetic, not a sourced fact.

### Gaps

- Runs per prompt per day are not published by Profound, Peec, AthenaHQ, Scrunch, SE Visible or Adobe.
- I found no refresh cadence for AthenaHQ, Scrunch, Evertune, Bluefish, Goodie or Gauge on their own pages.
- Bluefish, Goodie and Gauge do not publish engine lists or prompt limits on the pages I could reach, and Scrunch publishes no prices.
- I did not open G2 feature grids, so no G2 data is in these notes.

## 2. How the data is collected and what vendors disclose about method

### Takeaway

By late 2026 most trackers say they scrape the consumer web interface, not the API, and nearly all tracked prompts are synthetic, chosen by the customer or generated from keyword data.
"Real user prompt" claims come from three places: licensed opt-in panels (Profound, Evertune), a search-derived prompt database (Semrush, Ahrefs), and none of them publish panel size per country, error rates or logged-in state.

### Cited findings

- Profound says it captures from the browser: "Other tools pull AI responses from the API. We capture directly from the browser - what you see in Profound is what your customers see when they query AI."
  Read 2026-11-22, primary. - [Profound Answer Engine Insights page](https://www.tryprofound.com/features/answer-engine-insights)
- Profound's Prompt Volumes "licenses data from well-known, established double opt-in consumer panel providers" with "millions of active AI assistant users", receives "tens of millions of real prompts each month", and applies "probabilistic modeling to correct for demographic and geographic biases."
  It states "Synthetic or simulated data is not used at any point."
  The FAQ gives no error rates, per-country sample sizes or confidence levels, and says coverage is "strongest in the US, UK, and select European markets."
  Read 2026-11-22, primary. - [Profound docs, Prompt Volumes FAQ](https://docs.tryprofound.com/prompt-volumes/faq)
- Peec scrapes the screen to capture what a real user sees and does not query back-end APIs, on the argument that APIs can return cleaned-up results.
  29 Jun 2026, independent. - [The Next Web](https://thenextweb.com/news/peec-ai-200m-valuation-geo-ai-search)
- Peec's docs say a Location setting "determines the geographic location where your prompt runs" and that active prompts "join the regular daily run."
  The same page does not state logged-in status, runs per day or any variance statistic.
  Read 2026-11-22, primary. - [Peec docs, setting up your prompts](https://docs.peec.ai/setting-up-your-prompts)
- A competitor's review says it found no published independent audit, completeness rate, repeated-run design or collection SLA for Peec's data.
  Read 2026-11-22, vendor comparison, low confidence. - [Trakkr review of Peec](https://trakkr.ai/reviews/peec-review/data-accuracy)
- Ahrefs runs prompts "through the free, publicly available web interfaces of ChatGPT, Gemini, Perplexity, Copilot."
  Prompts come from Google's People Also Ask corpus and the Ahrefs keyword database, expanded with fanout, and Ahrefs says "Brand Radar models real-world user behavior, rather than fabricating prompts."
  Logged-in status is not stated, and locations follow the country distribution of Ahrefs keyword data.
  Updated 26 Feb 2026, primary. - [Ahrefs Brand Radar methodology](https://ahrefs.com/blog/brand-radar-methodology/)
- SE Visible collects answers "through a real browser session in each engine's user interface" and does not say whether sessions are logged in.
  It asserts that API-based scores "measure a product your buyers aren't using" without publishing data for that claim.
  29 Sep 2026, primary. - [SE Visible, how it works](https://visible.seranking.com/blog/how-se-visible-works/)
- Evertune uses both routes: "Through direct API access, Evertune isolates the model's foundational knowledge", while it reads the live consumer apps for answers that search the web.
  Its prompts come from EverPanel, "our panel of over 150 million real conversations, weighted to reflect the actual composition of the internet."
  Other Evertune pages cite a panel of about 25 million people, so the panel size is inconsistent across its own material.
  Read 2026-11-22, primary. - [Evertune methodology](https://www.evertune.ai/platform/methodology); [Evertune FAQ](https://docs.evertune.ai/en/articles/12278285-evertune-faqs)
- Adobe says Brand Visibility combines Semrush prompt data with Adobe first-party signals from owned channels, and its validation claims include bot verification, controlled experimentation and baseline comparison.
  Adobe's sources do not explain how the prompt database is built or how answers are sampled.
  17 Jun 2026, primary. - [Adobe newsroom](https://news.adobe.com/news/2026/06/introducing-adobe-brand-visibility)
- Semrush's data methodology page says its prompt database is organized into Topics with duplicates removed and phrasing simplified.
  I found no Semrush page that states sampling frequency per answer or how brands are extracted.
  Read 2026-11-22, primary. - [Semrush KB, AI visibility data](https://www.semrush.com/kb/1607-semrush-ai-visibility-data)
- Otterly's monitoring page does not say whether collection is UI or API.
  AthenaHQ's pricing page describes no collection method.
  Scrunch's AXP post gives no collection method.
  Read 2026-11-22, primary. - [Otterly help](https://help.otterly.ai/monitoring-interval); [AthenaHQ pricing](https://athenahq.ai/pricing); [Scrunch blog](https://origin.scrunchai.com/blog/agent-experience-platform)
- A competitor states that Goodie's data collection methodology is undisclosed.
  Read 2026-11-22, vendor comparison, low confidence. - [Conductor vs Goodie](https://www.conductor.com/compare/goodie-vs-conductor/)
- Surfer ran 1,000 prompts through ChatGPT and Perplexity by scraping and by API.
  API answers averaged about 406 words against 743 scraped, scraped answers always triggered web search and listed about 10 sources against roughly 7, and API answers named more brands (10+ against about 6).
  Surfer concluded API monitoring is not a valid proxy for what users see.
  Undated, vendor study (Surfer sells a tracker), medium confidence. - [Surfer](https://surferseo.com/blog/llm-scraped-ai-answers-vs-api-results)
- A practitioner review of collection methods says daily execution with multiple runs per prompt is "the practical minimum" and weekly single runs support only "rough directional reads."
  It praises Peec for linking every aggregate metric to stored chats, and the page carries a "Try Peec AI" referral box, so treat the praise with caution.
  Dated 6 Sep 2026 on the page (search listing showed 2 Jul 2026), practitioner with a referral link. - [Metehan Yesilyurt](https://metehan.ai/articles/how-ai-visibility-tools-collect-data)
- The SparkToro and Gumshoe study left open whether API calls show the same variation as manual prompts.
  30 Jan 2026, independent press on a study co-run with a tracking vendor. - [Search Engine Journal](https://www.searchenginejournal.com/ai-recommendations-change-with-nearly-every-query-sparktoro/)

### Inferences

- The API versus UI argument has largely been settled in marketing copy in favor of UI scraping (Profound, Peec, Ahrefs, SE Visible all claim it), so UI capture no longer differentiates one tracker from another.
- No vendor in this set discloses logged-in versus logged-out collection, memory or personalization state.
  Ahrefs says it uses the "free, publicly available" interfaces, which implies sessions with no user history, and Ahrefs itself notes that "Chatbot usage is highly personalized."
  Tracker output therefore describes an anonymous default session, not what a specific buyer sees.
- Tracked prompts are synthetic in every product.
  Panel data (Profound Prompt Volumes, EverPanel) informs which prompts to track and how much demand a topic has, but the answers scored each day still come from the vendor's own scripted sessions.

### Gaps

- I found no vendor statement naming proxy networks or third-party scraping providers.
- I found no vendor that publishes a collection success rate, a count of failed or blocked runs, or a change log of collection method over time.
- Panel provider identity, panel size per country and weighting method are undisclosed for both Profound and Evertune.
- Bluefish, Gauge and Relixir publish nothing on collection that I could find.

## 3. Which products go beyond monitoring

### Takeaway

Between February and November 2026 the larger trackers all added execution features: content agents, CMS push, bot and crawler analytics, GA4 or Shopify links, shopping tracking, and paid media.
Profound's changelog is the deepest record of this shift, Scrunch and Adobe deliver changes at the edge to bots only, and the smaller trackers (Otterly, SE Visible, Ahrefs Brand Radar) still end at analytics and suggestions.

### Cited findings

Profound

- Profound shipped Actions on 24 Jul 2025, Content Optimization for URLs and uploaded text in August and September 2025, and Workflows as an Enterprise-only public beta on 12 Dec 2025.
  On 3 Feb 2026 "Workflows are now Agents" arrived with WordPress and Sanity CMS integrations, and Agents launched broadly on 24 Feb 2026 with 100 free agent runs for Starter and Growth plans.
  Primary. - [Profound changelog](https://www.tryprofound.com/changelog)
- Later CMS and publishing connections by changelog date: Framer and Payload CMS (3 Apr 2026), Drupal and Directus nodes (10 Jul 2026), Adobe Experience Manager Content Fragment nodes (24 Jul 2026).
  A Human Review node shipped on 31 Jul 2026, and plain-language Agent building on 16 Oct 2026.
  Primary. - [Profound changelog](https://www.tryprofound.com/changelog)
- Profound's help docs describe agents that identify content gaps and automatically create optimized content to fill them, with branching logic and loops.
  Read 2026-11-22, primary. - [Profound help, About Agents](https://help.tryprofound.com/articles/9762251986-agents-overview)
- Profound's Agent Analytics (bot and crawler traffic) integrates with Vercel (23 Jul 2025), Akamai, Cloudflare, Fastly and Netlify (1 Oct 2025), Shopify through Nostra (3 Apr 2026) and Adobe Analytics (beta 17 Apr 2026, general availability 19 Jun 2026).
  S3 log delivery for Cloudflare, Fastly, Amazon CloudFront and Akamai shipped on 11 Sep 2026.
  Dynamic Bot Rendering through CloudFront, Cloudflare and Vercel shipped on 18 Sep 2026.
  Primary. - [Profound changelog](https://www.tryprofound.com/changelog)
- Profound's attribution and commerce items: Bot Visits and Human Referrals nodes (8 May 2026), ChatGPT Shopping visibility in its assistant (24 Jul 2026), four Shopping nodes and a GA4 node (28 Aug 2026), Search Console data in Pages (18 Sep 2026).
  Primary. - [Profound changelog](https://www.tryprofound.com/changelog)
- Profound moved into paid media: four OpenAI Ads nodes (8 May 2026), OAI-AdsBot tracking (22 May 2026), Google Ads nodes (5 Jun 2026), Ads Studio private beta (31 Jul 2026), Profound Ads beta covering Google, Meta, LinkedIn and ChatGPT (6 Nov 2026).
  Primary. - [Profound changelog](https://www.tryprofound.com/changelog)
- Profound added off-site placement connectors: Noble nodes for third-party citation sourcing and PartnerStack nodes that can reach "65,000+ publishers" (29 May 2026).
  It added an assistant layer: Ask Profound (1 May 2026), FactCheck (26 Jun 2026), Aim, later called AI Marketer (10 Jul 2026), and an official Anthropic connector (24 Jul 2026).
  Primary. - [Profound changelog](https://www.tryprofound.com/changelog)
- Profound's lead investor wrote in February 2026 that over 500 customers use Agents daily.
  Investor claim, not verified. - [Lightspeed](https://lsvp.com/stories/profound-building-the-marketing-command-center-for-the-ai-era/)

Peec AI

- Peec's Actions feature produces a ranked list with evidence, "Relative impact" ratings and steps, in categories "Fix how AI reads your site", "Improve your own pages", "Get mentioned elsewhere" and "Fix wrong claims AI makes about your brand."
  Content guidance arrives as "The brief", a suggested content structure.
  Read 2026-11-22, primary. - [Peec docs](https://docs.peec.ai/llms-full.txt)
- Peec connects GA4 for AI referral traffic (one property per project) and labels the number a floor: "This represents the minimum AI-driven traffic captured."
  Peec also has Agent Analytics for AI crawler activity (Crawl Insights, Crawlability), an agent readiness audit, an MCP server, a customer API, and agent connectors to Notion, Linear, HubSpot, PostHog, Webflow, Google Drive and Framer.
  Read 2026-11-22, primary. - [Peec docs](https://docs.peec.ai/llms-full.txt)
- Peec launched AI Shopping Analytics on 17 Jun 2026 according to third-party profiles citing a company release.
  Third-party, medium confidence. - [Sacra profile of Peec](https://sacra.com/c/peec/)

AthenaHQ

- AthenaHQ's plans include content recommendations, an "Athena AI agent", on-page and off-page actions, a content optimization agent, and Shopify, Webflow, GA4 and Search Console integrations.
  Enterprise adds the Athena Citation Engine (ACE), Knowledge Base and claim review, discrepancy detection, persona targeting and BI connectors.
  Read 2026-11-22, primary. - [AthenaHQ pricing](https://athenahq.ai/pricing)
- AthenaHQ's Shopify integration is described as letting a team "publish AEO content and attribute revenue back to AI search discovery", and ACE as a model that forecasts how likely an AI system is to cite a piece of content.
  17 Nov 2026, independent trade blog quoting vendor material. - [eCommerce Fastlane](https://ecommercefastlane.com/bloomreach-acquires-athenahq/)

Scrunch

- Scrunch's AXP serves content "straight to agents at the edge" while the human page stays unchanged.
  Site Optimization produces page-by-page recommendations and needs "no CDN integration required."
  Optimizer writes content updates, Adaptive Optimization implements approved recommendations and reoptimizes weekly, and Universal Optimization strips scripts and clutter from agent-facing pages.
  Observability covers Agent Traffic, AI Referrals, Shopping and Trends.
  Dated "07.08.2026", primary. - [Scrunch blog](https://origin.scrunchai.com/blog/agent-experience-platform)
- A G2 listing describes AXP as sitting between the website and AI crawlers and delivering compressed, structured content for LLM consumption.
  Read 2026-11-22, aggregator. - [G2](https://www.g2.com/products/scrunch-ai/discuss)

Adobe Brand Visibility and Semrush

- Adobe says AI agents surface prioritized recommendations, updates deploy "in minutes", and "Updates reach AI agents at the edge."
  It runs natively with Adobe Experience Manager and as a standalone application, and claims teams can "connect every GEO action to bookings, pipeline and revenue" through Adobe's analytics products.
  17 Jun 2026, primary. - [Adobe newsroom](https://news.adobe.com/news/2026/06/introducing-adobe-brand-visibility)
- Adobe's July partner note lists a Prompt Library, a Prompt Strategy roadmap "prioritized by impact", and an Opportunity workspace that groups and assigns optimization work and measures results through CX Analytics.
  Brand Visibility replaced LLM Optimizer in the price list on 31 Jul 2026 with general availability on 3 Aug 2026.
  29 Jul 2026, primary. - [Adobe partner news](https://partners.adobe.com/digitalexperience/news/2026/07/what-new-adobe-brand-visibility)

Otterly.ai, SE Visible, Ahrefs Brand Radar

- Otterly's 2026 changelog shows analytics additions: Query Fan-Out in GEO Audit (25 Jun 2026), a redesigned Citations report (22 Jul 2026), Agent Analytics for AI agent and crawler visits (4 Aug 2026), Agent Analytics over REST API and MCP, and a Domain Sources view (31 Aug 2026).
  Primary, read through search results. - [Otterly changelog](https://help.otterly.ai/changelog?hsLang=en)
- SE Visible has Agents in beta that suggest prioritized actions tied to visibility gaps, and a sources gap score that ranks pages citing competitors but not the brand.
  29 Sep 2026, primary. - [SE Visible, how it works](https://visible.seranking.com/blog/how-se-visible-works/)
- Ahrefs' Brand Radar methodology page lists analytical uses only (benchmarking share of voice, competitor comparison, co-citation patterns, gaps) and describes no recommendation or automated action feature.
  Updated 26 Feb 2026, primary. - [Ahrefs Brand Radar methodology](https://ahrefs.com/blog/brand-radar-methodology/)

Evertune, Bluefish, Goodie, Gauge, Relixir, HubSpot

- Evertune's activation route is advertising: it announced AI Retargeting through Index Exchange and The Trade Desk in February 2026, so marketers can buy ads on the publishers that influence AI responses.
  A later release adds activation on The Trade Desk, DV360 and Yahoo DSP through Experian.
  Its site lists modules Explore, Measure, Act and Advertise.
  Primary. - [Evertune announcement](https://www.evertune.ai/resources/insights-on-ai/evertune-announces-ai-retargeting-through-new-partnerships-with-index-exchange-and-the-trade-desk); [Evertune and Experian](https://www.evertune.ai/resources/insights-on-ai/evertune-ai-retargeting-now-available-on-the-trade-desk-dv360-and-yahoo-dsp-through-experian)
- Bluefish launched Paid Media Briefs on 27 Oct 2026.
  Each brief covers one buying topic and one ad channel, starting with Google and ChatGPT, and the roadmap adds sponsored publisher content, creator partnerships, user-generated content and retail media.
  Press coverage. - [ContentGrip](https://www.contentgrip.com/bluefish-paid-media-briefs/); [CMSWire](https://www.cmswire.com/the-wire/bluefish-expands-agentic-marketing-platform-into-paid-media-to-unite-the-ai-marketing-funnel/)
- A competitor page says Goodie monitors AI crawler behavior and audits schema, robots.txt, rendering, page speed, content structure and crawl errors.
  Read 2026-11-22, vendor comparison, low confidence. - [Conductor vs Goodie](https://www.conductor.com/compare/goodie-vs-conductor/)
- Gauge's agent builds and executes plans by "recommending and drafting focused content" and works through MCP and a Slack bot.
  The launch page does not mention CMS publishing.
  Primary. - [YC launch page for Gauge](https://www.ycombinator.com/launches/Pgl-gauge-your-marketing-agent-for-organic-paid-and-ai-search)
- Relixir's material describes a "GEO-native CMS" that generates content and connects to CMS systems for automated publishing.
  Read 2026-11-22, competitor blog summarizing Relixir docs, low confidence. - [Dageno](https://dageno.ai/blog/relixir-alternative)
- HubSpot AEO lets marketers respond to a gap by creating content, publishing social posts or updating pages inside HubSpot.
  14 Apr 2026, primary. - [HubSpot company news](https://www.hubspot.com/company-news/hubspot-aeo)

### Inferences

- The execution features cluster into four types: content drafting with CMS push (Profound, AthenaHQ, Scrunch, Relixir), bot-only edge delivery (Scrunch AXP, Adobe, Profound Dynamic Bot Rendering), paid media (Profound, Evertune, Bluefish), and crawler log analytics (Profound, Peec, Otterly, Scrunch, Goodie).
- Attribution is the thinnest layer.
  The connections that exist are GA4 referral counts (Peec, Profound, AthenaHQ), Shopify (AthenaHQ, Profound through Nostra) and Adobe Analytics (Adobe, Profound).
  I found no tracker that documents a CRM pipeline or closed-revenue join outside Adobe's and HubSpot's own suites.
- Agentic commerce coverage in trackers is measurement only: shopping visibility (Profound, Peec, Scrunch) and ChatGPT ad tracking (Peec, Profound).
  None of the pages I read describes feed management, checkout protocol setup or order attribution for in-chat purchases.

### Gaps

- I could not confirm the mechanics of Adobe's edge deployment (CDN requirements, behavior on non-AEM sites); Adobe's public pages defer to documentation I did not reach.
- I found no description of Evertune's "Act" module, and no detail on Goodie's attribution method or any Goodie agentic commerce feature.
- Whether AthenaHQ has a feature named "Action Center" could not be confirmed; its pricing page uses "on-page and off-page actions."
- I found no independent test of the output quality of any tracker's content agent.

## 4. Where each product stops and who implements a recommendation

### Takeaway

In most products the handoff is a prioritized list or a draft that a human must approve, edit and ship, and the tracker has no way to verify the work happened except by watching the visibility number later.
The products that do ship changes do it in narrow channels: a CMS draft or post, a bot-only edge version of a page, or an ad buy, while off-site work (earned media, reviews, forum presence, fixing wrong claims at the source) stays with the customer.

### Cited findings

- Peec stops at the list: the customer's team accepts an action, works through it and marks it Done, and the docs do not describe Peec making changes itself.
  Peec states that its Agent Readiness results "are based on Peec AI's own audit requests and do not reflect actual AI crawler activity" and that the audit samples pages.
  Read 2026-11-22, primary. - [Peec docs](https://docs.peec.ai/llms-full.txt)
- Scrunch offers four handoffs for a content update: a ticket to the customer's team, a Markdown export for a coding agent, a CMS push, or edge delivery.
  Automatic implementation applies to approved recommendations, and edge delivery changes what agents receive while "the human experience stays unchanged."
  Dated "07.08.2026", primary. - [Scrunch blog](https://origin.scrunchai.com/blog/agent-experience-platform)
- Sitecore's stated plan keeps a human approver: its CMO described marketers reviewing daily content recommendations and approving them.
  Sitecore's release says "These recommendations will be automated within the SitecoreAI Content Management, Content Marketing, and Digital Asset Management solutions", which places full automation inside Sitecore's own stack.
  3 and 4 Jun 2026, primary and independent. - [Sitecore press release](https://sitecore.com/company/newsroom/press-releases/2026/06/sitecore-acquires-scrunch-to-help-brands-influence-discovery--and-buying-decisions); [TechTarget](https://www.techtarget.com/searchcustomerexperience/news/366643973/Sitecore-acquires-Scrunch-for-answer-engine-optimization)
- Adobe's partner note states the dependency plainly: "New insights only matter if customers can act on them."
  Customers group and assign the optimization work in the Opportunity workspace.
  29 Jul 2026, primary. - [Adobe partner news](https://partners.adobe.com/digitalexperience/news/2026/07/what-new-adobe-brand-visibility)
- HubSpot wrote at launch: "The ability to act on recommendations directly inside the tool is coming later this year."
  14 Apr 2026, primary. - [HubSpot company news](https://www.hubspot.com/company-news/hubspot-aeo)
- SE Visible's Agents are suggestions only, the user makes the final decision, and the vendor says the beta "may change as it develops."
  29 Sep 2026, primary. - [SE Visible, how it works](https://visible.seranking.com/blog/how-se-visible-works/)
- Profound's agents can draft and push content through CMS nodes, and Profound added a Human Review node on 31 Jul 2026.
  Workflows were Enterprise-only at the December 2025 beta, and the $399 plan reported in May 2026 included six optimized articles.
  Primary and independent. - [Profound changelog](https://www.tryprofound.com/changelog); [Digiday](https://digiday.com/marketing/marketers-question-expensive-ai-visibility-tools-as-inconsistent-results-fuel-skepticism/)
- Ahrefs positions Brand Radar as "a media-visibility audit, showing what appears in AI and search - not who saw it" and says it "is not a substitute for audience measurement or traffic analytics."
  Updated 26 Feb 2026, primary. - [Ahrefs Brand Radar methodology](https://ahrefs.com/blog/brand-radar-methodology/)
- A competitor says Otterly reports and recommends fixes but does not implement them.
  Read 2026-11-22, vendor comparison, low confidence. - [Frase vs Otterly](https://www.frase.io/vs/otterly.md)
- Evertune's methodology page gives a diagnosis and no implementer: weak in the consumer app but strong in model knowledge "points to an SEO and content gap", weak in both "points to a brand-building gap", and the next step offered is "Speak with our team."
  Read 2026-11-22, primary. - [Evertune methodology](https://www.evertune.ai/platform/methodology)
- Bluefish's Paid Media Briefs are pre-generated briefs, and trade coverage notes that marketers still need to test whether the AI visibility signals improve paid campaign results.
  27 Oct 2026, press. - [ContentGrip](https://www.contentgrip.com/bluefish-paid-media-briefs/)
- On revenue proof, a trade review of the AthenaHQ deal says: "What nobody has shown publicly is that a specific recommendation caused a sale that would not have happened anyway."
  It adds that an AI answer naming a brand often produces no click, and that orders completed inside an AI channel's checkout may bypass the storefront's pixels.
  17 Nov 2026, independent trade blog. - [eCommerce Fastlane](https://ecommercefastlane.com/bloomreach-acquires-athenahq/)
- Agency executives told Digiday that AI visibility cannot be tracked to direct sales and that many tools give "point in time" results.
  1 May 2026, independent. - [Digiday](https://digiday.com/marketing/marketers-question-expensive-ai-visibility-tools-as-inconsistent-results-fuel-skepticism/)
- A Constellation Research analyst called earned media "a wild card that is really, really hard to control, to master and to monitor" when commenting on the Scrunch deal.
  4 Jun 2026, independent. - [TechTarget](https://www.techtarget.com/searchcustomerexperience/news/366643973/Sitecore-acquires-Scrunch-for-answer-engine-optimization)
- The founder of the GEO monitoring startup Lorelight shut it down in early November 2025, saying customers were interested at first and then churned, and that the problem did not need a specialized tool.
  November 2025, independent. - [Search Engine Land](https://searchengineland.com/geo-startup-lorelight-shuts-down-464208); [Search Engine Journal](https://www.searchenginejournal.com/geo-platform-shutdown-sparks-industry-debate-over-ai-search/559896/)

### Inferences

- The stopping points fall into three groups.
  Analytics only: Ahrefs Brand Radar, Otterly, SE Visible, Semrush toolkit, Evertune's measurement product.
  Recommendation plus draft that a human ships: Peec, HubSpot AEO, Gauge, Goodie, AthenaHQ Starter.
  Partial execution in one channel: Profound (CMS nodes, ads, bot rendering), Scrunch (edge and CMS), Adobe (edge, AEM), Relixir (auto-publish), Evertune and Bluefish (paid media).
- No product I reviewed closes the loop from a specific change to a measured visibility change with a control.
  Adobe names "controlled experimentation and baseline comparison" as a claim, and no other vendor page describes a holdout or experiment design.
- Edge delivery to bots fixes what a crawler reads but leaves the source site, the product feed and third-party pages untouched, so the customer's own site and off-site presence remain the customer's job.
- Recommendations that require third parties (get mentioned on a publisher, correct a wrong claim, earn reviews) are handed to the customer as tasks.
  The only productized routes for off-site work are paid: Profound's Noble and PartnerStack nodes, Evertune's retargeting, and Bluefish's briefs.

### Gaps

- I found no vendor documentation that states what share of recommendations customers complete, or any measured lift per recommendation type.
- I could not verify how much human review Relixir's and Profound's auto-publish paths apply in practice.
- Gauge's page does not say which steps need human approval.

## 5. Methodology weaknesses: do tools agree, and what do vendors admit

### Takeaway

The evidence that tools disagree is strong but mostly qualitative: one practitioner test found an 8.2x spread across seven trackers for the same site, agency leaders report three tools giving three answers, and the underlying AI answers change on almost every run.
No independent, controlled benchmark of named trackers against a ground truth exists in what I found, and several vendors now admit in their own docs that single runs mean little.

### Cited findings

- A developer ran one site through seven AI citation trackers over the same 15 days and got seven numbers from 38 to 312, an 8.2x spread: Otterly 38, his own script 54, Semrush 71, Bluefish 89, Profound 147, Scrunch 203, Peec AI 312.
  He attributes the spread to counting rules, for example Profound and Otterly counting only clickable linked citations.
  The page returned a 404 when I tried to open it on 22 Nov 2026, so these figures come from search-result text, with one author, one site and no replication.
  2026, practitioner, low to medium confidence. - [Ken Imoto on DEV Community](https://dev.to/kenimo49/i-plugged-the-same-site-into-7-ai-citation-trackers-they-reported-7-different-numbers-3a42)
- Paul Dyer, CEO of the agency /prompt, said: "If you use three different tools and give them the same prompts, you get three different answers."
  Heather Physioc of VML said many tools give "point in time" results, and VML tracks about 17 emerging tools.
  Joseph Levi of Noise Media Group said: "We don't know enough of these companies to be charging what they're charging."
  Agencies in the piece treat the tools as benchmarks, build in-house trackers, and call the spend a "necessary evil."
  1 May 2026, independent. - [Digiday](https://digiday.com/marketing/marketers-question-expensive-ai-visibility-tools-as-inconsistent-results-fuel-skepticism/)
- The SparkToro and Gumshoe study ran 2,961 prompts across ChatGPT, Claude and Google AI Overviews or AI Mode, 60 to 100 runs per prompt per platform.
  The same brand list came back less than 1% of the time and the same list in the same order less than 0.1% of the time.
  The authors found visibility percentage across many runs more consistent than position, and Rand Fishkin called AI ranking position metrics "full of baloney."
  In a side test, 142 people wrote their own prompts for one need and the prompts had a semantic similarity of 0.081.
  The study is not peer-reviewed and was run with a tracking vendor.
  30 Jan 2026, independent press. - [Search Engine Journal](https://www.searchenginejournal.com/ai-recommendations-change-with-nearly-every-query-sparktoro/)
- Ahrefs tracked more than 43,000 AI Overview queries for about a month.
  The answer changed in 70% of checks, the average version lasted about two days, and consecutive answers shared 54.5% of cited sources and 54% of named entities.
  Reported 19 Oct 2026 in a contributor opinion piece whose author runs an agency. - [Entrepreneur](https://www.entrepreneur.com/business-news/tech/that-ai-visibility-score-you-just-bought-its-probably-just-a-screenshot-of-a-die-roll)
- The same piece sets a floor of ten runs per prompt ("Fewer than ten is a screenshot with extra steps") and cites an academic preprint, Malthouse et al., arXiv 2609.16304, September 2026, that samples the same query many times across six models.
  19 Oct 2026, opinion. - [Entrepreneur](https://www.entrepreneur.com/business-news/tech/that-ai-visibility-score-you-just-bought-its-probably-just-a-screenshot-of-a-die-roll)
- Evertune's own numbers: one ask per prompt gives a topic score that could range "as low as 19% or as high as 81%", and it rejects the argument that noise averages out across many prompts at topic level.
  July 2026 analysis, primary, vendor with an interest in repeated sampling. - [Evertune methodology](https://www.evertune.ai/platform/methodology)
- SE Ranking admits: "AI answers change from one run to the next, often more than people expect" and "A single check tells you what one answer looked like at one moment, and very little about where you actually stand."
  Its own research found only about a third of cited domains repeat for the same prompt across runs, and it says month-over-month trends become readable after about three months.
  29 Sep 2026, primary. - [SE Visible, how it works](https://visible.seranking.com/blog/how-se-visible-works/)
- Otterly admits: "AI search responses aren't deterministic; the same prompt can return different results on different runs."
  Read 2026-11-22, primary. - [Otterly help](https://help.otterly.ai/monitoring-interval)
- Ahrefs admits "we don't claim a validated link between Google search volume and how often a query is asked inside an AI tool", calls its metrics "modeled visibility signals, and not performance metrics", and says "We do not filter out hallucinated or malformed links, as they reflect real model output."
  It also says niche prompts "may not always be included" and "We don't estimate actual AI usage by country."
  Updated 26 Feb 2026, primary. - [Ahrefs Brand Radar methodology](https://ahrefs.com/blog/brand-radar-methodology/)
- A hands-on review reports Brand Radar showing zero for a brand that ChatGPT cited, and blames a keyword-first method.
  Read 2026-11-22, vendor comparison, low confidence. - [Writesonic](https://writesonic.com/blog/ahrefs-brand-radar-review)
- Brainlabs says different tools give different numbers, disagree on which prompts matter and score sentiment inconsistently.
  It recommends treating agreement across several data sources as the signal and reporting trends and relative comparisons, not point-in-time percentages.
  Undated, agency blog, no tool-by-tool figures. - [Brainlabs](https://www.brainlabsdigital.com/ai-visibility-data-accuracy/)
- A syndicated release titled as a three-platform accuracy comparison (Profound, Lumentir, Peec) contains no prompt counts, no ground truth and no measured results, and promotes Lumentir.
  16 Mar 2026, press release, not a benchmark. - [AB Newswire via FinancialContent](https://www.financialcontent.com/article/abnewswire-2026-3-17-how-accurately-do-ai-visibility-tools-track-what-chatgpt-says-about-brands-three-leading-platforms-compared)
- A vendor explainer lists the causes of disagreement as different prompt sets, engines queried, repeat counts and score formulas, and cites an Ahrefs finding of 13.7% citation overlap across 540,000 query pairs.
  Read 2026-11-22, vendor blog, low confidence; I did not open the Ahrefs original. - [Passionfruit](https://www.getpassionfruit.com/blog/why-ai-visibility-tools-show-different-results)
- Bluefish's own data shows Google and ChatGPT favored different leading brands for 35% of the buying topics in its sample.
  27 Oct 2026, vendor data via trade press. - [PPC Land](https://ppc.land/chatgpt-and-google-differ-on-top-brand-in-35-of-buying-topics-bluefish-says/)

### Inferences

- "Visibility" is not one metric.
  Profound's is binary presence, SE Visible's is position-weighted, Semrush's is relative to the median competitor, Ahrefs' is string-match share of voice across a keyword-derived prompt set, and Evertune's index blends frequency and rank.
  Two tools can both be correct and still report numbers that cannot be compared.
- The measured instability of the answers themselves (under 1% identical lists, 70% of AI Overviews changing between checks) means a one-run-per-day tracker needs weeks of data per prompt before a change is distinguishable from noise.
  SE Ranking's "about three months" for readable trends is consistent with that.
- Position and rank metrics are the weakest numbers these tools sell, by the SparkToro result, yet position remains a headline metric in Peec, SE Visible and Evertune's index.
- Because each customer picks a small prompt set and real users phrase the same need very differently (0.081 similarity), a tracker measures the customer's chosen questions, not demand.
- The absence of any vendor-published accuracy audit, combined with one test showing an 8.2x spread, means absolute numbers from these tools should be treated as tool-specific indexes.

### Gaps

- I found no independent, controlled benchmark that runs a fixed prompt set through several named trackers and compares them with hand-collected answers.
- I found no usable Reddit threads (r/SEO, r/bigseo, r/GenEngineOptimization) through search; the search tool returned none, so community sentiment is not represented here.
- Search Engine Land's article on repeated ChatGPT runs returned HTTP 403 and could not be read.
- The seven-tracker test page could not be opened, so its method and dates are unverified.
- No vendor in this set publishes confidence intervals in the product UI as far as their public docs show, except Evertune's marketing page.

## 6. Consolidation and direction in 2026

### Takeaway

During 2026 monitoring became a feature of larger suites: Adobe absorbed Semrush, Sitecore bought Scrunch, Bloomreach bought AthenaHQ, HubSpot shipped the XFunnel product for $50 a month, and CMS and CDN vendors added their own dashboards.
The independents that remain raised large rounds and moved toward agents, publishing and paid media, with Profound alone at $1.8B.

### Cited findings

- Sitecore announced the Scrunch acquisition on 3 Jun 2026 without terms; Bloomberg reported about $225 million.
  Scrunch had raised about $26 million and claims 500+ brands and agencies.
  Sitecore's CMO said existing customers can keep using Scrunch standalone and that Scrunch features will be integrated into Sitecore.
  June 2026, primary and independent. - [Sitecore press release](https://sitecore.com/company/newsroom/press-releases/2026/06/sitecore-acquires-scrunch-to-help-brands-influence-discovery--and-buying-decisions); [TechTarget](https://www.techtarget.com/searchcustomerexperience/news/366643973/Sitecore-acquires-Scrunch-for-answer-engine-optimization); [Adweek](https://www.adweek.com/media/sitecore-snaps-up-geo-startup-scrunch-for-225m/)
- Bloomreach announced the acquisition of AthenaHQ on 16 Nov 2026 for an undisclosed price.
  The whole team joins Bloomreach, existing accounts and contracts stay as they are, and the first combined product use cases are slated for early 2027.
  17 Nov 2026, independent trade blog. - [eCommerce Fastlane](https://ecommercefastlane.com/bloomreach-acquires-athenahq/)
- HubSpot's XFunnel acquisition was announced on 31 Oct 2025 and closed on 1 Dec 2025, and HubSpot AEO became generally available on 14 Apr 2026.
  One source says the price was undisclosed; another search result cites about $30 million in cash from a HubSpot quarterly filing, which I did not verify.
  6 Oct 2026, independent analyst blog. - [Deepak Gupta acquisition map](https://guptadeepak.com/who-is-buying-building-ai-visibility/)
- Adobe LLM Optimizer became Adobe Brand Visibility, sold in its place from 31 Jul 2026 and generally available 3 Aug 2026, combining LLM Optimizer with Semrush Enterprise AIO.
  July 2026, primary. - [Adobe partner news](https://partners.adobe.com/digitalexperience/news/2026/07/what-new-adobe-brand-visibility)
- Profound raised a $180 million Series D at a $1.8 billion valuation in September 2026, co-led by Sequoia and Kleiner Perkins, taking total funding past $335 million.
  October 2026, independent blogs. - [Deepak Gupta acquisition map](https://guptadeepak.com/who-is-buying-building-ai-visibility/); [Value Add VC](https://valueaddvc.com/blog/ai-search-optimization-startups-2026-geo-aeo-funding-investors)
- Peec was reported on 29 Jun 2026 to be in talks to raise about $10 million at a $200 million pre-money valuation, with $29.1 million raised to date and more than $10 million ARR 16 months after launch.
  Sacra estimates Peec's ARR at about $11.5 million in June 2026, up from $5 million at the end of 2025.
  The Next Web warns that "if monitoring becomes a feature" the valuation may look steep.
  June and July 2026, independent; no closed round confirmed. - [The Next Web](https://thenextweb.com/news/peec-ai-200m-valuation-geo-ai-search); [Sacra](https://sacra.com/research/peec-vs-profound/)
- Bluefish raised a $43 million Series B in April 2026, co-led by Threshold Ventures and NEA, for $68 million total, and expanded into paid media on 27 Oct 2026.
  Independent. - [Built In](https://builtin.com/articles/bluefish-raises-43m-series-b-20260417); [CMSWire](https://www.cmswire.com/the-wire/bluefish-expands-agentic-marketing-platform-into-paid-media-to-unite-the-ai-marketing-funnel/)
- Dealroom counts seven GEO startups founded since 2024 that raised $472 million, two of which have been acquired, and records no venture round for Gauge or Goodie.
  Read 2026-11-22, independent data provider. - [Dealroom](https://dealroom.co/charts/generative-engine-optimization-startups)
- Smaller deals: xSeek acquired its competitor LLMonade, and Searchable acquired Meridian Tech in a seven-figure deal.
  Dates not found, trade press that I did not open in full. - [MarTech Cube](https://www.martechcube.com/?p=319490); [Unite.AI](https://www.unite.ai/?p=470589)
- Platform vendors added their own visibility products: Cloudflare's AEO Visibility Dashboard entered early access on 6 Aug 2026, Optimizely launched an AEO platform with Agent Visibility Analytics and a Conductor partnership on 10 Jun 2026, Wix and Squarespace added AI visibility views, and Bing Webmaster Tools added an AI Performance dashboard.
  Amplitude launched an AI Visibility tool in early November 2025.
  These are out of scope for this teardown and are listed only as pressure on standalone trackers.
  6 Oct 2026 and November 2025. - [Deepak Gupta acquisition map](https://guptadeepak.com/who-is-buying-building-ai-visibility/); [PPC Land](https://ppc.land/lorelight-founder-shuts-down-ai-visibility-tracking-tool/)
- Sacra expects convergence on platforms that both measure AI visibility and do the work to improve it, and notes Profound and AirOps expanding from analytics into content generation while Semrush, Ahrefs, Amplitude and HubSpot add AEO features.
  14 Jul 2026, independent analyst. - [Sacra](https://sacra.com/research/peec-vs-profound/)
- Sitecore framed its deal as a move "from insight to action", and a partner CMO quoted in the release said "Insight without action isn't enough."
  3 Jun 2026, primary. - [Sitecore press release](https://sitecore.com/company/newsroom/press-releases/2026/06/sitecore-acquires-scrunch-to-help-brands-influence-discovery--and-buying-decisions)
- Lorelight is the one documented shutdown, in early November 2025.
  Independent. - [Search Engine Land](https://searchengineland.com/geo-startup-lorelight-shuts-down-464208)

### Inferences

- Three of the venture-backed pure-play trackers named in the brief were bought by experience or commerce platforms within about twelve months (XFunnel by HubSpot, Scrunch by Sitecore, AthenaHQ by Bloomreach), and in each case the acquirer's stated plan ties automated execution to its own CMS or commerce stack.
  Customers who are not on that stack keep the standalone monitor and little else.
- Price pressure on pure monitoring is visible: HubSpot at $50 a month, Otterly Lite at $29, Semrush at $99, against Profound and Peec plans in the hundreds.
- The independents' response is to sell work, not dashboards: agents, CMS publishing, bot rendering and ads at Profound, shopping and ad analytics at Peec, paid media at Bluefish and Evertune.
- As of November 2026 the remaining well-funded independents in this set are Profound, Peec, Bluefish and Evertune, with Otterly, Gauge, Goodie and Relixir as smaller players.

### Gaps

- Deal prices for AthenaHQ and XFunnel are not confirmed by a primary source I could open.
- I found no confirmation that Peec's reported round closed.
- I found no 2026 shutdowns beyond Lorelight (late 2025), and no source that counts trackers that went quiet without an announcement.
- Post-acquisition product changes at Scrunch and AthenaHQ are not yet documented beyond the statements above.
