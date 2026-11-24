# Buyer and practitioner complaints in the AI search visibility (GEO / AEO) market

Research date: 2026-11-22.
Window covered: 2025 to November 2026, weighted to May to November 2026.

How to read these notes:

- Reddit blocked direct access, so I read Reddit threads through the Arctic Shift public archive API (`https://arctic-shift.photon-reddit.com/api/comments/search?link_id=<post id>`).
  Each Reddit link below is a permalink built from the post ID and was not opened directly.
  Comment dates come from Unix timestamps and can be off by a day.
- Everything is paraphrased.
  The file contains one direct quote (Mike King, question 6).
  Check wording at the source before quoting anything in the report.
- Each item ends with a source label.
  Practitioner means a buyer or independent user.
  Trade press means a reported article.
  Vendor means the speaker sells a product or service in this category, so confidence is low.
  Relayed by vendor means a competitor's page quoting a third party, which is the lowest confidence.
  Search snippet only means the page was blocked or paywalled and I saw only the search result summary.
- Frequency lines count independent sources found in this research, not the whole market.

## 1. What users complain about in AI visibility tools

### Takeaway

The four most repeated complaints are numbers that differ between runs and between tools, prompt sets the vendor invented, scores with no next action, and price that buyers judge against a number they do not trust.
Each of those four appears in ten or more independent sources between January and November 2026.
Missing revenue attribution and hidden methodology follow closely, while prompt, seat and credit limits show up mainly in review blogs and less in first-person buyer posts.

### Cited Findings

#### Numbers that change between runs and between tools

Frequency: the most repeated complaint, found in 12 independent sources (one study, three trade articles, seven Reddit users, one conference deck).

- 2026-01-30. Rand Fishkin (SparkToro) and Patrick O'Donnell (Gumshoe.ai) ran 12 brand-recommendation prompts 60 to 100 times each on ChatGPT, Claude and Google's AI, 2,961 runs in total.
  The same brand list came back less than 1 time in 100, and the same list in the same order less than 1 time in 1,000.
  Practitioner study with a disclosed conflict (Gumshoe sells tracking). - [Search Engine Journal](https://www.searchenginejournal.com/ai-recommendations-change-with-nearly-every-query-sparktoro/566242/)
- 2026-05-01. Paul Dyer, CEO of the agency /prompt, told Digiday that three tools given the same prompts return three different answers.
  Tools unnamed.
  Trade press. - [Digiday](https://digiday.com/marketing/marketers-question-expensive-ai-visibility-tools-as-inconsistent-results-fuel-skepticism/)
- 2026-05-01. Heather Physioc, chief discoverability officer at VML, said her team tracks about 17 tools, including Profound, Adobe LLM Optimizer and Evertune, and many give only point-in-time results.
  Trade press. - [Digiday](https://digiday.com/marketing/marketers-question-expensive-ai-visibility-tools-as-inconsistent-results-fuel-skepticism/)
- 2026-04-27. Alex Isa, founder of an AEO consultancy for B2B SaaS, scored one brand on three trackers and got 28 out of 100 from HubSpot's free grader, 44 from a paid dashboard on a roughly $400 per month plan, and no index entry at all from a third.
  His own open-source tool scored it 33.
  Vendor (consultant), but the numbers are first-hand. - [DEV Community](https://dev.to/alexisa/free-open-source-aeo-tracker-our-real-score-was-33100-258i)
- 2026-07-03. A content marketer with 5+ years in SaaS SEO tried 20+ trackers on free tiers and demos in two weeks.
  Scores for the same brand ran from 67 to 23 to not cited at all.
  Practitioner, later floated building a tool. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1umrd01/)
- 2026-07-03 thread, same link. A commenter explained the spread by saying the tools measure different things (mentioned, cited, linked, selected) without saying which.
  Another said outliers probably query a rendered browser while the rest use the raw API.
  Practitioners. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1umrd01/)
- 2026-07-06 or 07. A poster relayed that a buyer ran their site through a $125 per month tool three times in one hour, got three scores, and cancelled.
  Second-hand, and moderators later removed the post. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1uphso1/)
- 2026-10 (the archive gave both the 18th and the 30th). A user asked the same generic best-tool question on two consecutive days.
  The first-place pick held about 6 times in 10 on Copilot, under 4 in 10 on ChatGPT and under 3 in 10 on Perplexity.
  Practitioner. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1xj0kin/)
- 2026-10-14. In a 77-comment thread on which tracker is worth it, two users of Profound, Otterly and Peec said answers vary a lot between prompts and runs, so they treat numbers as trends only.
  Practitioners. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1x5i3kq/)
- 2026-02. A r/digital_marketing user comparing Profound, Limy, HubSpot and Otterly re-ran queries by hand and got different results from the tool.
  Relayed by vendor (AirOps). - [AirOps](https://www.airops.com/blog/profound-reviews), original thread at [Reddit r/digital_marketing](https://www.reddit.com/r/digital_marketing/comments/1r8txac/profound_vs_limyai_vs_hubspot_vs_otterly_heres_my/)
- 2026-06-19. Dan Taylor, head of innovation at the agency 10 Spurs, reported that Ahrefs showed 1 to 3 Copilot citations for a project site while Copilot's own reporting showed over 36,000.
  He also said almost every citation tracker showed a drop after GPT-5 launched in August 2025 because ChatGPT changed how it displayed links.
  Practitioner column. - [Search Engine Journal](https://www.searchenginejournal.com/we-need-to-change-our-approach-to-ai-prompt-tracking/579646/)
- 2026-08-11. Victoria Spall of the agency Browser Media wrote that daily tracking mostly measures noise because one model gives different brands and citations for the same question.
  Practitioner. - [Browser Media](https://browsermedia.agency/blog/why-measuring-ai-visibility-is-mostly-bs/)

#### Prompt sets the vendor made up, and no data on what real users ask

Frequency: repeated, 10 independent sources.

- 2026-07-19. A r/aeo commenter called Profound snake oil because it measures prompts the vendor wrote, not real people, and publishes no detailed methodology.
  The same commenter said it reportedly costs high five to six figures a year, which is unverified.
  Practitioner. - [Reddit r/aeo](https://www.reddit.com/r/aeo/comments/1v1pmg6/any_profound_users/)
- 2026-01-14. A r/GrowthHacking commenter said Profound's prompts came from nowhere and had to be checked against Semrush demand data.
  Relayed by vendor (AirOps). - [AirOps](https://www.airops.com/blog/profound-reviews), original thread at [Reddit r/GrowthHacking](https://www.reddit.com/r/GrowthHacking/comments/1n8yt53/has_anybody_used_this_ai_tool_named_profound/)
- 2026-09-12 and 2026-10-14. One user said in two separate threads that he cancels these tools because none has data from real users, and that only Google and Bing data is worth trusting.
  Practitioner. - [Reddit r/GEO_optimization cancel thread](https://www.reddit.com/r/GEO_optimization/comments/1wefnnx/) and [Reddit r/GEO_optimization tool thread](https://www.reddit.com/r/GEO_optimization/comments/1x5i3kq/)
- 2026-09-12. Another user said the tools cannot work because only the AI platform sees query frequency, and recommended Bing Webmaster Tools and Search Console.
  Practitioner. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1wefnnx/)
- 2026-09-13. A user of three unnamed tools said none shows the prompts where the brand already appears.
  The tools reported zero visibility while the site was getting LLM traffic and leads.
  Practitioner. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1wefnnx/)
- 2026-08-11. Browser Media found that 15 to 20 percent of the non-brand topics Semrush suggested for a client had nothing to do with the client's business.
  Practitioner (agency). - [Browser Media](https://browsermedia.agency/blog/why-measuring-ai-visibility-is-mostly-bs/)
- 2026-07-06. Ann Smarty, CEO of an SEO agency, wrote that visibility scores from Profound and Peec depend entirely on the chosen prompts.
  She added that some agencies put the brand name in the prompt, which returns a 100 percent score and inflates the average.
  Practitioner. - [Practical Ecommerce](https://www.practicalecommerce.com/ai-visibility-scores-are-useless)
- 2026-10-14. A commenter at a large university said tracking branded prompts for a large brand is useless unless the goal is sentiment or fact checking.
  Practitioner (in-house). - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1x5i3kq/)
- 2026-01-15. A buyer who had sat through a vendor sales call said prompt generation from the domain alone is weak.
  Practitioner. - [Reddit r/SEO](https://www.reddit.com/r/SEO/comments/1qdlxgr/are_ai_visibility_tools_becoming_another/)
- 2025-08-20. Tim Soulo, CMO of Ahrefs, said no tool can see the prompts people type into ChatGPT, Perplexity or Gemini, and most trackers use AI-generated questions.
  Vendor (Ahrefs sells Brand Radar), which makes the admission notable. - [The Keyword](https://www.thekeyword.co/news/ai-search-tracking-tools-unreliable-for-chatgpt-perplexity-and-gemini-data)
- Undated G2 review of Profound. The reviewer said Profound gives little insight into how it builds prompt volumes or where the data comes from, which makes the figure less trustworthy.
  Search snippet only. - [G2](https://www.g2.com/products/profound/reviews)
- 2026-09-15. QueryBurst reviewed Profound's methodology and found no published confidence intervals or margins of error for prompt volume estimates.
  QueryBurst works in the category, and the item is relayed by vendor (AirOps). - [QueryBurst](https://queryburst.com/research/profound-methodology/)

#### A score with no clear next action

Frequency: repeated, 12 independent sources, and the reason most often given for cancelling (see question 3).

- 2026-05-01. Ryan Mason, president of the agency Markacy, called the tools just a benchmarker with little actionable guidance.
  Trade press. - [Digiday](https://digiday.com/marketing/marketers-question-expensive-ai-visibility-tools-as-inconsistent-results-fuel-skepticism/)
- 2026-01-15. Four commenters in one r/SEO thread described the tools as rebranded SEO dashboards with fuzzy scores, black-box scoring and no clear step to take.
  Practitioners. - [Reddit r/SEO](https://www.reddit.com/r/SEO/comments/1qdlxgr/are_ai_visibility_tools_becoming_another/)
- 2026-07-22. A r/aeo commenter said most tools use keyword-style prompts, give one visibility score, offer no interpretation and make shallow recommendations.
  Practitioner. - [Reddit r/aeo](https://www.reddit.com/r/aeo/comments/1v1pmg6/any_profound_users/)
- 2026-08-04. A r/bigseo poster said many tools reduce reporting to cited or not cited, which is too shallow for SEO strategy.
  Practitioner. - [Reddit r/bigseo](https://www.reddit.com/r/bigseo/comments/1vfh7h7/)
- 2026-11-17. A r/aeo poster argued that Otterly, Peec and Profound are cheap and show where a brand appears, but they fix nothing, and the real cost is the weekly remediation work.
  Practitioner. - [Reddit r/aeo](https://www.reddit.com/r/aeo/comments/1xypyiy/)
- 2026-11-16. A r/GEO_optimization post asked which tool actually tells you what to fix.
  Only the title survives. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1xxl1gw/)
- 2025-09-07. A user after two to three months on Profound said the suggested actions are too broad and abstract.
  Relayed by vendor (AirOps). - [AirOps](https://www.airops.com/blog/profound-reviews), original thread at [Reddit r/GEO_Digital_Marketing](https://www.reddit.com/r/GEO_Digital_Marketing/comments/1nav89z/sharing_my_thoughts_after_23_months_with_profound/)
- 2026-01-14. A r/GrowthHacking commenter said Profound's content optimization gives generic advice.
  Relayed by vendor (AirOps). - [AirOps](https://www.airops.com/blog/profound-reviews)
- 2026-10. A Profound reviewer on AWS Marketplace said the hard part is knowing what to prioritize.
  Relayed by vendor (AirOps). - [AWS Marketplace reviews](https://aws.amazon.com/marketplace/reviews/reviews-list/prodview-p2ghr3txgulka)
- 2026-10-15. A KIME user said they barely use many of its features, such as content suggestions and the calendar.
  Practitioner. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1x5i3kq/)
- 2026 review of Peec AI. The reviewer summarised user feedback as the tool tells you what is happening but not what to do.
  Third-party review blog, search snippet only. - [Sightivo](https://sightivo.com/blog/peec-ai-review)
- 2026-04-30. GEO Tracker AI audited 22 tools from public pages and rated 14 as giving only directional suggestions and 7 as giving none.
  It cited a PlateLunch analysis that 49 of 52 platforms are measurement-first.
  Vendor, with a disclosed conflict and no hands-on testing. - [GEO Tracker AI](https://geotrackerai.com/blog/ai-visibility-tools-action-gap)

#### Price

Frequency: repeated, 12 independent sources.

- 2026-05-01. Digiday listed Profound at $99 per month for ChatGPT only with 50 prompts and $399 per month for three engines with 100 prompts.
  An unnamed agency executive said Profound can run to $1,000 per month.
  Joseph Levi, CEO of Noise Media Group, said vendors do not know enough yet to charge what they charge, though his firm sells its own tracker.
  Trade press. - [Digiday](https://digiday.com/marketing/marketers-question-expensive-ai-visibility-tools-as-inconsistent-results-fuel-skepticism/)
- 2026-11-09. Profound's pricing page now shows a seven-day trial and custom enterprise pricing only, while G2 still lists the retired $99 and $399 tiers.
  Relayed by vendor (AirOps). - [AirOps](https://www.airops.com/blog/profound-reviews)
- 2026-08. A TrustRadius reviewer scored Profound 7 out of 10 and said the price is still higher than many businesses can justify.
  Relayed by vendor (AirOps). - [TrustRadius](https://www.trustradius.com/products/profound/reviews)
- G2 reviewers of Profound, undated. Several call it one of the most expensive tools in the market, and one says the most useful features sit behind pricier plans.
  Search snippet only. - [G2](https://www.g2.com/products/profound/reviews)
- 2026-01-15. In r/SEO, one user said prices feel bloated and Profound charges thousands for one site, another said a $100 per month tool returned little, and a third said the tools were over budget.
  Practitioners. - [Reddit r/SEO](https://www.reddit.com/r/SEO/comments/1qdlxgr/are_ai_visibility_tools_becoming_another/)
- 2026-07-21. A r/aeo commenter who tried Profound said the pricing does not make sense for what he called a commodity keyword tracker.
  Practitioner. - [Reddit r/aeo](https://www.reddit.com/r/aeo/comments/1v1pmg6/any_profound_users/)
- 2026-05-27. A r/bigseo poster complained that Semrush charges a large amount for GEO tracking and asked for cheaper ways to audit.
  Practitioner, body removed. - [Reddit r/bigseo](https://www.reddit.com/r/bigseo/comments/1toxp7g/)
- 2026-08-11. An agency SEO whose client already pays for Profound asked for affordable tools to track visibility, sentiment and citations.
  Practitioner (agency). - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1vlmgf6/)
- 2026-08-11. Browser Media said tracking many prompts across engines and markets reaches four figures a month, and cited reviewer estimates of $2,000 to $5,000+ per month for Profound Enterprise.
  Practitioner. - [Browser Media](https://browsermedia.agency/blog/why-measuring-ai-visibility-is-mostly-bs/)
- 2026-04-30. Dan Taylor wrote that some tools charge brands tens of thousands of dollars.
  Practitioner column, no vendor named. - [Search Engine Journal](https://www.searchenginejournal.com/your-ai-visibility-tracker-is-quietly-breaking-your-analytics/573000/)
- 2026 TechRadar review of Ahrefs Brand Radar. The verdict was useful competitor clues, a hefty subscription and more manual digging than expected.
  Trade press, search snippet only. - [TechRadar](https://www.techradar.com/pro/ahrefs-brand-radar-review)

#### Prompt, engine, credit and seat limits

Frequency: moderate, 7 sources, mostly review blogs and trade press, with few first-person buyer complaints.
I found no complaint about seat limits specifically.

- 2026-05-01. Ahrefs tiers as reported by Digiday allow 5 tracked prompts at $129 per month, 10 at $249 and 20 at $449.
  Trade press. - [Digiday](https://digiday.com/marketing/marketers-question-expensive-ai-visibility-tools-as-inconsistent-results-fuel-skepticism/)
- 2026-08-11. Browser Media listed engine gaps.
  Peec caps plans at three engines.
  Otterly's base tier at about $29 per month leaves out Gemini and Claude.
  Semrush's toolkit at $99 per month covers one domain and 25 prompts and omits Perplexity and Claude.
  Practitioner. - [Browser Media](https://browsermedia.agency/blog/why-measuring-ai-visibility-is-mostly-bs/)
- 2026-08-02. An agency user of Profound said Claude tracking is a paid add-on.
  Practitioner (agency). - [Reddit r/aeo](https://www.reddit.com/r/aeo/comments/1v1pmg6/any_profound_users/)
- 2026-01-14. A r/GrowthHacking commenter said Profound's brand context field held about 4,000 characters and the team hit the content limit after about 10 articles.
  Relayed by vendor (AirOps). - [AirOps](https://www.airops.com/blog/profound-reviews)
- 2026 review of AthenaHQ. 3,600 credits equal about 120 daily prompt-engine pairs, so a team that reads credits as prompts uses up the plan in days, and extra credits are priced only through sales.
  Third-party review blog, search snippet only. - [AEO Labs](https://www.aeolabs.ai/blog/athenahq-review)
- 2026. TrustRadius reviewers of Profound reported no native A/B test, limited reporting that forced exports to Excel, and no Webflow connection.
  Relayed by vendor (AirOps). - [TrustRadius](https://www.trustradius.com/products/profound/reviews)
- 2026-07. A Peec AI employee stated in a Reddit thread that Peec's entry plan is 50 prompts across 3 models for $95.
  Vendor, useful as a price fact. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1umrd01/)

#### No link to traffic, leads or revenue

Frequency: repeated, 8 independent sources plus survey data.

- 2026-01-27. A r/SEO commenter compared AI visibility scores to the early days of Domain Rating and said they are hard to tie to revenue.
  Practitioner. - [Reddit r/SEO](https://www.reddit.com/r/SEO/comments/1qdlxgr/are_ai_visibility_tools_becoming_another/)
- 2026-08-11. Browser Media wrote that no tool reliably links an AI citation to a click or a conversion.
  Practitioner. - [Browser Media](https://browsermedia.agency/blog/why-measuring-ai-visibility-is-mostly-bs/)
- 2026-07-22. A r/bigseo commenter said he knows no reliable way to measure traffic from Claude or Gemini, and citation tools may not reflect reality.
  Practitioner. - [Reddit r/bigseo](https://www.reddit.com/r/bigseo/comments/1v35o0x/)
- 2026-07-28. Even a satisfied Profound customer who reported a 9x rise in marketing-qualified leads said attribution through HubSpot and GA4 stays hard for Claude and Brave traffic.
  Practitioner. - [Reddit r/aeo](https://www.reddit.com/r/aeo/comments/1v1pmg6/any_profound_users/)
- 2026-10-15. A builder of an in-house tool said attribution of AI-sourced leads is still unsolved.
  Practitioner who builds his own software. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1x5i3kq/)
- 2025-09-07 and undated. A Profound user said measuring ROI is ambiguous, and a TrustRadius content engineer at a 51 to 200 person company listed connecting data to business impact as a con.
  Relayed by vendor (AirOps). - [AirOps](https://www.airops.com/blog/profound-reviews)
- 2026. A Branch survey of 300 enterprise leaders found 26 percent name journey tracking as their top practical challenge, and most teams measure referred traffic only.
  Vendor survey, search snippet only. - [Branch](https://branch.io/resources/blog/ai-search-in-2026-key-findings-from-300-enterprise-leaders)
- 2026. An eMarketer report said 56.0 percent of small and mid-size businesses cite measuring ROI from AI visibility work as a challenge, ahead of time or expertise (42.7 percent) and budget (38.7 percent).
  Search snippet only, page blocked. - [eMarketer](https://www.emarketer.com/content/smbs-recognize-ai-search-visibility-critical-struggle-measure-impact)

#### Hidden methodology

Frequency: repeated, 8 independent sources.

- 2026-01-30. Fishkin advised buyers to make providers explain their method and show their math before paying.
  Practitioner. - [Search Engine Journal](https://www.searchenginejournal.com/ai-recommendations-change-with-nearly-every-query-sparktoro/566242/)
- 2026-04-27. Alex Isa said none of the trackers he tried would show the actual ChatGPT response behind the score.
  Vendor (consultant). - [DEV Community](https://dev.to/alexisa/free-open-source-aeo-tracker-our-real-score-was-33100-258i)
- 2026-07-03. The content marketer who tried 20+ tools could not learn how they chose prompts, how many queries they ran or which models they used.
  A commenter added that some vendors dodge the question, which leaves the score impossible to check.
  Practitioners. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1umrd01/)
- 2026-08-26. A post by a self-described software engineer claimed every AI visibility tool misleads its users.
  Practitioner, no specifics and no comments. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1vz01az/)
- 2026-11-06. Mike King said in a conference deck that visibility tools use different methodologies and are not consistent with each other.
  Practitioner (agency founder). - [Speaker Deck](https://speakerdeck.com/ipullrank/seos-don-t-actually-do-marketing-and-it-shows-mike-king)

#### Other complaints (one-off or thin)

- 2026-04-30. Trackers contaminate the buyer's own analytics.
  When a tracker prompts ChatGPT or Perplexity, the platform fetches the brand's pages, so server logs show AI interest that the tracker itself caused.
  Dan Taylor raised this after an X post by Jan-Willem Bobbink.
  Two sources, no vendor named. - [Search Engine Journal](https://www.searchenginejournal.com/your-ai-visibility-tracker-is-quietly-breaking-your-analytics/573000/)
- 2026-08-11. Trackers test logged-out prompts with no memory, while ChatGPT's memory and context rewrite real users' queries.
  Three sources (Browser Media, Tim Soulo, one vendor commenter). - [Browser Media](https://browsermedia.agency/blog/why-measuring-ai-visibility-is-mostly-bs/)
- 2025-09 to 2026. Profound has a steep learning curve and overwhelming data.
  A director at a 1,001 to 5,000 person company asked for more guidance, and another reviewer had to ask an LLM how to use it.
  Relayed by vendor (AirOps), 3 reviewers. - [AirOps](https://www.airops.com/blog/profound-reviews)
- 2026. Ahrefs Brand Radar confused the competitor Grin with the verb, and Semrush confused the company Later with the adverb.
  One-off from a competitor's blog (Profound), low confidence, search snippet only. - [Profound blog](https://tryprofound.com/blog/ahrefs-brand-radar-review)
- 2026-05-24. A user dropped the tool Searchable because it reportedly inserts recurring text into users' prompts.
  One-off, practitioner. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1tmn5a2/)
- 2026-01-15. One r/SEO commenter cited reports that Surfer's AI Tracker relies on unreliable APIs, though the same person found a two-week trial helpful.
  One-off, practitioner. - [Reddit r/SEO](https://www.reddit.com/r/SEO/comments/1qdlxgr/are_ai_visibility_tools_becoming_another/)

#### Counter-evidence worth keeping

- 2026-07-28. A Profound customer reported a 9x increase in marketing-qualified leads and payback within two months, crediting content refreshes and comparison pages the tool suggested.
  Practitioner, self-reported. - [Reddit r/aeo](https://www.reddit.com/r/aeo/comments/1v1pmg6/any_profound_users/)
- 2026-11. G2 result titles show about 1,125 Profound reviews and the snippet reports a 4.5 average.
  An earlier search result said 322 reviews, so the count is uncertain.
  Search snippet only. - [G2](https://www.g2.com/products/profound/reviews)

### Inferences

- The complaints form a chain.
  Buyers doubt the inputs (invented prompts), then the measurement (variance and tool disagreement), then the output (a score with no action), then the payoff (no revenue link).
  Price complaints sit downstream of the first three, since people call the tools overpriced relative to a number they do not trust.
- The variance complaint changed during 2026.
  In January the claim was that rank tracking in AI is noise.
  By July to November buyers and practitioners were asking a narrower question about how many runs sit behind a score and whether they can see the raw answers.
- Limit complaints (prompts, credits, engines) come mostly from review blogs and trade press, so they rank below the trust and action complaints as a buying obstacle.
- Vendor self-promotion fills the forums where buyers ask for advice.
  In the 77-comment tool thread, 14 of the first 25 substantive commenters had a disclosed or likely tie to a tool.
  That makes peer recommendations hard to trust and probably adds to the distrust of the category.
- Vendors narrowing public pricing during 2026 (Profound moving to trial plus custom enterprise) fits the price-opacity complaint, though I have it only through a competitor's page.

### Gaps

- I could not open G2, Capterra or Trustpilot review pages directly.
  All review-site items come from search snippets or a competitor's summary, so the dislike sections are under-sampled.
- I found almost no first-person complaints about AthenaHQ, Scrunch or seat limits.
  Evidence on those is limited to third-party review blogs.
- I found no independent head-to-head accuracy test of the named tools in the May to November 2026 window.
- A search summary mentioned that Profound re-ran about 80,000 prompts and saw 40 to 60 percent of cited domains change within a month, but I could not trace the source page, so it is not in the findings.
- The r/SEO thread and the 77-comment r/GEO_optimization thread were only partly read (the first 100,000 characters of each archive response).

## 2. What buyers complain about in GEO / AEO agencies

### Takeaway

The dominant complaint is that agencies sell SEO under a new label, which I found in 15+ independent sources, followed by the absence of proof that the work moved anything.
Guarantees of ChatGPT placement and spam delivery methods (aged Reddit accounts, self-promotional listicles, hidden prompts) are documented but come from fewer sources.
Evidence on long contracts is thin.

### Cited Findings

#### SEO sold again as GEO

Frequency: the most repeated agency complaint, 15+ independent sources.

- 2026-09-18. A consultant described an agency pitching her client, a solo expert business, a four-figure GEO package that was mostly keyword work and link building.
  The pitch promised a top spot in AI recommendations and used a deadline and the threat of competitors pulling ahead.
  She did the client's GEO work herself.
  Practitioner. - [Substack, Anneloes Zuiderveen](https://anneloeszuiderveen.substack.com/p/agencies-make-me-want-to-slam-my)
- 2026-05-14. Joel Kleber, CMO of a franchise group, argued that AEO and GEO agencies will sell the old SEO retainer model under a new acronym, with $2,000 retainers and long-form blogs as the product.
  Opinion and prediction, no named agencies and no documented incidents. - [Franchise Marketer](https://www.franchisemarketer.co/p/aeo-geo-agencies-are-the-new-seo-scam)
- 2026-03-05. Jeremy Moser, CEO of the agency uSERP, said most of GEO is good traditional SEO and vendors who do not admit it are selling snake oil.
  Edward Cowell, global VP of SEO at WPP Media, said GEO vendors pitch him roughly every day.
  Trade press. - [Digiday](https://digiday.com/media/media-briefing-as-ai-search-grows-a-cottage-industry-of-geo-vendors-is-booming)
- 2026-03-18. Lily Ray listed relabeled SEO (structured data, FAQ schema, optimized headlines) as one of six GEO practices she criticises.
  Practitioner. - [Lily Ray on Substack](https://lilyraynyc.substack.com/p/your-geo-strategy-might-be-destroying)
- 2026-11-17. A small-brand founder who spent a year comparing agencies said the weaker SEO agencies had only renamed their SEO package, and GEO-only specialists often lacked technical SEO staff.
  Practitioner, post later deleted, possible undisclosed tie. - [Reddit r/aeo](https://www.reddit.com/r/aeo/comments/1xyeew0/)
- 2026-07-22. In a r/bigseo thread with 29 comments and a score of 33, at least five commenters said GEO is SEO in new packaging and that experts sell the wrapper to people who do not understand the jargon.
  Practitioners. - [Reddit r/bigseo](https://www.reddit.com/r/bigseo/comments/1v35o0x/)
- 2026-05 to 2026-10. A title search of r/bigseo for GEO since May 1 returned 67 posts, and at least 8 asked whether GEO is just SEO under a new name.
  Practitioners. - [Example thread, Reddit r/bigseo](https://www.reddit.com/r/bigseo/comments/1t2foaj/)
- 2026. A Search Engine Land survey found 81 percent of marketers still call their internal AI search work SEO.
  Search snippet only. - [Search Engine Land](https://searchengineland.com/ai-search-marketers-call-it-seo-485574)

#### No proof the work moved anything

Frequency: repeated, 7 independent sources.

- 2026-05-16. A r/bigseo poster paid $21,000 for a three-month GEO agency pilot and left at month four.
  The monthly dashboards looked good, but ChatGPT citations for category prompts stayed at the month-zero level.
  The agency's tools only confirmed that bots could crawl the site.
  Practitioner, but moderators removed the post and it scored 0, so treat it as a single unverified account. - [Reddit r/bigseo](https://www.reddit.com/r/bigseo/comments/1tep23r/)
- 2026-05-16, same thread. An in-house SEO replied that the poster tracked the wrong metric and that brand mentions matter more than citations.
  Practitioner. - [Reddit r/bigseo](https://www.reddit.com/r/bigseo/comments/1tep23r/)
- 2026-03-18. Lily Ray found roughly 30 cases where a vendor's published GEO success was followed by a traffic decline, and said the gains credited to GEO were really SEO.
  In Digiday she cited one case-study client that lost 66 percent of its organic traffic.
  Practitioner. - [Lily Ray on Substack](https://lilyraynyc.substack.com/p/your-geo-strategy-might-be-destroying) and [Digiday](https://digiday.com/media/media-briefing-as-ai-search-grows-a-cottage-industry-of-geo-vendors-is-booming)
- 2026-07-22. The r/bigseo original poster said courses, audits and consulting packages are multiplying faster than demonstrated results.
  Practitioner. - [Reddit r/bigseo](https://www.reddit.com/r/bigseo/comments/1v35o0x/)
- 2026-11-04. A B2B SaaS team considering a GEO agency could not define what progress should look like after 3 or 6 months.
  Practitioner, no replies. - [Reddit r/aeo](https://www.reddit.com/r/aeo/comments/1xnlaf8/)
- 2026-11-05. A r/bigseo poster said he reviewed about 30 studies and found most tactics promoted by GEO gurus unsupported.
  Practitioner, body removed. - [Reddit r/bigseo](https://www.reddit.com/r/bigseo/comments/1xosi90/)
- 2026-03-05. Digiday reported that publishers want measurable results before they commit budget, and that GEO outcomes are hard to quantify because analytics firms model visibility differently.
  Trade press. - [Digiday](https://digiday.com/media/media-briefing-as-ai-search-grows-a-cottage-industry-of-geo-vendors-is-booming)

#### Guarantees and spam delivery

Frequency: 5 to 6 independent sources.

- 2026-07-25. A r/aeo poster described an agency selling guaranteed ChatGPT recommendations or no fee.
  Delivery is through 1,000+ aged Reddit accounts at $5,000 to $10,000 per month for 10 to 20 posts and 50 to 100 comments.
  The agency also removes negative threads through DMCA takedowns at about $2,000 each.
  A subreddit moderator replied that mods spot these sellers and delete their content.
  Practitioner, agency unnamed, revenue claims unverified. - [Reddit r/aeo](https://www.reddit.com/r/aeo/comments/1v63hoj/)
- 2026-07-27. Heather Physioc of VML said anyone who promises results in AI visibility is lying.
  Trade press. - [Digiday](https://digiday.com/marketing/mythbusters-ai-visibilitys-biggest-misconceptions/)
- 2026-11-17. A r/aeo poster told buyers to avoid anyone promising first place in ChatGPT, since answers change between runs.
  Practitioner. - [Reddit r/aeo](https://www.reddit.com/r/aeo/comments/1xypyiy/)
- 2026-03-18. Lily Ray reported that self-promotional listicles are now sold as a service, that Google began demoting sites using them around January 21, 2026, and that Microsoft traced hidden-prompt Summarize-with-AI buttons to 50+ examples from 31 companies in 14 industries.
  Practitioner. - [Lily Ray on Substack](https://lilyraynyc.substack.com/p/your-geo-strategy-might-be-destroying)
- 2026. Ray's analysis of 80 B2B software prompts found Google AI Overviews cited self-promotional listicles 323 times but left the publishing brand out of the recommendation in 69 percent of cases.
  Search snippet only. - [Search Engine Land](https://searchengineland.com/google-ai-overviews-cite-self-serving-listicles-recommend-competitors-69%25-of-the-time-480573)
- 2026-03-05. Moser described one SEO and GEO agency whose main offer is $299 per month for 30+ automatically published articles.
  Trade press. - [Digiday](https://digiday.com/media/media-briefing-as-ai-search-grows-a-cottage-industry-of-geo-vendors-is-booming)

#### Contracts, deliverables and fit

Frequency: thin, 2 to 4 sources per item.

- 2026-05-14. Kleber flagged any vendor on retainer for more than two years without a new tender and recommended an RFP every two years.
  Opinion. - [Franchise Marketer](https://www.franchisemarketer.co/p/aeo-geo-agencies-are-the-new-seo-scam)
- 2026. An agency blog listed a 12-month contract demanded before any baseline as a red flag.
  Vendor, search snippet only. - [edthi](https://edthi.com/blog/geo-agency-red-flags)
- 2026-08-09 and 2026-09-14. Two r/aeo posters asked what an enterprise GEO agency should actually do and which common services are mostly marketing.
  Practitioners asking, not reporting an incident. - [Reddit r/aeo](https://www.reddit.com/r/aeo/comments/1wftid0/) and [Reddit r/aeo](https://www.reddit.com/r/aeo/comments/1vjk90u/)
- 2026-08-13. A B2B software company valued its agency's technical audit but doubted the agency could write accurate niche content, after generalist writers had produced filler and confident errors.
  Practitioner. - [Reddit r/aeo](https://www.reddit.com/r/aeo/comments/1vn4drj/)
- 2026-11-16. Agency staff answering the tracker-or-agency thread said the real work is closer to PR and relationship building than SEO.
  Six of ten commenters in that thread had vendor ties.
  Vendor. - [Reddit r/aeo](https://www.reddit.com/r/aeo/comments/1xypyiy/)

#### Counter-evidence worth keeping

- 2026-11-17. The founder who chose a combined SEO and GEO agency at about $2,500 per month reported citations rising from 4 to 19 of 45 tracked prompts in a year.
  Practitioner, self-reported, post later deleted. - [Reddit r/aeo](https://www.reddit.com/r/aeo/comments/1xyeew0/)
- 2026-03-05. The Washington Post's chief revenue officer said AI referral traffic grew 16 percent in six months and LLM visitors convert to subscribers at four to five times the rate of search visitors.
  Trade press. - [Digiday](https://digiday.com/media/media-briefing-as-ai-search-grows-a-cottage-industry-of-geo-vendors-is-booming)

### Inferences

- The agency complaint and the tool complaint are the same complaint at two prices.
  Agencies report from the dashboards that buyers already distrust, which is how a pilot can show three months of good reports and no change in citations.
- Buyers have started asking for proof before signing.
  The requests I saw were a baseline, a named prompt set, and the sources AI engines cite in the buyer's category.
- Price points span a wide range, from $299 per month content mills and four-figure solo packages to $2,500 per month retainers, a $21,000 pilot and $5,000 to $10,000 per month Reddit seeding.
  The $2,500 per month combined SEO and GEO retainer is the only one with a reported positive outcome.
- Pure GEO agencies face a specific objection that they lack technical SEO, while SEO agencies face the relabeling objection.
  Buyers who reported satisfaction chose a combined plan.

### Gaps

- I found few first-person complaints about contract length or lock-in.
  The two sources are an opinion column and an agency blog.
- I found no regulator, Better Business Bureau or Trustpilot complaint records about named GEO agencies.
- No named agency appears in a verified first-person complaint.
  The Reddit accounts do not name the agencies, and I could not check their claims.
- Search Engine Land articles on selling the AI dream and on paid brand mentions in GEO returned HTTP 403, so their content is missing.

## 3. Churn and do-it-yourself signals

### Takeaway

People cancel when the tool gives a score they cannot act on, when they conclude the data does not reflect real users, or when repeated runs disagree.
Building a tracker is cheap enough (cents per run in API fees) that r/aeo alone saw about 69 posts announcing a self-built tool between May and November 2026, though most builders are trying to sell theirs.
Buyers who quit paid tools fall back on Search Console, Bing Webmaster Tools, a fixed list of 15 to 30 prompts checked by hand, or an LLM plus a SERP API.

### Cited Findings

#### Why people cancel or decline to buy

Frequency: one dedicated thread with 12 substantive answers, plus 4 other sources.

- 2026-09-12. A thread asked what made people renew or cancel.
  The poster is building a product and was doing market research.
  One user kept a tool that had historical trends, citation changes and competitor comparisons, and cancelled another for vanity metrics with no clear action.
  His rule was that he will not renew a report that does not help decide what to improve next.
  Practitioner. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1wefnnx/)
- Same thread. One user cancels because no tool has data from real users.
  One never subscribed after a free trial showed nothing valuable.
  One does not use the tools at all and tracks with Claude and the DataForSEO API.
  One runs an audit of about 15 prompts across 3 platforms every one to two weeks with Semrush and ChatGPT, and wants to leave Semrush because of dislike for its owner Adobe.
  Practitioners. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1wefnnx/)
- Same thread. Two tool builders said a score that is only checked gets cancelled around month three, and that a number without a fix reads like a horoscope.
  Vendor. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1wefnnx/)
- 2026-07-06 or 07. The $125 per month cancellation after three runs gave three scores (see question 1).
  Second-hand. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1uphso1/)
- 2026-05-16. The $21,000 agency pilot ended at month four without renewal (see question 2).
  Practitioner, unverified. - [Reddit r/bigseo](https://www.reddit.com/r/bigseo/comments/1tep23r/)
- 2026-10-20. A poster asked whether a dedicated GEO tool is needed at all, after reading a review.
  Practitioner, no replies. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1xanfik/)
- 2025-10-31. Benjamin Houy shut down the tracker Lorelight about seven months after launch.
  Coverage says customers signed up and the product worked, but he concluded the problem did not need a standalone tool and that tracking belongs inside SEO suites.
  Founder statement, search snippet only. - [Search Engine Land](https://searchengineland.com/geo-startup-lorelight-shuts-down-464208)
- 2026-06-20. A r/bigseo poster observed that GEO hype had died down and asked how agencies now package it.
  Practitioner, no replies. - [Reddit r/bigseo](https://www.reddit.com/r/bigseo/comments/1uapx32/)

#### What people build instead, and what it costs

Frequency: very common as announcements, with 69 of 81 r/aeo posts matching the word built since May 1, 2026.
Buyers building for their own use are fewer, about 10 clear cases.

- 2026-04-27. Alex Isa's open-source command-line tracker queries official APIs and costs about $0.20 per weekly run on two engines or $0.55 on four.
  Build time not stated.
  Vendor (consultant). - [DEV Community](https://dev.to/alexisa/free-open-source-aeo-tracker-our-real-score-was-33100-258i)
- 2026. Search Engine Land published a guide to building a tracker for under $100 per month using DataForSEO's pay-as-you-go APIs.
  Search snippet only, page returned HTTP 403. - [Search Engine Land](https://searchengineland.com/build-ai-search-visibility-tracker-473178)
- 2026. Other guides claim a roughly 200-line Python script on one SERP API, and a self-hosted build at about $8 per month.
  Self-reported, search snippets only. - [DEV Community](https://dev.to/lachezard/build-your-own-ai-visibility-tracker-without-a-subscription-9n8) and [Wunderland Media](https://wunderlandmedia.com/build-your-own-ai-visibility-tracker)
- 2026-05-01. Lauren Wang, founder of the consumer brand Flex, said the company is building internal tools to cut costs, alongside Semrush.
  Trade press. - [Digiday](https://digiday.com/marketing/marketers-question-expensive-ai-visibility-tools-as-inconsistent-results-fuel-skepticism/)
- 2026-10-14. In the 77-comment thread, five commenters said they built their own tracker, one by vibe coding.
  That builder said the value is in fan-out queries, cited sources and which competitor pages rank.
  None gave stack, cost or build time.
  Practitioners. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1x5i3kq/)
- 2026-01-16. A r/SEO commenter who uses Peec, Profound and Brand Radar said a scraper feeding Google Sheets is feasible, but real prompt-volume data is the part you cannot build.
  Practitioner. - [Reddit r/SEO](https://www.reddit.com/r/SEO/comments/1qdlxgr/are_ai_visibility_tools_becoming_another/)
- 2026-07-14. A developer released openllmrank under the MIT license after finding existing tools expensive.
  It uses the user's own API keys on five providers, stores results locally and includes the raw model responses as evidence.
  Vendor of a free project. - [Reddit r/aeo](https://www.reddit.com/r/aeo/comments/1uw5qvw/)
- 2026-07-06. A SaaS marketer packaged a prompt-mapping and citation-gap workflow as a Claude Code skill.
  Self-promotion, results unverified. - [Reddit r/aeo](https://www.reddit.com/r/aeo/comments/1up8mlv/)
- 2026-06-21. A builder made a $2 one-time scan for local businesses because comparable tools cost $200+ per month.
  Vendor. - [Reddit r/aeo](https://www.reddit.com/r/aeo/comments/1uc10ax/)
- 2026-09-05. An agency owner who built a free check caps the runs because each one costs about ten cents in API calls.
  Vendor. - [Reddit r/aeo](https://www.reddit.com/r/aeo/comments/1w89obd/)
- 2026-05-25. One builder said he had been spending three hours a week checking AI recommendations by hand before automating it.
  Vendor. - [Reddit r/aeo](https://www.reddit.com/r/aeo/comments/1tn6mua/)
- 2026-07 to 2026-10. Manual methods recommended by commenters: 20 to 30 fixed buyer prompts in a spreadsheet, or 10 intents by 3 phrasings by 3 repeats per model with raw answers logged and results kept separate.
  Practitioners and one vendor. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1umrd01/)
- 2026-07-22 and 2026-07. Log-based methods: track bot hits from the user-triggered AI agents, or parse nginx logs with a custom tool.
  Practitioners. - [Reddit r/bigseo](https://www.reddit.com/r/bigseo/comments/1v35o0x/) and [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1umrd01/)
- 2026. Open-source projects that position against paid trackers include Elmo, Aperture, Hearsay and Limelit Open.
  Hearsay refuses to output a single blended visibility score.
  Project pages, search snippets only. - [Elmo on GitHub](https://github.com/elmohq/elmo) and [Hearsay on GitHub](https://github.com/melonwer/hearsay)
- 2026-02 to 2026-06. Three Show HN posts for free or open-source trackers (Citatra, Elmo, a free tracker) each got 1 to 2 points and no comments.
  Low traction. - [Hacker News, Elmo](https://news.ycombinator.com/item?id=48182144), [Hacker News, Citatra](https://news.ycombinator.com/item?id=47181963), [Hacker News, free tracker](https://news.ycombinator.com/item?id=48730358)
- 2026-10-21. One team posted that the AI visibility tool they built scored their own brand zero.
  Body removed. - [Reddit r/aeo](https://www.reddit.com/r/aeo/comments/1xbycyp/)

### Inferences

- Tracking alone is close to a commodity.
  Free graders, $2 scans, open-source projects, suite bundles from Semrush and Ahrefs, and the Lorelight exit all point the same way.
- The do-it-yourself route removes the price complaint and the hidden-methodology complaint, since builders see their own prompts and raw answers.
  It does not solve the three hard parts builders themselves name: real prompt demand, whether API answers match what users see in the app, and attribution to leads.
- Reported build effort is low and rarely stated, which suggests a weekend-scale project for a developer with LLM coding help.
  Running cost is cents per run, so the saving against a $95 to $499 per month subscription is large for small prompt sets.
- The renewal test buyers describe is behavioural.
  They keep a tool when it produced a decision or a shipped fix that month, and cancel around month three when it only produced a report.

### Gaps

- No source gave build time in hours or days for a self-built tracker.
- I found no churn or retention figures from any vendor.
- Indie Hackers was not reached, and Hacker News had posts but no discussion.
- Switching between named paid tools is poorly documented.
  The clearest cases are a client on Profound whose agency wants something cheaper, and one user wanting to leave Semrush.

## 4. Wish lists: what people say they want

### Takeaway

Stated wishes converge on three things: tracking that can be audited (published prompts, run counts, raw answers, variance), an output that says what to fix and then re-measures after the fix, and a link from AI answers to leads.
I found no statement naming a price someone would pay for a specific missing feature.

### Cited Findings

Frequency: each wish below has 2 to 6 independent sources unless marked one-off.

- Tell me what to fix.
  2026-11-16 post title asking which tool does this, 2026-09-13 renewal rule, 2026-11-17 poster asking who does the weekly work.
  Practitioners, 6+ sources with question 1. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1xxl1gw/), [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1wefnnx/), [Reddit r/aeo](https://www.reddit.com/r/aeo/comments/1xypyiy/)
- Publish the exact prompts, the number of runs and the raw answers behind each score.
  2026-07 commenters, 2026-01 Fishkin, 2026-04 Alex Isa.
  Practitioners, 5 sources. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1umrd01/) and [Search Engine Journal](https://www.searchenginejournal.com/ai-recommendations-change-with-nearly-every-query-sparktoro/566242/)
- Report repeated runs, show how often the brand appears across them, and flag only changes larger than normal variation.
  2026-07 poster, 2026-11 Mike King, 2026-06 Kevin Indig.
  Practitioners, 4 sources. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1uphso1/) and [Speaker Deck](https://speakerdeck.com/ipullrank/seos-don-t-actually-do-marketing-and-it-shows-mike-king)
- 2026-08-04. A r/bigseo poster proposed six measures beyond cited or not cited.
  They are prompt intent coverage by type, recommendation share on commercial prompts, how the answer frames each brand, which third-party sources shape the answer, stability across repeated runs, and a gap map that says whether a miss comes from entity clarity, proof, page structure, authority or positioning.
  He asked how to make these actionable without building another vanity dashboard.
  Practitioner, one detailed source. - [Reddit r/bigseo](https://www.reddit.com/r/bigseo/comments/1vfh7h7/)
- Separate recommended from merely mentioned or cited.
  2026-07 commenters and the 2026-05 in-house reply on the agency pilot.
  Practitioners, 3 sources. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1umrd01/)
- Show the prompts where the brand already appears, and report on cited queries.
  2026-09-13.
  Practitioner, one-off. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1wefnnx/)
- Trustworthy current and historical prompt-level volumes.
  2026-07-11, from a Profound user.
  Practitioner, 2 sources with the r/SEO scraper comment. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1uu2o4l/)
- Attribute AI-sourced leads and track whether citations turn into recommendations.
  2026-10-15 in-house builder, 2026-07-20 builder asking for real AI-referred visits.
  Builders, 3 sources. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1x5i3kq/) and [Reddit r/aeo](https://www.reddit.com/r/aeo/comments/1v1pmg6/any_profound_users/)
- Explain why a score moved.
  2026-09-12, from someone doing client work.
  Possible vendor, one-off. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1wefnnx/)
- Reports an agency can send to clients under its own brand.
  2026-08-04 question, and 2026-09-07 builder who made a white-label audit tool because clients kept asking.
  2 sources. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1vfhh6u/) and [Reddit r/aeo](https://www.reddit.com/r/aeo/comments/1w9i0du/)
- A way to test a local business without paying for a tool.
  2026-10-27.
  Practitioner, 2 sources with the $2 scan builder. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1xgywr6/)
- An agent that drafts content for human review from the tracking data.
  2026-10-17.
  Builder, one-off. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1x5i3kq/)
- Buy ads on the pages a chatbot cites, to answer what the model says.
  2026-07-21.
  One-off. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1v2j4ex/)
- A native A/B test inside the tool.
  TrustRadius reviewer of Profound, 2026.
  Relayed by vendor, one-off. - [AirOps](https://www.airops.com/blog/profound-reviews)
- Ready-to-send outreach copy for a specific cited URL.
  2026-04-30.
  Vendor's own product thesis, low confidence. - [GEO Tracker AI](https://geotrackerai.com/blog/ai-visibility-tools-action-gap)
- Agencies that show which sources get cited in your category before you sign.
  2026-11-17.
  Practitioner, one-off. - [Reddit r/aeo](https://www.reddit.com/r/aeo/comments/1xypyiy/)
- A shared definition of the job, the measurement and the buying criteria, so procurement can compare providers.
  2026-11-06, Mike King.
  Practitioner, one-off. - [Speaker Deck](https://speakerdeck.com/ipullrank/seos-don-t-actually-do-marketing-and-it-shows-mike-king)

### Inferences

- The wishes describe a work order with evidence, not a dashboard.
  A buyer wants to see the raw answer, the competitor that won, the source that shaped the answer, the fix, and a re-run that shows whether the fix worked.
- Auditability is the cheapest wish to meet and the one existing vendors most visibly decline, given the complaints that vendors dodge questions on prompts and run counts.
- Willingness to pay shows up only indirectly, through renewal rules and the prices people already pay ($95 to $499 per month for tools, $2,500 per month for an agency).
  The one post that asked whether anyone would pay for a GEO analysis tool (2026-06-23) drew a single comment. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1udcron/)

### Gaps

- No explicit statement of the form I would pay a given amount for a given feature turned up.
- Several wish posts had their bodies removed, so only titles survive.
- Many wish-list statements come from people building their own tool, who have a reason to describe the gap their product fills.

## 5. How complaints differ by segment

### Takeaway

Enterprise teams complain about data overload, integration and the lack of a comparable standard, agencies complain that they cannot defend a number to a client, SaaS founders complain about price and missing lead attribution and often build their own, and local businesses are priced out of tools and exposed to urgency-driven agency pitches.
E-commerce-specific evidence is thin.

### Cited Findings

#### In-house enterprise teams

- A director at a 1,001 to 5,000 person company found Profound's data volume overwhelming and wanted more guidance (TrustRadius, 2026).
  Relayed by vendor. - [AirOps](https://www.airops.com/blog/profound-reviews)
- A large-university marketer said branded prompt tracking is useless for a large brand (2026-10-14).
  Practitioner. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1x5i3kq/)
- VML's discoverability lead tracks about 17 tools and finds many give only a point-in-time reading (2026-05-01).
  WPP Media's SEO lead gets pitched by GEO vendors about daily (2026-03-05).
  Trade press. - [Digiday](https://digiday.com/marketing/marketers-question-expensive-ai-visibility-tools-as-inconsistent-results-fuel-skepticism/) and [Digiday](https://digiday.com/media/media-briefing-as-ai-search-grows-a-cottage-industry-of-geo-vendors-is-booming)
- Enterprise buyers ask what a credible agency should do and which services are padding (2026-08 and 2026-09).
  Practitioners. - [Reddit r/aeo](https://www.reddit.com/r/aeo/comments/1wftid0/)
- 26 percent of 300 enterprise leaders name journey tracking as the top practical challenge (Branch, 2026).
  Vendor survey, search snippet only. - [Branch](https://branch.io/resources/blog/ai-search-in-2026-key-findings-from-300-enterprise-leaders)

#### Agencies

- Three tools give three answers for the same prompts (2026-05-01, /prompt).
  The tools only benchmark (2026-05-01, Markacy).
  Trade press. - [Digiday](https://digiday.com/marketing/marketers-question-expensive-ai-visibility-tools-as-inconsistent-results-fuel-skepticism/)
- An agency writer warned against showing clients a single visibility percentage as an accurate measure, after Semrush suggested irrelevant prompts for a client (2026-08-11).
  Practitioner. - [Browser Media](https://browsermedia.agency/blog/why-measuring-ai-visibility-is-mostly-bs/)
- Agency staff ask whether to send a tool's report as it is or rebuild it, and which tool suits white-labeling (2026-08-04).
  Practitioner. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1vfhh6u/)
- An agency using Profound for clients does not rely on its prompt-volume data and rotates hundreds of its own topic prompts (2026-07-28).
  Practitioner (agency). - [Reddit r/aeo](https://www.reddit.com/r/aeo/comments/1v1pmg6/any_profound_users/)
- An agency lead advised resetting stakeholder expectations and retiring the growth-chart ROI dashboard for AI tracking (2026-06-19).
  Practitioner. - [Search Engine Journal](https://www.searchenginejournal.com/we-need-to-change-our-approach-to-ai-prompt-tracking/579646/)
- Clients keep asking agencies whether they show up in AI answers (2026-09-17).
  Practitioner. - [Reddit r/bigseo](https://www.reddit.com/r/bigseo/comments/1winl8l/)

#### SaaS founders and startup marketers

- A B2B SaaS consultant got three scores from three trackers and built an open-source tool that costs cents per run (2026-04-27).
  Vendor (consultant). - [DEV Community](https://dev.to/alexisa/free-open-source-aeo-tracker-our-real-score-was-33100-258i)
- A SaaS content marketer tried 20+ tools, paid for none and considered building one (2026-07-03).
  Practitioner. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1umrd01/)
- A B2B SaaS team could not define success for an agency engagement at 3 or 6 months (2026-11-04).
  Practitioner. - [Reddit r/aeo](https://www.reddit.com/r/aeo/comments/1xnlaf8/)
- A r/GrowthHacking team found Profound very expensive, though their CEO approved it (2026-01-14).
  Relayed by vendor. - [AirOps](https://www.airops.com/blog/profound-reviews)

#### Local and small businesses

- A solo expert business received a four-figure GEO pitch built on urgency that was mostly SEO (2026-09-18).
  Practitioner. - [Substack, Anneloes Zuiderveen](https://anneloeszuiderveen.substack.com/p/agencies-make-me-want-to-slam-my)
- A builder said tools that check whether AI names a local plumber cost $200+ per month, and sold a $2 scan instead (2026-06-21).
  Vendor. - [Reddit r/aeo](https://www.reddit.com/r/aeo/comments/1uc10ax/)
- A poster asked how to test GEO for a local business without paying for a tool (2026-10-27).
  A Philippine small-business poster asked whether GEO is useful or just SEO renamed (2026-10-11).
  Practitioners, no replies. - [Reddit r/GEO_optimization](https://www.reddit.com/r/GEO_optimization/comments/1xgywr6/) and [Reddit r/bigseo](https://www.reddit.com/r/bigseo/comments/1x327vb/)
- A franchise CMO warned franchisors against $2,000 retainers and generalist agencies without franchise experience (2026-05-14).
  Opinion. - [Franchise Marketer](https://www.franchisemarketer.co/p/aeo-geo-agencies-are-the-new-seo-scam)
- 56.0 percent of small and mid-size businesses cite measuring ROI as a challenge (eMarketer, 2026).
  Search snippet only. - [eMarketer](https://www.emarketer.com/content/smbs-recognize-ai-search-visibility-critical-struggle-measure-impact)

#### E-commerce and consumer brands

- The founder of the consumer brand Flex said AI visibility is opaque compared with Google ranking, and the company is building internal tools to cut cost (2026-05-01).
  Trade press. - [Digiday](https://digiday.com/marketing/marketers-question-expensive-ai-visibility-tools-as-inconsistent-results-fuel-skepticism/)
- Ann Smarty, writing for an e-commerce audience, called visibility scores useless and told merchants to study the most cited domains and competitor citations (2026-07-06).
  Practitioner. - [Practical Ecommerce](https://www.practicalecommerce.com/ai-visibility-scores-are-useless)
- Lily Ray cited Search Engine Land data that 83 percent of ChatGPT's carousel products come from Google Shopping, which places product visibility in the shopping feed and outside prompt tracking (2026-03-18).
  Practitioner citing trade press. - [Lily Ray on Substack](https://lilyraynyc.substack.com/p/your-geo-strategy-might-be-destroying)

### Inferences

- The same distrust of the number shows up in every segment, but the consequence differs.
  Enterprises keep paying and add tools (17 at VML), agencies rebuild or caveat the report, founders build their own, and local businesses do nothing or get sold a package.
- Agencies carry a second-order problem that other segments do not.
  They must explain a volatile number to a client who is asking a yes or no question about showing up in ChatGPT.
- Local business is the least served segment on price and method.
  Per-location, near-me style checks are sold either as $200+ per month subscriptions or as one-off scans by solo builders.
- For e-commerce the complaint may be scope more than accuracy, since product results draw on shopping feeds that prompt trackers do not cover.
  This rests on one data point.

### Gaps

- I found no first-person e-commerce merchant complaint about a named tracker.
- r/smallbusiness, r/Entrepreneur, r/marketing and r/SaaS searches failed in the archive (HTTP 422), so small-business and founder voices are under-sampled.
- Segment labels are often inferred from context, since most Reddit commenters do not state their role.

## 6. What respected independent practitioners say about the category

### Takeaway

The named practitioners agree that AI visibility can be measured only as a frequency over repeated samples, that rank positions and single scores are not credible, and that much of what is sold as GEO is SEO, with some tactics doing harm.
None of them says tracking is worthless, and several have commercial ties that should be weighed.
I found nothing recent and direct from Aleyda Solis or Glenn Gabe on tool reliability.

### Cited Findings

- Rand Fishkin, SparkToro, 2026-01-30.
  He called rank-position-in-AI metrics misleading and dismissed tools that sell them.
  He said how often a brand appears across many runs is a steadier measure, and that his starting hypothesis had been that AI tracking would prove pointless.
  Brands such as Bose, Sony, Sennheiser and Apple appeared in 55 to 77 percent of 994 headphone responses.
  Disclosed conflict through Gumshoe.ai, and the study is not peer reviewed. - [Search Engine Journal](https://www.searchenginejournal.com/ai-recommendations-change-with-nearly-every-query-sparktoro/566242/)
- Mike King, iPullRank, 2026-11-06 deck.
  "There is no accuracy in AI Search tracking, only precision."
  He said a visibility claim without repeated sampling over time is an anecdote, that prompt volumes are modeled and directional, and that grading AI search by traffic is a category error because it is a branding channel.
  He also said the industry has no standards and relabeled tools, which lets other disciplines take the budget.
  Agency founder. - [Speaker Deck](https://speakerdeck.com/ipullrank/seos-don-t-actually-do-marketing-and-it-shows-mike-king)
- Kevin Indig, Growth Memo, 2026-06-08.
  His position is that AI visibility is measurable and the mistake is running it like a rank tracker.
  The body is paywalled.
  A secondary digest says he recommends repeated samples, segmented panels and confidence intervals.
  Digiday credited him with the figure that investors put $227 million into AI visibility tracking. - [Growth Memo](https://www.growth-memo.com/p/how-to-make-prompt-tracking-much) and [Digiday](https://digiday.com/media/media-briefing-as-ai-search-grows-a-cottage-industry-of-geo-vendors-is-booming)
- Lily Ray, Amsive, 2026-03-18 and 2026-03-05.
  She documented roughly 30 GEO success stories that later declined and argued that vendors sell correlation as causation.
  She named six risky practices: scaled AI content, cosmetic date refreshes, self-promotional listicles, hidden-prompt summarize buttons, mass alternatives and versus pages, and SEO relabeled as GEO.
  She did not review tracking tools directly. - [Lily Ray on Substack](https://lilyraynyc.substack.com/p/your-geo-strategy-might-be-destroying)
- Dan Taylor, 10 Spurs, 2026-04-30 and 2026-06-19.
  He argued that trackers can pollute a brand's own analytics and that reporting should move to volatility and average response across related prompts. - [Search Engine Journal](https://www.searchenginejournal.com/your-ai-visibility-tracker-is-quietly-breaking-your-analytics/573000/) and [Search Engine Journal](https://www.searchenginejournal.com/we-need-to-change-our-approach-to-ai-prompt-tracking/579646/)
- Ann Smarty, 2026-07-06.
  She called AI visibility scores useless because they depend on the chosen prompts and can be inflated with branded prompts. - [Practical Ecommerce](https://www.practicalecommerce.com/ai-visibility-scores-are-useless)
- Heather Physioc, VML, 2026-07-27.
  She said owned, earned, social, user-generated and commerce channels all shape AI answers, and that nobody can honestly promise results. - [Digiday](https://digiday.com/marketing/mythbusters-ai-visibilitys-biggest-misconceptions/)
- Tim Soulo, Ahrefs, 2025-08-20.
  He said trackers cannot see real prompts and rely on synthetic ones, and pointed to Nathan Gotch's video arguing that AI rank trackers mislead.
  Vendor. - [The Keyword](https://www.thekeyword.co/news/ai-search-tracking-tools-unreliable-for-chatgpt-perplexity-and-gemini-data)
- Benjamin Houy, Lorelight founder, 2025-10-31.
  He closed his tracker and said standalone tracking did not need to exist.
  Search snippet only. - [Search Engine Land](https://searchengineland.com/geo-startup-lorelight-shuts-down-464208)

### Inferences

- The practitioner view moved during 2026 from doubting the category to specifying what honest measurement requires.
  Fishkin's January study set the terms, and Indig in June and King in November turned it into a method: repeated samples, panels, intervals, and precision over accuracy.
- That method is also the buyers' wish list from question 4, so the gap between what experts say tools should report and what buyers say tools do report is specific and nameable.
- The critics are not neutral.
  Fishkin co-authored with a tracking vendor, Soulo sells Brand Radar, King and Ray run or work for agencies that sell this work.
  Their criticism of rivals' methods is credible mainly where it also constrains their own products.

### Gaps

- Aleyda Solis: I found no direct statement on tool reliability.
  A search result referred to her April 2026 framework on AI search success metrics, but I could not read it.
- Glenn Gabe: searches returned nothing attributable to him on tracking tools.
- LinkedIn and X posts by these practitioners were not reachable, so the record relies on newsletters, decks and trade coverage.
- Kevin Indig's full argument and numbers are behind a paywall.
