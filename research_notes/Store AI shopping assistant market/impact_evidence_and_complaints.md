# Impact evidence and complaints: on-site AI shopping assistants for online stores (state as of November 2026)

Reading notes for the report writer.
All research was done on 23 November 2026.
Every figure carries a source-type label: independent study, independent survey, vendor claim, vendor-sponsored survey, press report, app store review, or forum post.
"Search snippet only" means the page itself could not be opened and the figure comes from a search result summary, so treat it as unverified.
Merchant complaints are paraphrased with source and date, and only one short verbatim quote is used in the whole file.
Store names and reviewer names are left out on purpose.
Reddit could not be read at all (see the gaps under question 3).

## 1. What independent or controlled evidence exists on conversion rate, average order value, ticket deflection and return rates?

### Takeaway
One peer-reviewed randomized experiment exists, on a very large marketplace: a pre-sale GenAI chatbot raised conversion by 21.7% and sales by 16.3% among shoppers who had already sent a question, compared with shoppers who got a service-unavailable notice, with no gain in basket size and no change in returns.
Everything else found for on-site assistants is vendor attribution on self-selected shoppers, and no controlled result for small independent stores was found.

### Cited Findings

#### Controlled tests with a randomized control group
- Fang, Yuan, Zhang, Donati and Sarvary ran seven randomized field experiments between September 2023 and June 2024 on an unnamed leading cross-border e-commerce platform, published in Management Science in 2026 (independent study) - [arXiv 2510.12049v5](https://arxiv.org/html/2510.12049v5); [Management Science DOI page](https://pubsonline.informs.org/doi/10.1287/mnsc.2026.00623).
- The pre-sale chatbot experiment ran in September and October 2023 on 44,614 consumers who had sent a pre-sale service request about the platform's own self-sold products (independent study) - [arXiv 2510.12049v5](https://arxiv.org/html/2510.12049v5).
- The control group received an automated notice that customer service was unavailable, and about two-thirds of the sample got the GenAI chatbot (independent study) - [arXiv 2510.12049v5](https://arxiv.org/html/2510.12049v5).
- Sales rose by $0.274 per consumer, a 16.3% increase with p below 0.01 (independent study) - [arXiv 2510.12049v5](https://arxiv.org/html/2510.12049v5).
- Conversion rose by 1.31 percentage points, a 21.7% relative increase with p below 0.01 (independent study) - [arXiv 2510.12049v5](https://arxiv.org/html/2510.12049v5).
- Cart value moved by minus $1.26 (minus 4.5%) and the change was not statistically significant (independent study) - [arXiv 2510.12049v5](https://arxiv.org/html/2510.12049v5).
- No significant change in return rates was reported for the chatbot workflow, and customer ratings rose 4.5% at p below 0.10 (independent study) - [arXiv 2510.12049v5](https://arxiv.org/html/2510.12049v5).
- Combining the chatbot with human escalation raised sales 25% over no pre-sale service, and the authors estimate a conservative 11.5% gain over human-only service at p below 0.10 (independent study) - [arXiv 2510.12049v5](https://arxiv.org/html/2510.12049v5).
- The paper does not report what share of treated consumers actually used the chatbot, and treats assignment as exposure because everyone in the sample had already asked a question (independent study) - [arXiv 2510.12049v5](https://arxiv.org/html/2510.12049v5).
- The chatbot experiment has no seller-level analysis because it covers platform-sold products, and across the other experiments the larger point estimates for smaller and newer sellers are described as imprecise (independent study) - [arXiv 2510.12049v5](https://arxiv.org/html/2510.12049v5).
- Across all seven workflows the sales effects ranged from no detectable effect to 16.3%, and the gains came mainly through conversion rather than larger carts (independent study) - [Management Science DOI page](https://pubsonline.informs.org/doi/10.1287/mnsc.2026.00623).
- Other arms of the same study: search query refinement raised sales 2.9%, AI product descriptions raised sales 2.1% and cut returns 3.9%, an AI push message had no significant sales effect, and AI Google ad titles had a negative but non-significant effect of minus 4.5% (independent study) - [arXiv 2510.12049v5](https://arxiv.org/html/2510.12049v5).
- A Tidio report dated 29 September 2026 summarizes an Etsy experiment on AI-driven recommendations that found a conversion change of plus 0.22% that was not statistically significant, recommendation clicks up 28.3%, GMV down 0.25% (not significant) and organic-search clicks down 1.4% (significant) (vendor report summarizing a controlled experiment, original Etsy source not located) - [MarTech Edge coverage of the Tidio report](https://martechedge.com/news/lyro-report-examines-the-rise-of-ai-shopping-assistants).
- Ni and co-authors ran a randomized experiment in Alibaba after-sales chat where human agents got a GenAI assistant, and found faster service and better customer ratings but no significant effect on customer retrial rates, with top-performing agents getting worse (independent study, arXiv February 2026, revised July 2026) - [arXiv 2603.29888](https://arxiv.org/abs/2603.29888).
- Zhang and Narayandas studied 138 service agents and 256,934 chats at a meal delivery company from December 2020 to November 2021 and found agents with AI reply suggestions answered about 20% faster, but no purchase or conversion outcome was found in the summaries read (independent study, older data) - [Harvard Business School summary](https://www.library.hbs.edu/working-knowledge/when-ai-chatbots-help-people-be-more-human); [Management Science reference page](https://pubsonline.informs.org/doi/references/10.1287/mnsc.2022.03920).
- A randomized experiment on an AI assistant for livestream selling reported sales up 3.00% and product return rates down 12.55%, which is a different setting from a store chat widget (independent study, search snippet only, link not verified against the paper) - [University of Miami repository entry](https://scholarship.miami.edu/esploro/outputs/journalArticle/Artificial-Intelligence-AI-Assistant-in-Online/991032797063602976).

#### Vendor attribution and company disclosures (no control group)
- Gorgias reports that its Shopping Assistant influences 1.9% of web GMV on enabled accounts, rising to about 3 to 4% in considered-purchase categories (vendor claim, 9 June 2026, last 31 days of data) - [Gorgias research](https://www.gorgias.com/research/ai-shopping-assistants-are-now-officially-influencing-sales).
- Gorgias counts an order as influenced when the shopper talked to the assistant within three days before a web purchase (vendor claim) - [Gorgias research](https://www.gorgias.com/research/ai-shopping-assistants-are-now-officially-influencing-sales).
- About 80% of that influenced GMV rests on the weakest signal (a conversation happened before the order), about 18% on the assistant having suggested a product that was in the order, and about 2% on in-chat actions such as add to cart (vendor claim) - [Gorgias research](https://www.gorgias.com/research/ai-shopping-assistants-are-now-officially-influencing-sales).
- About 14% of Gorgias assistant sales conversations led to at least one attributed web order, and influenced orders averaged $181 against $123 for other web orders in the same stores, a 47% gap (vendor claim) - [Gorgias research](https://www.gorgias.com/research/ai-shopping-assistants-are-now-officially-influencing-sales).
- The Gorgias report itself calls its figures associative attribution and not proof of cause, because higher-intent shoppers choose to use the assistant (vendor's own caveat) - [Gorgias research](https://www.gorgias.com/research/ai-shopping-assistants-are-now-officially-influencing-sales).
- Gorgias does not report the number of brands, the number of orders, or the share of sessions that engage the assistant (vendor report limitation) - [Gorgias research](https://www.gorgias.com/research/ai-shopping-assistants-are-now-officially-influencing-sales).
- Amazon said on its Q3 2025 earnings call that Rufus users are about 60% more likely to complete a purchase, and tied the assistant to about $10 billion and later nearly $12 billion of incremental annualized sales, without publishing the method (vendor claim via press report, November 2025 and later) - [Fortune](https://fortune.com/2025/11/02/amazon-rufus-ai-shopping-assistant-chatbot-10-billion-sales-monetization/); [PPC Land](https://ppc.land/rufus-shows-5-products-not-50-what-brands-must-know-about-amazons-ai-filter/).
- Commentary on the Rufus claim argues that heavy Amazon shoppers would both use Rufus and convert anyway, and that a Rufus session was defined as any session with even brief interaction (press and podcast commentary, search snippet only) - [Retail Media Breakfast Club podcast notes](https://share.transistor.fm/s/b88bb29f).
- Walmart reports that Sparky users have roughly 35% higher order value than non-users (company-reported, cited in a vendor report) - [MarTech Edge coverage of the Tidio report](https://martechedge.com/news/lyro-report-examines-the-rise-of-ai-shopping-assistants).
- Frasers Group reported a conversion lift of up to 25% versus traditional search journeys for its assistant, and Kingfisher said engaged customers sometimes convert at more than double the rate, with no test design described in either case (press report, 21 April 2026) - [Retail Systems](https://www.retail-systems.com/rs/Do_AI_Shopping_Assistants_Really_Lift_Conversion.php).
- Rep AI says it holds back a share of sessions for A/B measurement but publishes neither the holdout size nor results, and its attribution counts a same-session sale that its own AI judges the chat helped (competitor vendor's review of Rep AI, edited 11 November 2026) - [eesel AI review of Rep AI](https://www.eesel.ai/blog/rep-ai-review).
- Rep AI advertises a 5x ROI money-back guarantee for which the reviewer could find no written terms (competitor vendor's review, November 2026) - [eesel AI review of Rep AI](https://www.eesel.ai/blog/rep-ai-review).
- Alhena cites a 38% order value uplift for one beauty brand, measured as AI-engaged shoppers against the site average with a 24-hour first-touch window, which is not a holdout comparison (vendor claim, April 2026) - [Alhena holdout blog](https://alhena.ai/blog/measure-incremental-revenue-ai-holdout-test/).
- A Shopify app vendor blog repeats compiled vendor figures of 12.3% conversion for chat-engaged shoppers against 3.1% for others and a 67% average sales increase (vendor claim, unverified, search snippet only) - [MooseDesk blog](https://moosedesk.com/blog/how-ai-chatbots-drive-sales-shopify).
- Smartsupp data on 175,438 accounts in 2024 shows stores with a chatbot handled 89.2% of inquiries against 71.2% without, a comparison with no control for store size or traffic (vendor data, observational) - [Smartsupp](https://www.smartsupp.com/blog/analysing-5-billion-website-visits-how-ecommerce-customers-use-chat/).

#### Whether any on-site assistant has a published holdout result
- An Alhena blog statement surfaced in search says that as of July 2026 no brand and no vendor, itself included, had published a completed holdout or randomized test of the incremental revenue from an on-site AI shopping agent (vendor claim, search snippet only, exact wording not confirmed on the page that was opened) - [Alhena wellness ROI blog](https://alhena.ai/blog/ai-roi-health-wellness-ecommerce/).
- My own searches for a published holdout from Rufus, Shopify, Gorgias, Rep AI, Tidio or Alhena found none, only methodology guides and attribution figures (own search result, 23 November 2026) - [Alhena holdout blog](https://alhena.ai/blog/measure-incremental-revenue-ai-holdout-test/).
- Tidio's own statistics page says few neutral studies publish a live chat conversion lift or ROI figure and that the percentages in circulation trace back to vendor blogs or vendor-sponsored studies (vendor's own caveat, search snippet only) - [Tidio live chat statistics](https://www.tidio.com/blog/live-chat-statistics).
- Consultants quoted in trade press say early adopters of a new interface are more motivated shoppers, that headline gains are relative lifts on a low baseline, and that assistants often launch alongside other changes such as discounting (press report, 21 April 2026) - [Retail Systems](https://www.retail-systems.com/rs/Do_AI_Shopping_Assistants_Really_Lift_Conversion.php).
- The same article says impact is strongest in high-consideration categories such as fashion, electronics and technical products and smaller in habitual grocery shopping (press report, April 2026) - [Retail Systems](https://www.retail-systems.com/rs/Do_AI_Shopping_Assistants_Really_Lift_Conversion.php).

#### Ticket deflection and resolution
- A benchmark by the vendor Aissist reports a verified median AI resolution rate of 41%, which coverage frames as below vendor marketing claims (vendor claim, 2026) - [Aissist benchmark](https://aissist.io/industries/ai-customer-service-benchmark); [coverage](https://completeaitraining.com/news/aissistio-benchmark-finds-verified-ai-customer-service/).
- Intercom's Fin cites 60% to 80% resolution for mature deployments, Comm100 reports a 75.3% AI chat handling rate (handling, not resolution), and Richpanel gives 50% to 80% (vendor claims, 2026, search snippet only) - [Fin glossary](https://fin.ai/learn/ai-resolution-rate); [Comm100](https://www.comm100.com/blog/what-percentage-of-chats-can-ai-chatbots-resolve); [Richpanel](https://www.richpanel.com/learn/ai-resolution-rate-benchmark-2026).
- Fin's glossary notes that a customer who gives up after a frustrating chatbot exchange counts as deflected, and Richpanel says most quoted resolution rates are marketing figures with no stated denominator (vendor statements, search snippet only) - [Fin glossary](https://fin.ai/learn/ai-resolution-rate); [Richpanel](https://www.richpanel.com/learn/ai-resolution-rate-benchmark-2026).
- A Gartner survey of 497 customers fielded December 2022 to February 2023 found chatbot resolution rates ranged from 52% for order and purchase issues to 17% for billing disputes (independent survey via press report, June 2023, predates most LLM assistants) - [CX Today](https://www.cxtoday.com/customer-analytics-intelligence/customer_chatbot_usage_sit_at_8_gartner_reveals/).
- Operator case studies in the Tidio report cite one retailer resolving 73% of conversations without humans and another moving from 42% to 69% after intent-based routing (vendor case studies) - [MarTech Edge coverage of the Tidio report](https://martechedge.com/news/lyro-report-examines-the-rise-of-ai-shopping-assistants).
- An NBC Chicago consumer report states that no specific studies measure the accuracy of AI customer service chatbots (press report, 16 September 2026) - [NBC Chicago](https://www.nbcchicago.com/consumer/ai-chatbots-are-taking-over-customer-service-but-how-often-are-they-wrong/3989958/).

#### Return rates
- In the controlled marketplace study the chatbot did not change return rates, AI product descriptions cut returns 3.9% and AI push messages cut returns 11.4% (independent study) - [arXiv 2510.12049v5](https://arxiv.org/html/2510.12049v5).
- Gorgias says refund rates on assistant-assisted orders may be higher, calls this a theory, and has not quantified it because refund status is not in its attribution pipeline (vendor's own caveat, June 2026) - [Gorgias research](https://www.gorgias.com/research/ai-shopping-assistants-are-now-officially-influencing-sales).

### Inferences
- The one clean causal estimate applies only to shoppers who had already asked a pre-sale question, and it compares an instant AI answer with no answer at all.
- It therefore measures the value of answering pre-sale questions at once, not the value of showing a chat widget to every visitor.
- For a small store that already answers chat or email within a few hours, the fairer comparison is the human-only arm, where the gain was about 11.5% and only weakly significant.
- In the controlled data the gain comes through conversion and basket size does not move, so the vendor claims of 35% to 47% higher order value most likely reflect which shoppers choose to chat.
- Three years into LLM assistants, no vendor has published a holdout result, which suggests either small sitewide effects or no commercial reason to measure them.
- Honest, built-in holdout measurement is an open position that no leading vendor occupies in public.

### Gaps
- No controlled test on a small independent store was found.
- No independent audit of deflection or resolution rates was found, and every rate above comes from a vendor or an operator.
- The primary source for the Etsy experiment was not located.
- Forrester and Gartner research on this question sits behind paywalls and was not read.
- No controlled evidence links a store chat assistant to lower or higher return rates outside the one marketplace study.

## 2. What share of store visitors open or engage with an on-site assistant?

### Takeaway
The largest dataset found puts chat conversations at under 1% of website visits, and vendors claim 5% or more only with proactive prompts and extra placements.
No neutral benchmark exists, and vendors define engagement differently.

### Cited Findings
- Smartsupp counted 40,085,914 chat conversations against 4,781,933,240 website visits across 175,438 accounts in 2024, which it reports as 0.84% of customers using live chat (vendor data, page updated 7 September 2026) - [Smartsupp](https://www.smartsupp.com/blog/analysing-5-billion-website-visits-how-ecommerce-customers-use-chat/).
- Only 28,890,773 of those conversations had a chatbot or operator interaction, which is about 0.60% of visits (my arithmetic on vendor data) - [Smartsupp](https://www.smartsupp.com/blog/analysing-5-billion-website-visits-how-ecommerce-customers-use-chat/).
- Smartsupp accounts with a chatbot averaged about 444 conversations a month against about 75 without, a comparison not controlled for store size (vendor data, observational) - [Smartsupp](https://www.smartsupp.com/blog/analysing-5-billion-website-visits-how-ecommerce-customers-use-chat/).
- Alhena says a floating widget alone gets roughly 1% engagement while brands using three surfaces see 6% or more, and separately says passive widgets reach roughly 5% of traffic against 45% for proactive ones (vendor claims from own data, internally inconsistent, search snippet only) - [Alhena widget design blog](https://alhena.ai/blog/chat-widget-design-ecommerce-conversions/).
- eDesk claims proactive chat invitations raise engagement by 30% to 50% in relative terms (vendor claim, search snippet only) - [eDesk](https://www.edesk.com/blog/ecommerce-live-chat/).
- Gartner found that 49% of customers said they would have used a chatbot if one had been offered, but only 7% used a chatbot or digital assistant in their most recent service interaction (independent survey, 3,566 customers, February and March 2026, search snippet only) - [Gartner press release, 2 September 2026](https://www.gartner.com/en/newsroom/press-releases/2026-09-02-gartner-finds-only-27-percent-of-customers-would-try-a-chatbot-again-after-a-negative-experience).
- The equivalent Gartner figure in early 2023 was 8%, and Gartner says use of company chatbots has been statistically flat since 2022 (independent survey via press reports) - [CX Today, June 2023](https://www.cxtoday.com/customer-analytics-intelligence/customer_chatbot_usage_sit_at_8_gartner_reveals/); [Gartner press release, 8 July 2026](https://www.gartner.com/en/newsroom/press-releases/2026-07-08-gartner-survey-finds-customers-are-three-times-more-likely-to-use-third-party-genai-than-company-provided-chatbots-for-customer-service).
- A Bizrate Insights and eMarketer survey in August 2026 found 47.1% of US digital shoppers have not used a retail AI chatbot and are not interested, and another 22.2% are curious but have not tried one (independent survey, search snippet only, page blocked) - [eMarketer](https://www.emarketer.com/content/shoppers-giving-retail-chatbots-cold-shoulder).
- Gorgias does not publish the share of sessions that open its assistant, only that 1.9% of web GMV is influenced and 14% of sales conversations end in an attributed order (vendor claim, June 2026) - [Gorgias research](https://www.gorgias.com/research/ai-shopping-assistants-are-now-officially-influencing-sales).
- Rep AI prices by monthly website sessions rather than by chats, so merchants pay for sessions in which no chat happens (competitor vendor's review, November 2026) - [eesel AI review of Rep AI](https://www.eesel.ai/blog/rep-ai-review).
- A Zipchat merchant on a plan of about $500 a month reported few engagements and said the vendor blamed the store's traffic when a refund was requested (app store review, 21 March 2024) - [Zipchat reviews](https://apps.shopify.com/zipchat/reviews?ratings%5B%5D=1&ratings%5B%5D=2&ratings%5B%5D=3).
- Amazon says more than 300 million customers used its assistant in 2025 but gives no share of visits (vendor claim cited in a vendor report) - [MarTech Edge coverage of the Tidio report](https://martechedge.com/news/lyro-report-examines-the-rise-of-ai-shopping-assistants).

### Inferences
- A sound planning figure for a passive widget on a small store is 0.5% to 1% of sessions producing a real conversation.
- Rates of 3% to 6% are vendor-claimed upper values that depend on proactive pop-ups and on-page placements, and they count opens more loosely.
- The Bizrate and Gartner figures together suggest that most shoppers never touch a store chatbot even when one is offered.
- Low engagement, more than answer quality, caps the revenue a small store can get from an assistant.

### Gaps
- No vendor-neutral measurement of chat open rate by store size was found.
- Sources mix opened widget, sent a message and had a conversation, so the figures are not directly comparable.
- No data separates AI assistant engagement from older live chat engagement on the same stores.

## 3. What do merchants complain about, and why do they uninstall?

### Takeaway
Across 1 to 3 star reviews of six leading Shopify assistants, the recurring complaints are confident wrong answers that corrections do not fix, usage-based bills and price rises that surprise, weak support, daily upkeep, and widget or code problems on the storefront.
Doubts about attribution appear but are rare in reviews, and merchants who uninstall mostly cite customers being put off by answers, cost against low engagement, or bugs.

### Cited Findings

#### Rating context (app store pages read 23 November 2026)
- Tidio holds 4.8 from 1,358 Shopify reviews with 73 one and two star reviews (app store data) - [Tidio reviews](https://apps.shopify.com/tidio-chat/reviews?ratings%5B%5D=1&ratings%5B%5D=2).
- Shopify Inbox holds 4.6 from 5,828 ratings (app store data) - [Shopify Inbox reviews](https://apps.shopify.com/inbox/reviews?ratings%5B%5D=1&ratings%5B%5D=2).
- Gorgias holds 4.3 from 709 reviews with 84 one and two star reviews, the weakest of the six (app store data) - [Gorgias reviews](https://apps.shopify.com/helpdesk/reviews?ratings%5B%5D=1&ratings%5B%5D=2).
- Chatty holds 4.9 from 1,892 reviews with 26 reviews of three stars or fewer (app store data) - [Chatty reviews](https://apps.shopify.com/chatty/reviews?ratings%5B%5D=1&ratings%5B%5D=2&ratings%5B%5D=3).
- Zipchat holds 4.9 from 211 reviews with 8 low reviews, and Rep AI holds 4.6 from 129 reviews with 7 low reviews (app store data) - [Zipchat reviews](https://apps.shopify.com/zipchat/reviews?ratings%5B%5D=1&ratings%5B%5D=2&ratings%5B%5D=3); [Rep AI reviews](https://apps.shopify.com/rep-ai-sales-associate/reviews?ratings%5B%5D=1&ratings%5B%5D=2&ratings%5B%5D=3).
- Tidio's Trustpilot score is 3.5 from 225 reviews with 25% at one star, far below its Shopify rating (review site data) - [Trustpilot, Tidio](https://www.trustpilot.com/review/tidio.com?stars=1&stars=2).

#### Wrong or confident but off-target answers
- A US merchant who used Rep AI for six months described "Lots of confident-sounding answers that often don't actually address the question" and uninstalled because customers were frustrated (app store review, 27 January 2026) - [Rep AI reviews](https://apps.shopify.com/rep-ai-sales-associate/reviews?ratings%5B%5D=1&ratings%5B%5D=2&ratings%5B%5D=3).
- An Australian merchant said after 12 days that the Rep AI bot guesses and often answers incorrectly (app store review, 26 May 2025) - [Rep AI reviews](https://apps.shopify.com/rep-ai-sales-associate/reviews?ratings%5B%5D=1&ratings%5B%5D=2&ratings%5B%5D=3).
- A US merchant said Tidio's AI gave a customer wrong order status and shipping information and that a custom order worth more than $400 was lost, and Tidio replied that the AI had read store data showing delivery (app store review, 31 October 2026) - [Tidio reviews](https://apps.shopify.com/tidio-chat/reviews?ratings%5B%5D=1&ratings%5B%5D=2).
- A German merchant cancelled Zipchat after three months, saying the AI's replies put off potential customers every day and that corrections did not stick (app store review, edited 22 March 2026) - [Zipchat reviews](https://apps.shopify.com/zipchat/reviews?ratings%5B%5D=1&ratings%5B%5D=2&ratings%5B%5D=3).
- A US merchant said Chatty's AI changed the exact returns link pasted into its answers (app store review, 10 February 2026) - [Chatty reviews](https://apps.shopify.com/chatty/reviews?ratings%5B%5D=1&ratings%5B%5D=2&ratings%5B%5D=3).
- A US merchant said Chatty's AI failed to find matching products for customer questions (app store review, 14 August 2025) - [Chatty reviews](https://apps.shopify.com/chatty/reviews?ratings%5B%5D=1&ratings%5B%5D=2&ratings%5B%5D=3).
- A US merchant could not get the Shopify Inbox AI to give the store address even after adding custom FAQs (app store review, 19 August 2026) - [Shopify Inbox reviews](https://apps.shopify.com/inbox/reviews?ratings%5B%5D=1&ratings%5B%5D=2).
- A Trustpilot reviewer said Tidio's AI agent repeatedly claimed to have created a ticket when it had not, and that there was no practical way to reach a person (review site, 1 September 2026) - [Trustpilot, Tidio](https://www.trustpilot.com/review/tidio.com?stars=1&stars=2).
- A Gorgias customer of almost six years said the vendor's AI bot only reports that a ticket was opened and never resolves the issue (app store review, 18 May 2026) - [Gorgias reviews](https://apps.shopify.com/helpdesk/reviews?ratings%5B%5D=1&ratings%5B%5D=2).
- A Shopify Community poster described confident order and product answers that came from an out-of-date cache of the store, and said the real cost was the cleanup of corrections, refunds and follow-up tickets (forum post, 5 October 2026) - [Shopify Community thread 692225](https://community.shopify.com/t/692225).

#### Pricing and billing surprises
- A US merchant said Chatty charges about $68 extra every month on top of the subscription, and the developer replied that the Pro plan includes 500 AI conversations with overage at $0.40 per conversation up to a set limit (app store review, 7 October 2026) - [Chatty reviews](https://apps.shopify.com/chatty/reviews?ratings%5B%5D=1&ratings%5B%5D=2&ratings%5B%5D=3).
- A US merchant said Chatty charged the full plan price although a free trial was advertised (app store review, 24 July 2026) - [Chatty reviews](https://apps.shopify.com/chatty/reviews?ratings%5B%5D=1&ratings%5B%5D=2&ratings%5B%5D=3).
- A Slovak merchant said the Gorgias AI costs $1.50 per conversation, which they found too unpredictable to switch on (app store review, 31 July 2026, price is the reviewer's figure and was not checked) - [Gorgias reviews](https://apps.shopify.com/helpdesk/reviews?ratings%5B%5D=1&ratings%5B%5D=2).
- An Australian merchant said Gorgias bills spam voicemail calls as voice tickets at $2.20 each once over the plan limit (app store review, edited 23 October 2026) - [Gorgias reviews](https://apps.shopify.com/helpdesk/reviews?ratings%5B%5D=1&ratings%5B%5D=2).
- A South African merchant described Tidio pricing as layered charges for flows, then chats, then customer service, and upgraded within a day (app store review, 21 July 2025) - [Tidio reviews](https://apps.shopify.com/tidio-chat/reviews?ratings%5B%5D=1&ratings%5B%5D=2).
- A US merchant said the Tidio bot stopped behaving as it did during the trial and that pricing and billing were unclear (app store review, 21 May 2026) - [Tidio reviews](https://apps.shopify.com/tidio-chat/reviews?ratings%5B%5D=1&ratings%5B%5D=2).
- A US merchant on an annual Rep AI plan said the service was shut off after eight months once a view limit was reached, with an upgrade prompt of about $500 a month (app store review, 25 February 2026) - [Rep AI reviews](https://apps.shopify.com/rep-ai-sales-associate/reviews?ratings%5B%5D=1&ratings%5B%5D=2&ratings%5B%5D=3).
- Seven Trustpilot reviews of Tidio from March 2025 to October 2026 describe price rises without notice, plan upgrades without consent or unexpected charges, including a US reviewer whose rate doubled (review site, 31 October 2025 and others) - [Trustpilot, Tidio](https://www.trustpilot.com/review/tidio.com?stars=1&stars=2).
- A vendor employee posting in the Shopify Community told merchants to check that pricing does not climb as the AI handles more conversations (forum post by a vendor, 13 November 2026) - [Shopify Community thread 629598](https://community.shopify.com/t/discussion-where-is-ai-customer-support-actually-failing-merchants-and-what-would-make-it-genuinely-useful/629598).

#### Doubts about attribution
- A US merchant doubted that a sale Rep AI counted after the trial had come through the app, and also said several training sessions were needed (app store review, 12 August 2024) - [Rep AI reviews](https://apps.shopify.com/rep-ai-sales-associate/reviews?ratings%5B%5D=1&ratings%5B%5D=2&ratings%5B%5D=3).
- No visible low-star review of Tidio, Chatty or Gorgias raised attribution as the complaint (app store pages, first page of low reviews only) - [Tidio reviews](https://apps.shopify.com/tidio-chat/reviews?ratings%5B%5D=1&ratings%5B%5D=2); [Chatty reviews](https://apps.shopify.com/chatty/reviews?ratings%5B%5D=1&ratings%5B%5D=2&ratings%5B%5D=3); [Gorgias reviews](https://apps.shopify.com/helpdesk/reviews?ratings%5B%5D=1&ratings%5B%5D=2).
- A vendor blog says only 25% of ecommerce teams use advanced analytics for chatbot attribution and that a chatbot can get credit for an order that an email reminder closed (vendor claim, unverified, search snippet only) - [Kandid blog](https://kandid.ai/blog/shopify-chatbot-conversion-rate-tracking-metrics-and-attribution/).

#### Setup effort and upkeep
- A German merchant said Chatty needed 20 to 30 minutes of error fixing every day and that support blamed the merchant (app store review, 28 August 2025) - [Chatty reviews](https://apps.shopify.com/chatty/reviews?ratings%5B%5D=1&ratings%5B%5D=2&ratings%5B%5D=3).
- G2 lists a typical implementation time of about one month for Rep AI (review site data via a competitor vendor's review, November 2026) - [eesel AI review of Rep AI](https://www.eesel.ai/blog/rep-ai-review).
- A US merchant said the Tidio site scanner stalled and pulled contacts and chats from the merchant's other website (app store review, 6 February 2026) - [Tidio reviews](https://apps.shopify.com/tidio-chat/reviews?ratings%5B%5D=1&ratings%5B%5D=2).
- A Spanish merchant was stuck at Zipchat setup for 27 days and called support slow and ineffective (app store review, 2 February 2026) - [Zipchat reviews](https://apps.shopify.com/zipchat/reviews?ratings%5B%5D=1&ratings%5B%5D=2&ratings%5B%5D=3).
- A Shopify Community tester said the Inbox AI agent does not work well without predefined answers (forum post, date not captured, search snippet only because the page returned an error) - [Shopify Community thread 651690](https://community.shopify.com/t/has-anyone-tested-the-shopify-inbox-ai-agent-yet/651690).
- A messaging vendor quoted in trade press says integration often takes two to three times longer than configuring the AI (press report quoting a vendor, April 2026) - [Retail Systems](https://www.retail-systems.com/rs/Do_AI_Shopping_Assistants_Really_Lift_Conversion.php).

#### Storefront conflicts, slowness and leftovers
- A US merchant said the Tidio widget overlaps the sticky add-to-cart button on mobile (app store review, 6 June 2026) - [Tidio reviews](https://apps.shopify.com/tidio-chat/reviews?ratings%5B%5D=1&ratings%5B%5D=2).
- A Slovenian merchant said Chatty slowed the whole site enough to hurt the shopping experience and uninstalled after six days (app store review, 26 November 2025) - [Chatty reviews](https://apps.shopify.com/chatty/reviews?ratings%5B%5D=1&ratings%5B%5D=2&ratings%5B%5D=3).
- A US merchant said the Chatty widget opened to a blank white screen (app store review, 10 November 2025) - [Chatty reviews](https://apps.shopify.com/chatty/reviews?ratings%5B%5D=1&ratings%5B%5D=2&ratings%5B%5D=3).
- Merchants reported that the widget or its code stayed on the theme after uninstalling Rep AI (9 July 2026) and Zipchat (26 April 2024) (app store reviews) - [Rep AI reviews](https://apps.shopify.com/rep-ai-sales-associate/reviews?ratings%5B%5D=1&ratings%5B%5D=2&ratings%5B%5D=3); [Zipchat reviews](https://apps.shopify.com/zipchat/reviews?ratings%5B%5D=1&ratings%5B%5D=2&ratings%5B%5D=3).
- A Canadian merchant said a Chatty outage cost a full day of customer support (app store review, 12 June 2026) - [Chatty reviews](https://apps.shopify.com/chatty/reviews?ratings%5B%5D=1&ratings%5B%5D=2&ratings%5B%5D=3).

#### Poor vendor support
- Support is the most common theme in visible low reviews of Gorgias, with six of ten citing no response, canned replies or slow resolution (app store reviews, May to October 2026) - [Gorgias reviews](https://apps.shopify.com/helpdesk/reviews?ratings%5B%5D=1&ratings%5B%5D=2).
- A Canadian merchant said Tidio onboarding staff stopped answering emails after the first meetings (app store review, 10 June 2026) - [Tidio reviews](https://apps.shopify.com/tidio-chat/reviews?ratings%5B%5D=1&ratings%5B%5D=2).
- A US merchant said Zipchat takes more than a week to respond to paying customers (app store review, 27 May 2026) - [Zipchat reviews](https://apps.shopify.com/zipchat/reviews?ratings%5B%5D=1&ratings%5B%5D=2&ratings%5B%5D=3).

#### Control, data access and forced changes
- A merchant of almost two years turned the Shopify Inbox AI off entirely, citing no human handover and no way to pinpoint feedback, and Shopify replied that the agent shows a connect-to-staff option after every message (app store review, 19 September 2026) - [Shopify Inbox reviews](https://apps.shopify.com/inbox/reviews?ratings%5B%5D=1&ratings%5B%5D=2).
- Five of the ten visible low reviews of Shopify Inbox from July and August 2026 object to a redesign that forces shoppers to sign in and removes email capture and visitor context, with merchants reporting fewer inquiries (app store reviews, 27 July to 14 August 2026) - [Shopify Inbox reviews](https://apps.shopify.com/inbox/reviews?ratings%5B%5D=1&ratings%5B%5D=2).
- A US merchant of over a year said Tidio does not allow export of customer questions and the store's answers (app store review, 13 July 2026) - [Tidio reviews](https://apps.shopify.com/tidio-chat/reviews?ratings%5B%5D=1&ratings%5B%5D=2).
- A US merchant of about two years said Zipchat is siloed, has no conversation export and gives bad suggestions from old training data (app store review, edited 3 November 2025) - [Zipchat reviews](https://apps.shopify.com/zipchat/reviews?ratings%5B%5D=1&ratings%5B%5D=2&ratings%5B%5D=3).
- A Shopify Community search summary reports an Inbox user saying the AI is unreliable and cannot be corrected or joined mid-chat when it answers wrong (forum post, search snippet only) - [Shopify Community thread 651690](https://community.shopify.com/t/has-anyone-tested-the-shopify-inbox-ai-agent-yet/651690).

#### Forum views on where AI support fails
- A thread opened by a Shopify developer on 28 May 2026 collected three views that AI support fails on invented policies and delivery promises, on refunds or reships promised without checks, and on a generic escalation reply that leaves customers feeling dismissed (forum posts, May to November 2026, one poster is a vendor employee and none is a confirmed merchant) - [Shopify Community thread 629598](https://community.shopify.com/t/discussion-where-is-ai-customer-support-actually-failing-merchants-and-what-would-make-it-genuinely-useful/629598).
- One poster in that thread argued that a single ungrounded reply costs more trust than dozens of deflected tickets gain (forum post, 24 June 2026) - [Shopify Community thread 629598](https://community.shopify.com/t/discussion-where-is-ai-customer-support-actually-failing-merchants-and-what-would-make-it-genuinely-useful/629598).

### Inferences
- Stated uninstall reasons fall into four groups: answers that annoy customers and cannot be corrected, cost that outruns visible results, bugs or slowdowns on the storefront, and vendor changes that remove control.
- Complaints about wrong answers concentrate on order status, policies, links and product matching, which are grounding and data freshness failures more than language failures.
- Usage pricing is a repeated source of anger whether it is metered per conversation, per session or per resolution.
- Attribution doubt shows up less often than expected in reviews, probably because merchants who doubt the numbers simply leave without writing a review.
- App store averages of 4.6 to 4.9 overstate satisfaction, as the gap between Tidio's 4.8 on Shopify and 3.5 on Trustpilot shows.
- Low reviews of the smaller apps are few (7 or 8 each), so themes there rest on a handful of merchants.

### Gaps
- Reddit r/shopify and r/ecommerce could not be read: the search tool cannot reach reddit.com, one archive API returned rate-limit errors twice and another rejected the query.
- G2 review pages were not opened, and only one G2 figure reached these notes through a third party.
- Only the first page of low reviews was read for each app, so counts of themes are samples and not totals.
- No data on uninstall rates or churn for these apps was found.
- Shopify Community thread 651690 returned an error when opened, so its content comes from search summaries only.

## 4. What do shoppers think of store chatbots in 2025 and 2026 surveys?

### Takeaway
Shoppers accept AI for product research and simple order questions but want a person when something has gone wrong or money is involved, and nearly nine in ten say access to a human is essential.
Trust is slipping year on year, falls steeply with age, and is far lower in the United States than in Latin America.

### Cited Findings

#### Use and willingness
- Gartner found 49% of customers would have used a chatbot if offered but only 7% did in their latest service interaction, and only 27% would try a chatbot again after a bad experience (independent survey, 3,566 B2B and B2C customers, February and March 2026, search snippet only) - [Gartner press release, 2 September 2026](https://www.gartner.com/en/newsroom/press-releases/2026-09-02-gartner-finds-only-27-percent-of-customers-would-try-a-chatbot-again-after-a-negative-experience).
- Gartner found customers about three times as likely to use a third-party GenAI tool as a company-provided chatbot in their latest service interaction, with third-party use nearly doubling in a year while company chatbot use stayed flat since 2022 (independent survey, same sample, search snippet only) - [Gartner press release, 8 July 2026](https://www.gartner.com/en/newsroom/press-releases/2026-07-08-gartner-survey-finds-customers-are-three-times-more-likely-to-use-third-party-genai-than-company-provided-chatbots-for-customer-service).
- 47.1% of US digital shoppers have not used a retail AI chatbot and are not interested, and 22.2% are curious but have not tried one (independent survey by Bizrate Insights and eMarketer, August 2026, search snippet only) - [eMarketer](https://www.emarketer.com/content/shoppers-giving-retail-chatbots-cold-shoulder).
- 54% of shoppers would engage with a retailer website chatbot according to Attest research cited in trade press (survey via press report, April 2026, sample not captured) - [Retail Systems](https://www.retail-systems.com/rs/Do_AI_Shopping_Assistants_Really_Lift_Conversion.php).
- In the Sinch survey 48% would use AI to check order status, 47% to learn about a product before buying and 36% for service outside business hours (vendor-sponsored survey, 2,501 adults in eight countries, July 2026) - [Stacker, Sinch survey](https://stacker.com/stories/shopping/shoppers-are-growing-skeptical-about-ai-where-it-still-earns-confidence).
- Synchrony found consumers use AI most for shopping research and less as they near checkout (company survey, 2,000 US consumers, May 2026, search snippet only) - [Synchrony](https://www.synchrony.com/AI-in-commerce-study).
- Just 10% of AI-assisted digital shoppers usually finish the purchase on the AI platform while 69% go to a retailer's site or app (survey via eMarketer, 2026, search snippet only) - [eMarketer](https://www.emarketer.com/content/shoppers-still-buy-through-retailers--own-ai--not-chatgpt).

#### Preference for a human and task split
- Baymard found shoppers prefer an AI chatbot for comparing product features (63%), checking stock (59%) and personalized recommendations (56%) (independent survey, 2,273 US online shoppers, June 2026, published 27 October 2026) - [Baymard](https://baymard.com/research-articles/ai-engagement-quantitative-ux-insights-2026).
- Baymard found shoppers prefer a human for damaged or incorrect items (69%), late or missing orders (67%) and shipping or billing mistakes (66%) (independent survey, June 2026) - [Baymard](https://baymard.com/research-articles/ai-engagement-quantitative-ux-insights-2026).
- Baymard found 60% of shoppers would be less confident buying if they knew a product image was AI-generated, including 17% who would not buy (independent survey, June 2026) - [Baymard](https://baymard.com/research-articles/ai-engagement-quantitative-ux-insights-2026).
- Gartner found 87% of customers say an option to reach a human agent is essential when a company uses GenAI in service, while 50% say interactions are easier when companies use GenAI (independent survey, February and March 2026, search snippet only) - [Gartner press release, 4 August 2026](https://www.gartner.com/en/newsroom/press-releases/2026-08-04-gartner-survey-finds-87-percent-of-customers-say-companies-using-genai-for-customer-service-must-provide-access-to-a-human-agent0).
- An older Gartner survey found 64% of customers would prefer companies not use AI in customer service and 53% would consider switching to a competitor over it (independent survey, 5,728 customers, fielded December 2023, published July 2024) - [Gartner press release, 9 July 2024](https://www.gartner.com/en/newsroom/press-releases/2024-07-09-gartner-survey-finds-64-percent-of-customers-would-prefer-that-companies-didnt-use-ai-for-customer-service).
- Sinch found 53% would rather take product advice from a person than from AI, up from 51% in 2025 (vendor-sponsored survey, July 2026) - [Stacker, Sinch survey](https://stacker.com/stories/shopping/shoppers-are-growing-skeptical-about-ai-where-it-still-earns-confidence).
- Adobe Express found human interaction is the top preference at 49% across customer service situations and 91% want brands to disclose when they are talking to a bot (vendor survey, fielded November 2025, sample not captured, search snippet only) - [Adobe Express](https://www.adobe.com/express/learn/blog/future-of-conversational-marketing).

#### Trust and its trend
- 43% of consumers think AI will make their shopping easier this year, down from 48% in 2025, and 31% say it will not (vendor-sponsored survey, Sinch, July 2026) - [Stacker, Sinch survey](https://stacker.com/stories/shopping/shoppers-are-growing-skeptical-about-ai-where-it-still-earns-confidence).
- Privacy or data use is the top AI worry at 43%, and 15% name not knowing whether they are talking to a person or a machine (vendor-sponsored survey, Sinch, July 2026) - [Stacker, Sinch survey](https://stacker.com/stories/shopping/shoppers-are-growing-skeptical-about-ai-where-it-still-earns-confidence).
- Confidence that AI can handle a task is above 60% for every task tested and lowest for payment or billing changes at 62% (vendor-sponsored survey, Sinch, July 2026) - [Stacker, Sinch survey](https://stacker.com/stories/shopping/shoppers-are-growing-skeptical-about-ai-where-it-still-earns-confidence).

#### Differences by age
- The share who trust AI recommendations as much as or more than a human's is 55% of Millennials, 51% of Gen Z, 47% of Gen X and 30% of Baby Boomers (vendor-sponsored survey, Sinch, July 2026, age sample sizes not given) - [Stacker, Sinch survey](https://stacker.com/stories/shopping/shoppers-are-growing-skeptical-about-ai-where-it-still-earns-confidence).
- 55% of Gen Z think AI will make shopping easier against 18% of Baby Boomers, and 23% of Boomers have no confidence at all in AI for payment and billing tasks against 11% of Gen Z (vendor-sponsored survey, Sinch, July 2026) - [Stacker, Sinch survey](https://stacker.com/stories/shopping/shoppers-are-growing-skeptical-about-ai-where-it-still-earns-confidence).
- CouponFollow data cited by eMarketer says Gen X leads in use of AI shopping assistants while Gen Z is more willing to trust AI agents to make purchases (survey via secondary report, 2026, search snippet only, covers AI assistants broadly) - [eMarketer](https://www.emarketer.com/content/ai-shopping-gains-steam-trust-divided).

#### Differences by country
- Only 26% of US consumers think AI will make shopping easier, 17 points below the global average, against 72% in Brazil and Mexico combined (vendor-sponsored survey, Sinch, July 2026) - [Stacker, Sinch survey](https://stacker.com/stories/shopping/shoppers-are-growing-skeptical-about-ai-where-it-still-earns-confidence).
- 61% of Latin American respondents trust AI recommendations as much as or more than a person's, the highest of any region (vendor-sponsored survey, Sinch, July 2026) - [Stacker, Sinch survey](https://stacker.com/stories/shopping/shoppers-are-growing-skeptical-about-ai-where-it-still-earns-confidence).
- The Sinch 2025 wave included India and Canada and the 2026 wave did not, so the year-on-year comparison is not like for like (survey limitation) - [Stacker, Sinch survey](https://stacker.com/stories/shopping/shoppers-are-growing-skeptical-about-ai-where-it-still-earns-confidence).

### Inferences
- Shoppers divide tasks cleanly: AI for pre-purchase questions, a person for post-purchase problems.
- An assistant positioned as a pre-sale product advisor with a visible route to a human fits what shoppers say they want better than a support deflection bot.
- One bad answer is costly, because only about a quarter of customers say they would try a chatbot again.
- The US, the largest Shopify market, is the most skeptical market surveyed.
- Shoppers increasingly ask general AI tools instead of the store's own bot, which lowers the ceiling for on-site assistants.

### Gaps
- Europe and Asia-Pacific figures were not broken out in the Sinch coverage.
- Gartner and eMarketer pages blocked direct access, so their figures come from search summaries and secondary coverage.
- Most of Baymard's 20 plus insights, including trust, accuracy and age splits, are behind its paywall.
- No survey was found that asks specifically about chatbots on small independent stores.

## 5. Which incidents are documented?

### Takeaway
One tribunal ruling (Air Canada, February 2024) holds a company liable for its chatbot's invented policy, and no newer court ruling of the same kind was found.
Since then the record is a run of press-reported cases settled under publicity, an Australian regulator warning, review-level losses at small merchants, and academic proof that many chatbot plugins are open to prompt injection, with no verified case of large-scale discount abuse.

### Cited Findings

#### Rulings and regulator positions
- In Moffatt v. Air Canada, 2024 BCCRT 149, the British Columbia Civil Resolution Tribunal held the airline liable for negligent misrepresentation after its chatbot invented a retroactive bereavement discount, rejected the argument that the bot was a separate legal entity, and ordered payment of 812.02 Canadian dollars (tribunal ruling via press report, February 2024) - [PYMNTS, 1 July 2026](https://www.pymnts.com/?p=3911029); [CBS News](https://www.cbsnews.com/news/aircanada-chatbot-discount-customer).
- The Air Canada decision is a single small-claims tribunal ruling and not binding precedent, and my searches found no court or tribunal ruling from 2025 or 2026 on a retailer's chatbot promising a price, refund or discount (own search result, 23 November 2026) - [PYMNTS, 1 July 2026](https://www.pymnts.com/?p=3911029).
- The Australian Competition and Consumer Commission warned in a 2025 AI industry snapshot that AI-generated responses that mislead consumers may expose companies to enforcement action and significant penalties (regulator position via press report, March 2026) - [Inside Retail Australia](https://insideretail.com.au/business/why-retailers-cant-escape-responsibility-for-ai-chatbots-202603).
- Australian legal commentary says a bot that wrongly denies a remedy or overpromises refunds or discounts could amount to misleading or deceptive conduct under the Australian Consumer Law (press report, 12 March 2026) - [Inside Retail Australia](https://insideretail.com.au/business/why-retailers-cant-escape-responsibility-for-ai-chatbots-202603).
- A law journal piece discusses apparent authority when a customer service bot makes commitments (legal commentary, title seen in search, page not read) - [Syracuse Journal of Science and Technology Law](https://jost.syr.edu/the-bot-gave-away-the-store-apparent-authority-in-ai-customer-service/).

#### Wrong price, policy or offer (press-reported)
- A BMW dealership in Toronto used a text assistant that offered CAD 27,162.79 to buy back a used car, about CAD 7,000 above what staff would pay, because it read the amount owed as the offer, and the dealer honored the figure only after a national broadcaster got involved (press report, 20 June 2026, no court ruling) - [The Drive](https://www.thedrive.com/news/bmw-dealer-forced-to-pay-5000-extra-for-used-x3-over-ai-chatbot-error).
- A lawyer consulted for that story said it was reasonable to think an agreement existed because the chatbot had booked an in-person meeting to finalize the deal (press report, June 2026) - [The Drive](https://www.thedrive.com/news/bmw-dealer-forced-to-pay-5000-extra-for-used-x3-over-ai-chatbot-error).
- United Airlines' chatbot told a customer a $200 travel credit stayed active for five years when it expired within months, and the airline admitted the error and issued a replacement certificate after a TV station asked (press report, 16 September 2026) - [NBC Chicago](https://www.nbcchicago.com/consumer/ai-chatbots-are-taking-over-customer-service-but-how-often-are-they-wrong/3989958/).
- The AI coding company Cursor had a support bot invent a one-device-per-subscription policy in April 2025, which a co-founder publicly disowned (press report, no legal finding) - [PYMNTS, 1 July 2026](https://www.pymnts.com/?p=3911029).
- Woolworths' Olive assistant in Australia made off-topic personal remarks and in later testing gave unclear or incorrect pricing answers, and Bunnings' assistant gave electrical repair instructions that are illegal for unlicensed people in Queensland (press report, March 2026) - [Inside Retail Australia](https://insideretail.com.au/business/why-retailers-cant-escape-responsibility-for-ai-chatbots-202603); [University of Sydney](https://www.sydney.edu.au/news-opinion/news/2026/03/03/woolworths-ai-agent-rambled-about-its-mother.html).
- An informal test of Amazon's Rufus found it returned items that were not the cheapest when asked for the cheapest and listed products that were not TVs for a TV query (press analysis, 6 November 2024, no error rates) - [Marketplace Pulse](https://www.marketplacepulse.com/articles/amazons-shopping-ai-is-confidently-wrong).

#### Small-merchant incidents
- A UK small business said its after-hours chatbot was talked into inventing discount codes rising from 25% to 80% on an order over 8,000 pounds, the code failed at checkout, the customer threatened small claims action, and the business cancelled and refunded the order (forum post on a UK legal advice subreddit, February 2026, retold by an incident site, unverified by any outlet) - [Vibe Graveyard](https://vibegraveyard.ai/story/uk-chatbot-80-percent-discount-refund/).
- A US merchant attributed the loss of a custom order worth more than $400 to an AI assistant giving a customer wrong order status (app store review, 31 October 2026) - [Tidio reviews](https://apps.shopify.com/tidio-chat/reviews?ratings%5B%5D=1&ratings%5B%5D=2).
- A vendor employee described seeing AI support give a wrong delivery date and promise a refund the policy did not allow, with refunds, reships and second tickets as the cost (forum post by a vendor, 13 November 2026, no amounts) - [Shopify Community thread 692225](https://community.shopify.com/t/692225).

#### Prompt injection and manipulation
- A Chevrolet dealership chatbot was manipulated into agreeing to sell a $76,000 vehicle for one dollar, and screenshots reached about 20 million views (press and vendor accounts; the December 2023 date is from background knowledge and was not checked against a source) - [Fast Company](https://www.fastcompany.com/91532091/mcdonalds-ai-bot-didnt-go-rogue); [Alhena blog](https://alhena.ai/blog/prompt-injection-ecommerce-ai-chatbot/).
- A UC Santa Barbara study accepted to IEEE Security and Privacy 2026 examined 17 third-party chatbot plugins used on more than 10,000 websites and found 8 plugins on about 8,000 sites do not protect conversation history, so an attacker can forge system messages and raise the success of unintended behavior 3 to 8 times (independent study, November 2025) - [arXiv 2511.05797](https://arxiv.org/html/2511.05797v1).
- The same study found 15 of 17 plugins scrape site content without separating first-party text from third-party text such as reviews, and about 13% of sampled e-commerce sites with chatbots had already exposed the bot to third-party content (independent study, November 2025) - [arXiv 2511.05797](https://arxiv.org/html/2511.05797v1).
- In the study's controlled tests injected prompts triggered unauthorized tasks in 25% to 100% of cases when role boundaries were broken against 0% to 25% when roles were isolated, and no real-world abuse was observed (independent study, November 2025) - [arXiv 2511.05797](https://arxiv.org/html/2511.05797v1).
- A security blog claims 28% of e-commerce support bots it audited would issue a discount code above 25% if the user posed as a frustrated first-time buyer (vendor claim, unverified, search snippet only) - [Centuri research page](https://centuri.pages.dev/research/ai-security-ecommerce-discount-fraud).
- Vendor guidance converges on enforcing discount limits in code and never letting the model compute prices (vendor guidance, search snippet only) - [KoreShield case study](https://www.mintlify.com/koreshield/koreshield-docs/case-studies/ecommerce); [Alhena blog](https://alhena.ai/blog/prompt-injection-ecommerce-ai-chatbot/).

### Inferences
- The practical liability risk for a small store is less a court case than a refund, a cancelled order or a public screenshot.
- In every press-reported case the company gave way once the story was public, which means merchants in effect carry the cost of what the bot says.
- Documented manipulation so far needs no technical exploit, only a long persuasive conversation with a bot that is allowed to talk about price.
- An assistant that cannot state a price, discount or policy outside verified store data removes the incident types seen so far.
- The plugin study shows that product reviews and other user content are a live injection path for any assistant that reads store pages.

### Gaps
- No 2025 or 2026 court, tribunal or ombudsman decision about a retailer chatbot's price or discount promise was found.
- No verified case of real discount codes being extracted and abused at scale was found.
- The UK discount story rests on one anonymous forum account.
- Other well-known cases (a parcel carrier's bot in early 2024, a fintech's reported retreat from AI-only service in 2025) did not surface in searches and are not sourced here.
- US Federal Trade Commission and UK regulator positions were not searched.

## 6. What do merchants say they want that current assistants do not do?

### Takeaway
Merchants ask for answers grounded in live store data with a refusal and handoff when unsure, human approval before anything that costs money, the ability to correct the bot and have the fix stick, predictable pricing, and ownership of their conversation data.
These wants are drawn from reviews and small forum threads, not from any merchant survey.

### Cited Findings
- Forum posters want AI that answers only from verified catalog, policy and live order data, cites its source, and hands off to a person when unsure (forum posts, 24 June and 13 November 2026, posters are a support automation worker and a vendor employee) - [Shopify Community thread 629598](https://community.shopify.com/t/discussion-where-is-ai-customer-support-actually-failing-merchants-and-what-would-make-it-genuinely-useful/629598).
- Posters in a June 2026 thread would never let AI issue refunds without approval and want AI to propose while a human approves anything irreversible, including order changes and delivery or stock promises that customers screenshot (forum posts, 29 and 30 June 2026, roles not stated) - [Shopify Community thread 643976](https://community.shopify.com/t/whats-the-one-thing-youd-never-let-an-ai-do-in-your-store-without-your-approval/643976).
- The same thread treats shipment status and common questions as safe to automate fully (forum posts, June 2026) - [Shopify Community thread 643976](https://community.shopify.com/t/whats-the-one-thing-youd-never-let-an-ai-do-in-your-store-without-your-approval/643976).
- Posters want the handoff to pass the human a summary and a suggested reply so the customer does not repeat everything (forum posts, June and November 2026) - [Shopify Community thread 629598](https://community.shopify.com/t/discussion-where-is-ai-customer-support-actually-failing-merchants-and-what-would-make-it-genuinely-useful/629598).
- A technical poster wants retrieved values logged and every number in a draft reply checked against live data, and a developer wants approved-source-only answers for risky topics plus a regression test list (forum posts, 10 and 22 October 2026) - [Shopify Community thread 692225](https://community.shopify.com/t/692225).
- Merchants want corrections to persist: one cancelled Zipchat because fixes did not stick, and one could not make Shopify Inbox give the store address through FAQs (app store reviews, March and August 2026) - [Zipchat reviews](https://apps.shopify.com/zipchat/reviews?ratings%5B%5D=1&ratings%5B%5D=2&ratings%5B%5D=3); [Shopify Inbox reviews](https://apps.shopify.com/inbox/reviews?ratings%5B%5D=1&ratings%5B%5D=2).
- A Shopify Inbox merchant asked for feedback that pinpoints the wrong answer and for an Inbox API (app store review, 19 September 2026) - [Shopify Inbox reviews](https://apps.shopify.com/inbox/reviews?ratings%5B%5D=1&ratings%5B%5D=2).
- Merchants want to export customer questions and answers for reuse in email and phone support, which Tidio and Zipchat reviewers say they cannot do (app store reviews, 13 July 2026 and 3 November 2025) - [Tidio reviews](https://apps.shopify.com/tidio-chat/reviews?ratings%5B%5D=1&ratings%5B%5D=2); [Zipchat reviews](https://apps.shopify.com/zipchat/reviews?ratings%5B%5D=1&ratings%5B%5D=2&ratings%5B%5D=3).
- Merchants want anonymous shoppers to be able to ask without signing in, with email capture for follow-up and visitor context such as cart and location kept (app store reviews of Shopify Inbox, July and August 2026) - [Shopify Inbox reviews](https://apps.shopify.com/inbox/reviews?ratings%5B%5D=1&ratings%5B%5D=2).
- Merchants want control over the widget's look and navigation, including back buttons and fewer fields before a chat starts (app store reviews of Shopify Inbox, 13 August and 1 September 2026) - [Shopify Inbox reviews](https://apps.shopify.com/inbox/reviews?ratings%5B%5D=1&ratings%5B%5D=2).
- Merchants want predictable cost: one would not enable a per-conversation AI charge, one objected to recurring overage, and a vendor employee told merchants to seek pricing that does not climb with usage (app store reviews, July and October 2026, and forum post, November 2026) - [Gorgias reviews](https://apps.shopify.com/helpdesk/reviews?ratings%5B%5D=1&ratings%5B%5D=2); [Chatty reviews](https://apps.shopify.com/chatty/reviews?ratings%5B%5D=1&ratings%5B%5D=2&ratings%5B%5D=3); [Shopify Community thread 629598](https://community.shopify.com/t/discussion-where-is-ai-customer-support-actually-failing-merchants-and-what-would-make-it-genuinely-useful/629598).
- Merchants want links and exact text they supply to be passed through unchanged (app store review of Chatty, 10 February 2026) - [Chatty reviews](https://apps.shopify.com/chatty/reviews?ratings%5B%5D=1&ratings%5B%5D=2&ratings%5B%5D=3).
- Merchants want product matching that finds the right item, and a tool that does not need daily fixing (app store reviews of Chatty, 14 and 28 August 2025) - [Chatty reviews](https://apps.shopify.com/chatty/reviews?ratings%5B%5D=1&ratings%5B%5D=2&ratings%5B%5D=3).
- Merchants want clean removal, with no widget or code left on the theme after uninstall (app store reviews, April 2024 and July 2026) - [Zipchat reviews](https://apps.shopify.com/zipchat/reviews?ratings%5B%5D=1&ratings%5B%5D=2&ratings%5B%5D=3); [Rep AI reviews](https://apps.shopify.com/rep-ai-sales-associate/reviews?ratings%5B%5D=1&ratings%5B%5D=2&ratings%5B%5D=3).
- A Gorgias merchant wants live cart visibility in chat, which they say was removed in November 2025 (app store review, 31 July 2026) - [Gorgias reviews](https://apps.shopify.com/helpdesk/reviews?ratings%5B%5D=1&ratings%5B%5D=2).
- Forum guidance to merchants is to trial a tool on the store's own past tickets and check the real automation rate before paying (forum post by a vendor, 13 November 2026) - [Shopify Community thread 629598](https://community.shopify.com/t/discussion-where-is-ai-customer-support-actually-failing-merchants-and-what-would-make-it-genuinely-useful/629598).

### Inferences
- The unmet wants are about trust and control more than about model fluency.
- A fine-tuning team's edge would matter only if it shows up as fewer wrong answers on a store's own catalog and policies, with proof the merchant can see.
- A replay of the assistant against a store's own past questions before go-live is asked for and is not a standard feature in the reviews read.
- Proof of incremental sales is something merchants cannot produce themselves at small-store traffic, so a credible measurement method is a want that reviews imply but rarely state.
- Several wants (flat pricing, data export, clean uninstall, no forced sign-in) are product and policy choices that cost little to build.

### Gaps
- No survey of merchants ranks or quantifies these wants.
- Many forum voices are developers and vendors, so the list may reflect what builders think merchants want.
- Reddit threads, where merchants speak most freely, could not be read.

## 7. For small stores under about $1 million a year, what are typical visits and chat volumes, and can an assistant pay for itself?

### Takeaway
No reliable traffic benchmark by revenue band exists, but arithmetic from common benchmarks puts a $250,000 store at roughly 16,000 sessions, 230 orders, about 140 chats and 50 to 115 support tickets a month.
At that volume the measured upside is small next to assistant prices of roughly $50 to $130 a month, and payback looks plausible only near $1 million in revenue or in high-ticket categories.

### Cited Findings

#### Store size, traffic and conversion
- One community estimate says about 90% of Shopify stores make under $100,000 a year and 6% to 7% make $100,000 to $999,000 (forum estimate, 2026, unofficial, search snippet only) - [Popupsmart community](https://community.popupsmart.com/t/shopify-statistics-global-shopify-snapshot-2026/332).
- Omnisend, citing TrueProfit, says most Shopify stores make under $1,000 a month and at least 20% reach $10,000 a month (vendor blog citing vendor data, search snippet only, hard to reconcile with the estimate above) - [Omnisend](https://www.omnisend.com/blog/shopify-statistics/).
- A blog estimate puts average Shopify store revenue at about $5,583 a month globally (vendor blog, unverified, search snippet only) - [Folio3](https://ecommerce.folio3.com/blog/average-shopify-store-revenue/).
- Littledata's benchmark of about 420 mostly small and mid-size Shopify stores puts the median conversion rate at about 1.4%, with 3.2% for the top 20% (vendor benchmark via secondary blogs, July to October 2026, search snippet only) - [Red Stag Fulfillment](https://redstagfulfillment.com/average-conversion-rate-for-shopify-stores/); [Popupsmart](https://popupsmart.com/blog/shopify-conversion-rate-statistics).
- Blog figures for average order value range from about $85 to $95 across all Shopify stores to about $150 to $185 for e-commerce globally (vendor blogs, conflicting, could not be traced to a primary source) - [Ringly AOV statistics](https://www.ringly.io/blog/ecommerce-aov-statistics-2026); [GrowthSuite AOV benchmarks](https://growthsuite.net/resources/shopify-upsell-cross-sell/increase-average-order-value/aov-benchmarks).
- Anecdotal ranges put new stores at 200 to 2,000 monthly visitors and stores with marketing at 2,000 to 50,000 or more (forum-style blog post, unverified, search snippet only) - [DEV Community](https://dev.to/prateekshaweb/how-much-does-the-average-shopify-store-make-per-month-b4k).
- Koala Apps modeled the 300 busiest stores it tracks and found a 10th percentile of 30,297 monthly visits and $227,777 monthly sales and a median of 59,472 visits and $396,317 sales, a sample of established stores that says nothing about typical small ones (vendor modeled data, snapshot 1 August 2026) - [Koala Apps](https://koala-apps.io/blog/shopify-store-benchmarks/).

#### Chat and ticket volume
- The Smartsupp ratio of 0.84 conversations per 100 visits is the only large-sample chat rate found (vendor data, 2024) - [Smartsupp](https://www.smartsupp.com/blog/analysing-5-billion-website-visits-how-ecommerce-customers-use-chat/).
- Gorgias says most e-commerce stores receive 20 to 50 support tickets per 100 orders, and its March 2026 data for merchants near $10 million GMV has a median of 25 per 100 orders, from 19 for toys to 46 for electronics (vendor benchmark, search snippet only) - [Gorgias support metrics](https://www.gorgias.com/blog/customer-support-metrics); [eesel contact rate article](https://www.eesel.ai/blog/ecommerce-support-contact-rate).
- An older industry deck put small stores at 88 tickets per 100 orders including social comments (vendor report, 2019, dated) - [2019 industry report slides](https://www.slideshare.net/DerricHaynie/the-state-of-ecommerce-customer-service-industry-report-2019).
- One survey-based figure says up to 30% of incoming tickets are shipping status requests (vendor blog, unverified, search snippet only) - [eesel contact rate article](https://www.eesel.ai/blog/ecommerce-support-contact-rate).

#### What assistants cost at small-store volume
- Rep AI's price list by monthly sessions shows $12 at 3,000 sessions for sales only, $104 (sales), $49 (support) or $130 (both) at 10,000 sessions, and $368, $149 or $462 at 50,000 sessions, with overage of $12 per 1,000 extra sessions (competitor vendor's review, prices checked 22 October 2026) - [eesel AI review of Rep AI](https://www.eesel.ai/blog/rep-ai-review).
- Chatty reviewers mention a $49 plan, and its developer says the Pro plan includes 500 AI conversations with overage at $0.40 each (app store review and developer reply, 2025 and October 2026) - [Chatty reviews](https://apps.shopify.com/chatty/reviews?ratings%5B%5D=1&ratings%5B%5D=2&ratings%5B%5D=3).
- A Gorgias reviewer gives $1.50 per AI conversation, and Rep AI charges $0.75 per AI-resolved conversation on email and social channels (app store review, July 2026, and competitor vendor's review, October 2026) - [Gorgias reviews](https://apps.shopify.com/helpdesk/reviews?ratings%5B%5D=1&ratings%5B%5D=2); [eesel AI review of Rep AI](https://www.eesel.ai/blog/rep-ai-review).
- A new entrant posting in the Shopify Community lists a free plan of 50 conversations a month and paid plans at $29 or $79 (forum post by a developer, 22 October 2026, app not yet installable) - [Shopify Community thread 692225](https://community.shopify.com/t/692225).

#### Whether a small store can even measure lift
- A vendor rule of thumb says a holdout test needs roughly 15,000 to 20,000 visitors per group to detect a 5% lift in revenue per visitor at 95% confidence, or about 150,000 sessions with a 90/10 split (vendor guidance, April 2026) - [Alhena holdout blog](https://alhena.ai/blog/measure-incremental-revenue-ai-holdout-test/).
- The same guide tells small stores to run tests for 4 to 6 weeks, aim to detect a 10% lift and limit the test to product and cart pages (vendor guidance, April 2026) - [Alhena holdout blog](https://alhena.ai/blog/measure-incremental-revenue-ai-holdout-test/).

### Inferences
- All figures in this block are my arithmetic, using a 1.4% conversion rate, a $90 average order, 0.84 chats per 100 sessions and 20 to 50 tickets per 100 orders.
- A store at $100,000 a year has about 93 orders, 6,600 sessions, 56 chats and 19 to 46 tickets a month.
- A store at $250,000 a year has about 231 orders, 16,500 sessions, 139 chats and 46 to 116 tickets a month.
- A store at $500,000 a year has about 463 orders, 33,100 sessions, 278 chats and 93 to 231 tickets a month.
- A store at $1 million a year has about 926 orders, 66,100 sessions, 556 chats and 185 to 463 tickets a month.
- With a $185 average order the session and chat counts roughly halve at each revenue level.
- If half of chats are pre-sale and each gains the 1.31 point conversion lift from the marketplace experiment, a $250,000 store gains about 0.9 orders or $80 of revenue a month, and a $1 million store about 3.6 orders or $330.
- If engagement were 5% of sessions, as vendors claim for proactive setups, those gains would be about $490 a month at $250,000 and about $1,950 a month at $1 million.
- Treating all of Gorgias's 1.9% influenced revenue as incremental, which overstates it, gives about $400 a month at $250,000 and about $1,580 a month at $1 million, before product margin.
- On the support side, a 41% resolution rate would remove about 19 to 48 tickets a month at $250,000, which at 5 to 10 minutes each is roughly 2 to 8 hours of work.
- Against prices of roughly $50 to $130 a month near 10,000 to 16,000 sessions, a store under about $250,000 is unlikely to recover the cost on measured evidence unless its order value is high.
- Near $1 million the case is borderline at measured engagement and positive only if engagement is several times the 0.84% benchmark.
- High-ticket and considered-purchase stores are the exception, since one saved order of a few hundred dollars covers a month's fee.
- No store under $1 million has the traffic to run a clean holdout in a month, so small merchants must take vendor dashboards on trust, which explains the attribution doubts.
- A free or very cheap tier at low volume and pricing that does not scale with sessions fit this segment better than session-based pricing.

### Gaps
- No primary dataset gives monthly sessions or chat counts by store revenue band.
- The conversion and order value inputs come from secondary blogs and could not be traced to primary reports.
- Ticket benchmarks come from merchants near $10 million GMV and may not hold for small stores.
- The cost of a human-handled ticket for a small store was not sourced, so the labor saving is given in hours and not in dollars.
- The price points above were taken from reviews and one competitor's write-up and were not checked on vendor pricing pages.
