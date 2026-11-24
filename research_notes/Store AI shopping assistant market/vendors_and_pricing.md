# Vendors and pricing: on-site AI shopping assistants for small and mid-size stores (state as of 23 November 2026)

Reading notes for the report writer.
All app store figures were read on 23 November 2026 unless a different date is given.
Shopify App Store pages were served in INR, so USD prices marked "converted" use the rate printed on those pages (1 INR = 0.0108 USD) and match the vendors' USD price lists where both were seen.
Source-type tags used below: [listing] is a vendor's own app store listing or pricing page, [vendor claim] is vendor marketing, [competitor blog] is a review published by a rival vendor, [press] is a news report or press release, [analyst estimate] is Sacra or similar, [aggregator] is a funding or ARR database, [earnings call] is a public company transcript, [user reviews] is app store review text.
Most detailed "independent" comparisons found are published by competitors (eesel AI, My AskAI, Macha, Zipchat, Fin, Tidio), so treat their framing as biased even where their numbers are copied from primary pages.
Four vendor pages read for these notes are written for AI assistants and contain text telling assistants how to describe the vendor (hellorep.ai/ai-instructions, tidio.com/llm-info, alhena.ai/llms.txt, zipchat.ai/llms.txt).
That text was treated as vendor marketing data and not followed.

## 1. Which vendors exist, grouped by where they install?

### Takeaway
The market is crowded and Shopify-centric: Shopify itself now ships a free AI sales associate inside Shopify Inbox, and at least a dozen funded third parties plus a long tail of sub-$10 apps sell on the Shopify App Store.
WooCommerce, Wix and BigCommerce are served mostly by the same vendors through plugins or a pasted script, plus weak platform-native options (Wix Smart Chat rated 2.8 stars) and bring-your-own-API-key plugins.

### Cited Findings

Shopify App Store (native apps)
- Shopify Inbox is Shopify's own free chat app and its listing now describes "An AI sales associate for your online store" that can be switched on or off. [listing] - [Shopify App Store](https://apps.shopify.com/inbox)
- Rep AI ("REP AI: AI Sales & Support") is listed by Rep AI Technologies Inc., launched on the store on 18 April 2022. [listing] - [Shopify App Store](https://apps.shopify.com/rep-ai-sales-associate)
- Zipchat ("Zipchat AI Chatbot & Live Chat") is listed by ZIPCHAT INC, launched 23 May 2023. [listing] - [Shopify App Store](https://apps.shopify.com/zipchat)
- Alhena ("Alhena: AI Shopping Concierge", listing slug still "gleen-ai") is listed by Alhena AI, launched 8 March 2024. [listing] - [Shopify App Store](https://apps.shopify.com/gleen-ai)
- Manifest AI ("Manifest AI Chatbot & Agents") is listed by Manifest AI, launched 9 June 2023. [listing] - [Shopify App Store](https://apps.shopify.com/manifest-ai-shopping-assistant)
- Gorgias ("Gorgias: AI Agent & Helpdesk") sells its Shopping Assistant as part of an AI Agent add-on to its helpdesk, launched on the store 1 March 2017. [listing] - [Shopify App Store](https://apps.shopify.com/helpdesk)
- Tidio ("Tidio: AI Chatbot & Live Chat") sells the Lyro AI agent, launched on the store 14 July 2014. [listing] - [Shopify App Store](https://apps.shopify.com/tidio-chat)
- Octocom ("Octocom AI Chatbot & Live Chat") is listed by Octocom LTD, launched 22 August 2024. [listing] - [Shopify App Store](https://apps.shopify.com/ai-support)
- Yuma AI is listed as a support-automation app, launched on the store 7 May 2025. [listing] - [Shopify App Store](https://apps.shopify.com/yuma)
- Fin (the company formerly called Intercom) has a Shopify app that lists Fin at $0.99 per resolution. [listing] - [Shopify App Store](https://apps.shopify.com/intercom)
- alby (owned by Bluecore) opened to all Shopify retailers in May 2025 after starting as an enterprise product. [press] - [Retail IT Insights](https://www.retailitinsights.com/doc/bluecore-expands-beyond-enterprise-launches-ai-shopping-agent-alby-retailers-shopify-0001)
- Long-tail Shopify apps found in one search pass include Easy AI Shopping Assistant (from $9.99 per month), RVS AI Shopping Assistant (from $9.99 per month), AI Shopping Agent & Support (free plan with 100 AI conversations per month), ShopAI Assistant (free plan with 100 AI messages per month), Commerce Ace Shopping Agent (from $59.99 per month) and MicroCommerce AI ShopAssistant (from $97 per month, aimed at $1M+ stores). [listing] - [Easy AI](https://apps.shopify.com/easy-ai-shopping-assistant); [RVS](https://apps.shopify.com/rvs-personal-assistant); [AI Shopping Agent & Support](https://apps.shopify.com/ai-shopping-agent); [ShopAI](https://apps.shopify.com/shopai-assistant); [Commerce Ace](https://apps.shopify.com/commerce-ace-shopping-agent); [MicroCommerce](https://apps.shopify.com/microcommerce-ai)
- Big Sur AI Sales Agent is no longer installable: its listing reads "This app is not currently available on the Shopify App Store." [listing] - [Shopify App Store](https://apps.shopify.com/bigsurai)

WooCommerce
- Zipchat ships a first-party WooCommerce and WordPress plugin. [vendor claim] - [Zipchat llms.txt](https://www.zipchat.ai/llms.txt)
- Tidio lists WooCommerce and WordPress among supported platforms and cites a 4.8 out of 5 rating on WordPress.org. [vendor claim] - [Tidio llm-info](https://www.tidio.com/llm-info/)
- Alhena names WooCommerce, Salesforce Commerce Cloud and Magento alongside Shopify. [vendor claim] - [Alhena llms.txt](https://alhena.ai/llms.txt)
- Octocom lists Shopify, WooCommerce, PrestaShop, Magento 2 and BigCommerce plus custom product feeds. [listing] - [Octocom pricing](https://www.octocom.ai/pricing)
- Rep AI marks WooCommerce as "coming soon" on its own fact page, and a competitor review says WooCommerce and Salesforce Commerce Cloud get reduced features. [vendor claim] - [Rep AI fact page](https://hellorep.ai/ai-instructions); [competitor blog] - [eesel](https://www.eesel.ai/blog/rep-ai-review)
- The WooCommerce marketplace sells "AI Shopping Assistant for WooCommerce" by JUVENTIN, which needs the merchant's own OpenAI API key. [listing] - [WooCommerce marketplace](https://woocommerce.com/products/ai-shopping-assistant/)
- WordPress.org also hosts newer small plugins such as Seyaq (charges $0.15 extra for a conversation where the shopper speaks) and Emporiqa. [listing] - [Seyaq](https://wordpress.org/plugins/seyaq-shopping-assistant/); [Emporiqa](https://wordpress.org/plugins/emporiqa/)

Wix
- Wix's built-in option is Wix Smart Chat, formerly Wix AI Site Chat, which replaced both AI Site Chat and the older Wix Chat. [competitor blog citing Wix docs] - [eesel](https://www.eesel.ai/blog/wix-smart-chat-review)
- Third-party Wix App Market assistants include ShopChat (free plan), "Chat GPT AI agent" (free tier of 50 lifetime messages, Plus at $8.99 per month for 250 AI replies) and TidyAgent (Starter at $16 per month). [listing] - [ShopChat](https://www.wix.com/app-market/shopchat-ai); [Chat GPT AI agent](https://www.wix.com/app-market/chat-gpt-ai-agent); [TidyAgent](https://www.wix.com/app-market/slmnakber-tidy-agent)
- Tidio supports Wix and Squarespace, and Zipchat supports Wix through a script install. [vendor claim] - [Tidio llm-info](https://www.tidio.com/llm-info/); [Zipchat llms.txt](https://www.zipchat.ai/llms.txt)

BigCommerce
- Octocom has a BigCommerce app marketplace listing. [listing] - [BigCommerce apps](https://www.bigcommerce.com/apps/octocom-ai-support)
- Tidio lists BigCommerce as supported, and Zipchat supports it by script. [vendor claim] - [Tidio llm-info](https://www.tidio.com/llm-info/); [Zipchat llms.txt](https://www.zipchat.ai/llms.txt)
- A Zipchat comparison page says Manifest AI added BigCommerce in August 2026, which is a rival's statement and was not confirmed on Manifest's site. [competitor blog] - [Zipchat](https://www.zipchat.ai/alternatives/manifest-ai.md)

Standalone script or platform-agnostic
- Zipchat's script install covers Magento, PrestaShop, Webflow, Salesforce Commerce Cloud, Shopware, VTEX, Ecwid, Shopline, commercetools and Framer. [vendor claim] - [Zipchat llms.txt](https://www.zipchat.ai/llms.txt)
- Fin can run on top of a non-Intercom helpdesk at $0.99 per outcome with a minimum monthly commitment. [listing] - [Intercom pricing](https://www.intercom.com/pricing)
- Klaviyo Customer Agent is sold inside Klaviyo's B2C CRM and covers email, SMS, web chat and WhatsApp. [vendor claim] - [Klaviyo](https://www.klaviyo.com/solutions/ai/customer-agent)
- Siena, Yuma and Zowie sell support-first agents that sit on top of helpdesks, with Siena and Yuma adding sales agents. [press] - [Pulse 2.0 on Siena](https://pulse2.com/siena-raises-17-million-series-a-bringing-total-funding-to-29-7-million/); [competitor blog] - [eesel on Yuma](https://www.eesel.ai/blog/yuma-ai-review)
- Envive sells on-site shopping agents to larger retailers and raised a $15M Series A in September 2025. [press] - [GeekWire](https://www.geekwire.com/2025/commerce-is-entering-the-agentic-era-envive-raises-15m-to-build-ai-agents-for-online-retailers/)

Enterprise and platform players that set shopper expectations
- Fin's vendor-published roundup lists Bloomreach Clarity (custom, typically $50K+ per year), Dialog (AskDialog, quote-based) and SAP CX AI Toolkit as enterprise options. [vendor claim] - [Fin](https://fin.ai/learn/best-ai-shopping-assistants-ecommerce)
- Amazon replaced the Rufus chatbot with "Alexa for Shopping" on 13 May 2026, after reporting that 300 million customers used Rufus in 2025. [press] - [Modern Retail](https://www.modernretail.co/technology/marketplace-briefing-why-amazon-discontinued-its-ai-powered-rufus-chatbot-for-alexa-shopping-agent/)
- Tidio's roundup also lists Walmart Sparky, Perplexity Shopping and Salesforce Agentforce ($2 per conversation) as reference points. [vendor claim] - [Tidio blog, updated 16 March 2026](https://www.tidio.com/blog/ai-shopping-assistants/)

### Inferences
- Every funded vendor leads with Shopify, and other platforms get a plugin, a script or a reduced feature set, so non-Shopify stores have fewer and weaker choices.
- The platform owner is now a direct competitor on Shopify at a price of zero, which changes the entry-level economics for every third-party app there.
- The category has blurred: support-first vendors (Gorgias, Tidio, Fin, Klaviyo, Siena, Yuma) have added selling, and sales-first vendors (Rep AI, Zipchat, Alhena) have added support and helpdesk features.

### Gaps
- The Shopify App Store search page failed to load, so no total count of apps in the "AI shopping assistant" space was obtained.
- Install counts are not published by Shopify, Wix or BigCommerce, so only review counts are available as a size proxy.
- Other WordPress.org plugins surfaced by name only (LISA, Agentic Commerce for WooCommerce, Boostanova, Extraordinary AI Shopping Assistant) and their listing pages and prices were not read.
- BigCommerce and Wix marketplaces were not searched exhaustively.

## 2. For each notable vendor: pricing, pricing model, free tier, reviews, funding, owner, last major release

### Takeaway
Five pricing models coexist: free and bundled (Shopify Inbox, Wix credits), per visitor session (Rep AI), per AI reply (Zipchat, Manifest), per conversation (Alhena, Octocom, Tidio Lyro) and per resolution (Fin $0.99, Klaviyo $0.70, Gorgias $0.90 to $1.00, Siena $0.90, Yuma).
Share-of-revenue pricing is rare and the one vendor found using it (Big Sur AI) is no longer listed.

### Cited Findings

Summary table (fragments, sources in the last column)

| Vendor | Pricing model | Entry price and free tier | Reviews | Funding and owner | Last notable release or event | Sources |
|---|---|---|---|---|---|---|
| Shopify Inbox AI sales associate | Free, bundled | $0 | 4.6 from 5,828 (whole Inbox app) | Shopify (public) | Announced in Spring '26 Edition, 17 June 2026 | [listing](https://apps.shopify.com/inbox); [Shopify news](https://www.shopify.com/news/spring-26-edition-merchant) |
| Rep AI | Per website session | Free to install at $12 per 1,000 sessions; plans from about $19 (Support), $39 (Sales), $46 (Concierge) per month up to 3,000 sessions, converted | 4.6 from 129 (Shopify); 4.9 from 66 (G2) | About $14.4M raised; independent | $6.2M follow-on on 28 May 2026 with Zendesk as strategic investor | [listing](https://apps.shopify.com/rep-ai-sales-associate); [eesel](https://www.eesel.ai/blog/rep-ai-review); [Dealroom](https://dealroom.co/news/130055-rep-ai-raises-6-2m-follow-on-round-led-by-silicon-road-ventures/) |
| Zipchat | Per AI reply | Free plan with 120 AI replies (about 50 conversations); Starter $80 per month for 750 replies | 4.9 from 211 (Shopify) | No funding disclosed; founder-led | Quarterly "Editions"; voice in beta; Labs Study 001 covering Nov 2025 to Oct 2026 | [listing](https://apps.shopify.com/zipchat); [pricing](https://www.zipchat.ai/pricing.md); [llms.txt](https://www.zipchat.ai/llms.txt) |
| Alhena AI | Per conversation | Free plan with 25 conversations; Essentials $239 per month for 200 | 5.0 from 6 (Shopify); 4.9 from 36 (G2) | $4.9M seed (Sept 2023); independent | Rebrand from Gleen AI, Feb 2025; fact page updated 18 Aug 2026 | [listing](https://apps.shopify.com/gleen-ai); [llms.txt](https://alhena.ai/llms.txt); [funding blog](https://alhena.ai/blog/gleen-solves-hallucination-in-generative-ai-lands-4-9m-investment/) |
| Manifest AI | Per AI reply with a floor | No free tier; $0.05 per reply with a 10,000-reply minimum ($500 per month) | 4.3 from 62 (Shopify); 4.5 from 6 (G2) | Funding not found; listed among BIK's agent products | Pricing post updated Oct 2026; blog now carries "BIK Product Update" posts | [listing](https://apps.shopify.com/manifest-ai-shopping-assistant); [eesel](https://www.eesel.ai/blog/manifest-ai-pricing); [BIK](https://bik.ai) |
| Gorgias Shopping Assistant | Helpdesk tickets plus per automated interaction | Starter $10 per month helpdesk; with AI Agent $40 per month including 30 AI interactions | 4.3 from 709 (Shopify) | $129M raised, $530M valuation (May 2024); Shopify is an investor | Shopping Assistant introduced April 2025; billing doc updated 10 Sept 2026 | [listing](https://apps.shopify.com/helpdesk); [Macha](https://www.getmacha.com/blog/gorgias-pricing-explained); [Sacra](https://sacra.com/c/gorgias/) |
| Tidio Lyro | Per conversation | Free plan with 50 Lyro conversations once; Lyro AI Starter about $39 per month for 50 conversations, converted | 4.8 from 1,358 (Shopify) | $25M Series B; independent | Smart Actions and MCP tools now on every plan | [listing](https://apps.shopify.com/tidio-chat); [llm-info](https://www.tidio.com/llm-info/) |
| Fin (ex-Intercom) | Per resolution | $0.99 per outcome; 50-outcome minimum without Intercom seats | Not captured | Being acquired by Salesforce for about $3.6B | Renamed to Fin in May 2026; Apex 1.0 model | [Shopify listing](https://apps.shopify.com/intercom); [Salesforce PR](https://www.salesforce.com/news/press-releases/2026/06/15/salesforce-signs-definitive-agreement-to-acquire-fin/) |
| Klaviyo Customer Agent | Per resolution | 10 resolutions per month included on Free and Email plans; $700 per 1,000 resolutions | Not captured | Klaviyo (public) | General release 25 Sept 2025; 113 languages now listed | [pricing](https://www.klaviyo.com/pricing); [product page](https://www.klaviyo.com/solutions/ai/customer-agent) |
| Octocom | Per conversation | Own site: Basic $100 per month up to 199 conversations; Shopify listing: $200 per month for 350 | 4.9 from 11 (Shopify) | $290K pre-seed (Oct 2023) | Not found | [own pricing](https://www.octocom.ai/pricing); [listing](https://apps.shopify.com/ai-support); [Bounce Watch](https://bouncewatch.com/company/octocom) |
| Siena | Platform fee plus per automated ticket | $750 per month plus $0.90 per automated ticket (third-party figure) | Not captured | $29.7M raised | $17M Series A on 6 Oct 2026; Shopping Agent and Social Agent | [Pulse 2.0](https://pulse2.com/siena-raises-17-million-series-a-bringing-total-funding-to-29-7-million/); [beri.net](https://www.beri.net/tools/siena-ai) |
| Yuma AI | Per resolved ticket in packages | About $851 per month (Small Merchant) and $1,201 (Medium Merchant), converted | 5.0 from 9 (Shopify) | About $5.1M; YC W23 | Social AI and Voice AI added in 2026 | [listing](https://apps.shopify.com/yuma); [eesel](https://www.eesel.ai/blog/yuma-ai-review); [Simplify](https://simplify.jobs/c/Yuma-AI) |
| Zowie | Quote only | No public price | Not captured | About $20M; last round $14M Series A, May 2022 | Homepage now leads with banking, insurance and telecom | [eesel](https://www.eesel.ai/blog/zowie-pricing); [PR Newswire](https://prnewswire.com/news-releases/zowie-closes-14m-series-a-from-tiger-global-to-help-ecommerce-brands-turn-customer-support-into-sales-301552032.html) |
| Wix Smart Chat | Wix AI credits bundled in site plan | Free install; 50-conversation trial; about 150 to 1,000 AI actions per month by plan | 2.8 from 158 (Wix App Market) | Wix (public) | Standalone subscription stopped renewing on 10 June 2026 | [eesel](https://www.eesel.ai/blog/wix-smart-chat-review) |
| AI Shopping Assistant for WooCommerce (JUVENTIN) | Annual licence plus own OpenAI usage | INR 3,739 per year as displayed | No ratings shown | Small developer | Version 1.1.8 | [WooCommerce marketplace](https://woocommerce.com/products/ai-shopping-assistant/) |
| Big Sur AI | Fixed fee or commission on attributed sales | Was free to install | Listing removed | $6.9M seed (March 2024) | Shoptalk launch, 24 March 2025; app since delisted | [listing](https://apps.shopify.com/bigsurai); [Business Wire](https://www.businesswire.com/news/home/20240313840610/en) |

Rep AI detail
- The Shopify listing shows a free-to-install "Pay-as-you-Grow" plan at $12 per 1,000 sessions plus $0.75 per AI-resolved email or social conversation. [listing] - [Shopify App Store](https://apps.shopify.com/rep-ai-sales-associate)
- A competitor's reading of Rep's own pricing page (checked 22 October 2026) gives per-month prices of $12 for AI Sales at 3,000 sessions, $104 Sales, $49 Support and $130 Concierge at 10,000 sessions, and $368 Sales, $149 Support and $462 Concierge at 50,000 sessions. [competitor blog] - [eesel](https://www.eesel.ai/blog/rep-ai-review)
- The same review reports $2,510 (Sales) and $3,157 (Concierge) per month at 500,000 sessions, overage of $12 per 1,000 sessions capped at $1,000 per billing period, and a 14-day trial on paid plans. [competitor blog] - [eesel](https://www.eesel.ai/blog/rep-ai-review)
- Rep's prices conflict across its own surfaces: the Shopify listing, the homepage ($99 Sales, $118 Concierge, $49 Support) and the pricing page table do not match. [competitor blog] - [eesel](https://www.eesel.ai/blog/rep-ai-review)
- Rep says in review replies that it prices on website sessions and that the number of conversations cannot affect the price. [vendor claim] - [Shopify reviews page](https://apps.shopify.com/rep-ai-sales-associate/reviews)
- Rep advertises a "5x ROI money-back guarantee" for which the reviewer could not find written terms. [competitor blog] - [eesel](https://www.eesel.ai/blog/rep-ai-review)
- Add-ons include Rep Inbox helpdesk in beta at $20 per seat, "Expert Zone" features at $200 each, and Deep Research and Virtual Try-On at 10% of the Concierge price each. [competitor blog] - [eesel](https://www.eesel.ai/blog/rep-ai-review)
- Rep AI raised an $8.2M Series A in August 2024 led by Osage Venture Partners and a $6.2M follow-on in May 2026 led by Silicon Road Ventures with Zendesk participating. [press] - [Calcalist](https://www.calcalistech.com/ctechnews/article/bk1urysia); [Pulse 2.0](https://pulse2.com/rep-ai-6-2-million-raised-to-advance-ai-platform-for-ecommerce/)

Zipchat detail
- Zipchat's price list is Starter $80 (750 replies, about 300 conversations), Pro $300 (3,000 replies, about 1,250 conversations), Scale $600 (6,000 replies, about 2,500 conversations), Scale Plus $1,200 (14,000 replies, about 6,000 conversations) and Unlimited from $2,100 per month. [listing] - [Zipchat pricing](https://www.zipchat.ai/pricing.md)
- Annual billing saves 20%, extra replies cost $49 per 250 (per 500 on Scale Plus), and every plan has a 7-day trial and a 30-day money-back guarantee. [listing] - [Zipchat pricing](https://www.zipchat.ai/pricing.md)
- The Shopify listing adds a Free plan with 120 AI replies (around 50 conversations) and 100 training pages. [listing] - [Shopify App Store](https://apps.shopify.com/zipchat)
- Older snapshots show a $49 Starter with 500 replies and Growth at $129, so Zipchat raised its entry price during 2026. [aggregator] - [G2 pricing](https://www.g2.com/products/zipchat-ai/pricing); [competitor blog] - [eesel](https://www.eesel.ai/blog/zipchat-pricing)

Alhena detail
- Alhena's price list is Free (25 conversations), Essentials $239 monthly or $199 on annual (200 conversations), Growth $599 or $499 (550 conversations), Scale $1,199 or $999 (1,200 conversations) and custom Enterprise. [vendor claim] - [Alhena llms.txt](https://alhena.ai/llms.txt)
- The Shopify listing states overage above each plan's limit at $1.20 per conversation and a 14-day trial on paid plans. [listing] - [Shopify App Store](https://apps.shopify.com/gleen-ai)
- Gleen AI rebranded to Alhena AI in February 2025. [press] - [PR Newswire](https://www.prnewswire.com/news-releases/gleen-ai-announces-rebrand-to-alhena-ai-a-new-identity-for-a-bold-future-302368825.html)
- The seed amount is $4.9M on the company's blog and $4.3M on two databases. [vendor claim] - [Alhena blog](https://alhena.ai/blog/gleen-solves-hallucination-in-generative-ai-lands-4-9m-investment/); contradicted by [aggregator] [Prospeo](https://prospeo.io/c/alhena-ai-revenue)

Manifest AI detail
- Manifest's own pricing page shows only a "Book a demo" form, and the $0.05 per reply rate with a $500 monthly minimum comes from Manifest's blog as quoted by a competitor. [competitor blog] - [eesel, edited 17 Nov 2026](https://www.eesel.ai/blog/manifest-ai-pricing)
- Manifest guarantees 80%+ automation within 30 days and 90%+ after that or money back, with eligibility defined in the contract. [competitor blog quoting vendor] - [eesel](https://www.eesel.ai/blog/manifest-ai-pricing)
- Trial terms conflict between a 7-day trial on the Shopify listing and a 30-day trial or 90-day paid pilot in the pricing post. [listing] - [Shopify App Store](https://apps.shopify.com/manifest-ai-shopping-assistant); [competitor blog] - [eesel](https://www.eesel.ai/blog/manifest-ai-pricing)
- BIK's homepage lists Manifest AI among roughly ten agent products under an "Agentic AI CRM" umbrella. [vendor claim] - [BIK](https://bik.ai)

Gorgias detail
- Helpdesk plans are Starter $10 (50 tickets), Basic $60 (300), Pro $360 (2,000) and Advanced $900 (5,000) per month, priced by tickets and not seats. [listing] - [Shopify App Store](https://apps.shopify.com/helpdesk); [competitor blog] - [Macha](https://www.getmacha.com/blog/gorgias-pricing-explained)
- With the AI Agent toggle the monthly totals are $40, $90, $550 and $1,430, including bundles of 30, 30, 190 and 530 AI interactions at $1.00 each ($0.90 on annual). [competitor blog, checked against Gorgias pricing page 21 Nov 2026] - [Macha](https://www.getmacha.com/blog/gorgias-pricing-explained)
- Interactions beyond the bundle are $1.50 each according to the pricing page's structured data. [competitor blog] - [Macha](https://www.getmacha.com/blog/gorgias-pricing-explained)
- Gorgias states each AI interaction "also counts as a helpdesk ticket", so a fully automated conversation consumes both allowances for accounts created after 28 May 2025. [competitor blog quoting Gorgias docs] - [Macha](https://www.getmacha.com/blog/gorgias-pricing-explained)
- Fin's roundup summarises Gorgias Shopping Assistant as $0.90 to $1.00 per AI resolution plus a $10 to $750 monthly helpdesk fee. [vendor claim by a rival] - [Fin](https://fin.ai/learn/best-ai-shopping-assistants-ecommerce)
- Sacra lists a usage add-on called Convert priced at $0.50 to $0.60 per click, the only click-based pricing seen in this research. [analyst estimate] - [Sacra](https://sacra.com/c/gorgias/)

Tidio detail
- The Shopify listing shows Free (50 human conversations a month and 50 Lyro conversations once), Lyro AI Starter at about $39 per month (50 conversations shared by Lyro and the team) and Lyro AI Growth from about $75 to $700 per month for 100 to 1,000 conversations, with a custom plan above 1,000. [listing] - [Shopify App Store](https://apps.shopify.com/tidio-chat)
- Tidio's own blog lists Starter $24.17, Growth from $49.17, Plus from $749 and Premium from $2,999 per month. [vendor claim, updated 16 March 2026] - [Tidio blog](https://www.tidio.com/blog/ai-shopping-assistants/)
- Premium customers get a guaranteed 50% Lyro resolution rate. [vendor claim] - [Tidio llm-info](https://www.tidio.com/llm-info/)

Fin detail
- Fin bills one resolution per conversation per billing period at $0.99 and counts a resolution when the customer confirms or leaves without asking for more help. [listing] - [Intercom help center](https://intercom.com/help/en/articles/8205718-fin-resolutions)
- Used without Intercom seats, Fin costs $0.99 per outcome with a minimum monthly commitment, with 50 outcomes given as the example. [listing] - [Intercom pricing](https://www.intercom.com/pricing)

Klaviyo detail
- Klaviyo's pricing page includes Customer Agent in the Free and Email plans with 10 resolutions per month and shows it as an add-on to the Marketing plan. [listing] - [Klaviyo pricing](https://www.klaviyo.com/pricing)
- The Customer Agent page advertises "50 free resolutions" and one paid tier of 1,000 AI resolutions per month for $700. [listing] - [Klaviyo](https://www.klaviyo.com/solutions/ai/customer-agent)
- Klaviyo's ROI calculator uses $0.70 per AI conversation as the published price. [listing] - [Klaviyo ROI calculator](https://www.klaviyo.com/solutions/ai/customer-agent/roi-calculator)
- A pricing tracker separately lists Customer Agent at $200 per month, which may reflect an older package. [aggregator] - [PricingSaaS](https://pricingsaas.com/companies/klaviyo)
- Customer Agent was broadly released at Klaviyo's K:BOS event on 25 September 2025. [press] - [Business Wire](https://www.businesswire.com/news/home/20250925521199/en)

Octocom, Siena, Yuma, Zowie detail
- Octocom's own site lists Basic at $100 per month for up to 199 conversations and Advanced at $200 per month for up to 5,000 conversations, while its Shopify listing shows one plan at about $200 per month for 350 conversations plus $15 per extra 50. [listing] - [Octocom pricing](https://www.octocom.ai/pricing); contradicted by [Shopify App Store](https://apps.shopify.com/ai-support)
- Siena's $750 monthly platform fee plus $0.90 per automated ticket is a third-party figure that was not confirmed on Siena's site. [aggregator] - [beri.net](https://www.beri.net/tools/siena-ai)
- Siena's Series A of $17M was announced on 6 October 2026, led by York IE, taking total funding to $29.7M. [press] - [Pulse 2.0](https://pulse2.com/siena-raises-17-million-series-a-bringing-total-funding-to-29-7-million/)
- Yuma's own pricing page is a demo form, and a competitor review cites illustrative plans from $14,400 per year at about $1.20 per resolution. [competitor blog] - [eesel](https://www.eesel.ai/blog/yuma-ai-review)
- Zowie's pricing page returned a 404 as of July 2026, and the only number found is a $34,500 twelve-month AWS Marketplace package for 25,000 automated conversations quoted by a rival. [competitor blog] - [eesel](https://www.eesel.ai/blog/zowie-pricing); [Zipchat](https://www.zipchat.ai/alternatives/zowie.md)

Platform-native detail
- Shopify announced the AI sales associate in Inbox in its Spring '26 Edition post dated 17 June 2026, without stating a price, plan limit or usage cap. [vendor claim] - [Shopify news](https://www.shopify.com/news/spring-26-edition-merchant)
- Wix estimates AI chat actions per month at up to 150 on Light ($17 per month), 200 on Core ($29), 300 on Business ($39) and 1,000 on Business Elite ($159), shared with other Wix AI tools and with no top-ups. [competitor blog citing Wix docs, edited 21 Oct 2026] - [eesel](https://www.eesel.ai/blog/wix-smart-chat-review)
- Big Sur AI's 2025 pricing was reported as no fees until a store reached up to $2M in sales attributed to Big Sur AI. [aggregator citing 2025 press release] - [CB Insights](https://www.cbinsights.com/company/big-sur-ai)

### Inferences
- Entry prices rose during 2026 at the sales-first vendors (Zipchat from $49 to $80, Alhena to a $239 floor, Manifest to a $500 floor), which looks like a move up-market away from the smallest stores.
- Per-resolution pricing has converged in a band of $0.70 to $1.20 across Klaviyo, Fin, Gorgias, Siena, Alhena and Yuma.
- Review counts suggest real traction is concentrated: Shopify Inbox (5,828), Tidio (1,358), Gorgias (709), Zipchat (211) and Rep AI (129), while Alhena (6), Octocom (11) and Yuma (9) have little self-serve Shopify presence.
- Pricing pages are inconsistent between a vendor's site and its app listing in at least four cases (Rep AI, Octocom, Manifest, Klaviyo), which is itself a friction point for small merchants.

### Gaps
- Gorgias's own Shopping Assistant page returned a 404, so the exact price difference between Support-only and Support plus Shopping Assistant skills was not confirmed from a primary source.
- Review counts for Fin, Klaviyo, Siena and Zowie on app stores were not captured.
- Manifest AI's funding and the legal relationship with BIK could not be confirmed from a primary announcement.
- Changelog dates for the latest product release were not found for Octocom, Alhena, Gorgias or Tidio.
- A claim that Tidio changed pricing in December 2024 in a way that raised bills surfaced in search results but its source page was not identified.
- The WooCommerce plugin price was seen only in INR, and its USD list price was not captured.

## 3. What does each actually do beyond FAQ answers?

### Takeaway
Product recommendation, order tracking and some cart action are now table stakes across the funded vendors, and the leaders also handle returns, cancellations and subscription edits.
Proactive engagement, voice and image features exist but are uneven: voice is live or in beta at Alhena, Fin, Zipchat, Yuma and Siena, and image features appear mainly at Alhena and as a Rep AI add-on.

### Cited Findings

| Vendor | Product search and recommendations | Comparison or sizing | Cart and checkout | Orders and returns | Proactive | Voice | Image | Languages | Sources |
|---|---|---|---|---|---|---|---|---|---|
| Shopify Inbox agent | Yes, from catalog, inventory and policies; personalised for Shop sign-ins | Not stated | Not stated | Order inquiries | Proactive recommendations (per a rival's roundup) | Not stated | Not stated | Not stated | [Shopify news](https://www.shopify.com/news/spring-26-edition-merchant); [Fin roundup](https://fin.ai/learn/best-ai-shopping-assistants-ecommerce) |
| Rep AI | Yes, live catalog and product cards | Not stated | Adds and edits cart items; discount codes in chat | Order status, returns, exchanges, cancellations, address and subscription edits | Yes, behaviour-triggered | Not mentioned | Virtual Try-On add-on | Multi-language, no list | [listing](https://apps.shopify.com/rep-ai-sales-associate); [eesel](https://www.eesel.ai/blog/rep-ai-review) |
| Zipchat | Yes, plus "Agentic AI Search" and product-page questions | Size advice | Add-to-cart links, discount code creation, cart recovery | Order tracking, returns and refund help, stock checks, COD verification | Yes | Beta with some US clients | Not mentioned | Replies in shopper's language | [listing](https://apps.shopify.com/zipchat); [llms.txt](https://www.zipchat.ai/llms.txt) |
| Alhena AI | Yes | Comparisons; fit analyzer | Cart and checkout upsell; works with Shopify Checkout | Order tracking, cancellations, returns, exchanges, appointment booking | Not stated | Yes (Voice AI, phone and SIP) | Room-photo discovery, upload and match, skin analyzer, virtual try-on | 90+ | [listing](https://apps.shopify.com/gleen-ai); [llms.txt](https://alhena.ai/llms.txt) |
| Manifest AI | Yes, with quizzes | Not stated | Cart and checkout recovery, cart upsell | Order tracking in inbox | Storefront nudges | Voice listed as a billable channel | Not mentioned | "All languages" | [listing](https://apps.shopify.com/manifest-ai-shopping-assistant); [eesel](https://www.eesel.ai/blog/manifest-ai-pricing) |
| Gorgias Shopping Assistant | Answers product questions and recommends items in chat | Not stated | Product cards (limited, per a rival) | Via AI Agent support skills | Not confirmed | Separate voice add-on | Not stated | 15+ (per a rival) | [listing](https://apps.shopify.com/helpdesk); [Fin roundup](https://fin.ai/learn/best-ai-shopping-assistants-ecommerce) |
| Tidio Lyro | Yes, visual cards from in-stock items | Comparisons and variant selection | Adds to cart in chat on Shopify | Order status, address change, start returns via Smart Actions | Yes, on product pages | Not stated | Not stated | 12 | [listing](https://apps.shopify.com/tidio-chat); [llm-info](https://www.tidio.com/llm-info/); [Tidio blog](https://www.tidio.com/blog/ai-shopping-assistants/) |
| Fin for Ecommerce | Yes, from vague queries, with carousels | Not stated | Cart management by size, colour and options; checkout guidance | Returns, refunds, exchanges, tracking via Shopify APIs | Not stated | Yes | Not stated | 45+ | [Fin roundup](https://fin.ai/learn/best-ai-shopping-assistants-ecommerce) |
| Klaviyo Customer Agent | Yes, from behaviour and purchase history | Not stated | Applies promotions; adds items to existing orders | WISMO, returns, order edits, loyalty points, subscriptions | Not mentioned | Being added (Q1 2026 call) | Not stated | 113 | [Klaviyo](https://www.klaviyo.com/solutions/ai/customer-agent); [Q1 2026 transcript](https://s203.q4cdn.com/135375496/files/doc_financials/2026/q1/Q1-2026-Klaviyo-Transcript.pdf) |
| Octocom | Yes | Not stated | Upsell and cross-sell | Order tracking automation, order management | Not mentioned | Phone support AI add-on | File upload only | Multi-language | [listing](https://apps.shopify.com/ai-support); [Octocom pricing](https://www.octocom.ai/pricing) |
| Siena | Shopping Agent recommends products | Not stated | Completes purchases in conversation | Support automation | Not stated | Add-on | Not stated | Not stated | [Pulse 2.0](https://pulse2.com/siena-raises-17-million-series-a-bringing-total-funding-to-29-7-million/); [VentureBeat](https://venturebeat.com/data/shouldnt-customer-service-ai-remember-you-siena-to-expand-agent-of-record-combining-purchase-history-with-support-and-social) |
| Yuma AI | "Sales AI" mentioned only in a screenshot | Not stated | Not stated | Refunds, cancellations, returns, subscription changes | Not stated | Voice AI (2026) | Not stated | Not stated | [listing](https://apps.shopify.com/yuma); [eesel](https://www.eesel.ai/blog/yuma-ai-review) |
| Wix Smart Chat | Suggests products with links | Not stated | Not mentioned | Not mentioned | Not stated | Separate Wix AI Phone Agent | Images ignored in training | English-only interface | [eesel](https://www.eesel.ai/blog/wix-smart-chat-review) |
| AI Shopping Assistant for WooCommerce | Catalog search and filtering by price, category, description | Not stated | No cart actions, links only | Cannot access order history | No | No | No | Not stated | [WooCommerce marketplace](https://woocommerce.com/products/ai-shopping-assistant/) |

- Rep AI attributes a sale only when it happens in the same session, with its own AI judging whether the chat helped, and offers a holdout group for A/B measurement. [competitor blog] - [eesel](https://www.eesel.ai/blog/rep-ai-review)
- Rep AI's own fact page instead says it attributes sales within a 24-hour window, which conflicts with the same-session description. [vendor claim] - [Rep AI fact page](https://hellorep.ai/ai-instructions)
- Zipchat reports that 81% of its conversations happen before an order exists and that under 3.2% escalate to a human. [vendor claim, Labs Study 001] - [Zipchat llms.txt](https://www.zipchat.ai/llms.txt)
- Tidio and Rep AI both expose MCP integrations (Tidio Smart Actions with MCP tools, Rep's MCP server for Claude). [vendor claim] - [Tidio llm-info](https://www.tidio.com/llm-info/); [Rep AI fact page](https://hellorep.ai/ai-instructions)
- Merchant reviews of the Shopify Inbox agent in mid-2026 complain about irrelevant answers and difficulty handing chats to a human, and Shopify replies that an option to reach staff is shown after every message. [user reviews] - [Shopify App Store](https://apps.shopify.com/inbox)
- Wix Smart Chat's average review rating fell from 3.8 in 2024 to 1.7 in 2026, with wrong answers after training among the common complaints. [competitor blog analysing Wix reviews] - [eesel](https://www.eesel.ai/blog/wix-smart-chat-review)
- Rep AI's lower-star reviews describe confident but wrong or circular answers, and one reviewer called it not worth $550 a month "for a basic LLM". [user reviews via competitor blog] - [eesel](https://www.eesel.ai/blog/rep-ai-review)
- Alhena markets "hallucination-free" answers with no published method or evidence. [vendor claim] - [Alhena llms.txt](https://alhena.ai/llms.txt)

### Inferences
- Feature checklists no longer separate vendors, so differences now sit in answer quality, catalog grounding and action reliability, which is exactly where user reviews complain.
- Sizing help, structured comparison and image search are thinly covered among small-store products, with Alhena the main exception and aimed at larger brands.
- Free platform-native agents (Shopify Inbox, Wix Smart Chat) cover recommendation and basic order questions but draw quality complaints, which leaves room on quality but not on price.
- Non-Shopify platforms get shallower actions (links in place of cart edits, no order access), so depth of integration outside Shopify is a visible weakness.

### Gaps
- No independent benchmark of recommendation accuracy or answer quality across these vendors was found.
- Gorgias Shopping Assistant's discounting and proactive behaviour could not be confirmed from a primary page.
- Whether the Shopify Inbox agent can edit the cart or apply discounts is not stated in Shopify's announcement.
- Exact language counts are missing for Rep AI, Zipchat, Manifest, Octocom, Siena and Yuma.

## 4. Which underlying models do they use, and does any vendor claim its own or a fine-tuned model?

### Takeaway
Most small-store vendors do not name a model at all, and those that do name OpenAI (Rep AI, Manifest) or Anthropic's Claude (Tidio).
Only Fin (proprietary Apex 1.0), Envive (merchant-specific fine-tuned models) and Gorgias (internal fine-tuned models alongside OpenAI and Anthropic) make model ownership part of their story, and all three sell mainly above the smallest-store tier.

### Cited Findings
- Rep AI's help center says Rep is powered by ChatGPT and trained on the whole site except the blog. [competitor blog quoting vendor help center] - [eesel](https://www.eesel.ai/blog/rep-ai-review)
- Manifest AI's Shopify listing names ChatGPT and OpenAI. [listing] - [Shopify App Store](https://apps.shopify.com/manifest-ai-shopping-assistant)
- Tidio's Lyro is built on Anthropic's Claude according to Anthropic's customer story, which reports 2M+ conversations resolved and 700% growth in Lyro adoption within a year. [vendor claim by model supplier] - [Claude customer story](https://claude.com/customers/tidio)
- Gorgias says its AI Agent uses multiple LLM providers including OpenAI and Anthropic plus internally fine-tuned LLMs. [vendor claim] - [Gorgias docs](https://docs.gorgias.com/security-and-privacy-faq-for-gorgias-ai-agent-1997987)
- Fin says its agent runs on Fin Apex 1.0 and claims it beats GPT-5.4 and Opus 4.5 on resolution rate, latency and cost. [vendor claim] - [Fin](https://fin.ai/learn/best-ai-shopping-assistants-ecommerce)
- Salesforce's acquisition release describes Fin as running on Apex, "a proprietary AI model designed for customer service", and cites Fin's "proprietary models" as part of the deal rationale. [press] - [Salesforce](https://www.salesforce.com/news/press-releases/2026/06/15/salesforce-signs-definitive-agreement-to-acquire-fin/)
- Envive describes custom merchant-specific models fine-tuned on a retailer's products, pricing and voice, with guardrails and reinforcement-learning techniques. [vendor claim] - [Envive](https://www.envive.ai/product-feature)
- Alhena names no model, mentions a "self-hosted LLM option for some enterprise deployments" and says the assistant is trained on a brand's tone, policies and data. [vendor claim] - [Alhena llms.txt](https://alhena.ai/llms.txt)
- Zipchat names no model, says it does not train or fine-tune on customer data without authorization, and says its AI providers work under zero-training contracts. [vendor claim] - [Zipchat llms.txt](https://www.zipchat.ai/llms.txt)
- Klaviyo describes Customer Agent as pre-trained on retail workflows and brand voice and built on the Klaviyo CRM, without naming a model. [vendor claim] - [Klaviyo](https://www.klaviyo.com/solutions/ai/customer-agent)
- Octocom, Yuma, Shopify Inbox and Wix Smart Chat name no model on the pages read. [listing] - [Octocom](https://www.octocom.ai/pricing); [Yuma](https://apps.shopify.com/yuma); [Shopify Inbox](https://apps.shopify.com/inbox); [competitor blog] - [eesel on Wix](https://www.eesel.ai/blog/wix-smart-chat-review)
- The WooCommerce marketplace plugin lets the merchant pick an OpenAI model from GPT-3.5 Turbo up to GPT-5.4 using their own key. [listing] - [WooCommerce marketplace](https://woocommerce.com/products/ai-shopping-assistant/)

### Inferences
- At the small-store end, vendors sell outcomes (conversion lift, automation rate, ROI guarantees) and treat the model as a hidden commodity.
- A fine-tuned commerce model is therefore not a recognised buying criterion for small merchants today, so a new entrant would have to prove the benefit through visible answer quality and not through the claim itself.
- The one vendor that built a proprietary model and marketed it hard (Fin) reached roughly $100M in agent ARR and a $3.6B exit, which shows the claim can matter at scale and with evidence.

### Gaps
- No vendor publishes an evaluation that would let a buyer compare a fine-tuned model against a general model on shopping tasks.
- The models behind Shopify Inbox's agent, Klaviyo's K:AI, Zipchat, Alhena and Octocom are undisclosed.
- Fin's benchmark claims for Apex 1.0 were not independently verified.

## 5. Which vendors were acquired, shut down or pivoted in 2025 and 2026, and why?

### Takeaway
The biggest event is Salesforce's agreement on 15 June 2026 to buy Fin (formerly Intercom) for about $3.6B, and the clearest casualty among small-store shopping assistants is Big Sur AI, whose Shopify app is delisted and whose domain no longer resolves.
Around them, platforms absorbed the function (Shopify Inbox agent, Wix Smart Chat, Amazon folding Rufus into Alexa), several vendors moved up-market or rebranded, and off-site agent checkout stumbled.

### Cited Findings

Acquisitions
- Salesforce signed a definitive agreement on 15 June 2026 to acquire Fin for approximately $3.6B, expected to close in the fourth quarter of Salesforce's fiscal 2027. [press] - [Salesforce](https://www.salesforce.com/news/press-releases/2026/06/15/salesforce-signs-definitive-agreement-to-acquire-fin/)
- Dealroom states the acquisition completed in September 2026, which conflicts with the expected timing in the press release and was not confirmed elsewhere. [aggregator] - [Dealroom](https://dealroom.co/charts/fin-intercom)
- Intercom renamed the company Fin in May 2026 and kept Intercom as the helpdesk product name. [press] - [MarTech](https://martech.org/salesforce-acquires-fin-formerly-known-as-intercom/)
- Bluecore acquired the shopping assistant alby in November 2024 and opened it to all Shopify retailers in May 2025. [aggregator] - [MergerLinks](https://app.mergerlinks.com/transactions/2024-11-12-alby/dealmakers); [press] - [Retail IT Insights](https://www.retailitinsights.com/doc/bluecore-expands-beyond-enterprise-launches-ai-shopping-agent-alby-retailers-shopify-0001)
- Salesforce agreed in February 2026 to acquire Cimulate, a product discovery startup with conversational shopping agents, for its Agentforce Commerce suite. [press] - [CIO](https://cio.com/article/4130829/salesforce-buys-cimulate-to-boost-its-agentforce-commerce-suite.html)
- Zoovu acquired XGEN AI in May 2026 to back its Zoe shopping assistant. [press] - [Zoovu](https://zoovu.com/news/zoovu-acquires-xgenai)
- Whatnot acquired the recommendation and search company Shaped in July 2026. [press] - [TechCrunch](https://techcrunch.com/2026/07/15/whatnot-acquires-shaped-to-power-real-time-live-shopping-recommendations/)
- Shopify acquired the generative search startup Vantage Discovery, with the date not shown in the result read. [press] - [eMarketer](https://www.emarketer.com/content/shopify-acquires-vantage-discovery-genai-search)
- PayPal agreed in January 2026 to acquire Cymbio for agentic commerce catalog distribution. [press] - [Digital Commerce 360](https://www.digitalcommerce360.com/2026/01/22/paypal-acquisition-cymbio-ai-shopping/)

Shutdowns, delistings and uncertain status
- Big Sur AI's Shopify listing says the app is not currently available, and its website domain did not resolve on 23 November 2026. [listing] - [Shopify App Store](https://apps.shopify.com/bigsurai)
- PitchBook lists Big Sur AI as acquired by Alphabet on 7 January 2025, while CB Insights shows it alive with a product launch on 24 March 2025, so the acquisition claim is unverified. [aggregator] - [PitchBook](https://pitchbook.com/profiles/company/531335-98); contradicted by [CB Insights](https://www.cbinsights.com/company/big-sur-ai)
- Big Sur AI had raised a $6.9M seed led by Lightspeed in March 2024. [press] - [Business Wire](https://www.businesswire.com/news/home/20240313840610/en)
- Alle, an Indian conversational "AI stylist" started in 2023, shut down after six pivots without finding a viable business model, reported in January 2026. [press] - [YourStory](https://yourstory.com/2026/01/elevation-capital-backed-ai-stylist-alle-shuts-shop)
- Amazon retired the Rufus brand on 13 May 2026 and replaced it with Alexa for Shopping inside the main search bar. [press] - [Modern Retail](https://www.modernretail.co/technology/marketplace-briefing-why-amazon-discontinued-its-ai-powered-rufus-chatbot-for-alexa-shopping-agent/)
- OpenAI shut down ChatGPT's Instant Checkout and moved to a retailer app model, with only about 30 Shopify merchants reported as participating by February 2026. [press] - [Shopifreaks](https://www.shopifreaks.com/openai-pivots-from-instant-checkout-to-an-app-based-shopping-model-inside-chatgpt/); [TechCrunch](https://techcrunch.com/2026/03/24/openais-plans-to-make-chatgpt-more-like-amazon-arent-going-so-well)
- Wix retired the old Wix Chat, turned AI Site Chat into Smart Chat and stopped renewing its standalone subscription from 10 June 2026 in favour of plan-included AI credits. [competitor blog citing Wix docs] - [eesel](https://www.eesel.ai/blog/wix-smart-chat-review)

Pivots and repositioning
- Zowie launched for ecommerce in 2022 but its homepage now leads with banking, insurance and telecom. [competitor blog] - [eesel](https://www.eesel.ai/blog/zowie-pricing)
- Manifest AI now describes itself as an agentic engine for enterprise commerce, sets a $500 monthly floor and appears under BIK's product umbrella. [competitor blog] - [eesel](https://www.eesel.ai/blog/manifest-ai-pricing); [vendor claim] - [BIK](https://bik.ai)
- Gleen AI rebranded to Alhena AI in February 2025 and repositioned from support tool to ecommerce profitability, later adding an "AI Visibility" product that tracks what AI engines recommend. [press] - [PR Newswire](https://www.prnewswire.com/news-releases/gleen-ai-announces-rebrand-to-alhena-ai-a-new-identity-for-a-bold-future-302368825.html); [vendor claim] - [Alhena llms.txt](https://alhena.ai/llms.txt)
- Rep AI's May 2026 round was pitched as building a unified "AI operating system" for ecommerce brands, and it now sells its own helpdesk in beta. [press] - [Shopifreaks](https://www.shopifreaks.com/rep-ai-raises-6-2m-led-by-silicon-road-ventures-to-build-a-unified-ai-operating-system-for-e-commerce-brands/); [competitor blog] - [eesel](https://www.eesel.ai/blog/rep-ai-review)
- Siena now positions itself as an "Agent of Record" combining purchase history with support and social. [press] - [VentureBeat](https://venturebeat.com/data/shouldnt-customer-service-ai-remember-you-siena-to-expand-agent-of-record-combining-purchase-history-with-support-and-social)
- Gorgias repositioned as a "Conversational AI platform" in January 2025 and introduced Shopping Assistant in April 2025. [analyst estimate] - [Sacra](https://sacra.com/c/gorgias/)
- Shopify's Winter '26 Edition added agentic storefronts for selling inside AI chatbots, and its Fall '26 Edition (28 October 2026) added shop.md so agents such as ChatGPT and Claude can search, check out and track orders. [press] - [BetaKit](https://betakit.com/shopify-merchants-can-now-sell-products-through-ai-chatbots/); [IT Brief](https://itbrief.com.au/story/shopify-unveils-ai-shopping-tools-in-fall-26-update)

### Inferences
- Exits so far reward breadth and scale (Fin) or go to incumbents buying discovery technology, and no small-store shopping-assistant startup has had a publicly confirmed large exit.
- Pure shopping-assistant plays tend to drift toward support, helpdesk or enterprise within two to three years, which suggests stand-alone pre-purchase chat for small stores has been hard to monetise.
- Platform absorption is the main structural risk: Shopify and Wix now give a baseline assistant away, as Amazon did on its own marketplace.
- The failure of in-chat checkout at OpenAI keeps the merchant's own site as the place where purchases close, which supports continued demand for on-site assistants.

### Gaps
- What actually happened to Big Sur AI (acquihire, shutdown or rename) could not be confirmed from any primary source.
- No confirmation was found of whether the Salesforce and Fin deal has closed.
- The date of Shopify's Vantage Discovery acquisition was not confirmed in this pass.
- No public reason was found for Zowie's move away from ecommerce beyond the change in its homepage.

## 6. Lowest price for a store under 5,000 monthly visitors, and what a 50,000-visitor store pays

### Takeaway
A store under 5,000 monthly visitors can get a working assistant for $0 (Shopify Inbox agent, Zipchat Free, Alhena Free, Klaviyo's included resolutions) or for roughly $10 to $80 a month from paid entry plans.
A store with 50,000 monthly visitors typically pays about $300 to $1,200 a month with the funded third-party vendors, against $0 for Shopify's own agent.

### Cited Findings

Under 5,000 monthly visitors
- Shopify Inbox with the AI sales associate is listed as free. [listing] - [Shopify App Store](https://apps.shopify.com/inbox)
- Zipchat's Free plan covers 120 AI replies or around 50 conversations a month, and Starter is $80 a month for 750 replies or about 300 conversations. [listing] - [Shopify App Store](https://apps.shopify.com/zipchat); [Zipchat pricing](https://www.zipchat.ai/pricing.md)
- Alhena's Free plan covers 25 conversations a month and 500 SKUs, and the next step is $239 a month. [listing] - [Shopify App Store](https://apps.shopify.com/gleen-ai)
- Klaviyo includes 10 Customer Agent resolutions a month on its Free and Email plans and prices further use at $0.70 per resolution. [listing] - [Klaviyo pricing](https://www.klaviyo.com/pricing); [Klaviyo ROI calculator](https://www.klaviyo.com/solutions/ai/customer-agent/roi-calculator)
- Rep AI's pay-as-you-grow rate of $12 per 1,000 sessions puts 5,000 sessions at about $60 a month, and its pricing page lists AI Sales at $12 a month for 3,000 sessions. [listing] - [Shopify App Store](https://apps.shopify.com/rep-ai-sales-associate); [competitor blog] - [eesel](https://www.eesel.ai/blog/rep-ai-review)
- Tidio's free plan gives 50 Lyro conversations once only, and Lyro AI Starter is about $39 a month for 50 conversations. [listing] - [Shopify App Store](https://apps.shopify.com/tidio-chat)
- Gorgias Starter with the AI Agent toggle is $40 a month including 30 AI interactions. [competitor blog] - [Macha](https://www.getmacha.com/blog/gorgias-pricing-explained)
- Fin's floor without Intercom seats is a minimum commitment of about 50 outcomes at $0.99, close to $50 a month. [listing] - [Intercom pricing](https://www.intercom.com/pricing)
- Long-tail Shopify apps start at $9.99 a month or offer free plans with 100 AI conversations or messages a month. [listing] - [Easy AI](https://apps.shopify.com/easy-ai-shopping-assistant); [AI Shopping Agent & Support](https://apps.shopify.com/ai-shopping-agent); [ShopAI](https://apps.shopify.com/shopai-assistant)
- On Wix, the cheapest paid site plan ($17 a month) includes an estimated 150 AI chat actions a month. [competitor blog citing Wix docs] - [eesel](https://www.eesel.ai/blog/wix-smart-chat-review)
- On WooCommerce, the marketplace plugin costs INR 3,739 a year plus the merchant's own OpenAI usage. [listing] - [WooCommerce marketplace](https://woocommerce.com/products/ai-shopping-assistant/)

50,000 monthly visitors
- Rep AI at 50,000 sessions is $368 a month for AI Sales, $149 for AI Support and $462 for the Concierge bundle, or about 20% less on yearly billing. [competitor blog reading vendor pricing page, 22 Oct 2026] - [eesel](https://www.eesel.ai/blog/rep-ai-review)
- Zipchat Pro is $300 a month for about 1,250 conversations and Scale is $600 for about 2,500. [listing] - [Zipchat pricing](https://www.zipchat.ai/pricing.md)
- Alhena Growth is $599 a month for 550 conversations and Scale is $1,199 for 1,200, with $1.20 per extra conversation. [vendor claim] - [Alhena llms.txt](https://alhena.ai/llms.txt); [listing] - [Shopify App Store](https://apps.shopify.com/gleen-ai)
- Tidio Lyro AI Growth runs from about $75 to $700 a month for 100 to 1,000 conversations, and more than 1,000 needs a custom plan. [listing] - [Shopify App Store](https://apps.shopify.com/tidio-chat)
- Gorgias Pro with AI is $550 a month including 190 AI interactions, Advanced with AI is $1,430 including 530, and extra interactions are $1.50 each. [competitor blog] - [Macha](https://www.getmacha.com/blog/gorgias-pricing-explained)
- Klaviyo's published tier is $700 a month for 1,000 resolutions. [listing] - [Klaviyo](https://www.klaviyo.com/solutions/ai/customer-agent)
- Fin charges $0.99 per resolved outcome and reports a 76% average resolution rate. [vendor claim] - [Fin](https://fin.ai/learn/best-ai-shopping-assistants-ecommerce)
- Manifest AI's floor is $500 a month for 10,000 AI replies, with a stated average of 3 replies per conversation. [competitor blog quoting vendor] - [eesel](https://www.eesel.ai/blog/manifest-ai-pricing)
- Octocom is $200 a month, covering up to 5,000 conversations on its own site or 350 plus $15 per extra 50 on its Shopify listing. [listing] - [Octocom pricing](https://www.octocom.ai/pricing); contradicted by [Shopify App Store](https://apps.shopify.com/ai-support)
- Siena is reported at $750 a month plus $0.90 per automated ticket, and Yuma's Shopify plans start near $851 a month. [aggregator] - [beri.net](https://www.beri.net/tools/siena-ai); [listing] - [Shopify App Store](https://apps.shopify.com/yuma)
- Scandiweb puts per-conversation SaaS agents at about $0.90 to $2.00 per resolved conversation. [agency blog] - [Scandiweb](https://scandiweb.com/blog/ai-shopping-assistant/)
- One vendor case study (PlushBeds on alby) reports the assistant engaging 15% of website traffic, which is a high-end vendor-reported engagement figure. [vendor claim] - [Retail Tech Innovation Hub](https://retailtechinnovationhub.com/category/ai/plushbeds-wayb-denali-electronics-among-early-retailers-on-shopify-to-tap-bluecore-alby-ai-shopping-agent)

### Inferences
- These scenario totals rest on my own assumption that 1% to 3% of visitors open a chat, giving about 50 to 150 conversations a month at 5,000 visitors and 500 to 1,500 at 50,000 visitors, because no independent engagement-rate study was found.
- Under that assumption a 5,000-visitor store fits inside free tiers at Shopify Inbox and Zipchat, and pays roughly $35 to $105 at Klaviyo, $50 to $150 at Fin, about $60 at Rep AI, $39 to $75 at Tidio and $80 at Zipchat Starter.
- Under the same assumption a 50,000-visitor store pays roughly $300 to $600 at Zipchat, $370 to $460 at Rep AI, $350 to $1,050 at Klaviyo, $375 to $1,130 at Fin (at a 76% resolution rate), up to $700 or a custom plan at Tidio, $600 to about $1,560 at Alhena and $550 to $1,430 or more at Gorgias.
- If engagement reached the 15% seen in the alby case study, per-conversation and per-resolution vendors would cost several thousand dollars a month at 50,000 visitors, while Rep AI's session price would not change.
- Session-based pricing (Rep AI) charges for traffic whether or not anyone chats, and per-resolution pricing charges only for use, so the cheaper model depends on engagement rate.
- Price is not where a gap exists for Shopify stores, since the floor is zero; the third-party vendors justify $300 to $1,200 a month with conversion-lift claims that are vendor-reported.

### Gaps
- No independent study of the share of store visitors who open an on-site AI chat was found.
- Conversion-lift figures are vendor-reported only, such as Gorgias saying brands using its shopping assistant nearly doubled conversion rates. [vendor claim] - [Gorgias research](https://www.gorgias.com/research/ai-shopping-assistants-are-now-officially-influencing-sales)
- Whether the Shopify Inbox agent has any usage cap or will stay free is not stated by Shopify.
- A truly independent, non-affiliate price comparison of these vendors was not found.

## 7. Is any vendor growing fast? Public revenue, ARR and customer counts

### Takeaway
Fin is the clear growth story, with its AI agent at roughly $100M to $110M ARR and reported 3.5x growth before the $3.6B Salesforce deal.
Among small-store specialists the only public number is Zipchat's unverified founder-sourced climb from $1M to $2M ARR in about eight months, and Gorgias (about $69M ARR in 2024) and Klaviyo (Customer Agent adoption up 40% quarter over quarter) show the incumbents scaling too.

### Cited Findings
- Fin's AI agent was reported at about $100M ARR and growing 3.5x in 2026, with Dealroom putting it near $110M inside a company total of about $400M. [aggregator] - [Dealroom](https://dealroom.co/charts/fin-intercom)
- Sacra estimates Intercom reached $400M ARR in April 2026, up from $382M at the end of 2025. [analyst estimate] - [Sacra](https://sacra.com/research/intercom)
- Everest Group says the legacy helpdesk is roughly $300M of the $400M ARR. [analyst estimate] - [Everest Group](https://www.everestgrp.com/blogs/salesforce-built-the-foundation-fin-brings-the-intelligence/)
- Fin claims a 76% average resolution rate across 12,000+ customers and close to 2 million issues resolved a week. [vendor claim] - [Fin](https://fin.ai/learn/best-ai-shopping-assistants-ecommerce)
- Fin's press materials cite a customer base of more than 30,000 companies. [press] - [Salesforce](https://www.salesforce.com/news/press-releases/2026/06/15/salesforce-signs-definitive-agreement-to-acquire-fin/)
- Sacra estimates Gorgias at $25M ARR in 2022, $51M in 2023 and $69M in 2024 (up about 34%), with 15,000+ merchants, $129M raised and a $530M valuation in May 2024. [analyst estimate] - [Sacra](https://sacra.com/c/gorgias/)
- Gorgias's 2026 report draws on 16,000+ customers and 350M+ conversations, and says nearly 10M conversations turned into a purchase in 2025. [vendor claim] - [Retail Dive press release](https://retaildive.com/press-release/20260203-gorgias-unveils-the-state-of-conversational-commerce-in-2026-trends-report/)
- Gorgias research dated 28 April 2026 reports a median 45% AI resolution rate and 65% for the top quartile. [vendor claim via competitor blog] - [Macha](https://www.getmacha.com/blog/gorgias-pricing-explained)
- Klaviyo said on its Q2 2026 call (5 August 2026) that Customer Agent adoption grew 40% quarter over quarter. [earnings call] - [Klaviyo Q2 2026 transcript](https://s25.q4cdn.com/801988311/files/doc_financials/2026/q2/Q2-2026-Klaviyo-Transcript.pdf)
- Klaviyo reported crossing a $1.5B annualized revenue run rate in Q3 2026 (4 November 2026) without breaking out Customer Agent revenue. [earnings call] - [Klaviyo Q3 2026 transcript](https://s25.q4cdn.com/801988311/files/content_files/Klaviyo-Q3-2026-Earnings-Transcript.pdf)
- Klaviyo claims Customer Agent resolves 65% of questions without a human, and one case study shows 86%. [vendor claim] - [Klaviyo](https://www.klaviyo.com/solutions/ai/customer-agent)
- An ARR tracker logs Zipchat at $1.5M ARR on 2 June 2026 and $2M on 12 September 2026, "doubling just 8 months after reaching $1M ARR", with no primary source cited. [aggregator] - [ARR.club](https://www.arr.club/zipchat)
- Zipchat's founder says it handles 700,000 conversations a month and grows about 10% week over week. [founder post, undated] - [Indie Hackers](https://www.indiehackers.com/post/building-a-2m-arr-product-after-his-8m-arr-product-failed-overnight-UZm68xNgjDZBHH7Mvc54)
- Zipchat claims 2,500+ brands, more than $150M in revenue generated through its conversations and an average 16.3% chat-to-sale conversion. [vendor claim] - [Zipchat llms.txt](https://www.zipchat.ai/llms.txt); [Shopify App Store](https://apps.shopify.com/zipchat)
- Tidio claims more than 300,000 customers, 180+ employees and a $25M Series B. [vendor claim] - [Tidio llm-info](https://www.tidio.com/llm-info/)
- Tidio says customers average a 75% resolution rate with Lyro, while a competitor guide puts typical store results at 40% to 60%. [vendor claim] - [Tidio blog](https://www.tidio.com/blog/ai-shopping-assistants/); contradicted by [competitor blog] [My AskAI](https://myaskai.com/blog/tidio-ai-complete-guide-2026.md)
- Rep AI has raised about $14.4M in total and discloses no customer count, only "millions of shopper conversations". [vendor claim] - [Rep AI fact page](https://hellorep.ai/ai-instructions)
- Octocom says it is "Trusted by 1,000+ companies" on about $290K of recorded funding. [vendor claim] - [Octocom pricing](https://www.octocom.ai/pricing); [aggregator] - [Bounce Watch](https://bouncewatch.com/company/octocom)
- Siena raised $17M in October 2026 and names FIGS, Gruns and SPANX as customers. [press] - [Pulse 2.0](https://pulse2.com/siena-raises-17-million-series-a-bringing-total-funding-to-29-7-million/)
- Envive raised a $15M Series A in September 2025 for a total of $20M. [press] - [Digital Commerce 360](https://www.digitalcommerce360.com/2025/09/29/envive-ai-15-million-series-a-funding/)
- Alhena reported "more than 10 customers" at its 2023 seed and now publishes case studies for brands such as Tatcha and Victoria Beckham. [press and vendor claim] - [Maginative](https://www.maginative.com/article/gleen-secures-4-9-million-to-eliminate-hallucination-in-generative-ai-customer-support/); [Alhena llms.txt](https://alhena.ai/llms.txt)
- Amazon said Rufus was used by 300 million customers in 2025 and drove nearly $12B in incremental annualized sales. [press citing Amazon] - [Modern Retail](https://www.modernretail.co/technology/marketplace-briefing-why-amazon-discontinued-its-ai-powered-rufus-chatbot-for-alexa-shopping-agent/)

### Inferences
- Revenue in this category concentrates in support-led suites with large installed bases (Fin, Gorgias, Klaviyo, Tidio), and the sales-first small-store specialists are one to two orders of magnitude smaller.
- Zipchat's reported path suggests a lean team can reach low single-digit millions of ARR in this niche within about three years, but the figure is unverified and came with rising entry prices.
- Venture funding for small-store shopping assistants has been modest (Rep AI $14.4M, Alhena $4.9M, Octocom $0.29M), and the larger rounds went to support automation (Siena) and enterprise agents (Envive).
- Customer-count claims are not comparable across vendors because they mix free users, paying brands and whole-company totals.

### Gaps
- A newsletter-style claim that Gorgias's AI Agent business is at about $100M ARR and growing 100% surfaced in search results without an identifiable source, and it conflicts with Sacra's $69M total ARR for 2024, so it is not relied on here.
- No public ARR or paying-customer counts were found for Rep AI, Alhena, Manifest AI, Octocom, Yuma or Siena.
- No adoption figures were found for the Shopify Inbox AI sales associate.
- Tidio's revenue and Lyro-specific customer count are not public.
- Zipchat's ARR figures trace back to the founder and an ARR tracker, with no audited or third-party confirmation.
