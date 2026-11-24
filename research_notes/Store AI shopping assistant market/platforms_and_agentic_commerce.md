# Platform risk and agentic commerce - what platforms and large AI assistants do themselves in AI-assisted shopping (state as of November 2026)

Research date: 2026-11-23.
Source labels used below: (primary) = the company's own page or docs, (press report) = news outlet, (vendor claim) = a number published by the company that benefits from it, (independent study) = analyst or research firm, (secondary blog) = third-party or competitor blog, (forum post) = community or review text.
Facts older than 2026 carry their date.
Pages that could not be opened: Adobe's Q3 2026 PDF and one Adobe blog (timeouts), two eMarketer articles (403 or paywall), the GlobeNewswire release for BigCommerce (403), one Shopify community thread (404).
Where a page was not opened and the fact comes only from a search-result summary, the line says "search summary, page not opened".
Text addressed to AI agents was found on one page: the Chatty blog post on Shopify Inbox carries "Summarize this post with AI" buttons whose prefilled prompt tells an AI to cite only that site and not search elsewhere.
It was treated as data and not followed.

## 1. What AI assistant features do store platforms give merchants natively, free or bundled?

### Takeaway
Shopify has shipped a free, opt-in, shopper-facing "Inbox agent" (the "AI sales associate") since June 17, 2026, and BigCommerce announced a native storefront Shopping Agent on November 16, 2026.
Wix has a credit-metered on-site AI chat, while no native shopper-facing assistant was found for WooCommerce core, Squarespace, Square Online or Ecwid.

### Cited Findings

Shopify - shopper-facing

- Shopify's Spring '26 Edition (June 17, 2026) announced "A new AI sales associate joins Inbox" that lives on the storefront, answers buyer questions, suggests products and handles order inquiries using catalog, inventory and policy data (primary). - [Shopify newsroom, Spring '26](https://www.shopify.com/news/spring-26-edition-merchant)
- Shopify's own blog (published and updated November 11, 2026) lists Inbox as "Free with a Basic, Grow, Advanced, or Plus subscription" and says the store must have "an active online store and uses new customer accounts" (primary). - [Shopify blog](https://www.shopify.com/blog/ai-chatbot)
- The same Shopify blog says the agent answers product and policy questions, recommends products, adds items to the cart (listed in its comparison table), looks up orders for signed-in customers, hands the conversation to staff with context, and replies in the customer's language (primary). - [Shopify blog](https://www.shopify.com/blog/ai-chatbot)
- The Inbox agent is opt-in: "If you already use Inbox, then your conversations stay with your staff until you choose to turn on the Inbox agent" (primary). - [Shopify Help Center](https://help.shopify.com/en/manual/inbox/ai)
- The agent draws on the product catalog, store policies, Knowledge Base facts and published storefront content, can run cited web search for reviews of a catalog product, and personalizes with Shop sign-in or an active Shop session (primary). - [Shopify Help Center](https://help.shopify.com/en/manual/inbox/ai)
- The Shopify App Store listing shows Shopify Inbox as Free, 4.6 stars from 5,828 reviews, described as "An AI sales associate for your online store", with analytics for orders assisted and buyer satisfaction (primary, figures read November 2026). - [Shopify App Store](https://apps.shopify.com/inbox)
- An App Store review dated October 30, 2026 complains that the merchant cannot plug in their own AI agent and that Inbox has no API and no email replies (forum post). - [Shopify App Store](https://apps.shopify.com/inbox)
- A competitor blog reports documented limits: online-store chat widget only, Messenger and Instagram no longer supported, no proactive conversations, no support-email ticketing, manual assignment without topic routing, and the merchant is responsible for answer accuracy (secondary blog, competitor, last updated October 12, 2026). - [Chatty](https://chatty.net/blog/shopify-inbox/)
- Other third-party reviews add that the agent does not work with legacy customer accounts, cannot send email, has an AI notice that cannot be removed, and has no documented refund, cancellation or return actions (secondary blogs, search summary, pages not opened). - [Kanal](https://getkanal.com/blog/shopify-inbox); [Engaige](https://letsengaige.com/blog/shopify-inbox/)
- One review says Shopify's documentation still describes the Inbox agent as early access for certain merchants, which conflicts with Shopify's November 11, 2026 blog that treats it as launched (secondary blog, search summary, not verified). - [Studio Niza](https://studioniza.com/journal/shopify-inbox-ai-agent-setup/); contradicted by [Shopify blog](https://www.shopify.com/blog/ai-chatbot)
- Shopify's developer docs tell merchants who want AI chat without code to "use the Inbox agent in Shopify Inbox" (primary). - [shopify.dev](https://shopify.dev/docs/apps/build/storefront-mcp)
- The Shop app got AI-powered Shop Search with conversational queries tailored to shopping history in Spring '26 (primary). - [Shopify newsroom, Spring '26](https://www.shopify.com/news/spring-26-edition-merchant)

Shopify - merchant-facing and infrastructure

- Sidekick is merchant-facing; Spring '26 added Sidekick Pulse and App Extensions "live for 15+ partners, including Klaviyo, Loop, and Smile" (primary). - [Shopify newsroom, Spring '26](https://www.shopify.com/news/spring-26-edition-merchant)
- In Q3 2026 daily active merchants on Sidekick rose 3.7x year over year and daily sessions 4.2x (vendor claim from the earnings call, relayed in a press report). - [PPC Land](https://ppc.land/shopify-revenue-gains-32-to-3-7bn-as-ai-referred-orders-rise-3-3x/)
- Shopify replaced the standalone Knowledge Base app with a knowledge base in the admin at Sales channels > Agentic > Knowledge base (changelog dated October 26, 2026), and the old app stops being available after January 15, 2027 (press report). - [Search Engine Journal](https://searchenginejournal.com/shopify-ai-agent-knowledge-base-admin/594551)
- The new knowledge base holds at most 1,000 facts, publishes store policies and contact info by default, and is exposed to AI shopping agents including the Shop app and third-party platforms (press report). - [Search Engine Journal](https://searchenginejournal.com/shopify-ai-agent-knowledge-base-admin/594551)
- The old Knowledge Base app showed a query log of customer questions sent to AI assistants, and the new admin page does not list that log (press report). - [Search Engine Journal](https://searchenginejournal.com/shopify-ai-agent-knowledge-base-admin/594551)
- An independent test of Shopify's policy tool across stores in August and September 2026 found that of 88 stores queried, two gave a usable answer about canceling an order (independent test by Bill Hunt, relayed in a press report). - [Search Engine Journal](https://searchenginejournal.com/shopify-ai-agent-knowledge-base-admin/594551)
- Agentic Storefronts is a section in every Shopify admin where merchants toggle product discovery and direct checkout per AI channel and see orders, sales and conversions from AI channels (primary). - [Shopify newsroom, Spring '26](https://www.shopify.com/news/spring-26-edition-merchant)
- The Agentic plan lets brands that do not use Shopify for ecommerce list products in Shopify Catalog for AI channels and the Shop app, and was made publicly available on March 24, 2026; no price is stated (primary). - [Shopify newsroom](https://shopify.com/news/agentic-commerce-momentum)

WooCommerce

- WooCommerce's own March 17, 2026 post describes MCP integration and "ACP and UCP development so Woo stores are discoverable through Google's and OpenAI's surfaces", and does not describe any native shopper-facing on-site assistant (primary). - [WooCommerce](https://woocommerce.com/posts/ai-product-discovery/)
- A WooCommerce developer post (September 16, 2026) says "WooCommerce AI" "lives inside wp-admin" and is aimed at merchants, and that its shopper-agent reference code is "built for experimentation and growth, and are not maintained within official capacity" (primary). - [WooCommerce Developer Blog](https://developer.woocommerce.com/2026/09/16/wc-claude-commerce-agent/)
- Native MCP shipped in WooCommerce 10.9 on June 23, 2026 as a developer preview, with earlier MCP support in 10.3, and agentic checkout through ACP or UCP is not in core yet (secondary blogs, search summary, pages not opened). - [Digital Applied](https://www.digitalapplied.com/blog/woocommerce-10-9-mcp-agent-ready-wordpress-store-guide); [InfinaCode](https://infinacode.com/blog/woocommerce-mcp-ai-agent)

Wix

- "Wix Smart Chat (formerly AI Site Chat) now uses AI credits instead of a separate Smart Chat subscription", and the chat answers site visitors and suggests products and services (primary, article updated June 2, 2026). - [Wix Help Center](https://support.wix.com/en/article/wix-smart-chat-using-ai-credits)
- From June 10, 2026 monthly Smart Chat subscriptions stopped renewing and moved to the AI credits included in the site plan, and when credits run out the AI chat goes offline unless the owner switches to manual chat (primary). - [Wix Help Center](https://support.wix.com/en/article/wix-smart-chat-using-ai-credits)
- A third-party guide puts the Wix free-plan allowance at up to 120 credits a month with a 30-a-day cap (secondary blog, competitor, not verified against Wix). - [eesel](https://www.eesel.ai/blog/wix-smart-chat-review)
- Chatting with Aria, Wix's AI agent for site owners, is free and does not use AI credits (primary, search summary, page not opened). - [Wix Help Center](https://support.wix.com/en/article/about-ai-credits)

BigCommerce (company now named Commerce)

- Commerce announced "Shopping Agent" on November 16, 2026: a customizable on-storefront assistant that recommends and compares products, keeps context across follow-ups and guides add-to-cart and checkout within the conversation, "rolling out now to eligible BigCommerce merchants ahead of the holiday season" (secondary blog relaying the press release; the release itself returned 403). - [Ecommerce Paradise](https://ecommerceparadise.com/bigcommerce-ai-shopping-agent/); primary link not opened: [GlobeNewswire](https://www.globenewswire.com/news-release/2026/11/16/3403466/0/en/commerce-introduces-shopping-agent-to-enable-conversational-shopping-for-bigcommerce-merchants.html)
- The release does not define which merchants are eligible, whether it is beta or general, or what it costs (secondary blog). - [Ecommerce Paradise](https://ecommerceparadise.com/bigcommerce-ai-shopping-agent/)

Squarespace, Square Online, Ecwid

- Third-party comparisons state that Squarespace Commerce has no native AI chatbot, that its AI is content-side (copy tools, Blueprint AI), and that a chatbot is added by pasting a script into Code Injection (secondary blogs, mostly chatbot vendors, search summary). - [Chatonbo](https://chatonbo.com/blog/best-ai-chatbot-for-squarespace); [AeroChat](https://aerochat.ai/blog/best-chatbot-for-squarespace-commerce)
- A 2026 platform comparison rates Square Online and Ecwid as having limited built-in AI (secondary blog, search summary, page not opened). - [Digital Applied](https://www.digitalapplied.com/blog/ecommerce-platform-comparison-2026-complete-matrix)

### Inferences

Summary table derived from the findings above.

| Platform | Native shopper-facing on-site assistant | Cost and plans | Launch | Merchant-facing AI |
|---|---|---|---|---|
| Shopify | Yes - Inbox agent | Free on Basic, Grow, Advanced, Plus; opt-in; needs new customer accounts | June 17, 2026 | Sidekick, Sidekick Pulse, Canvas |
| BigCommerce | Yes - Shopping Agent (rollout to "eligible" merchants) | Not published | November 16, 2026 | Not researched |
| Wix | Yes - Smart Chat (formerly AI Site-Chat) | Metered by plan AI credits since June 10, 2026 | AI Site-Chat predates 2026 (exact date not confirmed) | Aria |
| WooCommerce | No native one found | - | - | WooCommerce AI in wp-admin, MCP developer preview |
| Squarespace | None found | - | - | AI content tools |
| Square Online | None found | - | - | Not confirmed |
| Ecwid | None found | - | - | Not confirmed |

- The Starter plan is absent from Shopify's plan list for the Inbox agent, so the smallest Shopify sellers and stores still on legacy customer accounts do not get it.
- On Shopify the "answer product and policy questions, recommend, add to cart, look up an order" baseline is now free, so a paid third-party assistant on Shopify has to win on depth beyond that baseline.
- The documented gaps of the Inbox agent are concrete: one channel only, no proactive engagement, no refund or return actions, no API, no topic routing, and a removed query log.
- Platforms with no native assistant (WooCommerce, Squarespace, Square Online, Ecwid) carry less direct bundling risk today, but BigCommerce's November 2026 launch shows the direction.

### Gaps
- Shopify's official requirements page for the Inbox agent was not located, so the "new customer accounts" and plan rules rest on Shopify's blog plus third-party reviews.
- No usage or adoption numbers for the Inbox agent were found (how many stores turned it on, resolution rates).
- Sidekick pricing by plan was not confirmed in the sources opened.
- No primary source was found for Square Online or Ecwid shopper-facing AI; the "none found" result is based on weak secondary sources.
- The original launch date of Wix AI Site-Chat and the exact credit cost per conversation were not confirmed.
- BigCommerce Shopping Agent pricing, eligibility and whether it is built in-house are unknown.

## 2. What did Shopify's Winter '26, Spring '26, Summer '26 and Fall '26 Editions add for shopper-facing assistants, and is there a native storefront assistant for every Shopify merchant today?

### Takeaway
Winter '26 was about selling inside external AI assistants, Spring '26 (June 17, 2026) added the on-site Inbox agent, and Fall '26 (October 28, 2026) deepened it with Shop identity while pushing Shop Pay and checkout into personal agents.
No separate "Summer '26" Edition was found; a native assistant exists today for Basic-and-above stores, and it is a competent FAQ and recommendation agent with clear limits.

### Cited Findings
- Winter '26 (December 2025, branded "RenAIssance") headlined Agentic Storefronts, which place Shopify products inside third-party assistants such as ChatGPT, Copilot and Perplexity, plus Sidekick Pulse and SimGym; coverage shows no on-site shopper assistant in that Edition (press report and secondary blogs, search summary). - [BetaKit](https://betakit.com/shopify-merchants-can-now-sell-products-through-ai-chatbots/); [Echidna](https://echidna.co/blog/shopify-editions-winter-2026-guide)
- Shopify first announced Agentic Storefronts in December 2025 as a way to distribute products across AI shopping interfaces while keeping the merchant's own storefront and checkout at the center (press report, March 12, 2026). - [Modern Retail](https://www.modernretail.co/technology/shopify-says-purchases-are-coming-inside-chatgpt-through-agentic-storefronts-as-openai-retreats-on-instant-checkout/)
- Spring '26 shipped June 17, 2026 with 150+ updates, led by the Universal Commerce Protocol, Shopify Catalog, the Agentic section in admin and the Inbox AI sales associate (primary). - [Shopify newsroom, Spring '26](https://www.shopify.com/news/spring-26-edition-merchant)
- Shopify states "AI searches powered by Shopify Catalog convert at 2x the rate of those using scraped data" and that Shopify merchants are UCP-enabled by default (vendor claim). - [Shopify newsroom, Spring '26](https://www.shopify.com/news/spring-26-edition-merchant)
- Third-party write-ups say the June 2026 release had been previewed as the Summer '26 Edition and shipped under the Spring '26 name, and one blog still titles it "Summer '26" (secondary blogs, search summary, naming not confirmed by Shopify). - [Ecommerce Fastlane](https://ecommercefastlane.com/shopify-spring-edition-2026/); [Shopappy](https://shopappy.com/?p=7829)
- Fall '26 (October 28, 2026) describes Inbox as "the chat on a merchant's storefront", says Inbox personalizes recommendations when shoppers sign in with Shop, and states "Buyers recognized by Shop convert better in Shopify Inbox chats" (primary, vendor claim without a number). - [Shopify newsroom, Fall '26](https://shopify.com/news/fall-26-edition-feature)
- Fall '26 also says "Merchants are now selling inside ChatGPT, Gemini, Muse, and other personal agents" and "Now there's Shop.com and Shop Pay inside AI agents" (primary). - [Shopify newsroom, Fall '26](https://shopify.com/news/fall-26-edition-feature)
- Fall '26 for developers: every Liquid and Hydrogen storefront and checkout now exposes WebMCP tools so browser agents can "search products, update the cart, and complete checkout once the buyer approves" (primary). - [Shopify newsroom, Fall '26 developer](https://www.shopify.com/news/fall-26-edition-developer)
- Fall '26 for developers: shop.dev offers "a single connection to Shopify Catalog, sign-in with Shop, cart, checkout, and Shop Pay" with no key required (primary). - [Shopify newsroom, Fall '26 developer](https://www.shopify.com/news/fall-26-edition-developer)
- Between September 1 and October 26, 2026 Shopify shipped 15 AI and connector launches, including connectors for Muse (September 29), Grok (October 8), Gemini (October 9) and Microsoft Copilot (October 22), and Canvas, a prompt-driven store builder (October 1) (press report of Shopify's Q3 2026 disclosures). - [PPC Land](https://ppc.land/shopify-revenue-gains-32-to-3-7bn-as-ai-referred-orders-rise-3-3x/)

### Inferences
- A native storefront assistant is available today to Shopify stores on Basic, Grow, Advanced or Plus that have an online store and new customer accounts, at no charge, but it is off until the merchant turns it on.
- Its capability is "trained FAQ plus catalog recommendations plus cart add plus signed-in order lookup", with identity from the Shop network as its distinctive advantage that a third party cannot copy.
- Shopify's investment weight across the four Editions is on external agents and on Shop identity, with the on-site agent as one feature among 150+, which suggests the on-site agent will keep improving but is not Shopify's main bet.
- WebMCP on every storefront means external browser agents can now act on a store without any on-site chat at all.

### Gaps
- No Shopify primary page confirming or denying a distinct Summer '26 Edition was opened.
- The Winter '26 primary page was not opened, so its details rest on press and blog coverage.
- No independent quality benchmark of the Inbox agent (accuracy, conversion lift) was found.

## 3. Agentic commerce status: which merchants are eligible, what fees apply, what volumes are reported?

### Takeaway
In-chat checkout is live but small and uneven: OpenAI scaled back Instant Checkout in March 2026 in favor of discovery and merchant-owned checkout, Google's UCP checkout is limited to select merchants, and Amazon keeps shopping inside its own assistant while blocking outside agents.
For Shopify merchants, presence in ChatGPT, Copilot, Gemini, AI Mode and Meta's Muse is on by default with no extra platform fee reported, and Shopify itself calls the volume "still small".

### Cited Findings

OpenAI

- Instant Checkout launched September 29, 2025 with Etsy sellers and Shopify merchants to follow, on the Agentic Commerce Protocol co-developed with Stripe, with merchants paying "a small fee on completed purchases" and remaining merchant of record (primary and press reports, 2025). - [OpenAI](https://openai.com/index/buy-it-in-chatgpt/); [Search Engine Land](https://searchengineland.com/instant-checkout-chatgpt-agentic-commerce-463222)
- Press reports put the fee for Shopify merchants at 4% of sales through ChatGPT checkout from January 26, 2026; OpenAI never published a rate (press report relayed by secondary blogs, not verified against a primary source). - [Payment Review](https://paymentreview.com/blog/agentic-commerce-merchants-2026/); [eevy](https://eevy.ai/blog/openai-instant-checkout-shopify)
- On March 12, 2026 Modern Retail reported, citing The Information, that OpenAI was scaling back Instant Checkout, with an OpenAI spokesperson saying it is "prioritizing making ChatGPT search and product discovery great" and moving Instant Checkout to Apps (press report). - [Modern Retail](https://www.modernretail.co/technology/shopify-says-purchases-are-coming-inside-chatgpt-through-agentic-storefronts-as-openai-retreats-on-instant-checkout/)
- A Forrester analyst reported that only about 30 Shopify merchants were live on Instant Checkout by February 2026 (independent study relayed by a secondary blog, not verified at source). - [Digital Applied](https://www.digitalapplied.com/blog/ai-agentic-commerce-discover-in-ai-buy-on-site-2026)
- Forrester wrote that US consumer adoption of Instant Checkout "remained low and stagnant from debut to discontinuation" (independent study, search summary, page not opened). - [Forrester](https://www.forrester.com/blogs/agentic-payments-in-b2c-commerce-where-we-are-now)
- Since March 24, 2026 Shopify merchants sell in ChatGPT through Agentic Storefronts by default, with checkout in an in-app browser on the merchant's own store, and Shopify says merchants pay no transaction fees beyond standard processing rates (primary). - [Shopify newsroom](https://shopify.com/news/agentic-commerce-momentum)
- Sources disagree on whether any Instant Checkout remains: OpenAI's help page is reported to still say an option may appear "for some eligible products and merchants" (secondary blogs, search summary). - [Hypotenuse](https://www.hypotenuse.ai/blog/chatgpts-instant-checkout-the-next-phase-of-agentic-commerce)

Google

- Google's merchant help page says UCP-powered checkout is "available for select merchants at this time", applies to products eligible in the United States, Canada and Australia, uses Google Pay, keeps the merchant "the seller of record", and mentions no fees (primary). - [Google Merchant Center Help](https://support.google.com/merchants/answer/16837055?hl=en)
- The same page says "You may see this checkout experience soon on specific surfaces such as AI Mode in Search and Gemini" and that merchants apply through an interest form (primary). - [Google Merchant Center Help](https://support.google.com/merchants/answer/16837055?hl=en)
- At Google Marketing Live 2026 Google named Nike, Sephora, Target, Ulta Beauty, Walmart, Wayfair and Shopify merchants such as Fenty and Steve Madden for checkout features (primary, search summary). - [Google blog](https://blog.google/products-and-platforms/products/shopping/shopping-updates-google-marketing-live)
- Google began switching on AI Mode checkout for eligible US Shopify merchants on September 18, 2026 with an opt-out, and merchants can disable direct checkout under Sales channels > Agentic (press reports). - [PPC Land](https://ppc.land/shopify-revenue-gains-32-to-3-7bn-as-ai-referred-orders-rise-3-3x/); [Search Engine Land](https://searchengineland.com/google-opens-native-ai-checkout-to-eligible-shopify-merchants-490407)
- For the Agent Payments Protocol (AP2), sources conflict on dates (a September 2025 launch versus an April 3, 2026 announcement with 60+ partners), and no count of production deployments was found (press report and secondary blogs, search summary). - [PYMNTS](https://www.pymnts.com/?p=3042771); [dev.to](https://dev.to/tomwangcn/google-ap2-completes-the-agentic-payment-stack-faf)

Amazon

- Amazon renamed Rufus to Alexa for Shopping on May 13, 2026 (primary). - [About Amazon](https://www.aboutamazon.com/news/retail/amazon-agentic-ai-gen-ai-shopping)
- Amazon said (November 18, 2025) that more than 250 million customers used Rufus that year, monthly users were up 140% year over year, interactions up 210%, and users were "60%+ more likely to convert" (vendor claim, 2025). - [About Amazon](https://www.aboutamazon.com/news/retail/amazon-agentic-ai-gen-ai-shopping)
- Buy for Me, which buys from brand websites outside Amazon, grew "from 65K at launch to over half a million" products (vendor claim, 2025). - [About Amazon](https://www.aboutamazon.com/news/retail/amazon-agentic-ai-gen-ai-shopping)
- Secondary coverage cites Amazon for 300 million Rufus customers in 2025 and nearly $12 billion in incremental annualized sales (vendor claim relayed by secondary sources, search summary, not verified). - [Digital Commerce 360](https://www.digitalcommerce360.com/2026/05/13/amazon-launches-ai-agent-alexa-for-shopping/?noamp=mobile)
- Amazon blocked Meta's Muse from buying on Amazon.com on September 20, 2026, and sued Perplexity in November 2025 over its Comet shopping agent (press reports). - [PPC Land](https://ppc.land/shopify-revenue-gains-32-to-3-7bn-as-ai-referred-orders-rise-3-3x/); [PCWorld](https://www.pcworld.com/article/3243549/metas-muse-ai-assistant-was-born-to-shop.html)

Microsoft, Perplexity, Meta

- Copilot Checkout launched in the US on January 8, 2026 with the merchant as seller of record and payments through PayPal, Shopify or Stripe; Shopify merchants are enrolled automatically with an opt-out and others apply by form (secondary coverage, search summary, pages not opened). - [Sanbi tracker](https://sanbi.ai/blog/agentic-commerce-tracker-ai-checkout)
- Shopify said on March 24, 2026 that "thousands" of its merchants already sell in Microsoft Copilot (vendor claim). - [Shopify newsroom](https://shopify.com/news/agentic-commerce-momentum)
- Perplexity's shopping assistant went free for all US users on November 25, 2025 with in-chat checkout through PayPal, and merchants must apply manually (secondary coverage, search summary, 2025 fact). - [Sanbi tracker](https://sanbi.ai/blog/agentic-commerce-tracker-ai-checkout)
- Meta released Muse, a personal agent that can shop and check out for the user, in the US on September 8, 2026, paying through Link by Stripe with a one-time-use card; no merchant fee was reported (press reports). - [The Next Web](https://thenextweb.com/news/meta-muse-personal-ai-agent-launch); [PPC Land](https://ppc.land/shopify-revenue-gains-32-to-3-7bn-as-ai-referred-orders-rise-3-3x/)
- Shopify's CFO said agent-driven sales from Muse carry the same economics as other sales: "Essentially, this is another form of discovery" (vendor statement in a press report). - [PPC Land](https://ppc.land/shopify-revenue-gains-32-to-3-7bn-as-ai-referred-orders-rise-3-3x/)

Volumes and fees across channels

- Shopify Q3 2026 (reported November 3, 2026): AI-referred orders up 3.3x and AI traffic up 2.6x year over year, AI-referred shoppers converting 64% more often than organic-search shoppers, with no absolute counts or GMV share disclosed (vendor claim, press report). - [PPC Land](https://ppc.land/shopify-revenue-gains-32-to-3-7bn-as-ai-referred-orders-rise-3-3x/)
- Shopify's president on agents buying for users: "While the volume is still small here, adoption is growing" (vendor statement, press report). - [PPC Land](https://ppc.land/shopify-revenue-gains-32-to-3-7bn-as-ai-referred-orders-rise-3-3x/)
- About three-quarters (74%) of AI-attributed purchases on Shopify in Q3 2026 came from product categories outside the top 100 (vendor claim, press report). - [PPC Land](https://ppc.land/shopify-revenue-gains-32-to-3-7bn-as-ai-referred-orders-rise-3-3x/)
- Shopify's "promoted placements" Developer Preview pays the company behind an AI agent 0.3% of the order, and stores running Shop Campaigns can add more (Shopify's example shows 1.5%), with details "not final" (press report on Shopify documentation, October 30, 2026). - [Search Engine Journal](https://searchenginejournal.com/shopify-now-lets-stores-pay-the-company-behind-your-ai-shopping-agent/594544)
- eMarketer projected in December 2025 that AI platforms (ChatGPT, Gemini, Perplexity; retailer-native assistants excluded) would account for 1.5% of US retail ecommerce in 2026, or $20.9 billion, and later revised the 2026 figure down about 4% to $19.74 billion (independent study, forecast, search summary of paywalled pages). - [eMarketer](https://www.emarketer.com/content/ai-shopping-tools-gain-traction-retailer-pushback-could-cloud-2026-progress); [eMarketer chart](https://www.emarketer.com/chart/c/358389/us-ecommerce-sales-via-ai-platforms-will-exceed-20-billion-2026-top-144-billion-by-2029-358389)

### Inferences
- Small Shopify stores are included in external agent channels automatically and at no extra reported fee, so "being present in ChatGPT or Gemini" is not something a small store needs a third party for on Shopify.
- For small stores outside Shopify, eligibility is the barrier: Google is "select merchants", Perplexity is by application, and WooCommerce checkout protocols are still in development.
- The March 2026 retreat of in-chat checkout means most AI-originated purchases still finish on the merchant's own site, which keeps the on-site experience relevant for the last step.
- Amazon's pattern (grow its own assistant, block outside agents) shows a large retailer treating the on-site assistant as a strategic asset rather than a feature to abandon.

### Gaps
- No primary OpenAI document from 2026 was opened; the March 24, 2026 OpenAI post and the 4% fee are known only through press and blogs.
- No absolute order or GMV figures for any external agent channel were found.
- Copilot Checkout's status after Microsoft's Copilot merger is unconfirmed.
- No merchant-fee terms were found for Meta Muse, Perplexity or Google UCP checkout.
- AP2 adoption data is missing and its dates conflict.

## 4. What share of online shopping visits or orders start in or pass through external AI assistants in 2026, and how fast is it growing?

### Takeaway
The share is still low single digits at most: Bain puts AI at under 1% of total retail traffic (May 2026) and eMarketer at about 1.5% of US retail ecommerce sales for 2026, while growth runs from roughly 60% to several hundred percent year over year depending on month and source.
Growth rates are slowing as the base rises, and AI-referred visits now convert better than other traffic.

### Cited Findings
- Bain (May 14, 2026): AI accounts for up to a quarter of referral traffic for some retailers but is "still less than 1% of total traffic" (independent study). - [Bain](https://www.bain.com/insights/agentic-ai-in-retail-how-autonomous-shopping-redefining-customer-journey/)
- Adobe Analytics, US retail sites, more than 1 trillion visits: AI traffic rose 693% year over year in the 2025 holiday season and 393% in Q1 2026 (vendor data, press report). - [TechCrunch](https://techcrunch.com/2026/04/16/ai-traffic-to-us-retailers-rose-393-in-q1-and-its-boosting-their-revenue-too/)
- Adobe: AI-referred traffic grew 138% year over year in May 2026 and 1,324% since October 2024, when Adobe began tracking it (vendor data, press report). - [Digital Commerce 360](https://www.digitalcommerce360.com/2026/06/17/adobe-ai-referred-traffic-to-retail-sites-doubles-in-a-year/?noamp=mobile)
- Adobe: retail AI traffic growth was +62% year over year in July 2026 and +71% in September 2026 (vendor data, search summary of Adobe reports that timed out on fetch). - [Adobe Q3 2026 report](https://business.adobe.com/resources/sdk/.q3-ai-traffic-trends-report/q3-2026-ai-sourced-traffic-insights.pdf)
- Adobe: AI traffic converted 38% worse than non-AI traffic in March 2025, 42% better in March 2026, 54% better in May 2026 and 90% better in September 2026 (vendor data; March and May via press reports, September via search summary). - [TechCrunch](https://techcrunch.com/2026/04/16/ai-traffic-to-us-retailers-rose-393-in-q1-and-its-boosting-their-revenue-too/); [Digital Commerce 360](https://www.digitalcommerce360.com/2026/06/17/adobe-ai-referred-traffic-to-retail-sites-doubles-in-a-year/?noamp=mobile)
- Adobe: revenue per visit from AI traffic was 37% higher than non-AI traffic in March 2026 (vendor data, press report). - [TechCrunch](https://techcrunch.com/2026/04/16/ai-traffic-to-us-retailers-rose-393-in-q1-and-its-boosting-their-revenue-too/)
- Adobe survey of over 5,000 US respondents: 39% said they used AI for online shopping (vendor survey, press report, April 2026). - [TechCrunch](https://techcrunch.com/2026/04/16/ai-traffic-to-us-retailers-rose-393-in-q1-and-its-boosting-their-revenue-too/)
- Salesforce (November 12, 2026): "AI is projected to drive $75.8 billion in Cyber Week spending, up 13% from 2025", AI-driven recommendations are expected to influence more than 1 in 5 holiday orders, and traffic from AI tools to ecommerce sites is "up 104% year over year" (vendor forecast). - [Salesforce](https://www.salesforce.com/news/stories/ai-first-holiday/)
- Salesforce's $75.8 billion sits inside a $357 billion global Cyber Week forecast, about 21%, and it is an "influenced" figure that includes on-site recommendations and agents, not purchases made inside external assistants (vendor forecast, press report). - [Chain Store Age](https://chainstoreage.com/salesforce-cyber-week-sales-hit-record-357b-help-ai)
- Secondary coverage attributes to Salesforce an expectation that 20% of holiday ecommerce traffic in 2026 originates from AI chat agents; this figure was not on the Salesforce page opened (secondary, search summary, not verified). - [Quartz](https://qz.com/2026-holiday-shopping-predictions-ai-agents)
- Shopify: AI-referred orders up 3.3x and AI traffic up 2.6x year over year in Q3 2026, against roughly 13x orders and 8x traffic cited for Q1 2026 (vendor claims; Q1 figure relayed from PYMNTS by a secondary source, not verified). - [PPC Land](https://ppc.land/shopify-revenue-gains-32-to-3-7bn-as-ai-referred-orders-rise-3-3x/); [Stellagent](https://stellagent.ai/insights/shopify-q3-2026-ai-orders-agentic-commerce)
- Shopify merchant examples: Omnilux said "AI channels drive 3.2% of total revenue" in March 2026 and Cozy Earth said revenue from AI channels was up 20x year over year (vendor-selected case examples). - [Shopify newsroom, Spring '26](https://www.shopify.com/news/spring-26-edition-merchant)
- eMarketer: AI platforms at 1.5% of US retail ecommerce sales in 2026 ($20.9 billion, later revised to $19.74 billion), rising past $144 billion and 8.8% by 2029 (independent study, forecast, search summary of paywalled pages). - [eMarketer chart](https://www.emarketer.com/chart/c/358389/us-ecommerce-sales-via-ai-platforms-will-exceed-20-billion-2026-top-144-billion-by-2029-358389)
- Bain: around 30% of US consumers say they use generative AI for product comparison and recommendations, and around half are not comfortable letting AI handle an end-to-end transaction (independent study, May 2026). - [Bain](https://www.bain.com/insights/agentic-ai-in-retail-how-autonomous-shopping-redefining-customer-journey/)

### Inferences
- External AI assistants are a fast-growing but still minor source: under 1% of visits and roughly 1.5% of sales, so more than 95% of sessions on a small store still arrive through other channels in 2026.
- Year-over-year growth has cooled from several hundred percent in early 2026 to roughly 60-100% by the third quarter, which fits a rising base, not a decline.
- AI-referred visitors arrive better informed and convert better, which means part of the "pre-purchase question answering" job is moving off-site for those visitors.
- The "20% influenced" and "1 in 5 orders" numbers mix on-site AI with external AI and should not be read as external agent share.

### Gaps
- Adobe's own statement of AI share of total retail visits was not retrieved, because its PDF and blog timed out.
- No source gives the share for small independent stores specifically; all data is aggregate or large-retailer weighted.
- Shopify does not disclose absolute AI order counts, GMV share or its definition of AI-referred traffic.
- No source separates "visits referred by AI" from "orders completed by an agent with no site visit".

## 5. What do analysts and platform executives say about the future of the on-site chat assistant compared with external agents?

### Takeaway
The evidence found points to both growing: analysts (Forrester, Bain, eMarketer) say retailer-owned assistants currently hold the trust and usage advantage, and platforms (Shopify, Amazon, BigCommerce) are investing in on-site assistants and external agent channels at the same time.
No source showed on-site assistant use falling as agent shopping rises, but Bain warns the trust advantage is temporary and Forrester argues the stand-alone chat bubble is the wrong form.

### Cited Findings
- Bain (May 14, 2026): shoppers "trust retailers' on-site agents three times more than third-party agents - for now", and "Retailers have a short opportunity window to develop on-site capabilities" (independent study). - [Bain](https://www.bain.com/insights/agentic-ai-in-retail-how-autonomous-shopping-redefining-customer-journey/)
- Bain recommends building owned agents where the retailer has unique data, expertise or services, and keeping control of checkout, fulfillment and customer data to avoid commoditization (independent study). - [Bain](https://www.bain.com/insights/agentic-ai-in-retail-how-autonomous-shopping-redefining-customer-journey/)
- Forrester (October 1, 2025, Emily Pfeiffer): answer engines will influence some shopper behavior but will not define owned shopping experiences, and "The future of guided selling will be a hybrid of traditional browse/search interfaces and a chat-based shopping assistant" (independent study, 2025; the quote is attributed in the post to Sana Remekie of Conscia). - [Forrester](https://www.forrester.com/blogs/agentic-commerce-conversational-commerce-the-future-of-owned-digital-shopping-experiences/)
- Forrester found current on-site chat shopping tools "more assistive than agentic" and recommends putting the conversational prompt in the main search box or listing page instead of a separate chat bubble (independent study, 2025). - [Forrester](https://www.forrester.com/blogs/agentic-commerce-conversational-commerce-the-future-of-owned-digital-shopping-experiences/)
- Forrester notes the owned site "can authenticate the customer, save the order in the customer's account" and apply loyalty entitlements, which external engines could not do at the time (independent study, 2025). - [Forrester](https://www.forrester.com/blogs/agentic-commerce-conversational-commerce-the-future-of-owned-digital-shopping-experiences/)
- eMarketer notes that more shoppers use retailers' embedded features such as Amazon's Rufus and Walmart's Sparky than AI platforms like Perplexity or ChatGPT, and published "Retailers hold AI commerce advantage over ChatGPT" on August 20, 2026 (independent study, search summary, pages paywalled). - [eMarketer](https://www.emarketer.com/content/ai-shopping-tools-gain-traction-retailer-pushback-could-cloud-2026-progress); [eMarketer](https://www.emarketer.com/content/retailers-hold-ai-commerce-advantage-over-chatgpt?utm_id=+cotd+8.20.26)
- eMarketer lowered its growth outlook for AI-platform sales for 2027 and beyond, citing limits to shopping on platforms like ChatGPT and weak consumer interest in having agents buy for them (independent study, search summary). - [eMarketer chart](https://www.emarketer.com/chart/c/358389/us-ecommerce-sales-via-ai-platforms-will-exceed-20-billion-2026-top-144-billion-by-2029-358389)
- Salesforce (November 12, 2026): 39% of shoppers have used a brand's shopper agent on an ecommerce site, 80% of them reported a good experience, and shoppers who engage spend "an 8% higher average order value" (vendor survey and vendor claim; Salesforce sells such agents). - [Salesforce](https://www.salesforce.com/news/stories/ai-first-holiday/)
- Salesforce: "Brands that deploy AI shopping agents see seven times faster sales growth than brands without them" (vendor claim, correlation only, methodology not given). - [Salesforce](https://www.salesforce.com/news/stories/ai-first-holiday/)
- Salesforce: "Only 19% of personal agent users have deployed their agents at checkout", 73% of shoppers are not comfortable giving a personal AI agent their payment information, and 49% are not interested in agents browsing or buying for them (vendor survey of 2,500+ shoppers in four countries). - [Salesforce](https://www.salesforce.com/news/stories/ai-first-holiday/)
- A Forrester consumer survey found only about a third would be willing to complete payment through an answer engine (independent study relayed by a secondary blog, not verified at source). - [Digital Applied](https://www.digitalapplied.com/blog/ai-agentic-commerce-discover-in-ai-buy-on-site-2026)
- Gartner is cited as predicting that 20% of digital commerce transactions will be executed through AI platforms by 2030 (independent study relayed by a vendor blog, not verified at source). - [commercetools](https://commercetools.com/blog/agentic-commerce-stats-enterprise-guide)
- Shopify executives in Q3 2026 framed delegated agent purchasing as new and small ("While the volume is still small here, adoption is growing") while the Fall '26 Edition kept investing in the on-site Inbox chat (vendor statements). - [PPC Land](https://ppc.land/shopify-revenue-gains-32-to-3-7bn-as-ai-referred-orders-rise-3-3x/); [Shopify newsroom, Fall '26](https://shopify.com/news/fall-26-edition-feature)
- Shopify's Fall '26 message on external agents: "The order is still the merchant's. The customer relationship is still the merchant's." (vendor statement). - [Shopify newsroom, Fall '26](https://shopify.com/news/fall-26-edition-feature)
- One blog reports a survey in which 59.7% of respondents' most recent AI-assisted purchases closed on Amazon and 6.3% on a brand's site or app, and says Walmart is taking its assistant into ChatGPT and Gemini (secondary blog, search summary, origin of the survey not identified, not verified). - [Techbloat](https://www.techbloat.com/official-retailer-ai-assistants-vs-third-party-shopping-agents-which-should-you-trust-to-buy.html)

### Inferences
- Through November 2026 the data shows both curves rising: on-site agent use (39% of shoppers per Salesforce, Amazon's assistant growth) and external AI referrals.
- The on-site assistant's durable advantages named by analysts are authentication, account and order context, loyalty and store-specific expertise, which are the areas where a third-party product would need to be strong.
- The risk to an on-site assistant is less "replacement in 2026-2027" and more "erosion of the simple question-answering job", since AI-referred visitors arrive pre-informed and the platform's free agent covers basic FAQs.
- Forrester's guidance implies the winning on-site form is search-integrated guided selling, not a generic corner chat widget.
- Most pro-on-site numbers come from vendors that sell on-site agents (Salesforce) or from large retailers; none of it is specific to small stores.

### Gaps
- No longitudinal dataset comparing on-site assistant usage against external agent usage over time was found.
- No executive statement was found that explicitly predicts the decline of on-site chat.
- eMarketer's August 2026 article and Forrester's and Gartner's primary reports were not opened.
- No small-store evidence on whether shoppers use an on-site assistant when one is present.

## 6. How easy is it for a third party to build a storefront assistant on platform APIs, what do platforms restrict, and what revenue share do app stores take?

### Takeaway
Reading the catalog, answering policy questions and building a cart are open on Shopify (UCP MCP endpoints, Shop MCP, WebMCP) and on WooCommerce (Store API, REST), but completing checkout inside an agent, accessing customer and order data, and identity are gated by Shopify permission, app review or buyer sign-in.
Shopify takes 15% of app revenue above the first $1 million of lifetime earnings and now competes directly with a free first-party agent, while its APIs for agents are changing quickly.

### Cited Findings

Shopify APIs

- Shopify's docs state that Storefront MCP "let AI agents search a store's catalog and manage carts", that the catalog and cart tools on `https://{shop}/api/mcp` were removed, and that the replacement is UCP at `https://{shop}/api/ucp/mcp` or Shop MCP (primary). - [shopify.dev](https://shopify.dev/docs/apps/build/storefront-mcp)
- Search Engine Journal (October 27, 2026) describes Storefront MCP as deprecated though still working, which differs from the "removed" wording in Shopify's migration page (press report). - [Search Engine Journal](https://searchenginejournal.com/shopify-ai-agent-knowledge-base-admin/594551); contradicted in part by [shopify.dev](https://shopify.dev/docs/apps/build/storefront-mcp)
- The replacements are Storefront Catalog MCP (`search_catalog`, `lookup_catalog`, `get_product`), Cart MCP (`create_cart`, `get_cart`, `update_cart`, `cancel_cart`), Checkout MCP, Ask MCP (`ask_business` for policies and FAQs), Order MCP and Customer Accounts MCP (primary). - [shopify.dev](https://shopify.dev/docs/apps/build/storefront-mcp)
- Every request to `/api/ucp/mcp` must include an agent profile, and developers must "Authenticate or sign every request to Checkout MCP" (primary). - [shopify.dev](https://shopify.dev/docs/apps/build/storefront-mcp)
- Shopify says a profile lets it "verify your agent and apply the right rate limits and tool access", that "higher trust tiers unlock broader access, including direct checkout completion", and that Checkout MCP "is rate-limited more strictly than Cart MCP across all tiers" (primary, search summary, pages not opened). - [shopify.dev profile](https://shopify.dev/docs/agents/get-started/profile); [shopify.dev Checkout MCP](https://shopify.dev/docs/agents/carts-and-checkout/checkout-mcp)
- For direct UCP integrations, "Completing checkout within your agent requires Shopify's permission"; without Shop sign-in, buyers pay on the merchant's checkout page (primary). - [shopify.dev agents](https://shopify.dev/docs/agents)
- Shop MCP needs no API key or custom profile for product search, and order history is available only "after a buyer signs in with Shop" and only for Shop-tracked orders (primary). - [shopify.dev agents](https://shopify.dev/docs/agents)
- Ask MCP is described by Shopify as a "draft" capability whose availability varies by store (press report). - [Search Engine Journal](https://searchenginejournal.com/shopify-ai-agent-knowledge-base-admin/594551)
- Since Fall '26 every Liquid and Hydrogen storefront exposes WebMCP tools to browser agents for search, cart and checkout after buyer approval (primary). - [Shopify newsroom, Fall '26 developer](https://www.shopify.com/news/fall-26-edition-developer)
- Third-party chat apps in the Shopify App Store were built on the Knowledge Base app and Storefront MCP, both of which are being retired or replaced (primary listing, search summary). - [Shopify App Store - AI MCP ChatBot](https://apps.shopify.com/ai-mcp-chatbot)

Shopify restrictions on customer and order data

- Protected customer data covers anything that directly relates to a customer, including Customers and Orders; public apps need review for both Level 1 (customer data without name, address, phone, email) and Level 2 (those identifying fields), and Level 2 adds data protection reviews and seven extra security requirements (primary). - [shopify.dev](https://shopify.dev/docs/apps/launch/protected-customer-data)
- Shopify approves access only when "the requested data is the minimum amount required by your app", and unapproved fields come back redacted (primary). - [shopify.dev](https://shopify.dev/docs/apps/launch/protected-customer-data)
- Shopify Inbox itself exposes no API for a merchant to plug in a different AI agent, according to a merchant review dated October 30, 2026 (forum post). - [Shopify App Store](https://apps.shopify.com/inbox)

Shopify economics

- Shopify's revenue share is 15% above "a revshare exemption on the first $1 million USD of lifetime revenue", with the annual reset ended; terms took effect June 16, 2025 and pre-2025 earnings do not count (primary, changelog dated April 24, 2025). - [shopify.dev changelog](https://shopify.dev/changelog/update-to-shopifys-app-developer-revenue-share)
- A third-party blog adds a 2.9% processing fee on app billing; no Shopify primary source was found for it (secondary blog, search summary, not verified). - [Taylor Sicard](https://taylorsicard.com/blog/shopify-partner-program-2026)
- Shopify said in Spring '26 that developers "will soon earn revenue" from Catalog-powered sales, and the October 2026 Developer Preview pays 0.3% of the order, by invitation from a waitlist (primary and press report). - [Shopify newsroom, Spring '26](https://www.shopify.com/news/spring-26-edition-merchant); [Search Engine Journal](https://searchenginejournal.com/shopify-now-lets-stores-pay-the-company-behind-your-ai-shopping-agent/594544)
- Sidekick App Extensions let third-party apps plug into the merchant-facing Sidekick, live for 15+ partners as of June 2026 (primary). - [Shopify newsroom, Spring '26](https://www.shopify.com/news/spring-26-edition-merchant)

WooCommerce and others

- WooCommerce's reference shopper agent builds its cart with "a Store API cart token" and the merchant side uses "a full-write REST key" (primary, September 16, 2026). - [WooCommerce Developer Blog](https://developer.woocommerce.com/2026/09/16/wc-claude-commerce-agent/)
- In that reference, "The assistant never places an order or takes payment"; the shopper is handed to the standard WooCommerce checkout, and "Order lookups work only for orders placed from a cart the assistant built" (primary). - [WooCommerce Developer Blog](https://developer.woocommerce.com/2026/09/16/wc-claude-commerce-agent/)
- The same post warns the reference has "No authentication" and that changes appear under the API key's user "with nothing naming the assistant" (primary). - [WooCommerce Developer Blog](https://developer.woocommerce.com/2026/09/16/wc-claude-commerce-agent/)
- Squarespace has no app marketplace category for AI chat agents, so third parties are added by pasting a script into Code Injection (secondary blog, search summary). - [Chatonbo](https://chatonbo.com/blog/best-ai-chatbot-for-squarespace)

### Inferences
- Technically, a two-person team can build a Shopify storefront assistant quickly: catalog search, product detail, policy answers and cart are available without special approval, and a widget ships as a normal app.
- The hard parts are gated: in-agent checkout completion needs Shopify permission, order status and customer data need protected-data review or buyer sign-in, and cross-store shopper identity (Shop sign-in history) belongs to Shopify.
- API churn is a real cost: Storefront MCP shipped in 2025, was replaced by UCP endpoints in 2026, the Knowledge Base app is being retired in January 2027, and UCP details are versioned (2026-08-25) and still changing.
- The same open endpoints that help a third-party on-site assistant also let external agents (ChatGPT, Gemini, Muse, browser agents through WebMCP) do the same job without any on-site widget.
- WooCommerce is the most open on data (self-hosted REST with full keys, no revenue share on a self-distributed plugin) but leaves authentication, attribution and safety to the builder and has no agent checkout standard in core yet.
- The 15% Shopify revenue share only starts after $1 million lifetime revenue, so the app store fee is not the binding constraint for a small team; the free first-party Inbox agent is.

### Gaps
- How Shopify grants trust tiers and checkout permission to third-party agents is not documented in the pages opened.
- Rate-limit numbers for the UCP MCP endpoints were not found.
- WooCommerce.com Marketplace, Wix App Market and BigCommerce app marketplace revenue shares were not researched and are unknown here.
- Whether Shopify App Store policy restricts apps that duplicate Inbox agent functionality was not found.
- Wix, BigCommerce, Squarespace, Square and Ecwid storefront API capabilities for a third-party assistant (catalog, cart, order status) were not examined.
