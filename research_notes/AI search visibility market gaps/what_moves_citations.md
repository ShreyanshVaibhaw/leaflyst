# What moves AI citations and how reliably they can be measured (evidence as of November 2026)

How to read these notes.
Every finding carries a date, a sample size where one exists, and a confidence label.
The confidence order is: controlled experiment, then large observational study, then small case study, then vendor assertion or official statement without data.
"Incentive" names what the publisher sells.
"Not opened" means the figure comes from a search result summary or secondary coverage and I did not read the primary page.
Almost everything below is paraphrased, so check the linked page before quoting wording.

## 1. What raises AI mentions and citations (academic and large-scale industry evidence)

### Takeaway
Two things have reproducible support: getting retrieved at all (topical relevance and rank inside the engine's own retrieval set) and broad third-party brand presence.
The well-known "up to 40%" on-page rewrite gain comes from a 2023 lab setup with a fixed five-document context, and benchmarks that include the retrieval step find the same rewrites mostly neutral or negative.

### Cited Findings

#### Academic work

- The original GEO paper (Aggarwal et al., Princeton and IIT Delhi, arXiv November 2023, KDD 2024) built GEO-bench with 10,000 queries (8,000 train, 1,000 validation, 1,000 test), 80% of them informational.
  The simulated engine took the top 5 Google results and generated answers with gpt-3.5-turbo at temperature 0.7.
  The paper states that the best methods lift Position-Adjusted Word Count by 41% and Subjective Impression by 28%.
  Per-method lifts on word count, computed from Table 1: Quotation Addition about +41%, Statistics Addition about +33%, Fluency Optimization about +29%, Cite Sources about +28%, Technical Terms about +19%, Easy-to-Understand about +14%, Authoritative about +12%, Unique Words about +6%, Keyword Stuffing about -9%.
  Confidence: controlled experiment, but on a simulated engine with a 2023 model. - [arXiv 2311.09735v3](https://arxiv.org/html/2311.09735v3)
- In the same paper, the gains went to low-ranked sources and came at the expense of the top source.
  Cite Sources changed visibility by +115.1% for the rank-5 site and -30.3% for the rank-1 site.
  Quotation Addition gave +99.7% at rank 5 and -22.9% at rank 1.
  Confidence: controlled experiment, same limits. - [arXiv 2311.09735v3](https://arxiv.org/html/2311.09735v3)
- The paper's real-engine check used Perplexity.ai on a 200-query subset.
  Quotation Addition gave about +22% on word count, Statistics Addition about +37% on Subjective Impression, and Keyword Stuffing did about 10% worse than baseline.
  The authors list as limits that only two engines were tested and that effects on search ranking were not measured.
  Confidence: small controlled test, 2023 data, may no longer hold. - [arXiv 2311.09735v3](https://arxiv.org/html/2311.09735v3)
- A critical survey of 45 GEO studies published between November 2023 and July 2026 (Martinez, arXiv, 15 July 2026) concludes that the foundational gains are valid inside that experiment but depend on the source already sitting in a fixed context.
  It says they establish neither organic discoverability nor durable traffic effects.
  It ranks topical relevance and context position as the most reproducible levers, says generic heuristics transfer poorly, says competition erodes individual gains, and says citation-oriented rewrites can impair retrieval.
  It finds no reviewed technique with a stable, longitudinal, cross-platform causal effect.
  Confidence: literature review of mixed-quality studies. - [arXiv 2607.14035](https://arxiv.org/abs/2607.14035)
- The same survey, as summarised by PPC Land, places the general claim that GEO increases visibility by 40% in its lowest confidence tier.
  In SAGEO Arena (171,003 documents, 2,700 queries) body-only optimisation lowered average top-20 presence by about 9%, top-10 presence after reranking by 16%, and final citation by 6%.
  A factorial experiment with 252,000 trials, six language models and eighteen factors found relevance and position to be the main determinants of first citation.
  In an e-commerce testbed, ten of fifteen initial heuristics were neutral or negative.
  Confidence: controlled experiments, reported through secondary coverage. - [PPC Land](https://ppc.land/survey-of-45-studies-finds-geo-rewrites-can-cut-a-pages-ai-retrieval-16/)
- C-SEO Bench (Puerto et al., NeurIPS Datasets and Benchmarks 2025, arXiv June 2025) tested conversational SEO methods across question answering and product recommendation, three domains each, with varying numbers of adopting competitors.
  It found most methods largely ineffective and often harmful to a document's rank in the model's context.
  Traditional SEO, meaning getting the document higher in the context, was significantly more effective.
  Gains shrank as more competitors adopted the same method, which the authors describe as congested and zero-sum.
  PPC Land's summary of the survey reports that only 3 of 54 method-domain combinations were significantly positive and none in question answering.
  Confidence: controlled experiment. - [arXiv 2506.11097](https://arxiv.org/abs/2506.11097); [PPC Land](https://ppc.land/survey-of-45-studies-finds-geo-rewrites-can-cut-a-pages-ai-retrieval-16/)
- E-GEO (Bagga, Farias and co-authors, arXiv November 2025, v3 dated 6 November 2026) uses 13,746 multi-sentence shopping queries, each paired with 10 retrieved Amazon listings, across five engines, seven rewriter models and fifteen heuristics.
  Prompts optimised from different starting heuristics converged to one stable pattern, which the authors read as a shared, transferable strategy for product listings.
  Under a simple in-prompt defence, the remaining gains reflected real content improvement.
  The abstract gives no effect sizes.
  Confidence: controlled experiment, e-commerce listings only, source already retrieved. - [arXiv 2511.20867](https://arxiv.org/abs/2511.20867)
- Chen, Wang, Chen and Koudas (arXiv, 10 September 2025) ran controlled comparisons of AI search engines against Google across verticals, languages and paraphrases.
  They report a systematic and overwhelming bias toward earned media over brand-owned and social content, while Google shows a more balanced mix.
  Engines differed in domain diversity, freshness, cross-language stability and sensitivity to phrasing.
  The abstract gives no sample sizes.
  Confidence: controlled comparison, sizes not verified. - [arXiv 2509.08919](https://arxiv.org/abs/2509.08919)
- A fitted stage model on 34,960 observations from 75 monitored projects and 2,854 prompts (Tannenbaum, arXiv, 19 September 2026, data June to September 2026) links brand mention to what was retrieved in that run.
  With no own-domain exposure in live retrieval, the brand was mentioned in 2.8% of GPT runs and 3.8% of Gemini runs.
  With an own-domain citation but no branded fan-out query, the rates were 49.0% and 58.4%.
  With both, 91.4% and 100%.
  Prior-run history alone predicted the next run with AUC 0.937 (GPT) and 0.917 (Gemini), and matching a page to the prompt predicted exposure weakly (AUC 0.545 for GPT, 0.641 for Gemini).
  The author states the model is predictive, not causal.
  Confidence: large observational study on a tracking vendor's customer data. - [arXiv 2609.23162](https://arxiv.org/abs/2609.23162)
- A vendor-authored arXiv paper (Kumar, Ranqo, 18 June 2026) covers 100,000+ prompt responses for 100+ brands tracked March to May 2026.
  First-run visibility was 73% for global household names, 44% for established mid-market brands and 11% for niche and small brands, about 30 points per tier.
  Ranked "best-of" listicles were the top cited format at about 21% of citations.
  Sentiment framing flipped about 6.7 times more often than whether the brand was mentioned.
  Confidence: large observational study.
  Incentive: Ranqo sells AI visibility tracking. - [arXiv 2606.20065](https://arxiv.org/abs/2606.20065)

#### Industry studies

- Ahrefs correlated AI Overview brand mentions with brand signals for 75,000 brands (published 26 May 2025, Spearman, domains with DR above 40 only).
  Branded web mentions 0.664, branded anchors 0.527, branded search volume 0.392, Domain Rating 0.326, referring domains 0.295, branded organic traffic 0.274, backlinks 0.218, ad traffic 0.216, URL rating 0.18, number of site pages 0.17.
  Median AI Overview mentions by web-mention quartile were 0, 3, 14 and 169, and about 26% of brands had zero mentions.
  The study covers Google AI Overviews only and the page shows no 2026 rerun.
  Confidence: large observational study, correlation only, 18 months old.
  Incentive: Ahrefs sells Brand Radar, which tracks mentions. - [Ahrefs](https://ahrefs.com/blog/ai-overview-brand-correlation/)
- Seer Interactive ran 10,000 finance and SaaS questions through the GPT-4o API (2024 to 2025).
  Ranking on Google page one correlated about 0.65 with being mentioned, Bing rankings about 0.5 to 0.6, and backlinks were weak or neutral.
  Not opened.
  Confidence: large observational study on an older model through the API.
  Incentive: Seer is an SEO agency. - [Seer Interactive](https://www.seerinteractive.com/insights/what-drives-brand-mentions-in-ai-answers)
- Kevin Indig analysed 18,012 verified ChatGPT citations (Search Engine Journal, 17 February 2026, data supplied by tracking vendor Gauge).
  44.2% of cited passages came from the first 30% of the page, 31.1% from the middle and 24.7% from the last third.
  Cited text used definitive language more often (36.2% against 20.2%), contained question marks more often (18% against 8.9%), had entity density of 20.6% against a 5 to 8% norm, and read at grade 16 against 19.1.
  Confidence: large observational study, ChatGPT only, correlational. - [Search Engine Journal](https://www.searchenginejournal.com/the-science-of-how-ai-pays-attention/561306/)
- AirOps with Kevin Indig scraped the ChatGPT interface for 16,851 queries run three times each (50,553 responses, 353,799 pages, published 13 April 2026).
  Citation rate fell with retrieval rank: 58.4% at rank 1, 54.4% at rank 2, 35.5% at rank 3, 14.2% at rank 10.
  58.0% of retrieved pages were never cited, and only 2.3% of page-query pairs were cited in all three runs.
  Heading-to-query similarity moved the citation rate from 30.2% (below 0.50) to 41.0% (0.90 and above).
  Domain authority showed no positive link: always-cited pages averaged 53.0 and never-cited pages 55.7.
  Pages of 500 to 999 words did best (34.3%) and pages over 5,000 words worst (28.6%).
  Confidence: large observational study.
  Incentive: AirOps sells content workflow software. - [AirOps](https://www.airops.com/research/the-fan-out-effect-what-happens-between-a-query-and-a-citation)
- Surfer analysed 173,902 URLs for 10,000 keywords and 33,000 Gemini-generated fan-out queries (page updated 22 October 2026).
  The number of fan-out queries a page ranked for correlated 0.77 (Spearman) with being cited in the AI Overview.
  Among cited pages that rank, 51.2% ranked for the main query plus at least one fan-out and 19.6% for the main query alone.
  67.82% of cited pages did not rank in the top 10 for the query or any fan-out.
  Confidence: large observational study, correlational, fan-outs simulated with Gemini grounding.
  Incentive: Surfer sells content optimisation and tracking. - [Surfer](https://surfer.ai/blog/query-fan-out/)
- Ahrefs ran the closest thing to a field experiment on a single tactic: 1,885 pages that added JSON-LD between August 2025 and March 2026, matched against about 4,000 controls, with 30-day before and after windows (published 11 May 2026).
  Difference-in-differences effects were -4.6% for AI Overview citations (statistically significant), +2.4% for AI Mode and +2.2% for ChatGPT (both indistinguishable from zero).
  Confidence: matched quasi-experiment, limited to pages that already had 100+ AI Overview citations. - [Ahrefs](https://ahrefs.com/blog/schema-ai-citations/)
- The survey's review of practitioner evidence (via PPC Land) cites one log-based natural experiment on ChatGPT referrals with an adjusted effect of 1.82x (95% interval 1.31 to 2.54) and an inconclusive placebo test, plus one industry report of a 20% production traffic lift that lacked detail.
  Cyrus Shepard's evidence-weighted review of 54 studies scored URL accessibility 9.5 and search rank 9.4, the two highest factors.
  Confidence: small case studies. - [PPC Land](https://ppc.land/survey-of-45-studies-finds-geo-rewrites-can-cut-a-pages-ai-retrieval-16/)

### Inferences
- The evidence splits GEO into two stages with different levers.
  Stage one is whether a page or brand enters the engine's candidate set, and it is governed by search rank, fan-out coverage, crawl access and brand prevalence.
  Stage two is whether retrieved text gets quoted, and on-page style (quotes, statistics, answer-first text) only acts there.
- Vendor mismatch: most content-scoring and "AI rewrite" products sell stage-two heuristics taken from the 2023 paper.
  The retrieval-inclusive benchmarks (C-SEO Bench, SAGEO Arena, E-GEO) show those heuristics are mostly neutral, sometimes negative, and lose value as competitors adopt them.
- Vendor mismatch: the strongest correlate in industry data is off-site brand mention volume (0.664), and the tier data (73%, 44%, 11%) says brand stature sets the baseline.
  Dashboards report a low score to a small brand but the lever is PR, partnerships and category presence, which the tools do not perform.
- The rank-5 result in the GEO paper is the best argument for small sites: when a low-ranked source is already in context, adding citations, quotes and statistics roughly doubled its share.
  That result has not been replicated on a live 2026 engine.
- Correlational industry findings (heading match, entity density, length, freshness) are consistent with relevance being the real driver, so treat them as weak hints.

### Gaps
- No public randomised field experiment tests an on-page tactic on a live consumer engine with enough repeated samples.
  The Ahrefs schema study is the only matched design found.
- No study isolates the causal effect of earning third-party mentions.
  Every mention result is a correlation that brand size could explain.
- Almost all academic benchmarks use informational or shopping queries.
  Local services and B2B evidence is thin.
- I could not open the full text of several arXiv papers, so some sample sizes and effect sizes come from abstracts only.

## 2. On-site versus off-site: where citations point, by engine, and how that moved in 2026

### Takeaway
For category and recommendation prompts, a tracked brand's own domain is a small minority of cited sources (about 3% to 18% depending on definition), but most of the "third-party" share is other companies' websites, not forums.
Platform shares (Reddit, YouTube, Wikipedia) differ sharply by engine and swung by multiples within months during 2025 and 2026, so any single-platform tactic is fragile.

### Cited Findings

#### Own site versus third parties

- A multilingual audit of 128 brands in 13 languages and 167,551 citation entries (Żatuchin, arXiv, v2 dated 15 November 2026) classed 17.6% of 131,512 entries as brand-associated websites and 82.4% as outside that category.
  Wikipedia was the leading domain in 11 of 12 query languages.
  3,863 of 21,033 domains accounted for 80% of citations.
  An earlier summary of this paper reported 85.7% third-party and 14.3% own site, so the split moved between versions.
  Confidence: large observational study. - [arXiv 2606.25787](https://arxiv.org/abs/2606.25787)
- Ranqo's data on 100+ brands (March to May 2026) puts about 78% of citations on corporate websites of some kind.
  Its companion blog reports 2.9% on the tracked brand's own domain and 75.2% on other companies in the same space (blog not opened).
  Among non-corporate sources YouTube led, ahead of Reddit, editorial media and Wikipedia.
  Confidence: large observational study.
  Incentive: tracking vendor. - [arXiv 2606.20065](https://arxiv.org/abs/2606.20065); [Ranqo blog](https://ranqo.ai/blog/where-ai-citations-come-from)
- A critique of the 2.9% figure points out that when an answer cites ten company sites, only one counts as "owned" for the tracked brand and the other nine count as third-party.
  Not opened.
  Confidence: commentary. - [Lisa Peyton](https://lisapeyton.com/ai-cites-company-websites-just-not-always-yours/)
- Yext analysed 6.8 million citations from 1.6 million responses on ChatGPT, Gemini and Perplexity (July to August 2025, published 9 October 2025) for location-level queries.
  It reports 86% from sources a brand owns or manages: websites 44%, listings 42%, reviews and social 8%, forums 2%.
  Not opened.
  Confidence: large observational study on local queries only.
  Incentive: Yext sells listings management, and "listings" is the category it manages. - [Yext press release](https://www.yext.com/about/news-media/ai-citations-release)
- Lily Ray tracked 100 B2B "best [category] software" prompts in Google AI Overviews at three checkpoints (15 April, 15 May and 8 June 2026, published 17 June 2026).
  When a brand's own self-ranking listicle was cited, the brand was left out of the recommendation in 224 of 323 cases (69%).
  74 of 100 prompts showed this pattern at least once.
  Confidence: small case study. - [Lily Ray on Substack](https://lilyraynyc.substack.com/p/why-calling-yourself-the-best-could)
- An Onely test of 31 agency prompts (October 2026) found ChatGPT grounded recommendations mainly on the named vendors' own websites, 119 of 210 citations (57%), while Google and Perplexity leaned on listicles.
  Not opened, secondary write-up.
  Confidence: small case study. - [Obsurfable summary](https://obsurfable.com/resources/articles/chatgpt-vendor-pages-vs-listicles-by-engine-onely-october-2026)

#### Per-engine source mix

- Profound's 680 million citations (August 2024 to June 2025, published June 2025) show how long the tail is.
  ChatGPT: Wikipedia 7.8%, Reddit 1.8%, Forbes 1.1%, G2 1.1%.
  Google AI Overviews: Reddit 2.2%, YouTube 1.9%, Quora 1.5%, LinkedIn 1.3%.
  Perplexity: Reddit 6.6%, YouTube 2.0%, Gartner 1.0%, Yelp 0.8%.
  The widely repeated "Wikipedia is 47.9% of ChatGPT" figure is a share of the top 10 only.
  Confidence: large observational study, method undisclosed, now over a year old.
  Incentive: tracking vendor. - [Profound](https://tryprofound.com/blog/ai-platform-citation-patterns)
- Semrush tracked 230,000+ prompts weekly from 14 July to 12 October 2025 (100 million+ citations, published 10 November 2025).
  On ChatGPT, Reddit and Wikipedia were cited about five times as often as the next domains before September.
  On Google AI Mode, LinkedIn appeared in nearly 15% of responses, with YouTube, Reddit and Google properties also leading.
  On Perplexity the top sources were Reddit, LinkedIn, NIH, Microsoft and Google.
  Confidence: large observational study.
  Incentive: Semrush sells AI visibility tools. - [Semrush](https://www.semrush.com/blog/most-cited-domains-ai/)
- Pew's browsing panel of 900 US adults (March 2025, 68,879 Google searches) found Wikipedia, YouTube and Reddit together were 15% of sources in AI summaries, .gov sites 6% and news sites 5%.
  Confidence: large observational study, independent, early 2025. - [Pew Research Center](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/)
- Ahrefs (2 March 2026) reports YouTube as the most cited domain in AI Overviews at 5.6% of all cited URLs, up 34% in six months.
  Confidence: large observational study. - [Ahrefs](https://ahrefs.com/blog/ai-overview-citations-top-10/)
- Peec AI's analysis of 30 million sources (about April 2026) ranked Reddit first across ChatGPT, AI Mode, Gemini, Perplexity and AI Overviews, with YouTube and LinkedIn next.
  Not opened.
  Confidence: large observational study.
  Incentive: tracking vendor. - [Search Engine Land](https://searchengineland.com/ai-search-engines-cite-reddit-youtube-and-linkedin-most-study-473138)

#### Shifts during 2025 and 2026

- September 2025: on ChatGPT, Reddit fell from about 60% of responses in early August to about 10% by mid-September, and Wikipedia from about 55% to under 20%.
  PRNewswire, Forbes and Medium gained.
  The timing matches Google's removal of the num=100 parameter around 11 September, but Semrush's own analyst doubts that it is the root cause.
  Confidence: large observational study, cause unproven. - [Semrush](https://www.semrush.com/blog/most-cited-domains-ai/)
- October 2025 to January 2026: Tinuiti (Profound data) reports Reddit's citation share grew at least 73%, with Perplexity at 24% Reddit in January 2026, ChatGPT above 5% and Gemini at 0.1%.
  Conductor, with a different method, reports Reddit's share fell about 50% over the same months.
  Both not opened.
  Confidence: conflicting vendor studies. - [Tinuiti Q1 2026](https://tinuiti.com/research-insights/research/ai-citation-trends-report-q1-2026/); [Conductor](https://www.conductor.com/academy/reddit-ai-citation-decline/)
- February to April 2026: Perplexity's Reddit share dropped from 25% to 7% and its total social share from 31% to 13%, cause unknown.
  Google AI Overviews' Reddit share rose from 5% to 7%.
  YouTube's share of AI Mode citations in April was more than four times its January level.
  On Copilot, Amazon reached nearly 19% of citations, up from 3% in October 2025.
  The report uses commercial-intent prompts in 9 categories and does not disclose the prompt count.
  Confidence: large observational study, sample undisclosed.
  Incentive: Tinuiti is an agency and Profound a tracking vendor. - [Tinuiti Q2 2026](https://tinuiti.com/research-insights/research/ai-citation-trends-report-q2-2026/)
- August 2026: Promptwatch data shows Reddit at a steady 3.8% of ChatGPT citations from 18 July to 7 August, then 0.5% on 14 to 17 August, an 86% fall.
  Over the same period Reddit fell 11% in AI Overviews and 31% in AI Mode.
  Promptwatch recorded a change in ChatGPT's query fan-out on 8 August and could not rule out a fault in its own collection.
  OpenAI said it does not set a fixed visibility level for individual sites.
  Confidence: vendor tracking data, described as provisional. - [Semrush](https://www.semrush.com/blog/reddits-citations-in-chatgpt-fall/)

### Inferences
- "Own site versus third party" depends on the denominator.
  For local, entity-specific questions, brand-managed pages and listings dominate (Yext).
  For category recommendation prompts, the cited set is mostly company sites, but any single brand holds a small slice.
- Vendor mismatch: on-page optimisation tools work on the 3% to 18% of citations a brand can edit.
  The larger opportunity is knowing which specific third-party pages the engine cites for a brand's prompts and whether the brand appears on them.
- Vendor mismatch: Reddit-seeding and listicle-seeding services target a share that collapsed twice in twelve months on ChatGPT (September 2025 and August 2026) and fell by two thirds on Perplexity in spring 2026.
- A single cross-engine "visibility score" averages over engines that moved in opposite directions in the same months (Perplexity down on Reddit while Google rose).
- Self-ranking listicles can get a page cited while the brand is left out of the answer, so "citation count" and "recommended" are different outcomes.

### Gaps
- No independent, non-vendor dataset tracks source mix per engine through late 2026.
  The freshest figures (Tinuiti, Promptwatch) are vendor data with undisclosed samples.
- I found no reliable per-engine share for review sites such as G2 and Trustpilot in 2026.
  Petra Labs is quoted as saying share moved to owned and review sites after the August 2026 Reddit fall, without numbers.
- Claude and Copilot are barely covered in source-mix studies.
- Nobody has measured how often a brand's presence on a cited third-party page translates into a mention.

## 3. Technical prerequisites (JavaScript, bot blocking, llms.txt, structured data, freshness, structure, fan-out)

### Takeaway
Two technical gates are real and binary: content must be in server-rendered HTML for ChatGPT, Claude and Perplexity, and the search crawlers must not be blocked at robots.txt or at the CDN or firewall.
llms.txt and added schema show no measurable effect in every dataset found, and freshness and structure findings are correlational.

### Cited Findings

#### JavaScript rendering

- Vercel and MERJ analysed one month of crawler traffic (published 17 December 2024): 569 million GPTBot fetches, 370 million Claude fetches, 314 million AppleBot fetches and 24.4 million PerplexityBot fetches.
  GPTBot, ClaudeBot and PerplexityBot did not execute JavaScript, while Googlebot (which feeds Gemini) and AppleBot did.
  ChatGPT's crawler downloaded JavaScript files in 11.50% of requests and Claude's in 23.84%, without running them.
  About 34% of both crawlers' fetches hit 404 pages, against 8.22% for Googlebot.
  Confidence: large observational log study, two years old.
  Incentive: Vercel sells server-rendering hosting. - [Vercel](https://vercel.com/blog/the-rise-of-the-ai-crawler)
- Retests in 2026 report no change.
  Glenn Gabe (GSQi) retested 434 days after an August 2025 case study and found ChatGPT, Claude and Perplexity still could not read client-rendered content, while Gemini and Copilot could.
  A June 2026 Search Engine World decoy test found ChatGPT, Claude, Gemini, Perplexity and Meta AI returned the raw-HTML value when fetching a page live.
  Both not opened, and the two disagree on Gemini's live fetcher.
  Confidence: small case studies. - [GSQi](https://www.gsqi.com/marketing-blog/ai-search-javascript-rendering); [Search Engine World](https://www.searchengineworld.com/do-ai-assistants-actually-render-your-javascript-when-grounding-we-put-it-to-the-test)
- Microsoft's guidance (8 October 2025) warns that AI systems may not render hidden content such as tabs and expandable menus, and advises against putting key facts only in PDFs or images.
  Confidence: official statement. - [Microsoft Advertising blog](https://about.ads.microsoft.com/en/blog/post/october-2025/optimizing-your-content-for-inclusion-in-ai-search-answers)
- Google's AI optimisation guide says Google can process JavaScript content as long as it is not blocked.
  Confidence: official statement. - [Google Search Central](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)

#### Blocking by robots.txt, CDN and firewall

- OpenAI's crawler documentation says a site that blocks OAI-SearchBot will not be shown in ChatGPT search answers, though it can still appear as a navigational link, and that robots.txt changes take about 24 hours.
  GPTBot is the separate training crawler, and ChatGPT-User fetches on user request and may not follow robots.txt.
  Confidence: official statement. - [OpenAI](https://developers.openai.com/api/docs/bots)
- Anthropic documents three bots: ClaudeBot for training, Claude-SearchBot for search indexing and Claude-User for user-requested fetches.
  It says blocking Claude-SearchBot or Claude-User may reduce visibility in search results, and that its bots honour robots.txt.
  Confidence: official statement. - [Anthropic](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- Perplexity's documentation says PerplexityBot exists to surface and link sites in Perplexity results, that Perplexity-User generally ignores robots.txt, and that sites behind a firewall may need to allow its bots explicitly.
  It notes Cloudflare's Bot Fight Mode can still challenge matching requests.
  Confidence: official statement. - [Perplexity](https://docs.perplexity.ai/guides/bots)
- A November 2026 check of the top 1,000 hostnames (684 answered) found robots.txt blocks for GPTBot on 15.6%, ClaudeBot 15.5%, PerplexityBot 12.3% and OAI-SearchBot 8.2%.
  Servers refused the crawler's user agent on 8.8% (GPTBot), 8.7% (ClaudeBot), 8.5% (PerplexityBot) and 3.8% (OAI-SearchBot).
  11.3% of 547 tested sites refused a crawler that their robots.txt allows (8.2% excluding rate-limit responses).
  63.7% of 124 sites served a crawler that their robots.txt blocks.
  The test sent user-agent strings from a cloud runner, so sites that verify vendor IP addresses may behave differently for the real bots.
  Confidence: small self-published study. - [Crawlreadiness AI Access Index](https://www.crawlreadiness.com/ai-access-index/2026-11)
- A September 2026 HTTP Archive analysis of about 15.5 million homepages put the share blocking at least one AI crawler at 9.9% of all sites and 28.9% of the top 1,000.
  Not opened.
  Confidence: large observational study, robots.txt only. - [Suff Digital](https://www.suffdigital.com/resources/data-studies/ai-crawler-blocking-rate)
- Cloudflare says more than 20% of web domains sit behind it.
  On 1 July 2026 it split bot controls into Search, Agent and Training categories for all plans.
  From 15 September 2026, new domains block Training and Agent bots by default on pages that display ads, and Search stays allowed.
  Multi-purpose crawlers such as Googlebot, Applebot and BingBot are judged by the most restrictive rule, so blocking Training can block them.
  A later Semrush headline says the training block now spares Googlebot, which I could not verify.
  Confidence: official statement, with one unresolved conflict. - [Cloudflare](https://blog.cloudflare.com/content-independence-day-ai-options/); [Help Net Security](https://www.helpnetsecurity.com/2026/07/02/cloudflare-ai-crawler-controls/); [Semrush](https://semrush.com/blog/cloudfare-blocks-ai-training)
- Semrush notes its Site Audit reads robots.txt only and will not detect a block made at Cloudflare's firewall.
  Not opened.
  Confidence: vendor statement. - [Semrush](https://semrush.com/blog/cloudfare-blocks-ai-training)

#### llms.txt

- SE Ranking studied about 300,000 domains (reported 20 November 2025): 10.13% had llms.txt, citation frequency showed no significant correlation with it, and removing the feature improved the accuracy of an XGBoost model.
  Confidence: large observational study. - [Search Engine Journal](https://www.searchenginejournal.com/llms-txt-shows-no-clear-effect-on-ai-citations-based-on-300k-domains/561542/)
- Ahrefs checked 137,210 domains and found 97% of llms.txt files received zero requests in May 2026.
  Not opened (the link is the Japanese edition that appeared in results).
  Confidence: large observational log study. - [Ahrefs](https://ahrefs.com/blog/ja/llmstxt-study/)
- Seer Interactive found that of about 9.2 million AI answers across 100 client datasets, 73 cited an llms.txt URL, mostly developer documentation.
  Search Atlas found adoption did not predict citations across 13,911 domains and six platforms after controlling for domain authority.
  Both not opened.
  Confidence: large observational studies. - [Seer Interactive](https://www.seerinteractive.com/insights/llms.txt-vs-ai-info-page); [Search Atlas](https://searchatlas.com/blog/limits-of-llms-txt-for-ai-search-citation-study/)
- Google's guide says site owners do not need new machine-readable files, AI text files, markup or Markdown to appear in Search.
  Confidence: official statement. - [Google Search Central](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- Adoption is still spreading: 15.8% of the top-1,000 hosts that answered had an llms.txt in November 2026.
  Confidence: small study. - [Crawlreadiness AI Access Index](https://www.crawlreadiness.com/ai-access-index/2026-11)

#### Structured data

- The Ahrefs matched study (11 May 2026, 1,885 treated pages) found no citation lift from adding JSON-LD on AI Mode or ChatGPT and a 4.6% relative decline on AI Overviews.
  The same article reports that cited pages are almost three times as likely to carry JSON-LD as uncited pages (6 million URLs), which the authors attribute to better-maintained sites.
  It also cites a searchVIU experiment in which none of five AI systems used JSON-LD, Microdata or RDFa when fetching a page live.
  Limits: 30-day window, all schema types pooled, only already-cited pages.
  Confidence: matched quasi-experiment. - [Ahrefs](https://ahrefs.com/blog/schema-ai-citations/)
- AirOps found pages with JSON-LD were cited 38.5% of the time against 32.0% without, a correlation with no controls.
  Confidence: large observational study. - [AirOps](https://www.airops.com/research/the-fan-out-effect-what-happens-between-a-query-and-a-citation)
- Google says structured data is not required for generative AI search and there is no special markup to add.
  Microsoft says schema helps machines interpret content with confidence, without data.
  Confidence: official statements that point in different directions. - [Google Search Central](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide); [Microsoft Advertising blog](https://about.ads.microsoft.com/en/blog/post/october-2025/optimizing-your-content-for-inclusion-in-ai-search-answers)

#### Freshness and dates

- Ahrefs analysed 16.975 million cited URLs on seven platforms (July 2025): cited URLs averaged 1,064 days old against 1,432 days for organic results, 25.7% fresher.
  ChatGPT cited pages 393 to 458 days newer than organic results, while Google AI Overviews cited content 16 days older on average.
  Not opened.
  Confidence: large observational study, 16 months old. - [Ahrefs](https://ahrefs.com/blog/do-ai-assistants-prefer-to-cite-fresh-content/)
- AirOps found the highest citation rate for pages 30 to 89 days old (32.8%), against 25.3% under 30 days and 27.5% at two to five years.
  Confidence: large observational study. - [AirOps](https://www.airops.com/research/the-fan-out-effect-what-happens-between-a-query-and-a-citation)

#### Content structure

- Microsoft recommends an H1 that matches the title, descriptive H2 and H3 headings, direct question-and-answer blocks, lists and tables, and warns against long walls of text.
  Confidence: official statement without data. - [Microsoft Advertising blog](https://about.ads.microsoft.com/en/blog/post/october-2025/optimizing-your-content-for-inclusion-in-ai-search-answers)
- Google says there is no requirement to break content into small pieces and no need to write in a special way for AI.
  Confidence: official statement. - [Google Search Central](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- The observational support for answer-first writing is Indig's finding that 44.2% of ChatGPT's cited passages sit in the first 30% of a page.
  Confidence: large observational study, ChatGPT only. - [Search Engine Journal](https://www.searchenginejournal.com/the-science-of-how-ai-pays-attention/561306/)

#### Query fan-out

- Google's documentation confirms AI Overviews and AI Mode may issue multiple related searches across subtopics and data sources.
  Confidence: official statement. - [Google Search Central](https://developers.google.com/search/docs/appearance/ai-features)
- In AirOps' ChatGPT data, 88.6% of queries produced exactly two fan-out sub-queries.
  Confidence: large observational study. - [AirOps](https://www.airops.com/research/the-fan-out-effect-what-happens-between-a-query-and-a-citation)
- Fan-outs are unstable: in 1,600 Gemini-grounded runs, about 27% of fan-out queries recurred across repeated runs of the same prompt, 66% appeared once and 0.6% appeared in every run.
  Confidence: large observational study, vendor. - [Surfer](https://surfer.ai/blog/query-fan-out/)
- A Semrush test on four articles rewritten for fan-out coverage raised tracked citations from two to five.
  Not opened.
  Confidence: small case study. - [Semrush](https://semrush.com/blog/query-fan-out-experiment)

### Inferences
- Technical checks are prerequisites with a ceiling: they remove a zero, and nothing in the evidence shows they raise citations once a page is readable and reachable.
- Vendor mismatch: llms.txt generators and "AI schema" add-ons are widely sold and widely adopted (10% to 16% of sites), against consistent null results and explicit statements from Google.
- Unmet need: robots.txt-only audits miss the layer where blocking happens.
  About one in nine top sites refused a crawler their robots.txt allows, and Cloudflare's 2026 defaults make silent blocks more likely for new domains.
  A check has to fetch as each bot and, ideally, confirm from server logs.
- The JavaScript gate matters most for ChatGPT, Claude and Perplexity.
  Google's surfaces and Copilot inherit a rendering search index.
- Freshness correlations do not show that changing a date helps.
  Some coverage links the 2026 Google demotions to fake date refreshes, so date-only updates carry risk.

### Gaps
- No vendor documents whether its search or user fetchers render JavaScript, so everything rests on third-party tests.
- No study measures how many sites are blocked from AI search crawlers by CDN defaults without the owner knowing.
- No controlled test of date changes, of FAQ blocks, or of tables on a live engine was found.
- The schema study cannot say whether schema helps pages that are not yet cited.

## 4. Retrieval mechanics: which index each engine uses and how well a ranking predicts a citation

### Takeaway
Each engine sits on a different index (Google's for AI Overviews, AI Mode and Gemini, Bing's for Copilot, a mix of its own index and partner search for ChatGPT, its own for Perplexity), and a classic top-10 ranking now predicts under 40% of Google AI Overview citations and about a quarter of ChatGPT's cited URLs.
Rank inside the engine's own retrieval set is a much stronger predictor than rank on the public results page.

### Cited Findings

- Google states that its generative AI features are rooted in its core Search ranking and quality systems, use retrieval-augmented generation and query fan-out over the Search index, and require only that a page be indexed and eligible for a snippet.
  Confidence: official statement. - [Google Search Central](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide); [Google AI features documentation](https://developers.google.com/search/docs/appearance/ai-features)
- Ahrefs (2 March 2026, 863,000 keyword results pages, 4 million AI Overview URLs): 37.9% of cited URLs were in the top 10 for the same query, 31.2% in positions 11 to 100 and 31.0% outside the top 100.
  Counting only organic blue links the split was 37.1%, 26.2% and 36.7%.
  In July 2025 the same team found about 76% in the top 10 (1.9 million citations), with a parsing method that has since changed.
  Ahrefs points to fan-out and to AI Overviews moving to Gemini 3 in January 2026 as possible causes.
  18.2% of cited pages from outside the top 100 were YouTube URLs.
  Confidence: large observational study. - [Ahrefs](https://ahrefs.com/blog/ai-overview-citations-top-10/)
- BrightEdge reported overlap between AI Overview citations and organic rankings rising from 32.3% in May 2024 to 54.5% in September 2025, with finance at 11% top-10 overlap and healthcare at 75.3%.
  A separate BrightEdge analysis reported about 17% top-10 overlap, and commentators note the denominators are not clearly defined.
  Not opened.
  Confidence: large observational study with unclear method.
  Incentive: enterprise SEO platform. - [BrightEdge](https://www.brightedge.com/resources/weekly-ai-search-insights/rank-overlap-after-16-months-of-aio)
- Authoritas tracked 11,203 keywords on three dates and found 70% of AI Overview rankings changed within two to three months.
  Its volatility score was 0.68 at 8 weeks and 0.73 at 13 weeks for AI Overviews, against 0.49 and 0.55 for organic results.
  Its September 2024 study found 46.3% of linked documents in the top organic results for the exact query, rising to 67.3% when related and reformulated queries were credited.
  Not opened.
  Confidence: large observational study, 2024 to 2025. - [Search Engine Land](https://searchengineland.com/google-ai-overviews-organic-rankings-volatile-452255)
- Audits cited in the 2026 survey: across 4,706 queries, 53% of domains cited by AI Overviews were outside the organic top 10 and 27% outside the top 100.
  Across 11,500 queries, URL-level overlap between organic Google, AI Overviews and Gemini was 0.11 to 0.18.
  Confidence: large observational studies via secondary summary. - [PPC Land](https://ppc.land/survey-of-45-studies-finds-geo-rewrites-can-cut-a-pages-ai-retrieval-16/)
- ChatGPT: OpenAI documents OAI-SearchBot as the crawler that surfaces sites in ChatGPT search, which implies its own index, and says nothing about ranking.
  Confidence: official statement. - [OpenAI](https://developers.openai.com/api/docs/bots)
- ChatGPT: OpenAI's Nick Turley testified in the Google antitrust trial that ChatGPT uses Bing's search data and that Google refused OpenAI access to its index.
  The Information reported in August 2025 that OpenAI used Google results scraped by SerpApi for some current-events answers, which OpenAI has not confirmed.
  Not opened, secondary coverage.
  Confidence: testimony plus unconfirmed reporting. - [Yahoo Tech](https://tech.yahoo.com/ai/articles/chatgpt-using-google-search-answer-084215782.html)
- ChatGPT: an academic study of production ChatGPT Web across GPT-5.2 to 5.5, in Instant and Thinking modes (Jiang et al., arXiv, 11 October 2026), found that Google Search and the OpenAI Responses API together recover only about one quarter of the URLs ChatGPT Web cites.
  A supervised model on those external signals reached AUC above 0.74.
  Both proxies match better at hostname and entity level than at exact URL.
  Candidates retrieved more often across repeated runs were more likely to be cited, and GPT-5.4 Thinking often ran several retrieval rounds.
  Confidence: large observational study, sample sizes not in the abstract. - [arXiv 2610.15382](https://arxiv.org/abs/2610.15382)
- ChatGPT: position inside its own retrieved set strongly predicts citation, 58.4% at rank 1 against 14.2% at rank 10.
  AirOps says the underlying search provider is unconfirmed.
  Confidence: large observational study. - [AirOps](https://www.airops.com/research/the-fan-out-effect-what-happens-between-a-query-and-a-citation)
- ChatGPT does not always search.
  In one configuration reviewed by the survey, 57.8% of repeated ChatGPT runs did not activate web search.
  Graphite reports that about 10% of logged-out ChatGPT prompts trigger search, against about 50% when logged in.
  Surfer measured search on 88% of its app runs.
  Confidence: mixed, depends heavily on prompt set. - [PPC Land](https://ppc.land/survey-of-45-studies-finds-geo-rewrites-can-cut-a-pages-ai-retrieval-16/); [Graphite](https://graphite.io/five-percent/research/demystifying-randomness-in-ai); [Surfer](https://surfer.ai/blog/llm-scraped-ai-answers-vs-api-results/)
- Copilot: Bing's February 2026 guideline rewrite extends eligibility rules to Copilot answers and grounding API results, and Bing Webmaster Tools reports the grounding queries used to retrieve cited content.
  Confidence: official statement via trade coverage. - [Search Engine Journal](https://www.searchenginejournal.com/bing-adds-geo-to-official-guidelines-expands-ai-abuse-definitions/568442/)
- Perplexity runs its own crawler and index (PerplexityBot).
  Claude has its own search crawler (Claude-SearchBot), and secondary sources say its web search is served by Brave's independent index, which Anthropic's crawler page does not state.
  Confidence: official statements for the crawlers, low for the Brave link. - [Perplexity](https://docs.perplexity.ai/guides/bots); [Anthropic](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler); [DEV Community post](https://dev.to/rikuq/the-four-index-reality-why-ai-search-isnt-one-thing-4bno)
- Older correlation evidence: Google page-one rank correlated about 0.65 with GPT-4o brand mentions and Bing rank 0.5 to 0.6 (Seer, 10,000 questions, API).
  Confidence: large observational study, older model. - [Seer Interactive](https://www.seerinteractive.com/insights/what-drives-brand-mentions-in-ai-answers)

### Inferences
- "Rank on Google" has decayed as a predictor during 2026 for Google's own AI surfaces (76% to 38% top-10 overlap in eight months, with a method change in between).
  It still matters indirectly through fan-out queries.
- Vendor mismatch: tools that estimate ChatGPT visibility from Google rankings or from the API are using proxies that recover roughly a quarter of real cited URLs.
- Because a large share of ChatGPT answers run without search, part of "AI visibility" is decided by what the model learned in training, which no on-page change can alter in the short run.
- Different indexes mean a site can be fully visible to Google's AI and absent from ChatGPT or Claude for reasons unrelated to content quality (crawler access, index coverage).

### Gaps
- OpenAI has not published which search providers ChatGPT uses in 2026, and the Google-through-SerpApi report remains unconfirmed.
- I found no first-party statement from Anthropic naming its search provider.
- No public study measures how Bing rank predicts Copilot citations in 2026.
- Overlap studies use incompatible denominators, so figures from Ahrefs, BrightEdge, Authoritas and Conductor cannot be compared directly.

## 5. Measurement reliability: run-to-run variance, users, API versus interface, and sample sizes

### Takeaway
A single answer is close to noise: the same prompt returns the same brand list less than 1% of the time, and ranking position is not a stable quantity.
Presence rate over repeated runs is measurable, but it needs about 10 runs per prompt for a rough read and 100 to 300 answers per period to detect a 10-point change, and API-based tracking does not reproduce what users see.

### Cited Findings

#### Variance across repeated runs

- SparkToro and Gumshoe had volunteers run 12 recommendation prompts 2,961 times across ChatGPT, Claude and Google's AI (data November to December 2025, reported 30 January 2026), 60 to 100 runs per prompt per platform.
  ChatGPT and Google returned the same list of brands in fewer than 1 in 100 runs and the same list in the same order in fewer than 1 in 1,000.
  Presence was more stable: Bose, Sony, Sennheiser and Apple appeared in 55% to 77% of 994 headphone responses.
  The authors call ranking-position metrics invalid and say the number of runs needed is an open question.
  Confidence: large uncontrolled field study, not peer reviewed.
  Incentive: Gumshoe sells AI tracking, disclosed. - [Search Engine Journal](https://www.searchenginejournal.com/ai-recommendations-change-with-nearly-every-query-sparktoro/566242/); [SparkToro original](https://sparktoro.com/blog/new-research-ais-are-highly-inconsistent-when-recommending-brands-or-products-marketers-should-take-care-when-tracking-ai-visibility/)
- In the same study, 142 people wrote their own prompt for one task (headphones for a travelling relative) and the prompts' semantic similarity was 0.081.
  Confidence: small study. - [Search Engine Journal](https://www.searchenginejournal.com/ai-recommendations-change-with-nearly-every-query-sparktoro/566242/)
- AirOps: with three runs per query, only 2.3% of page-query pairs were cited in all three.
  Confidence: large observational study. - [AirOps](https://www.airops.com/research/the-fan-out-effect-what-happens-between-a-query-and-a-citation)
- The 2026 survey reports that even at temperature zero, repeated runs changed 9% to 28% of decisions on the surfaces where temperature could be controlled.
  Confidence: controlled experiments via secondary summary. - [PPC Land](https://ppc.land/survey-of-45-studies-finds-geo-rewrites-can-cut-a-pages-ai-retrieval-16/)
- An EWR Digital run of 12,778 answers on five engines reports ChatGPT repeated an answer 6 times in 10,000 and recommends seven to eight runs per prompt.
  A monitoring report found two ChatGPT answers to the same prompt a day apart shared 30.8% of cited domains on average.
  Both not opened.
  Confidence: vendor studies. - [EWR Digital](https://www.ewrdigital.com/ai-answer-variance); [Cloro on DEV Community](https://dev.to/cloro/do-ai-visibility-tools-show-the-answers-real-users-see-how-to-check-a-tracker-against-the-chatgpt-125f)
- Ranqo: positive or negative framing flipped about 6.7 times more often than brand presence, so sentiment scores are noisier than mention rates.
  Confidence: large observational study, vendor. - [arXiv 2606.20065](https://arxiv.org/abs/2606.20065)

#### How many samples

- Graphite ran 200 comparison prompts 400 times each on gpt-5.2-chat-latest through the API (14 April 2026), with replications on Gemini 3 Flash and on scraped logged-out answers.
  With 10 responses, mean absolute error on a brand's visibility was 5.6 points across all entities and 9.1 points for entities with at least 10% visibility.
  94.9% of prompts reached an error of 5 points or less at 40 responses.
  A 95% interval 15 points wide needs 167 responses when true visibility is 50% and 22 when it is 100%.
  With 10 responses, 75% and 25% can be told apart but 75% and 50% cannot.
  With 50 responses, 50% and 30% can be told apart but 50% and 40% cannot.
  Position error was about 1.06 places at 10 responses in lists averaging 23 entities.
  Confidence: controlled sampling experiment, comparison prompts only.
  Incentive: Graphite sells AEO services and a prompt tracker. - [Graphite](https://graphite.io/five-percent/research/demystifying-randomness-in-ai)
- Binomial arithmetic published by Cloro: a visibility rate near 25% measured on 72 answers has a 95% interval of about plus or minus 10 points, about 300 answers brings it to plus or minus 5, and detecting a move from 20% to 30% needs about 294 answers in each period.
  Not opened, but the first two figures match the standard formula.
  Confidence: arithmetic, vendor source. - [Cloro](https://cloro.dev/blog/ai-visibility-sample-size/)
- A methodological paper (Martinez, arXiv, 6 September 2026, no new experiments) argues that the prompt set and its weights define the "market" being measured.
  More runs shrink sampling error but do not fix an unrepresentative prompt set, and scores built on different prompt sets are not comparable.
  It also argues a citation alone does not show the source shaped the answer.
  Confidence: conceptual analysis. - [arXiv 2609.06811](https://arxiv.org/abs/2609.06811)

#### API versus consumer interface

- Surfer ran 1,000 prompts on five products through both the scraped interface and the API (13,779 answers, data 4 August 2026, one sample per prompt).
  ChatGPT's API named 13.8 brands per answer against 7.9 in the app, and cited 3.1 sources against 12.1.
  Brand overlap between API and interface was 21.3% to 31.6% after name canonicalisation.
  Domain overlap for ChatGPT was 4.8% in the text (12.1% in a chart caption) and about 27% for Perplexity.
  Confidence: large observational comparison, single sample per prompt so some disagreement is ordinary randomness.
  Incentive: Surfer sells interface-scraped tracking and concludes API trackers are unreliable. - [Surfer](https://surfer.ai/blog/llm-scraped-ai-answers-vs-api-results/)
- Graphite: logged-out scraped answers held 81 unique entities per prompt against 71 through the API for ChatGPT.
  Similarity within each dataset was 0.70 to 0.76 and across the two datasets 0.48.
  Logged-in results were not yet published.
  Confidence: controlled sampling experiment. - [Graphite](https://graphite.io/five-percent/research/demystifying-randomness-in-ai)
- The academic ChatGPT study found the Responses API's citations match ChatGPT Web better than Google Search does, but both together recover only about a quarter of cited URLs.
  Confidence: large observational study. - [arXiv 2610.15382](https://arxiv.org/abs/2610.15382)
- Vendor tests point the same way with wider spreads.
  PaprikAI: 135 unique brands from the API without web search against 845 in the ChatGPT interface on 300 responses, and 580 from the API with web search.
  TRAIL Labs: 555 prompts run 47 times each showed brand visibility shifting 41% on average between interface and API.
  Both not opened.
  Confidence: vendor studies. - [PaprikAI](https://paprik.ai/blog/accurate-api-based-ai-visibility-tracking-chatgpt-ui); [TRAIL Labs](https://www.traillabs.ai/blog/ai-visibility-api-vs-ui)

#### Users, memory and location

- "The Personalization Gap" tested ChatGPT, Gemini, Claude and Perplexity with six personas, three consumer categories and 30 prompts in the UK.
  Geography was the clearest personalisation effect.
  API sampling recovered 79% of the recurring brands seen in history-primed sessions, against 95% for temporary logged-in sessions at the same depth.
  Known only from a press release that I could not open.
  Confidence: small study, unverified. - [EIN Presswire](https://www.einnews.com/pr_news/944542004/new-study-finds-ai-personalization-can-change-which-brands-chatgpt-and-gemini-recommend)
- In the SparkToro study, volunteers used their normal settings on purpose, so its variance mixes model randomness with personalisation and cannot separate them.
  Confidence: study limitation stated by authors. - [Search Engine Journal](https://www.searchenginejournal.com/ai-recommendations-change-with-nearly-every-query-sparktoro/566242/)

#### First-party measurement that now exists

- Google launched Search Console generative AI performance reports on 3 June 2026 and reached all sites by 31 August 2026.
  They show impressions in AI Overviews, AI Mode and Discover's AI features by page, country, device and date.
  Secondary coverage says there is no query dimension, no split between AI Overviews and AI Mode, and no backfill before 18 May 2026.
  Confidence: official statement plus secondary detail. - [Google Search Central blog](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports)
- Bing Webmaster Tools' AI Performance report (public preview February 2026) shows cited URLs and grounding queries for Copilot and partner experiences.
  On 16 June 2026 it added intents, topics, period comparison and a Citation Share metric that Microsoft says does not represent traffic share and does not expose competitor domains.
  Confidence: official statement. - [Bing blog](https://blogs.bing.com/search/June-2026/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare)
- Google's guide warns that third-party tools have no access to its internal ranking or AI systems.
  Confidence: official statement. - [Google Search Central](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)

### Inferences
- A defensible metric is a presence rate with a confidence interval, measured on the consumer interface, over a prompt set that is documented and held fixed.
  Rank, "share of voice" on a handful of runs, and day-over-day deltas are mostly noise.
- Vendor mismatch: many trackers run each prompt once a day and chart the change.
  At 10 runs the error is 5 to 9 points, so most week-to-week movements shown to customers are inside the noise.
- Vendor mismatch: tracked prompts are written by the vendor or customer, while real users phrase the same need in nearly unrelated ways (similarity 0.081).
  Nobody outside the platforms has real prompt volume, so the weights behind any score are assumptions.
- Because prior-run history predicts the next run almost as well as live signals (AUC 0.94), brand presence is sticky, and real change will be slow relative to sampling noise.
  That argues for fewer prompts sampled more deeply and compared over weeks.
- Google's and Bing's own reports now provide ground truth for impressions and citations on their surfaces.
  That weakens the case for paying for third-party tracking of those two surfaces and leaves ChatGPT, Claude and Perplexity as the unmeasured ones.

### Gaps
- No independent study quantifies the effect of memory and account history on recommendations at scale.
  The one study found is a press release.
- Graphite's logged-in results were still pending, so the interface-versus-API gap for signed-in users is unquantified by a neutral source.
- No peer-reviewed work fixes a required sample size.
  The Sielinski arXiv study cited by a vendor (30 to 100 runs for a 5-point interval on citation share) could not be located.
- No vendor was found to publish intervals or test-retest reliability for its own scores.

## 6. Official guidance from the platforms and crackdowns on manipulation

### Takeaway
Google, Microsoft, OpenAI, Anthropic and Perplexity all publish access rules and none publishes ranking factors.
Google's position is that AI optimisation is ordinary SEO, and during 2026 Google and Microsoft both wrote AI-answer manipulation into their spam and abuse rules.

### Cited Findings

#### Google

- Google's AI features documentation says there are no additional requirements or special optimisations to appear in AI Overviews or AI Mode beyond being indexed and snippet-eligible.
  Traffic from these features is counted inside the "Web" totals of the Search Console performance report.
  Confidence: official statement. - [Google Search Central](https://developers.google.com/search/docs/appearance/ai-features)
- Google's guide "Optimizing your website for generative AI features on Google Search" (covered by trade press on 15 May 2026) says optimising for generative AI search is still SEO.
  It lists things site owners can skip: llms.txt and other AI text files, special markup or Markdown, chunking content into small pieces, rewriting in a special style, and seeking inauthentic mentions.
  It recommends unique expert content beyond common knowledge, crawlability, snippet eligibility, and Merchant Center and Business Profile data for commerce and local.
  Confidence: official statement.
  Incentive: Google benefits from site owners continuing to optimise for Google Search. - [Google Search Central](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide); [Search Engine Journal](https://www.searchenginejournal.com/googles-new-ai-search-guide-calls-aeo-and-geo-still-seo/575026/)
- Danny Sullivan and John Mueller said on Google's podcast in December 2025 that SEO for AI is the same as SEO, and in January 2026 advised against turning content into bite-sized chunks for language models.
  Not opened.
  Confidence: official statements. - [Search Engine Roundtable](https://www.seroundtable.com/google-danny-sullivan-john-mueller-seo-ai-40620.html); [Search Engine Roundtable](https://www.seroundtable.com/google-content-bite-sized-chunks-40728.html)
- On 15 May 2026 Google's spam policies began defining spam to include "attempting to manipulate generative AI responses in Google Search".
  The page gives no AI-specific examples.
  Coverage says offenders face demotion or removal and that a Google spokesperson claimed its systems keep results 99% spam-free.
  Confidence: official policy text, enforcement detail from secondary coverage. - [Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies); [WinBuzzer](https://winbuzzer.com/2026/05/17/google-search-spam-policy-ai-overviews-ai-mode-manipulation-xcxwbn/)
- Lily Ray's analysis of more than 40 sites dates an apparent algorithmic demotion of self-promotional "best of" listicle folders to around 20 January 2026, with declines accelerating and spreading to whole domains during the May 2026 core update.
  Other coverage puts the organic visibility losses at roughly 29% to 49%.
  Google has not named listicles in any policy, so this is inference from traffic data.
  Confidence: small observational case study. - [Lily Ray on Substack](https://lilyraynyc.substack.com/p/why-calling-yourself-the-best-could)
- iPullRank published a rebuttal calling Google's guidance naive and self-serving, arguing GEO budgets fund brand and third-party work that SEO budgets rarely cover.
  Not opened.
  Confidence: commentary from an agency. - [iPullRank](https://ipullrank.com/google-ai-search-guidance)

#### Microsoft

- Microsoft's 8 October 2025 post (Krishna Madhavan, Bing) explains that assistants parse pages into smaller pieces and select among pieces.
  It recommends aligned titles and H1s, descriptive headings, question-and-answer blocks, lists, tables and schema.
  It says SEO fundamentals such as crawlability, internal links and backlinks still matter, and that no strategy guarantees selection.
  Confidence: official statement without data. - [Microsoft Advertising blog](https://about.ads.microsoft.com/en/blog/post/october-2025/optimizing-your-content-for-inclusion-in-ai-search-answers)
- Bing rewrote its Webmaster Guidelines in late February 2026 (reported 27 February).
  The guidelines now name Generative Engine Optimization, cover Copilot and grounding results, and explain how NOARCHIVE, NOCACHE and NOSNIPPET affect AI answers.
  The keyword stuffing rule now covers language engineered to trigger citations, and a new section covers prompt injection and AI manipulation.
  The stance on machine-generated content narrowed to large-scale content produced without oversight.
  Confidence: official policy via trade coverage. - [Search Engine Journal](https://www.searchenginejournal.com/bing-adds-geo-to-official-guidelines-expands-ai-abuse-definitions/568442/)
- Microsoft's Defender research team reported on 10 February 2026 that it found over 50 unique prompts from 31 companies in 14 industries hidden behind "Summarize with AI" buttons.
  The buttons use URL prompt parameters to tell an assistant to remember the company as a preferred source.
  Microsoft named the technique AI Recommendation Poisoning.
  Not opened.
  Confidence: vendor security research. - [Microsoft Security blog](https://www.microsoft.com/security/blog/2026/02/10/ai-recommendation-poisoning/)

#### OpenAI, Anthropic and Perplexity

- OpenAI's guidance is limited to access: allow OAI-SearchBot and its published IP ranges.
  Its publisher FAQ says ChatGPT adds utm_source=chatgpt.com to referral links.
  It documents OAI-AdsBot for checking ad landing pages, which confirms ads run in ChatGPT.
  It publishes nothing on how sources are ranked.
  Confidence: official statement. - [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots); [OpenAI publishers and developers FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq)
- Anthropic's guidance is also access-only: three bots, robots.txt honoured, and a warning that blocking the search or user bots may reduce visibility.
  Trade press dates the three-bot documentation to February 2026.
  Confidence: official statement. - [Anthropic](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler); [Search Engine Roundtable](https://www.seroundtable.com/anthropic-updates-its-crawler-docs-40978.html)
- Perplexity recommends allowing PerplexityBot and its IP ranges and offers firewall configuration steps.
  Confidence: official statement. - [Perplexity](https://docs.perplexity.ai/guides/bots)

#### Evidence that manipulation works and is spreading

- A BBC journalist published a fabricated page about himself on 18 February 2026, written in 20 minutes, and within about a day ChatGPT, Gemini and Google AI Overviews repeated the claim while Claude did not.
  Later checks found Google and ChatGPT no longer repeated it.
  Not opened, secondary coverage.
  Confidence: single demonstration. - [Gizmodo](https://gizmodo.com/you-can-hack-chatgpt-to-become-the-worlds-best-anything-2000723856)
- A security measurement study of 10 AI search platforms (Liu et al., arXiv, 8 October 2026; 17,211 citation instances, 6,356 domains) found 8 of 10 platforms cited a fabricated concept within seven days of ordinary publication.
  15 of 22 publishing platforms tied to cited domains had low or medium barriers to posting.
  A $14 purchase from a GEO service produced 13 public posts, and one platform cited marker content within an hour.
  One article on a high-preference platform had more citation impact than over 20 matched posts on low-preference platforms.
  The top 20 domains captured 20.5% to 70.8% of citations depending on the platform.
  Confidence: controlled experiment. - [arXiv 2610.11932](https://arxiv.org/abs/2610.11932)
- A detection study (GEO-Flag, arXiv, August 2026) estimated that 8.90% of 10,095 pages returned for 1,000 real queries on Google Search and Gemini-grounded retrieval were GEO-optimised, rising to 16.36% among pages modified in 2026.
  Confidence: large observational estimate from a classifier with F1 of 0.944. - [arXiv 2608.16824](https://arxiv.org/abs/2608.16824)
- Lab attacks summarised in the 2026 survey: preference manipulation raised a fictitious camera's recommendation rate from 34.0% to 59.4%, and indirect injection raised a target about three ranks on one commercial search API.
  Confidence: controlled experiments via secondary summary. - [PPC Land](https://ppc.land/survey-of-45-studies-finds-geo-rewrites-can-cut-a-pages-ai-retrieval-16/)

### Inferences
- The platforms' public line and the academic record agree on one point: there is no separate set of AI ranking factors that a page can be tuned to.
- Vendor mismatch: several tactics sold as GEO in 2025 (self-ranking listicles, mention seeding, hidden prompts, "Summarize with AI" memory buttons) are now named or implied as spam by Google and Microsoft, and the listicle tactic shows measurable organic losses.
- Cheap manipulation still works in the short run (cited within hours to days), which keeps a grey market alive and raises the risk for buyers who cannot tell clean work from spam.
- OpenAI, Anthropic and Perplexity provide no reporting console, so site owners have no first-party view of their citations on those engines.

### Gaps
- I found no published anti-manipulation policy or enforcement statement from OpenAI, Anthropic or Perplexity.
- Google has not confirmed the listicle demotion or said how the May 2026 spam wording is enforced.
- I could not confirm the exact publication date of Google's AI optimisation guide, only that coverage appeared on 15 May 2026.
- The exact wording of Bing's prompt injection section was not checked against the primary guidelines page.

## 7. Business value: conversion, share of traffic, and why attribution is hard

### Takeaway
AI referral traffic is small for most sites (roughly 0.1% to 1% of visits, with a median of 2 to 5 AI visits per 100 organic visits by September 2026) and growing fast.
Claims that it converts several times better rest on vendor and sign-up data, while the one peer-reviewed study finds ChatGPT referrals convert worse than organic search for e-commerce.

### Cited Findings

#### Conversion

- Kaiser and Schulze (Marketing Science, Frontiers; circulated October 2025) used 12 months of first-party data from 973 e-commerce sites with $20 billion combined revenue, comparing 50,000+ ChatGPT-referred transactions with 164 million from other channels.
  ChatGPT referrals underperformed every traditional channel except paid social on conversion rate, order value and revenue per session.
  Organic search converted about 13% better and affiliate links 86% better.
  ChatGPT visitors bounced less, conversion improved over the period, and the authors project no parity with organic search within a year.
  The study measures last-click referrals only.
  Not opened (the journal page refused the fetch), figures from trade coverage.
  Confidence: large observational study, peer reviewed, data ends mid-2025. - [Marketing Science](https://pubsonline.informs.org/doi/full/10.1287/mksc.2025.0489); [Search Engine Land](https://searchengineland.com/llms-google-referral-conversion-study-463747)
- Microsoft Clarity (6 November 2025, 1,200+ publisher and news sites, one month of conversion data) reported sign-up rates of 1.66% for AI referrals against 0.15% for search, and subscription rates of 1.34% against 0.55%.
  AI referrals were under 1% of traffic and grew 155.6% in eight months.
  The headline "3x" does not match any single ratio in the table, and site selection is not described.
  Confidence: large observational study, publisher sites only.
  Incentive: Microsoft owns Clarity and Copilot. - [Microsoft Clarity](https://clarity.microsoft.com/blog/ai-traffic-converts-at-3x-the-rate-of-other-channels-study/)
- A Search Engine Land analysis of 55 sites found 13.8% of ChatGPT visitors converted against 3.02% of Google organic visitors, while Google organic produced 27 times as many conversions as all language-model sources combined.
  Not opened.
  Confidence: small observational study. - [Search Engine Land](https://searchengineland.com/chatgpt-vs-non-branded-organic-search-conversions-470321)
- Similarweb, as quoted by Digiday, estimated ChatGPT visits convert at 11.4% against 5.3% for organic search.
  Other 2026 compilations range from 3.49% against 2.86% to 15.9% against 1.8%.
  Not opened.
  Confidence: vendor estimates with incompatible definitions. - [Digiday](https://digiday.com/marketing/e-commerce-sites-see-low-sales-from-chatgpt-traffic-new-study-finds/)
- Ahrefs reports about 3% of its own conversions over a year came from AI, based on registration data and a "how did you hear about us" field.
  Confidence: single-company case. - [Ahrefs](https://ahrefs.com/blog/ai-traffic-research/)

#### Share of traffic

- Ahrefs (26 March 2025, about 35,000 sites): AI sources were 0.1% of total traffic against 43.8% for search, and Google sent 345 times more traffic than ChatGPT, Perplexity and Gemini combined.
  Small sites got a larger share from AI (0.3% for sites under 10,000 visits against 0.1% for sites over 1 million).
  Confidence: large observational study, 20 months old. - [Ahrefs](https://ahrefs.com/blog/ai-traffic-research/)
- SE Ranking (101,574 sites): AI platforms were 0.32% of visits in 2026, up from 0.24% in 2025 and 0.02% in 2024.
  ChatGPT sent 74.78% of AI referrals in January to April 2026, Gemini 11.56% and Perplexity 7.23%.
  Not opened.
  Confidence: large observational study.
  Incentive: sells an AI visibility tool. - [SE Ranking](https://seranking.com/blog/ai-traffic-research-study/)
- SE Visible (12 November 2026, 28,500 sites with continuous organic traffic): 79.2% of sites received at least one AI referral in September 2026, up from 39.7% in January 2025.
  Among sites with 1,000+ monthly organic visits, 75.5% had at least 1 AI visit per 100 organic visits (5.1% in January 2025), the median band was 2 to 5 per 100, and 20% had 5 or more per 100.
  The ratio can rise because organic traffic falls.
  Confidence: large observational study.
  Incentive: same vendor group. - [SE Visible](https://visible.seranking.com/blog/ai-traffic-adoption-study/)
- Other 2026 estimates disagree by more than tenfold: SEOCrawl reports 0.42% of sessions in August 2026 across 16,000+ sites, and First Page Sage reports 6.9% of sessions in September 2026.
  Both not opened.
  Confidence: vendor studies with different counting rules. - [SEOCrawl](https://seocrawl.ai/blog/ai-traffic-vs-organic-search-study); [First Page Sage](https://firstpagesage.com/seo-blog/ai-impact-on-website-traffic-report/)

#### Clicks lost and gained inside Google

- Pew (March 2025 browsing by 900 US adults, 68,879 searches): users clicked a traditional result on 8% of visits to results pages with an AI summary against 15% without.
  They clicked a link inside the summary on 1% of visits, and ended the session after 26% of pages with a summary against 16% without.
  18% of searches produced a summary.
  Confidence: large independent observational study, early 2025. - [Pew Research Center](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/)
- Seer Interactive (24 April 2026; 53 brands, 5.47 million queries, 2.43 billion organic impressions, January 2025 to February 2026): for informational queries, organic click-through averaged 3.35% with no AI Overview, 2.07% when the brand was cited in the overview and 0.94% when it was not.
  Being cited meant 120% more organic clicks per impression than not being cited, and still 38% fewer than with no overview.
  Click-through on overview queries rebounded from 1.3% in December 2025 to 2.4% in February 2026.
  The authors say they cannot claim causation because stronger brands are more likely to be cited, and one account makes up 47% of the not-cited segment.
  Confidence: large observational study on agency clients.
  Incentive: SEO agency. - [Seer Interactive](https://seerinteractive.com/insights/aio-impact-on-google-ctr-2026-update)

#### Why attribution is hard

- Ahrefs notes AI visits are often recorded as direct traffic in analytics, and that much research happens with no click at all.
  Confidence: vendor observation. - [Ahrefs](https://ahrefs.com/blog/ai-traffic-research/)
- Google counts AI Overview and AI Mode clicks inside overall Web totals, and the 2026 generative AI report gives impressions only.
  Confidence: official statement. - [Google AI features documentation](https://developers.google.com/search/docs/appearance/ai-features); [Google Search Central blog](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports)
- Microsoft states its Citation Share metric does not represent traffic share.
  Confidence: official statement. - [Bing blog](https://blogs.bing.com/search/June-2026/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare)
- The Kaiser and Schulze study measures last-click only, and its authors suggest shoppers check other sources after ChatGPT before buying.
  Confidence: stated limitation of a peer-reviewed study. - [Search Engine Land](https://searchengineland.com/llms-google-referral-conversion-study-463747)
- The only causal estimate of a GEO effect on traffic found in the survey is one natural experiment with an adjusted 1.82x effect on ChatGPT referrals (95% interval 1.31 to 2.54) and an inconclusive placebo test.
  Confidence: small case study. - [PPC Land](https://ppc.land/survey-of-45-studies-finds-geo-rewrites-can-cut-a-pages-ai-retrieval-16/)

### Inferences
- The conversion evidence splits by outcome type.
  Sign-ups and subscriptions on content sites look strong from AI referrals, and purchases on e-commerce sites look weaker than organic search.
- Vendor mismatch: "AI traffic converts 3x to 9x better" is quoted widely by tool vendors, usually from small samples or soft conversions, and is contradicted by the largest transaction dataset.
- The chain from citation to revenue has three unmeasured links: citation to impression, impression to click, click to sale.
  Google and Bing now expose the first for their own surfaces, nobody exposes the second on ChatGPT, Claude or Perplexity, and most tracking tools stop at the first.
- For a small business, AI referrals are still a low single-digit share of organic traffic.
  The larger near-term effect is the loss of organic clicks when a Google AI Overview appears and the brand is not cited (0.94% against 3.35% click-through).
- A product that ties visibility to outcomes (assisted conversions, branded search lift, self-reported discovery) would address a gap that current dashboards leave open.

### Gaps
- No peer-reviewed conversion study covers 2026 data, B2B, services or local businesses.
- No source quantifies how much AI-driven traffic arrives without a referrer or through mobile apps.
- No study links a measured change in AI visibility to a change in revenue for the same business with a control.
- The First Page Sage figure of 6.9% of sessions is an outlier whose method I could not check.
