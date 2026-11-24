/**
 * The crawler identities Leaflyst checks.
 *
 * The robots token is what robots.txt rules are matched against. The user agent
 * strings follow each operator's documented format, but version numbers change,
 * so matching never depends on them. Recheck against the operators' pages
 * (plan.md section 14) when updating this list.
 */
export interface CrawlerIdentity {
  id: string;
  operator: "Google" | "Microsoft" | "OpenAI" | "Anthropic" | "Perplexity";
  robotsToken: string;
  purpose: "search" | "ai-search" | "ai-training" | "ai-user";
  userAgent: string;
  // Google-Extended is a robots.txt token only; Google fetches with Googlebot.
  fetches: boolean;
}

const chrome = "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible;";

export const IDENTITIES: CrawlerIdentity[] = [
  {
    id: "googlebot",
    operator: "Google",
    robotsToken: "Googlebot",
    purpose: "search",
    userAgent: `${chrome} Googlebot/2.1; +http://www.google.com/bot.html) Chrome/130.0.0.0 Safari/537.36`,
    fetches: true,
  },
  {
    id: "google-extended",
    operator: "Google",
    robotsToken: "Google-Extended",
    purpose: "ai-training",
    userAgent: "",
    fetches: false,
  },
  {
    id: "bingbot",
    operator: "Microsoft",
    robotsToken: "bingbot",
    purpose: "search",
    userAgent: `${chrome} bingbot/2.0; +http://www.bing.com/bingbot.htm) Chrome/130.0.0.0 Safari/537.36`,
    fetches: true,
  },
  {
    id: "gptbot",
    operator: "OpenAI",
    robotsToken: "GPTBot",
    purpose: "ai-training",
    userAgent: `${chrome} GPTBot/1.3; +https://openai.com/gptbot)`,
    fetches: true,
  },
  {
    id: "oai-searchbot",
    operator: "OpenAI",
    robotsToken: "OAI-SearchBot",
    purpose: "ai-search",
    userAgent: `${chrome} OAI-SearchBot/1.3; +https://openai.com/searchbot)`,
    fetches: true,
  },
  {
    id: "chatgpt-user",
    operator: "OpenAI",
    robotsToken: "ChatGPT-User",
    purpose: "ai-user",
    userAgent: `${chrome} ChatGPT-User/1.0; +https://openai.com/bot)`,
    fetches: true,
  },
  {
    id: "claudebot",
    operator: "Anthropic",
    robotsToken: "ClaudeBot",
    purpose: "ai-training",
    userAgent: `${chrome} ClaudeBot/1.0; +claudebot@anthropic.com)`,
    fetches: true,
  },
  {
    id: "claude-searchbot",
    operator: "Anthropic",
    robotsToken: "Claude-SearchBot",
    purpose: "ai-search",
    userAgent: `${chrome} Claude-SearchBot/1.0; +https://www.anthropic.com)`,
    fetches: true,
  },
  {
    id: "claude-user",
    operator: "Anthropic",
    robotsToken: "Claude-User",
    purpose: "ai-user",
    userAgent: `${chrome} Claude-User/1.0; +https://www.anthropic.com)`,
    fetches: true,
  },
  {
    id: "perplexitybot",
    operator: "Perplexity",
    robotsToken: "PerplexityBot",
    purpose: "ai-search",
    userAgent: `${chrome} PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)`,
    fetches: true,
  },
  {
    id: "perplexity-user",
    operator: "Perplexity",
    robotsToken: "Perplexity-User",
    purpose: "ai-user",
    userAgent: `${chrome} Perplexity-User/1.0; +https://perplexity.ai/perplexity-user)`,
    fetches: true,
  },
];

/** A plain browser identity, used as the baseline when comparing crawler responses. */
export const BROWSER_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Leaflyst-Audit";

/** Crawlers whose blocking hurts search or AI answer visibility. Training bots are the owner's choice. */
export function visibilityCritical(identity: CrawlerIdentity): boolean {
  return identity.purpose === "search" || identity.purpose === "ai-search";
}
