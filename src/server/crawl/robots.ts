/**
 * robots.txt parsing and matching, following RFC 9309:
 * - a crawler uses the one group whose user-agent line matches its product token,
 *   most specific first, and falls back to the "*" group;
 * - within that group the longest matching rule wins, and Allow wins a tie;
 * - "*" in a path matches any run of characters and a trailing "$" anchors the end.
 */

export interface RobotsRule {
  allow: boolean;
  pattern: string;
}

export interface RobotsGroup {
  agents: string[];
  rules: RobotsRule[];
}

export interface ParsedRobots {
  groups: RobotsGroup[];
  sitemaps: string[];
}

export function parseRobots(text: string): ParsedRobots {
  const groups: RobotsGroup[] = [];
  const sitemaps: string[] = [];
  let current: RobotsGroup | null = null;
  // Consecutive user-agent lines share one group; a rule line closes the agent list.
  let lastWasAgent = false;

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*$/, "").trim();
    if (!line) continue;
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const field = line.slice(0, colon).trim().toLowerCase();
    const value = line.slice(colon + 1).trim();

    if (field === "user-agent") {
      if (!current || !lastWasAgent) {
        current = { agents: [], rules: [] };
        groups.push(current);
      }
      current.agents.push(value.toLowerCase());
      lastWasAgent = true;
    } else if (field === "allow" || field === "disallow") {
      lastWasAgent = false;
      if (!current) continue;
      // An empty Disallow means "allow everything" and adds no rule.
      if (value === "") continue;
      current.rules.push({ allow: field === "allow", pattern: value });
    } else if (field === "sitemap") {
      sitemaps.push(value);
    } else {
      lastWasAgent = false;
    }
  }
  return { groups, sitemaps };
}

/** The group a crawler with this product token obeys, or null when none applies. */
export function groupFor(robots: ParsedRobots, productToken: string): RobotsGroup | null {
  const token = productToken.toLowerCase();
  const specific = robots.groups.filter((g) => g.agents.some((a) => a !== "*" && a === token));
  if (specific.length > 0) {
    // Several groups for the same agent are merged, as major crawlers do.
    return { agents: [token], rules: specific.flatMap((g) => g.rules) };
  }
  const wildcard = robots.groups.filter((g) => g.agents.includes("*"));
  if (wildcard.length > 0) return { agents: ["*"], rules: wildcard.flatMap((g) => g.rules) };
  return null;
}

function patternToRegex(pattern: string): RegExp {
  const anchored = pattern.endsWith("$");
  const body = anchored ? pattern.slice(0, -1) : pattern;
  const escaped = body
    .split("*")
    .map((part) => part.replace(/[.+?^${}()|[\]\\]/g, "\\$&"))
    .join(".*");
  return new RegExp(`^${escaped}${anchored ? "$" : ""}`);
}

export interface RobotsVerdict {
  allowed: boolean;
  group: string | null;
  rule: RobotsRule | null;
}

export function isAllowed(robots: ParsedRobots, productToken: string, path: string): RobotsVerdict {
  const group = groupFor(robots, productToken);
  if (!group) return { allowed: true, group: null, rule: null };
  let best: RobotsRule | null = null;
  for (const rule of group.rules) {
    if (!patternToRegex(rule.pattern).test(path)) continue;
    if (
      !best ||
      rule.pattern.length > best.pattern.length ||
      (rule.pattern.length === best.pattern.length && rule.allow && !best.allow)
    ) {
      best = rule;
    }
  }
  return { allowed: best ? best.allow : true, group: group.agents[0] ?? null, rule: best };
}
