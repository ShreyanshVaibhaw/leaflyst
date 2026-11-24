# Best AI shopping assistants and the technology behind a small-store assistant (state as of 23 November 2026)

Reading conventions for these notes:
- Every figure carries a source type: vendor claim, press report, independent study (peer-reviewed or arXiv paper not written by the vendor being measured), vendor paper (paper written by the company it describes), official docs, official price list, legal analysis, forum post.
- "Opened" means the page itself was read during this research.
- "Summary only" means the fact was seen only in a search result summary and the page was not opened, so it is less certain.
- Facts older than 2026 are marked with their date.
- No page read during this research contained text addressed to AI agents, apart from the search tool's own standard reminder line, which was ignored as data.

## 1. How do the best assistants work and what makes them good?

### Takeaway
The leading assistants are conversational layers on top of very large proprietary systems: a full marketplace catalog, billions of reviews, order history, logistics and after-sales tools, and in most cases a router across several models, not one fine-tuned model.
Every published performance number is a vendor claim that compares users of the assistant with non-users, and none comes with a disclosed holdout experiment.

### Cited Findings

#### Alibaba Qwen shopping assistant in Taobao and Tmall (launched 11 May 2026)
- Alibaba connected the Qwen app to the whole Taobao and Tmall catalog of "over 4 billion products" and launched a "Qwen Shopping Assistant" inside the Taobao app, reached through the messages tab (vendor claim, opened) - [Alibaba Cloud blog, 11 May 2026](https://www.alibabacloud.com/blog/alibaba-opens-all-of-taobao-to-qwen-ai-ushering-in-a-new-agentic-shopping-experience_603104)
- Before May 2026 the Qwen app's commerce features covered only a few trial categories (vendor claim, opened) - [Alibaba Cloud blog](https://www.alibabacloud.com/blog/alibaba-opens-all-of-taobao-to-qwen-ai-ushering-in-a-new-agentic-shopping-experience_603104)
- Features named by Alibaba: open-ended questions with follow-up questions on budget and style, side-by-side comparisons, purchase inside the chat, AI virtual try-on from a user photo, coupon stacking at checkout for festivals such as 618, and a 30-day price tracker that places the order automatically once a target price is met (vendor claim, opened) - [Alibaba Cloud blog](https://www.alibabacloud.com/blog/alibaba-opens-all-of-taobao-to-qwen-ai-ushering-in-a-new-agentic-shopping-experience_603104)
- Data and tools named by Alibaba: the Taobao and Tmall catalog, "billions of customer reviews", order history for personalization, conversation context, and a skills library for order management, logistics and after-sales service (vendor claim, opened) - [Alibaba Cloud blog](https://www.alibabacloud.com/blog/alibaba-opens-all-of-taobao-to-qwen-ai-ushering-in-a-new-agentic-shopping-experience_603104)
- Model: Alibaba's Qwen foundation model, described as refined on "more than two decades" of the company's transaction data and merchant operations (vendor claim, opened) - [Alibaba Cloud blog](https://www.alibabacloud.com/blog/alibaba-opens-all-of-taobao-to-qwen-ai-ushering-in-a-new-agentic-shopping-experience_603104)
- Alibaba's own stated differentiator is that most global AI platforms rely on external plug-ins for commerce while its model is built on its own transaction data (vendor claim, opened) - [Alibaba Cloud blog](https://www.alibabacloud.com/blog/alibaba-opens-all-of-taobao-to-qwen-ai-ushering-in-a-new-agentic-shopping-experience_603104)
- The launch announcement gives no sales, user, conversion or latency metric for the assistant (opened, checked) - [Alibaba Cloud blog](https://www.alibabacloud.com/blog/alibaba-opens-all-of-taobao-to-qwen-ai-ushering-in-a-new-agentic-shopping-experience_603104)
- Alibaba is also upgrading merchant-side customer-service AI (Dianxiaomi) to replace scripted replies with agents that handle complex conversations and close sales, and says it is investing "trillions of tokens" there (vendor claim, opened) - [Alibaba Cloud blog](https://www.alibabacloud.com/blog/alibaba-opens-all-of-taobao-to-qwen-ai-ushering-in-a-new-agentic-shopping-experience_603104)
- Reuters reported the plan on 10 May 2026 citing a source, and Alibaba's release and Caixin date the launch to 11 May 2026 (press report, summary only) - [Yahoo Finance/Reuters](https://finance.yahoo.com/sectors/technology/articles/alibaba-integrate-qwen-ai-taobao-014347932.html); [Caixin](https://www.caixinglobal.com/2026-05-11/tech-brief-may-11-alibaba-integrates-qwen-ai-with-taobao-to-improve-shopping-experience-102442919.html)
- Taobao's earlier conversational search plugin LEAPS (query expander plus relevance verifier) has been deployed since August 2025 and is described as serving hundreds of millions of users monthly, with online A/B gains reported but no GMV figure seen (vendor paper, summary only) - [arXiv 2601.05513, January 2026](https://arxiv.org/abs/2601.05513)

#### Alibaba.com Accio (B2B sourcing agent)
- Accio launched in November 2024 as a B2B sourcing engine, Accio Agent followed in August 2025 and Accio Work in March 2026 (press report, summary only) - [Digital Commerce 360, 24 March 2026](https://www.digitalcommerce360.com/2026/03/24/alibaba-international-announces-ai-agent-fleets-via-accio-work/)
- Alibaba said Accio had more than 10 million monthly active users as of March 2026 and that over 230,000 businesses had deployed Accio Work one month after launch (vendor claim, summary only, not independently audited) - [PR Newswire Asia, April 2026](https://en.prnasia.com/releases/global/alibaba-s-accio-work-now-powers-230-000-online-stores-globally-531306.shtml)
- Alibaba.com says Accio does not default to one model but splits a request into steps and picks a model per step for quality, speed and cost, and claims over 50% lower estimated cost than OpenAI Codex on e-commerce tasks (vendor claim, summary only, not verified) - [Retail Times, September 2026](https://retailtimes.co.uk/alibabas-accio-cuts-ai-costs-for-e-commerce-tasks-by-over-50-compared-with-general-purpose-agents/)
- Alibaba.com's CommerceAgentBench (open source, September 2026) has 107 merchant tasks graded pass or fail, tested 13 model families on three harnesses, and the best model (Claude Opus 5) passed 61.7% on Accio's harness, 60.7% on Pi and 56.1% on OpenClaw (vendor benchmark reported by press, opened) - [PYMNTS, 18 September 2026](https://www.pymnts.com/?p=4207827)
- The same benchmark was built from 10 million small-business users, 1.6 million conversations and 200,000 execution traces, and Claude Opus 5 averaged 63 tool calls and about 10 minutes per task (vendor claim via press, opened) - [PYMNTS](https://www.pymnts.com/?p=4207827)
- Alibaba.com's president argues an agent is model plus harness (tools, memory, ability to act) plus industry context, and that general reasoning rankings say little about a specific commercial task (vendor opinion, opened) - [Fortune commentary, 9 September 2026](https://fortune.com/2026/09/09/alibaba-president-kuo-zhang-ai-agents-can-talk-but-not-work/)

#### Amazon Rufus
- Amazon built a custom LLM specialized for shopping, trained on the entire Amazon catalog, customer reviews, community Q&A posts and public web data (vendor blog, dated 4 October 2024, opened) - [Amazon Science](https://amazon.science/blog/the-technology-behind-amazons-genai-powered-shopping-assistant-rufus)
- Rufus uses retrieval-augmented generation over reviews, catalog and community Q&A, calls Amazon Stores APIs, learns from thumbs up and down feedback through reinforcement learning, streams token by token, and "hydrates" the stream with data from internal systems (vendor blog, October 2024, opened) - [Amazon Science](https://amazon.science/blog/the-technology-behind-amazons-genai-powered-shopping-assistant-rufus)
- The Amazon Science post gives no numeric latency target and no evaluation metric (opened, checked) - [Amazon Science](https://amazon.science/blog/the-technology-behind-amazons-genai-powered-shopping-assistant-rufus)
- A later AWS engineering post says Rufus runs on Amazon Bedrock with several models including Anthropic's Claude Sonnet, Amazon Nova and the custom model, picks a model per query type for quality, latency and engagement, and cut latency with prompt caching and parallel tool calling (vendor blog, summary only because the page body could not be retrieved) - [AWS Machine Learning blog](https://aws.amazon.com/blogs/machine-learning/how-rufus-scales-conversational-shopping-experiences-to-millions-of-amazon-customers-with-amazon-bedrock)
- For Prime Day Rufus used over 80,000 AWS Inferentia and Trainium chips (vendor blog, summary only) - [AWS Machine Learning blog](https://aws.amazon.com/blogs/machine-learning/scaling-rufus-the-amazon-generative-ai-powered-conversational-shopping-assistant-with-over-80000-aws-inferentia-and-aws-trainium-chips-for-prime-day)
- Amazon said 300 million customers used Rufus in 2025, that it helped drive nearly $12 billion in incremental annualized sales, and that Rufus users are 60% more likely to complete a purchase (vendor claim from the February 2026 earnings call, reported by press, opened) - [Modern Retail, 30 April 2026](https://www.modernretail.co/technology/amazon-says-its-ai-shopping-assistant-is-gaining-traction-with-rufus-users-up-115/)
- On the Q1 2026 call Amazon said Rufus monthly active users were up 115% year over year and engagement up 400% (vendor claim via press, opened) - [Modern Retail, 30 April 2026](https://www.modernretail.co/technology/amazon-says-its-ai-shopping-assistant-is-gaining-traction-with-rufus-users-up-115/)
- The $12 billion figure is Amazon's internal "downstream impact" estimate, not audited revenue (press report, summary only) - [PPC Land](https://ppc.land/amazons-ai-shopping-assistant-drove-12-billion-in-sales-for-2025/)
- Agentic features reported: recurring tasks such as restocking essentials, and Auto Buy, which buys a product automatically when it hits a set price (press report, opened) - [Modern Retail, 30 April 2026](https://www.modernretail.co/technology/amazon-says-its-ai-shopping-assistant-is-gaining-traction-with-rufus-users-up-115/)
- Amazon's CEO said third-party AI agents fall short on pricing, product information and personalization (vendor opinion via press, opened) - [Modern Retail, 30 April 2026](https://www.modernretail.co/technology/amazon-says-its-ai-shopping-assistant-is-gaining-traction-with-rufus-users-up-115/)

#### Walmart Sparky
- Walmart said in February 2026 that Sparky users have order values about 35% higher than non-users and that roughly half of Walmart app users have used Sparky (vendor claim from the earnings call, opened) - [Modern Retail, 19 February 2026](https://www.modernretail.co/technology/walmart-says-ai-users-build-35-bigger-baskets-than-others/)
- In August 2026 Walmart said Sparky users spend 40% more per order and total users were up 70% year over year (vendor claim via press, summary only) - [PYMNTS](https://pymnts.com/news/artificial-intelligence/2026/retailers-report-ai-driven-sales-bigger-baskets-q2-earnings)
- The Modern Retail report names no underlying model and cites no holdout test or independent verification for the 35% figure (opened, checked) - [Modern Retail, 19 February 2026](https://www.modernretail.co/technology/walmart-says-ai-users-build-35-bigger-baskets-than-others/)
- Walmart announced Wallaby in October 2024, a series of retail-specific LLMs trained on decades of Walmart data, used alongside other LLMs (vendor claim, October 2024, summary only) - [Walmart corporate news](https://corporate.walmart.com/news/2024/10/09/walmart-reveals-plan-for-scaling-artificial-intelligence-generative-ai-augmented-reality-and-immersive-commerce-experiences); [VentureBeat](https://venturebeat.com/ai/walmart-bets-on-multiple-ai-models-with-new-wallaby-llm)

#### Flipkart, Myntra, Meesho
- Myntra executives say its AI tools (Maya, MyStylist, virtual try-on) drove a 1.5x rise in product consideration and 2x higher conversion, and that 85% of users with enough shopping history get AI size and fit recommendations (vendor claim via press, summary only) - [Inc42](https://inc42.com/features/the-ai-blueprint-for-fashion-ecommerce/)
- Meesho's Vaani voice assistant handles discovery, comparison, payment and checkout in Hindi and English, and over 1.5 million users interacted with it within a month of launch, with no conversion figure reported (vendor claim via press, summary only) - [Inc42](https://inc42.com/features/amazon-flipkart-meeshos-ai-focus-shifts-to-seller-side-stacks/)
- Flipkart's chat assistant is Flippi, and no measured results were found for it (press report, summary only) - [Inc42](https://inc42.com/buzz/how-flipkart-is-using-ai-to-move-beyond-keyword-led-product-discovery/)
- Flipkart's technology chief said in July 2026 that it has deployed over 250 models, is building its own e-commerce LLMs, and uses a "mixture of experts" that combines frontier models with in-house ones (vendor claim via press, summary only) - [Apparel Resources](https://apparelresources.com/business-news/retail/flipkart-accelerates-ai-strategy-250-models-custom-llms/)
- Flipkart earlier said it fine-tuned and deployed LLMs in-house for summarization, aspect extraction, search and recommendations (vendor claim, undated Q&A, summary only) - [Flipkart Stories](https://stories.flipkart.com/gen-ai-indian-ecommerce-mayur-datar)

#### Zalando, Klarna, Mercado Libre
- Zalando says customers who use its assistant are twice as likely to complete a purchase, that interactions last three times longer than normal searches and average more than two questions per conversation, and it is refining the assistant with sizing data from 53 million customers (vendor claim via press, summary only, the article returned HTTP 403 when opened) - [Modaes](https://www.modaes.com/global/companies/zalando-is-refining-its-ai-assistant-using-sizing-data-from-53-million-customers)
- Reports of Zalando assistant users in 2026 conflict: one says 22 million people used it in 2026, another says about 10 million year to date versus 6 million in all of 2025 (press reports, summary only, not reconciled) - [Analytics Insight](https://www.analyticsinsight.net/news/zalando-launches-first-ai-shopping-agent-as-margins-slip-in-q3-2026); [Finimize](https://finimize.com/content/zalandos-ai-shopping-agent-arrives-as-margins-thin)
- Klarna's 2024 assistant handled 2.3 million chats in its first month, about two thirds of its service chats, and Klarna claimed a 25% drop in repeat inquiries (vendor claim, 2024, summary only) - [HubSpot blog](https://blog.hubspot.com/service/klarna-ai-assistant)
- In May 2025 Klarna's CEO said the company was hiring humans again because the AI-first approach led to "lower quality" and cost had been "a too predominant evaluation factor" (press report, May 2025, summary only) - [Fortune](https://dc.fortune.com/2025/05/09/klarna-ai-humans-return-on-investment/); [TechCrunch, June 2025](https://techcrunch.com/2025/06/04/klarna-ceo-says-company-will-use-humans-to-offer-vip-customer-service)
- Mercado Libre is testing an AI shopping assistant with part of its users and rolled out LLM-based search in Brazil and Mexico in Q1 2026, with no launch date, model vendor or assistant metric found (press report, summary only) - [Innovacion Digital 360](https://www.innovaciondigital360.com/i-a/mercado-libre-revelo-como-usa-ia-para-vender-mas-y-mejorar-uno-de-sus-negocios-mas-rentables/); [Bloomberg Linea](https://www.bloomberglinea.com/latinoamerica/argentina/el-nuevo-ceo-de-mercadolibre-conto-como-la-ia-esta-cambiando-al-e-commerce/)

### Inferences
- What makes these assistants good is mostly not the base model.
  It is the combination of a huge structured catalog, review and Q&A corpora, purchase history, and transactional tools (cart, coupons, order, logistics, after-sales) wired into one account system.
- Routing across several models is now the norm at marketplace scale (Amazon, Accio, Flipkart, Walmart).
  Amazon started with a custom shopping LLM in 2024 and later added Claude Sonnet and Nova behind a router, which suggests that even the company with the most data did not find one domain model sufficient.
- All headline lifts (60% more likely to buy, 35 to 40% bigger baskets, 2x conversion) compare self-selected users with non-users.
  Heavy shoppers are more likely to try an assistant, so these numbers overstate the causal effect by an unknown amount.

### Gaps
- No public technical paper or metric describes the internals of the May 2026 Qwen shopping assistant (model version, retrieval design, latency, conversion).
- A figure of 300 million monthly active users for Qwen appeared in one search summary without a clear source and could not be verified.
- A rename of Rufus to "Alexa for Shopping" in May 2026 and a figure of 400 million customers over 12 months appeared only in a search summary and a sidebar headline, and were not verified in an article body.
- No assistant-specific metrics were found for Flipkart Flippi or for Mercado Libre's assistant.
- No vendor has published a randomized holdout result for a shopping assistant.

## 2. Which of those advantages depend on marketplace-scale data that a single small store does not have?

### Takeaway
The features that make the Taobao, Amazon, Zalando and Walmart assistants stand out (review synthesis over billions of reviews, personalization from years of purchase history, size prediction, cross-seller price comparison, coupon optimization, price tracking with auto-buy) rest on data and account systems a single store does not own.
What a small store can realistically have is grounded question answering over its own catalog and policies, comparison inside its own range, cart building, and order status, and those pieces are now offered by platform-native agents and open starter code.

### Cited Findings
- Alibaba attributes the assistant's quality to a catalog of over 4 billion products, billions of customer reviews, order history, and a model refined on more than two decades of transaction data (vendor claim, opened) - [Alibaba Cloud blog, 11 May 2026](https://www.alibabacloud.com/blog/alibaba-opens-all-of-taobao-to-qwen-ai-ushering-in-a-new-agentic-shopping-experience_603104)
- Amazon trained the Rufus model on its entire catalog, customer reviews and community Q&A, and retrieves from the same sources at answer time (vendor blog, October 2024, opened) - [Amazon Science](https://amazon.science/blog/the-technology-behind-amazons-genai-powered-shopping-assistant-rufus)
- Zalando's size advice uses sizing data from 53 million customers (vendor claim via press, summary only) - [Modaes](https://www.modaes.com/global/companies/zalando-is-refining-its-ai-assistant-using-sizing-data-from-53-million-customers)
- Myntra's size and fit recommendations reach 85% of users "with sufficient shopping history", which makes purchase history a precondition (vendor claim via press, summary only) - [Inc42](https://inc42.com/features/the-ai-blueprint-for-fashion-ecommerce/)
- Walmart's Wallaby models were trained on decades of Walmart data (vendor claim, October 2024, summary only) - [Walmart corporate news](https://corporate.walmart.com/news/2024/10/09/walmart-reveals-plan-for-scaling-artificial-intelligence-generative-ai-augmented-reality-and-immersive-commerce-experiences)
- Alibaba.com built its commerce benchmark from 1.6 million conversations and 200,000 execution traces of its own users, a data source no small vendor has (vendor claim via press, opened) - [PYMNTS, 18 September 2026](https://www.pymnts.com/?p=4207827)
- Amazon's CEO says third-party agents fall short on pricing, product information and personalization, which are exactly the data-dependent parts (vendor opinion via press, opened) - [Modern Retail, 30 April 2026](https://www.modernretail.co/technology/amazon-says-its-ai-shopping-assistant-is-gaining-traction-with-rufus-users-up-115/)
- Shopify's own Inbox agent answers from the store's catalog, policies, Knowledge Base facts and published storefront content, personalizes from purchase history when available, and can recognize some shoppers who are not signed in through an active Shop session (official docs, opened) - [Shopify Help Center](https://help.shopify.com/en/manual/inbox/ai)
- On ShoppingBench the largest error class for GPT-4.1 was attribute mismatch between the request and the product, which points to structured product attributes as the scarce input (independent study by a marketplace research team, August 2025, opened) - [arXiv 2508.04266](https://arxiv.org/html/2508.04266v3)
- A WooCommerce port of an open commerce agent notes that with keyword retrieval the model "can only reason about products a keyword returned" and that WooCommerce core records no sessions, so there is no traffic or conversion data to learn from (platform developer blog, opened) - [WooCommerce Developer Blog, 16 September 2026](https://developer.woocommerce.com/2026/09/16/wc-claude-commerce-agent/)

### Inferences
- Depends on marketplace-scale data (hard or impossible for one small store): review synthesis across many buyers, personalization from long purchase histories, size and fit prediction, cross-seller price comparison, platform-wide coupon stacking, price tracking with automatic ordering inside a shared wallet, and model refinement on transaction logs.
- Does not depend on marketplace-scale data (available to one small store): grounded answers about its own products, policies, shipping and returns, comparison within its own range, guided selection through clarifying questions, cart building and handoff to checkout, order status lookup, and handoff to a human.
- Partly available: virtual try-on and image search depend on a multimodal model more than on store data, but need good product images.
- A small store's catalog is small enough (tens to a few thousand items) that retrieval is not the hard problem.
  The hard problems are missing or messy attributes, thin product copy, and stale price and stock.
- A vendor serving many small stores could build a cross-store data asset (attribute schemas, query logs, conversation traces) that no single store has.
  That is the only route by which a small vendor gets something that resembles marketplace data, and it raises consent and data-ownership questions with each merchant.
- The platform owner (for example Shopify with Shop sessions and purchase history) holds cross-store identity that a third-party widget cannot see.

### Gaps
- No study was found that measures how much of a marketplace assistant's lift comes from data-dependent features versus plain catalog question answering.
- No public data was found on how complete product attributes are in typical small-store catalogs.

## 3. Published research on language models for e-commerce: do fine-tuned domain models beat general frontier models, and where?

### Takeaway
Fine-tuning reliably lifts a model far above its own untuned base on narrow shopping tasks it was trained on, and a tuned small model has matched an older frontier model on one agent benchmark, but no study found shows a fine-tuned domain model beating the current frontier across shopping tasks.
Gains are largest on narrow, repetitive, well-labeled tasks (user-behavior prediction, relevance and ranking, query rewriting, attribute extraction with training data, tool-use trajectories) and smallest on general reasoning, knowledge, unseen skills and very small models.

### Cited Findings

#### Benchmarks and what they show
- Shopping MMLU (Amazon, NeurIPS 2024) has 57 tasks over four skills built from real Amazon data, and the best model tested was the general proprietary model Claude 3 Sonnet with 80.75 concept, 71.63 reasoning, 70.17 behavior and 67.76 multilingual, ahead of the best open model LLaMA3-70B at 75.24, 69.29, 67.67 and 62.00 (vendor-authored academic benchmark, 2024, opened) - [arXiv 2410.20745](https://arxiv.org/html/2410.20745v2)
- In Shopping MMLU the domain-tuned eCeLLM-M (7B) beat its base Mistral-7B (63.29 vs 55.82 concept, 53.78 vs 46.27 behavior, 56.08 vs 41.47 multilingual) and eCeLLM-L (13B) beat LLaMA2-13B (61.54 vs 45.86 concept, 54.55 vs 39.43 behavior), but eCeLLM-S (under 5B) did not improve over Phi-2 (49.40 vs 49.34 concept, 39.06 vs 42.83 reasoning) (2024, opened) - [arXiv 2410.20745](https://arxiv.org/html/2410.20745v2)
- In the same benchmark the tuned models still trailed newer general models of similar size: eCeLLM-L scored 54.84 on reasoning against 60.92 for Qwen1.5-14B, and eCeLLM-M scored 53.78 on behavior against 54.88 for LLaMA3-8B (2024, opened) - [arXiv 2410.20745](https://arxiv.org/html/2410.20745v2)
- Shopping MMLU found that shopping skill tracks general ability (all pairwise skill correlations at least 0.9), that domain-specific instruction tuning helped only strong base models and only on skills covered by its training data, and that in-context examples often lowered scores (2024, opened) - [arXiv 2410.20745](https://arxiv.org/html/2410.20745v2)
- The winning KDD Cup 2024 entry (NVIDIA) fine-tuned Qwen2-72B with QLoRA on about 502,000 examples, of which 16 of 38 data sources were LLM-generated, and gained between +0.027 and +0.150 per track over the same model zero-shot (for example track 2 rose from 0.6407 to 0.7909) (competition paper by the winning team, 2024, opened) - [arXiv 2408.04658](https://arxiv.org/html/2408.04658v1)
- The same team said the untuned Qwen2-72B would have placed 9th overall, so prompting alone was a strong baseline (competition slides, 2024, summary only) - [NVIDIA KDD 2024 slides](https://amazon-kddcup24.github.io/slides/NVIDIA-KDD2024-Slides.pdf)
- KDD Cup 2024 limited inference to 4 NVIDIA T4 GPUs, so it did not compare against proprietary frontier APIs (2024, opened) - [arXiv 2408.04658](https://arxiv.org/html/2408.04658v1)
- eCeLLM (ICML 2024) reports an average gain of 10.7% over the best baselines, which included GPT-4 Turbo and task-specific models, on in-domain tasks and 9.3% on out-of-domain products, while GPT-4 Turbo stayed ahead on two out-of-domain tasks (attribute value extraction and answer generation) per the authors' slides (academic paper, 2024, summary only) - [arXiv 2402.08831](https://arxiv.org/abs/2402.08831); [ICML slides](https://icml.cc/media/icml-2024/Slides/34290.pdf)
- EcomGPT (Alibaba, 2023) reports that its instruction-tuned models, including a 560-million-parameter one, beat ChatGPT on average on unseen e-commerce datasets (vendor paper, 2023, summary only) - [arXiv 2308.06966](https://arxiv.org/abs/2308.06966)
- eBay's LiLiuM models (1B, 7B, 13B, June 2024) match LLaMA-2 on general English understanding and beat it on e-commerce benchmarks (vendor paper, 2024, summary only) - [arXiv 2406.12023](https://arxiv.org/abs/2406.12023)
- eBay's e-Llama (January 2025) continued pretraining of Llama 3.1 8B and 70B on 1 trillion tokens of domain data (vendor paper, abstract opened) - [arXiv 2501.09706](https://arxiv.org/abs/2501.09706)
- A secondary write-up says e-Llama gained about 25% on English and about 30% on non-English e-commerce benchmarks over base Llama 3.1 with about 1% loss on general benchmarks, and the paper's abstract does not compare against GPT-4 class models (secondary summary of a vendor paper, not verified in the paper text) - [ZenML LLMOps database](https://www.zenml.io/llmops-database/developing-and-deploying-domain-adapted-llms-for-e-commerce-through-continued-pre-training)
- ShoppingBench (August 2025) tested agents in a sandbox of 2,746,368 Lazada products with 900 test instructions, and the best untuned model GPT-4.1 reached 48.2% average success (independent study by a marketplace research team, opened) - [arXiv 2508.04266](https://arxiv.org/html/2508.04266v3)
- In ShoppingBench an untuned Qwen3-4B scored 18.0%, the same model after supervised fine-tuning on 2,410 distilled trajectories scored 43.6%, and after added reinforcement learning scored 48.7%, which is 0.5 points above GPT-4.1 and above Claude 4 Sonnet (39.0%), o3-mini (39.2%), Gemini 2.5 Flash (35.4%) and Qwen3-235B (32.3%) (August 2025, opened) - [arXiv 2508.04266](https://arxiv.org/html/2508.04266v3)
- In ShoppingBench the tuned 4B model was still below GPT-4.1 on the knowledge intent (46.7% vs 62.0%) while it led on multi-product (53.2% vs 46.4%) and coupon and budget tasks (33.2% vs 30.4%) (August 2025, opened) - [arXiv 2508.04266](https://arxiv.org/html/2508.04266v3)
- MMShopBench (July 2026), described as the first real-log benchmark for multimodal multi-turn shopping agents, reports that fine-tuning "substantially narrows the performance gap" between an open model and leading proprietary models, which means the gap was narrowed and not closed (arXiv paper, abstract opened, no numbers in the abstract) - [arXiv 2607.29002](https://arxiv.org/abs/2607.29002)
- On CommerceAgentBench (September 2026) the best frontier model passed 61.7% of tasks, the lowest-ranked family passed 29%, rankings rotated by task type, and no fine-tuned domain model result was reported (vendor benchmark via press, opened) - [PYMNTS](https://www.pymnts.com/?p=4207827); [Fortune](https://fortune.com/2026/09/09/alibaba-president-kuo-zhang-ai-agents-can-talk-but-not-work/)
- On CommerceAgentBench the same model (Claude Opus 5) scored 61.7% on Alibaba's domain harness against 56.1% and 60.7% on two general harnesses, a spread of 1.0 to 5.6 points from harness alone (vendor benchmark via press, opened) - [PYMNTS](https://www.pymnts.com/?p=4207827)

#### Where fine-tuning helps most and least
- Attribute value extraction: in ExtractGPT (2023) GPT-4 reached the top average F1 of 85% with prompting, and a fine-tuned GPT-3.5 reached similar scores but generalized worse to unseen attribute values (academic paper, 2023, summary only) - [arXiv 2310.12537](https://arxiv.org/abs/2310.12537)
- A 2025 study of self-refinement for attribute extraction found that when development data exists, fine-tuning gives the highest performance (academic paper, January 2025, summary only) - [arXiv 2501.01237](https://arxiv.org/abs/2501.01237)
- A July 2026 preprint on attribute extraction found that evaluation method produced variance about 23 times larger than model choice and 5 times larger than prompt strategy, with a 23.2% ground-truth noise rate, across 6,400 predictions from GPT-4o-mini and Gemini 2.5 Flash (arXiv preprint, abstract opened) - [arXiv 2607.22949](https://arxiv.org/abs/2607.22949)
- Query understanding: Taobao's BEQUE fine-tunes an LLM for long-tail query rewriting, has been deployed since October 2023, and reports significant online gains in GMV, transactions and unique visitors for long-tail queries (vendor paper, 2023 to 2024, summary only) - [arXiv 2311.03758](https://arxiv.org/abs/2311.03758)
- Ranking and relevance: Alibaba's LORE (December 2025) frames search relevance as attribute extraction and matching between query and item with a tuned LLM (vendor paper, summary only) - [arXiv 2512.03025](https://arxiv.org/abs/2512.03025)
- In Shopping MMLU the gains from domain tuning were largest on user behavior alignment and multilingual tasks and smaller on concept understanding and reasoning (2024, opened) - [arXiv 2410.20745](https://arxiv.org/html/2410.20745v2)
- Tool use: one community LoRA on Qwen3.5-4B self-reports 79.0% on the BFCL V4 function-calling benchmark against 87.3% for the untuned base, which if accurate shows that careless tuning can reduce tool-calling ability (forum-grade self-report, summary only, not verified) - [Hugging Face model card](https://huggingface.co/sukhrobnurali/tooltuned-qwen-3.5-4b)

### Inferences
- The consistent pattern from 2023 to 2026 is "tuned model beats its own base by a lot, and beats or matches a frontier model of the previous generation on the trained task".
  No paper found claims a tuned small model beats the current frontier across shopping tasks.
- By how much: against its own base, +3 to +15 points per track (KDD Cup 2024), +7 to +16 points per skill (eCeLLM in Shopping MMLU), about +25 to 30% (e-Llama, vendor benchmarks), and +30.7 points for a 4B agent (ShoppingBench).
  Against a frontier model: about +10% on average for eCeLLM over GPT-4 Turbo on its own task set in 2024, and +0.5 points for the tuned 4B agent over GPT-4.1 in 2025.
- The ShoppingBench result is the strongest evidence for the fine-tuning plan and has three limits.
  The training trajectories were distilled from a stronger model, the test set shares the sandbox and task templates with the training set, and GPT-4.1 was already one to two generations behind the November 2026 frontier.
- Fine-tuning helps most where the task is narrow, high-volume, structured and has labels: attribute extraction and normalization, query rewriting and classification, relevance scoring, behavior prediction, and tool-call sequences for a fixed tool set.
- Fine-tuning helps least for open-ended product knowledge and reasoning, for skills outside the training data, and for very small bases (the 2024 result for models under 5B, though the 2025 4B agent result shows newer small bases respond better).
- Shopping ability correlates strongly with general ability, so each new general model release erodes a tuned model's lead and the tuning has to be repeated.
- Harness, tools and context moved the same model by up to 5.6 points on CommerceAgentBench.
  For a two-person team that is evidence that engineering around the model can matter as much as the choice between tuned and untuned.
- Fine-tuning needs data that a new vendor does not have.
  The winning KDD Cup team needed 500,000 examples and generated a large share synthetically, and ShoppingBench needed 2,410 teacher trajectories from a 2.7-million-product sandbox.

### Gaps
- No study was found that compares a fine-tuned small model with the November 2026 frontier models (for example Claude Fable 5.2, GPT-6.2, Gemini 4) on shopping tasks.
- No Amazon paper with Rufus evaluation numbers was found, only blog posts.
- The e-Llama gain percentages come from a secondary summary and were not confirmed in the paper.
- MMShopBench numbers were not read because only the abstract was opened.
- No fine-tuned entrant is reported on CommerceAgentBench or EcomBench.

## 4. What does a production store assistant need?

### Takeaway
A production store assistant is mostly integration and control work: a fresh, structured catalog behind a search tool, typed tools for cart, checkout handoff, orders and policies, hard rules enforced in code and not in the prompt, a regression eval suite, and streaming to hide latency.
No published source gives a firm latency target, but vendor guidance treats a spinner of five seconds or more as a failure and counts more than about five model turns per task as a warning sign.

### Cited Findings

#### Catalog, retrieval and structured attributes
- Shopify's Universal Commerce Protocol (UCP) endpoint exposes catalog tools `search_catalog`, `lookup_catalog` and `get_product`, cart tools `create_cart`, `get_cart`, `update_cart` and `cancel_cart`, a Checkout MCP, an `ask_business` tool for policies and FAQs, and an Order MCP for tracking (official docs, opened) - [Shopify developer docs](https://shopify.dev/docs/apps/build/storefront-mcp)
- Vendor guidance says search results should arrive already ranked by the store's search backend and that the agent decides what to show, not how to rank (vendor guidance, 2 September 2026, opened) - [Anthropic commerce agents guide](https://claude.com/blog/the-anatomy-of-effective-commerce-agents)
- The same guidance says to trim tool results to the fields the model reasons with, since image URLs on every search row waste context (vendor guidance, opened) - [Anthropic commerce agents guide](https://claude.com/blog/the-anatomy-of-effective-commerce-agents)
- A common retrieval baseline is 500-token chunks with 50-token overlap, which needs tuning for product copy (vendor guidance, 28 September 2026, opened) - [Vercel conversational commerce guide](https://vercel.com/i/conversational-commerce)
- The WooCommerce port of an open commerce agent uses keyword retrieval and caps scans at 400 recent orders and 250 products, which shows how limited a simple starter is (platform developer blog, opened) - [WooCommerce Developer Blog](https://developer.woocommerce.com/2026/09/16/wc-claude-commerce-agent/)
- Attribute mismatch was the largest failure class for GPT-4.1 on ShoppingBench (independent study, August 2025, opened) - [arXiv 2508.04266](https://arxiv.org/html/2508.04266v3)

#### Tool calls for cart, orders and returns
- On Shopify, `update_cart` replaces the whole cart, every request to the UCP endpoint must include an agent profile, and every Checkout MCP request must be authenticated or signed (official docs, opened) - [Shopify developer docs](https://shopify.dev/docs/apps/build/storefront-mcp)
- UCP lets an agent convert a cart to a checkout and refer the buyer to the merchant storefront to pay, and only higher trust tiers can complete checkout directly (official docs, summary only) - [Shopify agents quickstart](https://shopify.dev/docs/agents/get-started/quickstart)
- Order lookups on Shopify go through the Customer Accounts MCP server, which was unchanged by the 2026 migration (official docs, opened) - [Shopify developer docs](https://shopify.dev/docs/apps/build/storefront-mcp)
- In the WooCommerce port the assistant's cart lives on a Store API cart token the shopper's browser cannot see, so a bridge plugin re-adds each item to the shopper's cart with normal stock checks and sends the shopper to standard checkout (platform developer blog, opened) - [WooCommerce Developer Blog](https://developer.woocommerce.com/2026/09/16/wc-claude-commerce-agent/)
- The WooCommerce port's shopper agent covers catalog search, comparison, cart building, order tracking, policy answers and customer memory, and does not mention returns processing (platform developer blog, opened) - [WooCommerce Developer Blog](https://developer.woocommerce.com/2026/09/16/wc-claude-commerce-agent/)
- Vendor guidance recommends one agent with skills over one subagent per domain, because handoffs lose cart and preference state and add seconds and tokens (vendor guidance, opened) - [Anthropic commerce agents guide](https://claude.com/blog/the-anatomy-of-effective-commerce-agents)

#### Guardrails against wrong prices and policies
- Enforce rules in the harness and not in the prompt: the model stages a checkout but the backend has no charge method, only server-issued product IDs are accepted, purchase caps are enforced on the resulting cart state, and cart writes are serialized per session (vendor guidance, opened) - [Anthropic commerce agents guide](https://claude.com/blog/the-anatomy-of-effective-commerce-agents)
- Regulated text such as fees and disclosures should come from approved copy supplied by the server and be checked byte for byte in evals (vendor guidance, opened) - [Anthropic commerce agents guide](https://claude.com/blog/the-anatomy-of-effective-commerce-agents)
- Treat listings, reviews and seller messages as untrusted: strip control characters, neutralize fake turn or tool markup, cap size and wrap in a labeled fence (vendor guidance, opened) - [Anthropic commerce agents guide](https://claude.com/blog/the-anatomy-of-effective-commerce-agents)
- Validate tool output before it reaches the shopper and keep a fallback path, because about 3.5% of requests in one gateway's production data completed only after a fallback (vendor data, May 2026 index cited in a September 2026 guide, opened) - [Vercel conversational commerce guide](https://vercel.com/i/conversational-commerce)
- In the WooCommerce port every write is staged behind a human approval gate and the assistant never places orders or takes payment (platform developer blog, opened) - [WooCommerce Developer Blog](https://developer.woocommerce.com/2026/09/16/wc-claude-commerce-agent/)
- Shopify says its Inbox agent always shows buyers an option to connect to staff after every message (vendor reply in app reviews, summary only) - [Shopify Inbox app listing](https://apps.shopify.com/chat)
- Surveys cited by Vercel: 89% of respondents say companies should always offer a human option (SurveyMonkey) and 78% want to be able to switch from an AI agent to a person while only 15% have had a handoff that kept their context (Twilio) (survey data cited by a vendor, opened) - [Vercel conversational commerce guide](https://vercel.com/i/conversational-commerce)

#### Evaluation methods
- Build snapshot evals (construct state, add the user message, grade the final state and rendered answer), include messy multi-turn histories, pair each "should serve" with a "should refuse", test injection both from the user and from tool results, start with 50 to 100 cases per user flow, and gate each change on safety and high-traffic cases (vendor guidance, opened) - [Anthropic commerce agents guide](https://claude.com/blog/the-anatomy-of-effective-commerce-agents)
- CommerceAgentBench grades on end state, pass or fail, and passes a task only if every verifier check passes (vendor benchmark via press, opened) - [PYMNTS](https://www.pymnts.com/?p=4207827)
- Measure cost per completed task and not per call, because a cheaper model that needs more turns or fails more can cost more (vendor guidance, opened) - [Anthropic commerce agents guide](https://claude.com/blog/the-anatomy-of-effective-commerce-agents)
- Containment or deflection alone is not a quality measure, and repeat contacts should be tracked to catch false resolutions (trade press analysis, July 2026, summary only) - [CX Today](https://www.cxtoday.com/customer-engagement-journey-orchestration/klarna-ai-customer-service/)
- For attribute extraction, the evaluation protocol changed scores far more than the model did, so the eval set and matching rule need care before model comparisons mean anything (arXiv preprint, July 2026, abstract opened) - [arXiv 2607.22949](https://arxiv.org/abs/2607.22949)

#### Latency
- A rendered answer of 500 to 700 tokens without streaming means "five or more seconds of a spinner", so answers and presentation-tool parameters should stream (vendor guidance, opened) - [Anthropic commerce agents guide](https://claude.com/blog/the-anatomy-of-effective-commerce-agents)
- Dispatching tool calls as soon as their arguments finish cut some multi-second gaps to a few hundred milliseconds, and more than about five turns per task is a signal to test a stronger model (vendor guidance, opened) - [Anthropic commerce agents guide](https://claude.com/blog/the-anatomy-of-effective-commerce-agents)
- Prompt caching with hit rates of 90 to 99% is the stated target, with stable content (system prompt and tools) first and volatile content such as timestamps and the current page last (vendor guidance, opened) - [Anthropic commerce agents guide](https://claude.com/blog/the-anatomy-of-effective-commerce-agents)
- Amazon streams Rufus answers token by token and fills them with live data during streaming, and uses continuous batching so new requests start as soon as an earlier one in the batch finishes (vendor blog, October 2024, opened) - [Amazon Science](https://amazon.science/blog/the-technology-behind-amazons-genai-powered-shopping-assistant-rufus)
- A hosted small open model (Qwen3.5 9B with reasoning) measured 0.75 to 1.04 seconds to first token and 92 to 206 tokens per second on two providers (vendor benchmark, 3 April 2026, opened) - [DeepInfra blog](https://deepinfra.com/blog/qwen3-5-9b-api-benchmarks)
- Tool-call requests carried 58.9% of all tokens on one AI gateway in data through April 2026, up from 31.6% six months earlier (vendor data, opened) - [Vercel conversational commerce guide](https://vercel.com/i/conversational-commerce)

### Inferences
- Minimum production parts for a small-store assistant: catalog ingestion with change sync (webhooks or polling for price and stock), a search tool over structured attributes plus text, live price and stock read at answer time and never from the index, typed tools for cart, checkout handoff, order status and policies, harness-level rules for prices, discounts and policy text, human handoff, an eval suite, logging, and streaming.
- Catalog sync and attribute quality are the work most specific to small stores, because small-store catalogs are the least structured.
- None of this requires a fine-tuned model.
  The places where a tuned small model plausibly fits are offline attribute extraction and normalization during ingestion, and cheap classifiers for routing and safety.
- A practical latency goal that follows from the guidance and the measured figure is first visible text in about one second and a streamed full answer within a few seconds.
  This is an inference, not a published target.

### Gaps
- No published numeric latency target (for example time to first token) from Alibaba, Amazon, Walmart or Shopify was found.
- No public description of how small-store assistants keep price and stock fresh (sync intervals, webhook reliability) was found.
- Returns processing as an agent tool is thinly documented, and neither the Shopify docs page nor the WooCommerce port describes a returns tool.

## 5. Which failure modes are documented?

### Takeaway
The documented failures are invented policies and discounts, manipulation by users into absurd offers, off-brand output, false resolutions, hallucinated links, and prompt injection through product content, and tribunals and courts in Canada (2024) and Germany (2026) have held the business responsible for what its chatbot said.
The clearest lesson across cases is that prices, discounts and policy text must come from the system of record, because a prompt instruction did not stop any of these incidents.

### Cited Findings

#### Liability cases
- Moffatt v. Air Canada (British Columbia Civil Resolution Tribunal, February 2024): the airline's chatbot invented a bereavement refund policy, Air Canada argued the chatbot was a separate legal entity, and the tribunal rejected that, found negligent misrepresentation and held the airline responsible for all information on its website (legal analysis, February 2024, summary only) - [American Bar Association](https://www.americanbar.org/groups/business_law/resources/business-law-today/2024-february/bc-tribunal-confirms-companies-remain-liable-information-provided-ai-chatbot/); [CBC](https://www.cbc.ca/amp/1.7116416)
- The Air Canada award was CA$812.02 (figure cited by a vendor guide, opened) - [Vercel conversational commerce guide](https://vercel.com/i/conversational-commerce)
- Higher Regional Court of Hamm, Germany (press release dated 12 May 2026): a consumer organization sued under the Unfair Competition Act over a chatbot that described doctors on a clinic website as specialists, and the court attributed the chatbot's statements to the operators, rejected the argument that the chatbot is a third party, enjoined the claims and allowed an appeal to the Federal Court of Justice as a matter of first impression (legal analysis, 15 June 2026, opened) - [DLA Piper](https://www.dlapiper.com/en/insights/publications/2026/06/german-court-addresses-liability)
- EU AI Act Article 50 transparency duties applied from 2 August 2026, so a chatbot must tell users it is a machine, and penalties for transparency breaches reach EUR 15 million or 3% of worldwide annual turnover (cited by a vendor guide, opened, not checked against the Official Journal) - [Vercel conversational commerce guide](https://vercel.com/i/conversational-commerce)
- A law journal commentary argues that apparent authority can bind a business to what its customer-service bot offers and that a disclaimer may not limit liability (commentary, not a holding, summary only) - [Syracuse Journal of Science and Technology Law](https://jost.syr.edu/?p=3691)

#### Invented discounts, wrong prices, manipulation
- In December 2023 users got a ChatGPT-based chatbot on a Chevrolet dealership site to "accept" a $1 offer for a 2024 Tahoe (list price from $58,195), the dealership did not honor it, and GM said the bot was a third-party tool adopted by dealers (press report, December 2023, summary only) - [VentureBeat](https://venturebeat.com/ai/a-chevy-for-1-car-dealer-chatbots-show-perils-of-ai-for-customer-service)
- In February 2026 a UK small business's after-hours support chatbot, which was not meant to handle pricing, was steered over about an hour into inventing discount codes that rose from 25% to 80% on an order over GBP 8,000, the code failed at checkout, the customer demanded a manual discount and threatened small-claims court, and the business cancelled and refunded the order (forum post on Reddit retold by an incident site, single unverified first-hand account, opened) - [Vibe Graveyard](https://vibegraveyard.ai/story/uk-chatbot-80-percent-discount-refund/)
- In January 2024 a customer got the DPD delivery chatbot to swear and write a poem criticizing the company, and DPD disabled it and blamed an update (press report retold by a vendor blog, January 2024, summary only) - [Prompt Security blog](https://prompt.security/blog/8-real-world-incidents-related-to-ai/)
- Merchants reviewing Shopify's Inbox agent in 2026 report it sharing a link to a page that does not exist and failing to give the store address even with custom FAQ answers (merchant reviews, through late October 2026, summary only) - [Shopify Inbox app listing](https://apps.shopify.com/chat)
- Klarna reversed its AI-first service approach in May 2025 because of lower quality (press report, May 2025, summary only) - [Fortune](https://dc.fortune.com/2025/05/09/klarna-ai-humans-return-on-investment/)

#### Prompt injection and manipulation through content
- Microsoft's Magentic Marketplace study (late 2025) ran 100 customer agents against 300 business agents and found that prompt injection in business content redirected all payments to the manipulative agent for GPT-4o, GPT-OSS-20B and Qwen3-4B, and that some open models favored the last option listed regardless of merit (independent study, November 2025, summary only) - [arXiv 2510.25779](https://arxiv.org/abs/2510.25779); [The Register](https://www.theregister.com/2025/11/06/microsoft_unveils_the_magentic_marketplace)
- WebDecept (June 2026) found web shopping agents highly susceptible to deceptive interfaces and found prompt-based constraints often insufficient (arXiv paper, summary only) - [arXiv 2606.13686](https://arxiv.org/html/2606.13686v1)
- A January 2026 red-team study of Google's Agent Payments Protocol reported that simple adversarial prompts can reliably subvert agent behavior (arXiv paper, summary only) - [arXiv 2601.22569](https://arxiv.org/abs/2601.22569v1)
- Vendor guidance treats reviews, listings and seller messages as untrusted input and calls for separate injection tests for user text and for tool results (vendor guidance, opened) - [Anthropic commerce agents guide](https://claude.com/blog/the-anatomy-of-effective-commerce-agents)

#### Agent-specific failures
- Failure modes listed in vendor guidance: hallucinated product IDs reaching the backend, retries or parallel calls stacking past purchase caps, subagent handoffs dropping cart state, and safety rules that exist only in the prompt (vendor guidance, opened) - [Anthropic commerce agents guide](https://claude.com/blog/the-anatomy-of-effective-commerce-agents)
- The WooCommerce port warns of no undo, no durable conversation record, and a merchant service that holds a full-write key with no authentication (platform developer blog, opened) - [WooCommerce Developer Blog](https://developer.woocommerce.com/2026/09/16/wc-claude-commerce-agent/)
- On CommerceAgentBench failures clustered in long multi-step work such as landed-cost calculation, after-sales disputes with conflicting documents and multi-leg shipping (vendor benchmark via press, opened) - [Fortune](https://fortune.com/2026/09/09/alibaba-president-kuo-zhang-ai-agents-can-talk-but-not-work/)

### Inferences
- Legal exposure sits with the store, and by contract probably flows back to the assistant vendor.
  A small vendor needs indemnity terms, logging and a design in which the model cannot state a price, discount or policy that the backend did not supply.
- Small open models showed the highest injection vulnerability in the one study that compared them (Qwen3-4B and GPT-OSS-20B in Magentic Marketplace).
  A fine-tuned small model would need its own injection testing and cannot inherit a frontier vendor's safety work.
- A single small store has less third-party content (few sellers, few reviews) than a marketplace, so indirect injection risk is lower but not zero.
  Direct manipulation by the shopper (the Chevrolet and UK cases) is the main risk for small stores.

### Gaps
- No court ruling was found that enforces a chatbot-invented discount against a retailer; the Chevrolet and UK cases ended without one.
- A reported May 2026 Munich ruling on liability for AI-generated search summaries was seen only in a vendor blog summary and could not be verified.
- No US merits ruling on retailer chatbot misrepresentation was found.
- No incident statistics (frequency of wrong price or stock answers in production) were found.

## 6. What does a conversation cost in late 2026, and what gross margin does that leave at $20 to $100 a month per store?

### Takeaway
With November 2026 list prices a typical four-turn store conversation costs about $0.002 to $0.005 on the cheapest tier from any major lab or on a hosted small open model, about $0.03 to $0.11 on mid-tier models, and about $0.14 to $0.43 on top models, so model cost is small against a $20 to $100 monthly price only if a small or mid-tier model carries most traffic.
Because the labs' cheapest models now cost about the same per token as hosted small open models, self-hosting or fine-tuning brings almost no cost advantage below roughly 60,000 conversations a month.

### Cited Findings

#### Token prices (official price lists, opened November 2026, USD per million tokens)
- Anthropic: Claude Fable 5.2 $8 input and $40 output, Opus 5.5 $4 and $20, Sonnet 5.5 $2 and $10, Haiku 5.5 $0.10 and $0.50 for prompts up to 100,000 tokens, with cache reads at $0.20, $0.20, $0.10 and $0.01 and 5-minute cache writes at 1.25 times input (official price list) - [Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing)
- Anthropic's Batch API gives a 50% discount, and Claude 4.7 and later models use a tokenizer that produces about 30% more tokens for the same text (official docs) - [Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing)
- OpenAI: gpt-6.2-astra $8 input, $0.40 cached input and $40 output, gpt-6.2-sol $2, $0.10 and $10, gpt-6.1-terra $1, $0.05 and $5, gpt-6-luna $0.10, $0.01 and $0.50, and the older gpt-5-nano $0.05, $0.005 and $0.40 (official price list) - [OpenAI API pricing](https://developers.openai.com/api/docs/pricing)
- Google: Gemini 4 Hydrogen $1.50 input and $7.50 output, Gemini 3.8 Flash $0.75 and $3.75 until 31 December 2026 and $1.50 and $7.50 from 1 January 2027, Gemini 3.5 Flash-Lite $0.30 and $2.50, Gemini 3.1 Flash-Lite $0.25 and $1.50, and Gemini 4 Carbon and Argon $2 and $10 until 30 November 2026 and $4 and $20 from 1 December 2026 (official price list) - [Google AI Studio pricing](https://aistudio.google.com/docs/pricing)
- Hosted small open model: Qwen3.5 9B costs $0.04 input and $0.20 output on DeepInfra and $0.10 and $0.15 on Together, with a 262k context window (vendor blog, 3 April 2026, opened, may have changed since) - [DeepInfra blog](https://deepinfra.com/blog/qwen3-5-9b-api-benchmarks)
- Hosted fine-tuning: Together lists supervised fine-tuning of Qwen3.5 9B at $0.38 per million training tokens (official page per search summary, the page returned 404 when opened, not verified) - [Together AI pricing](https://www.together.ai/pricing-capacity)
- GPU rental: an L4 runs $0.44 to $0.80 per hour on demand (Google Cloud lists $0.70), an L40S about $0.79 to $1.60 per hour, and an H100 a November 2026 on-demand median of $3.92 per hour (aggregator and provider pages, summary only) - [CloudZero](https://www.cloudzero.com/blog/cloud-gpu-pricing/); [RunPod](https://www.runpod.io/gpu-cloud/pricing); [AIMultiple GPU index](https://aimultiple.com/gpu-index)

#### Conversation length and market price anchors
- Zalando reports more than two questions per assistant conversation on average (vendor claim via press, summary only) - [Modaes](https://www.modaes.com/global/companies/zalando-is-refining-its-ai-assistant-using-sizing-data-from-53-million-customers)
- Tool-call requests carried 58.9% of all tokens on one AI gateway through April 2026 (vendor data, opened) - [Vercel conversational commerce guide](https://vercel.com/i/conversational-commerce)
- Cached input reads cost a tenth of fresh input and a 90 to 99% cache hit rate is the stated target for commerce agents (vendor guidance, opened) - [Anthropic commerce agents guide](https://claude.com/blog/the-anatomy-of-effective-commerce-agents)
- SaaS vendors charge about $0.90 to $2.00 per resolved conversation, for example $0.99 for Intercom Fin and $0.90 to $1.00 for Gorgias (vendor price lists compiled by an agency index, summary only) - [Elogic cost index](https://elogic.co/?p=475505)
- An analysis of 220 million chats puts a fully automated chatbot resolution at $0.50 to $2.00 and an AI-assisted human contact at $4 to $7 (vendor analysis, summary only) - [Comm100](https://www.comm100.com/blog/how-to-calculate-live-chat-ai-chatbot-roi)
- Reported AI resolution rates for e-commerce range from 10 to 20% (a support outsourcer's data from 20 or more brands) to 70 to 84% (a chatbot vendor's claim), with definitions that differ (vendor claims, summary only) - [Influx](https://influx.com/blog/gorgias-ai-performance-benchmarks-high-performing-cx-teams); [Fin](https://fin.ai/learn/ecommerce-ai-scaling-resolution-rates)

### Inferences

All numbers below are calculations made for these notes from the official list prices above.
They are not published figures.

#### Assumed conversation
- "Typical" conversation: 4 shopper turns, each with one tool call and one answer (8 model calls), a 3,000-token system prompt plus tool definitions, 40 tokens per shopper message, 60 tokens per tool call, 1,200 tokens per trimmed tool result and 250 tokens per answer.
- That adds up to about 47,960 input tokens and 1,240 output tokens.
- With prompt caching about 39,010 of the input tokens are cache reads and about 8,950 are fresh.
- "Heavy" conversation: about 200,000 input tokens (160,000 cache reads, 40,000 fresh) and 3,000 output tokens, for example 8 turns with two tool calls each and larger results.
- No published average for tokens per store-chat conversation was found, so these lengths are assumptions.
- Claude token counts may run about 30% higher for the same text because of the newer tokenizer.

#### Cost per conversation (USD, list prices, November 2026)

| Model | Typical, no caching | Typical, with caching | Heavy, with caching |
|---|---|---|---|
| Claude Fable 5.2 | 0.433 | 0.147 | 0.55 |
| GPT-6.2 Astra | 0.433 | 0.137 | not computed |
| Claude Opus 5.5 | 0.217 | 0.077 | 0.29 |
| Claude Sonnet 5.5 | 0.108 | 0.039 | 0.146 |
| GPT-6.2 Sol | 0.108 | 0.034 | 0.126 |
| Gemini 4 Hydrogen | 0.081 | about 0.026 (storage fee ignored) | not computed |
| GPT-6.1 Terra | 0.054 | 0.017 | 0.063 |
| Gemini 3.8 Flash | 0.041 (0.081 from 1 January 2027) | not computed | 0.161 without caching |
| Gemini 3.1 Flash-Lite | 0.014 | not computed | 0.055 without caching |
| Claude Haiku 5.5 | 0.0054 | 0.0021 | 0.0081 |
| GPT-6 Luna | 0.0054 | 0.0019 | 0.0071 |
| Qwen3.5 9B hosted (DeepInfra, April 2026 price) | 0.0022 | no caching assumed | 0.0086 without caching |
| Qwen3.5 9B hosted (Together, April 2026 price) | 0.0050 | no caching assumed | not computed |

#### Self-hosting break-even
- One always-on L4 at $0.44 to $0.80 per hour costs about $317 to $576 a month.
- At $0.0022 to $0.005 per typical conversation on a hosted small model, $317 buys about 63,000 to 144,000 conversations a month.
- A dedicated GPU therefore only starts to pay above roughly 60,000 to 140,000 conversations a month in total across all stores, before counting engineering time, redundancy and peak concurrency.
- No measured throughput for a tuned 4B to 9B model on an L4 was found, so the capacity side of this estimate is open.
- Training cost is negligible: 2,410 trajectories of about 10,000 tokens each is about 24 million tokens, or about $9 per epoch at the $0.38 per million rate (unverified price).
- Offline catalog enrichment is also cheap on a lab's small model: 5,000 products at 1,500 input and 300 output tokens each cost about $0.75 on Claude Haiku 5.5 through the Batch API.

#### Gross margin on model cost alone
- Cost tiers per typical conversation used here: small model about $0.005, mid-tier model with caching about $0.04, top model with caching about $0.15.
- Monthly conversation counts per store are assumptions (200, 1,000 and 5,000), because no sourced figure for chat volume at small stores was found.

| Plan price | Model tier | 200 conversations | 1,000 conversations | 5,000 conversations |
|---|---|---|---|---|
| $20 | small ($1, $5, $25 cost) | 95% | 75% | negative |
| $20 | mid ($8, $40, $200 cost) | 60% | negative | negative |
| $20 | top ($30, $150, $750 cost) | negative | negative | negative |
| $50 | small | 98% | 90% | 50% |
| $50 | mid | 84% | 20% | negative |
| $50 | top | 40% | negative | negative |
| $100 | small | 99% | 95% | 75% |
| $100 | mid | 92% | 60% | negative |
| $100 | top | 70% | negative | negative |

- These margins exclude hosting, embeddings and vector search, payment fees, support and the cost of failed or abusive conversations.
- At $20 a month a store assistant is viable on a small model, or on a mid-tier model only for low-traffic stores, and needs a usage cap or usage-based tier for busy stores.
- A router that sends easy turns to a small model and hard turns to a mid-tier model keeps blended cost near $0.01 to $0.02 per conversation, which leaves 80% or more margin at $50 up to about 1,000 conversations a month.
- The cost argument for fine-tuning a self-hosted small model is weak in November 2026.
  Claude Haiku 5.5 and GPT-6 Luna at $0.10 input and $0.50 output are priced in the same range as hosted Qwen3.5 9B at $0.04 to $0.10 input and $0.15 to $0.20 output, so the saving is a fraction of a cent per conversation.
- Price risk runs both ways: Google has announced increases on Gemini 3.8 Flash and Gemini 4 Carbon and Argon for December 2026 and January 2027, while Anthropic cancelled a planned Sonnet 5 increase.
- Incumbent pricing of about $0.90 to $2.00 per resolved conversation is 20 to 400 times the model cost of a typical conversation on small or mid-tier models.
  The price of these products is therefore set by value and by integration and support cost, not by inference cost.

### Gaps
- No published figure for average messages or tokens per conversation in store chat was found.
- No sourced figure for how many assistant conversations a small store has per month was found.
- Current November 2026 serverless prices for small open models were not confirmed on a provider price page; the Qwen3.5 9B prices are from an April 2026 vendor blog.
- Whether hosted providers serve a customer's fine-tuned LoRA adapter at the base serverless price was not confirmed.
- No measured tokens-per-second for small models on L4 or L40S hardware was found, so self-hosted cost per million tokens could not be computed directly.

## 7. Which open building blocks exist?

### Takeaway
The building blocks are plentiful and mostly free: Shopify's UCP endpoints for catalog, cart, checkout, policy and order tools, open starter code for shopper and merchant agents from Anthropic with a WooCommerce port, several community MCP servers, and capable small open models under Apache-style licenses.
The same shift removed a shortcut and added a competitor: Shopify archived its `shop-chat-agent` sample on 16 October 2026, removed the Storefront MCP catalog and cart tools, and now points merchants to its own no-code Inbox agent.

### Cited Findings

#### Shopify
- Shopify removed the catalog and cart tools from the Storefront MCP endpoint `https://{shop}/api/mcp` and replaced them with UCP at `https://{shop}/api/ucp/mcp` (official docs, opened) - [Shopify developer docs](https://shopify.dev/docs/apps/build/storefront-mcp)
- The migration page tells merchants to use the Inbox agent in Shopify Inbox without code, and points developers and third-party assistant builders to Shop MCP or to each store's UCP endpoint (official docs, opened) - [Shopify developer docs](https://shopify.dev/docs/apps/build/storefront-mcp)
- The `Shopify/shop-chat-agent` repository is archived and read-only as of 16 October 2026, its notice says the app no longer works for building a storefront agent, and it names `Shopify/claude-for-commerce-examples` as the replacement sample (official repository, opened) - [GitHub Shopify/shop-chat-agent](https://github.com/Shopify/shop-chat-agent)
- Before archiving, the sample was a React Router app with a theme-extension chat widget that used Claude and the tools `search_shop_catalog`, `update_cart`, `get_cart`, `search_shop_policies_and_faqs`, `get_most_recent_order_status` and `get_order_status`, and it had 151 stars and 122 forks (official repository, opened) - [GitHub Shopify/shop-chat-agent](https://github.com/Shopify/shop-chat-agent)
- The `search_shop_policies_and_faqs` tool remains on the old endpoint per the archive notice, while a community forum thread mentions a sunset date of 31 August for it, so the sources conflict (official repository opened, forum post summary only) - [GitHub Shopify/shop-chat-agent](https://github.com/Shopify/shop-chat-agent); [Shopify developer community](https://community.shopify.dev/c/agentic/30)
- The UCP quickstart runs the flow of profile, catalog search, cart, checkout and order tracking through a CLI, and UCP's listed backers include Shopify, Google, Wayfair, Target and Etsy (official docs, summary only) - [Shopify agents quickstart](https://shopify.dev/docs/agents/get-started/quickstart); [Shopify UCP page](https://www.shopify.com/za/ucp)
- Shopify's Inbox agent is an opt-in agent that answers questions about products, shipping, returns, sizing and policies from the catalog, policies, Knowledge Base and storefront content, personalizes from purchase history where available, and can run cited web searches about a catalog product (official docs, opened) - [Shopify Help Center](https://help.shopify.com/en/manual/inbox/ai)
- The Shopify Inbox app is listed as free, and no separate price for the agent was found (app listing, summary only, agent pricing not verified) - [Shopify Inbox app listing](https://apps.shopify.com/chat)

#### Open starter code and community servers
- Anthropic published open-source commerce agent starter code on 2 September 2026 with a shopper agent and a merchant agent, harnesses and guardrails, and three runtime paths (Messages API, Agent SDK, Managed Agents with MCP) (vendor guidance and platform blog, opened) - [Anthropic commerce agents guide](https://claude.com/blog/the-anatomy-of-effective-commerce-agents); [WooCommerce Developer Blog](https://developer.woocommerce.com/2026/09/16/wc-claude-commerce-agent/)
- WooCommerce ported it into its `woocommerce/agentic-tools` repository as a self-hosted Python 3.11 service with a Next.js front end and a bridge plugin, says setup takes about fifteen minutes, and says the tools are for experimentation and are not officially maintained (platform developer blog, opened) - [WooCommerce Developer Blog](https://developer.woocommerce.com/2026/09/16/wc-claude-commerce-agent/)
- EcomAIBridge is a self-hosted PHP middleware with a chat widget that lists WooCommerce as stable plus OpenCart, PrestaShop and a Shopify connector (open-source project, summary only, maturity not checked) - [GitHub ecomaibridge/core](https://github.com/ecomaibridge/core)
- KZB AI Cart Assistant is a WordPress plugin that exposes a WooCommerce store through an MCP server (plugin listing, summary only) - [WordPress.org](https://wordpress.org/plugins/kzb-ai-cart-assistant/)
- WisWes is a GPL-3.0 MCP connector for Magento sold with a paid installation service (marketplace listing, summary only) - [Adobe Commerce Marketplace](https://commercemarketplace.adobe.com/wiswes-magento-mcp.html)
- Open benchmarks usable as eval material: Shopping MMLU, ShoppingBench (Lazada sandbox with six tools), EcomBench and CommerceAgentBench (papers and repositories, partly opened) - [arXiv 2410.20745](https://arxiv.org/html/2410.20745v2); [arXiv 2508.04266](https://arxiv.org/html/2508.04266v3); [Hugging Face EcomBench](https://huggingface.co/datasets/Alibaba-NLP/EcomBench); [PYMNTS on CommerceAgentBench](https://www.pymnts.com/?p=4207827)
- Open training data: ECInstruct (from eCeLLM), Amazon Reviews 2023, Amazon-M2 and ESCI were the real datasets used by the KDD Cup 2024 winner (competition paper, 2024, opened) - [arXiv 2408.04658](https://arxiv.org/html/2408.04658v1)

#### Small open models suited to fine-tuning (late 2026)
- Roundups rank Qwen3.5-9B (Apache 2.0) as the strongest all-round model under 10B parameters and name Qwen3.5-4B and the newer Qwen3.6 as successors to Qwen3-4B for tool calling (blog roundups, summary only, rankings are directional) - [Labellerr](https://www.labellerr.com/blog/best-small-language-models-under-10b-parameters/); [AI in Plain English](https://ai.plainenglish.io/5-tiny-language-models-for-tool-calling-part-3-ebcda32c2518)
- IBM Granite 4.1 8B (released late April 2026) and Granite 4.1 3B target tool calling and are Apache 2.0 with 128K context (blog roundups, summary only) - [Labellerr](https://www.labellerr.com/blog/best-small-language-models-under-10b-parameters/); [AI in Plain English](https://ai.plainenglish.io/5-tiny-language-models-for-tool-calling-part-3-ebcda32c2518)
- Gemma 4 E4B (about 4.5B parameters, about 5 GB RAM at 4-bit) is positioned for agents and tool calling on constrained hardware (blog roundup, summary only) - [Labellerr](https://www.labellerr.com/blog/best-small-language-models-under-10b-parameters/)
- Llama 3.1 8B is cited mainly as a permissively licensed base with a large fine-tuning ecosystem and not as a tool-calling leader (blog roundup, summary only) - [Prem AI blog](https://blog.premai.io/best-lightweight-language-models-worth-running)
- The base model with the strongest published shopping-agent fine-tuning result is Qwen3-4B (18.0% to 48.7% on ShoppingBench with supervised tuning plus reinforcement learning) (independent study, August 2025, opened) - [arXiv 2508.04266](https://arxiv.org/html/2508.04266v3)
- A December 2025 paper reports that small models fine-tuned for tool calling beat larger ones on ToolBench, using a 350M base (arXiv paper, summary only) - [arXiv 2512.15943](https://arxiv.org/abs/2512.15943)

### Inferences
- A working store assistant can be assembled in days from UCP or a WooCommerce bridge, the open starter agents and a hosted model.
  The barrier to entry is low for everyone, which makes the assembled product hard to defend.
- Shopify moving the default path to its own free, native Inbox agent, with access to Shop identity and purchase history, puts a platform-owned competitor in front of every Shopify merchant.
  A third-party assistant on Shopify has to beat a free default or serve stores outside Shopify.
- The platform changed its agent interface within about a year (Storefront MCP to UCP), so a small vendor carries ongoing migration cost and platform dependence.
- For a fine-tuning plan the most defensible open assets are the benchmarks and datasets, used first as an eval harness.
  A sensible sequence is to measure a frontier model, a lab small model and an untuned small open model on the same store-level eval set, then tune only where a gap remains.
- Candidate bases for tuning in late 2026 are Qwen3.5-4B or 9B, Granite 4.1 3B or 8B and Gemma 4 E4B, with licenses to be confirmed on each model card.

### Gaps
- The license of the open commerce starter code and of `woocommerce/agentic-tools` was not stated in the sources read.
- The contents and maturity of `Shopify/claude-for-commerce-examples` and of "Shop MCP" were not checked.
- The launch date and pricing of Shopify's Inbox agent were not confirmed.
- Small-model rankings come from blogs, and no neutral late-2026 leaderboard for tool calling at 4B to 9B was opened.
- No open-source store assistant with meaningful adoption beyond vendor samples was identified, and no Medusa-specific project was found.
