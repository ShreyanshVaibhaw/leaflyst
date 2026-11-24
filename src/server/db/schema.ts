import {
  bigint,
  boolean,
  date,
  doublePrecision,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

const id = () => uuid("id").primaryKey().defaultRandom();
const createdAt = () => timestamp("created_at", { withTimezone: true }).notNull().defaultNow();
const siteRef = () =>
  uuid("site_id")
    .notNull()
    .references(() => sites.id, { onDelete: "cascade" });

export const users = pgTable("users", {
  id: id(),
  githubId: bigint("github_id", { mode: "number" }).unique(),
  login: text("login").notNull(),
  name: text("name"),
  email: text("email"),
  createdAt: createdAt(),
});

export const sessions = pgTable("sessions", {
  // SHA-256 of the cookie value, so a database leak does not leak live sessions.
  tokenHash: text("token_hash").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: createdAt(),
});

export const githubInstallations = pgTable("github_installations", {
  id: bigint("id", { mode: "number" }).primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
  accountLogin: text("account_login").notNull(),
  suspended: boolean("suspended").notNull().default(false),
  createdAt: createdAt(),
});

export const repos = pgTable("repos", {
  id: bigint("id", { mode: "number" }).primaryKey(),
  installationId: bigint("installation_id", { mode: "number" })
    .notNull()
    .references(() => githubInstallations.id, { onDelete: "cascade" }),
  fullName: text("full_name").notNull(),
  defaultBranch: text("default_branch").notNull().default("main"),
  createdAt: createdAt(),
});

export const googleConnections = pgTable("google_connections", {
  id: id(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  email: text("email"),
  refreshTokenEnc: text("refresh_token_enc").notNull(),
  scopes: text("scopes").notNull(),
  createdAt: createdAt(),
});

export const sites = pgTable("sites", {
  id: id(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  baseUrl: text("base_url").notNull(),
  brandName: text("brand_name"),
  repoId: bigint("repo_id", { mode: "number" }).references(() => repos.id, {
    onDelete: "set null",
  }),
  googleConnectionId: uuid("google_connection_id").references(() => googleConnections.id, {
    onDelete: "set null",
  }),
  gscProperty: text("gsc_property"),
  // Vercel "protection bypass for automation" secret, encrypted.
  previewBypassEnc: text("preview_bypass_enc"),
  aiCostCapUsd: doublePrecision("ai_cost_cap_usd").notNull().default(5),
  createdAt: createdAt(),
});

export const crawlRuns = pgTable(
  "crawl_runs",
  {
    id: id(),
    siteId: siteRef(),
    status: text("status").notNull().default("queued"),
    pageCount: integer("page_count").notNull().default(0),
    error: text("error"),
    startedAt: timestamp("started_at", { withTimezone: true }),
    finishedAt: timestamp("finished_at", { withTimezone: true }),
    createdAt: createdAt(),
  },
  (t) => [index("crawl_runs_site_idx").on(t.siteId, t.createdAt)],
);

export const pages = pgTable(
  "pages",
  {
    id: id(),
    siteId: siteRef(),
    path: text("path").notNull(),
    sources: jsonb("sources").$type<string[]>().notNull().default([]),
    impressions28d: integer("impressions_28d").notNull().default(0),
    createdAt: createdAt(),
  },
  (t) => [uniqueIndex("pages_site_path_uq").on(t.siteId, t.path)],
);

export const pageFetches = pgTable(
  "page_fetches",
  {
    id: id(),
    crawlRunId: uuid("crawl_run_id")
      .notNull()
      .references(() => crawlRuns.id, { onDelete: "cascade" }),
    siteId: siteRef(),
    path: text("path").notNull(),
    identity: text("identity").notNull(),
    status: integer("status"),
    finalUrl: text("final_url"),
    redirects: jsonb("redirects").$type<string[]>().notNull().default([]),
    robotsAllowed: boolean("robots_allowed").notNull(),
    xRobotsTag: text("x_robots_tag"),
    metaRobots: text("meta_robots"),
    bytes: integer("bytes"),
    error: text("error"),
    createdAt: createdAt(),
  },
  (t) => [index("page_fetches_run_idx").on(t.crawlRunId, t.path)],
);

export const pageRenders = pgTable(
  "page_renders",
  {
    id: id(),
    crawlRunId: uuid("crawl_run_id")
      .notNull()
      .references(() => crawlRuns.id, { onDelete: "cascade" }),
    siteId: siteRef(),
    path: text("path").notNull(),
    rawWords: integer("raw_words").notNull(),
    renderedWords: integer("rendered_words").notNull(),
    // Share of the rendered main text that is missing from the raw HTML, 0 to 1.
    gap: doublePrecision("gap").notNull(),
    createdAt: createdAt(),
  },
  (t) => [index("page_renders_run_idx").on(t.crawlRunId)],
);

export const findings = pgTable(
  "findings",
  {
    id: id(),
    siteId: siteRef(),
    crawlRunId: uuid("crawl_run_id").references(() => crawlRuns.id, { onDelete: "set null" }),
    checkId: text("check_id").notNull(),
    // Stable identity of "the same problem", so reruns update instead of duplicating.
    fingerprint: text("fingerprint").notNull(),
    severity: text("severity").notNull(),
    title: text("title").notNull(),
    affectedPaths: jsonb("affected_paths").$type<string[]>().notNull(),
    evidence: jsonb("evidence").notNull(),
    expectedEffect: text("expected_effect").notNull(),
    fixType: text("fix_type"),
    score: doublePrecision("score").notNull(),
    status: text("status").notNull().default("open"),
    statusReason: text("status_reason"),
    lastSeenAt: timestamp("last_seen_at", { withTimezone: true }).notNull().defaultNow(),
    createdAt: createdAt(),
  },
  (t) => [
    uniqueIndex("findings_site_fp_uq").on(t.siteId, t.fingerprint),
    index("findings_site_score_idx").on(t.siteId, t.score),
  ],
);

export const changes = pgTable(
  "changes",
  {
    id: id(),
    siteId: siteRef(),
    findingId: uuid("finding_id")
      .notNull()
      .references(() => findings.id, { onDelete: "cascade" }),
    fixType: text("fix_type").notNull(),
    status: text("status").notNull().default("fixing"),
    branch: text("branch"),
    commitSha: text("commit_sha"),
    mergeSha: text("merge_sha"),
    prNumber: integer("pr_number"),
    prUrl: text("pr_url"),
    agentSessionId: text("agent_session_id"),
    agentCostUsd: doublePrecision("agent_cost_usd"),
    diffStats: jsonb("diff_stats").$type<{ files: number; additions: number; deletions: number }>(),
    baseline: jsonb("baseline"),
    controlPaths: jsonb("control_paths").$type<string[]>(),
    score14: jsonb("score_14"),
    score28: jsonb("score_28"),
    openedAt: timestamp("opened_at", { withTimezone: true }),
    mergedAt: timestamp("merged_at", { withTimezone: true }),
    deployedAt: timestamp("deployed_at", { withTimezone: true }),
    verifiedAt: timestamp("verified_at", { withTimezone: true }),
    createdAt: createdAt(),
  },
  (t) => [index("changes_site_idx").on(t.siteId, t.createdAt)],
);

export const verifications = pgTable("verifications", {
  id: id(),
  changeId: uuid("change_id")
    .notNull()
    .references(() => changes.id, { onDelete: "cascade" }),
  kind: text("kind").notNull(),
  baseUrl: text("base_url").notNull(),
  passed: boolean("passed").notNull(),
  details: jsonb("details").notNull(),
  createdAt: createdAt(),
});

export const metricDaily = pgTable(
  "metric_daily",
  {
    siteId: siteRef(),
    source: text("source").notNull(),
    date: date("date").notNull(),
    page: text("page").notNull().default(""),
    query: text("query").notNull().default(""),
    clicks: integer("clicks").notNull().default(0),
    impressions: integer("impressions").notNull().default(0),
    position: doublePrecision("position"),
  },
  (t) => [
    uniqueIndex("metric_daily_uq").on(t.siteId, t.source, t.date, t.page, t.query),
    index("metric_daily_page_idx").on(t.siteId, t.source, t.page, t.date),
  ],
);

export const aiPrompts = pgTable("ai_prompts", {
  id: id(),
  siteId: siteRef(),
  text: text("text").notNull(),
  topic: text("topic"),
  active: boolean("active").notNull().default(true),
  confirmed: boolean("confirmed").notNull().default(false),
  createdAt: createdAt(),
});

export const aiRuns = pgTable("ai_runs", {
  id: id(),
  siteId: siteRef(),
  status: text("status").notNull().default("queued"),
  samplesPerPrompt: integer("samples_per_prompt").notNull(),
  engines: jsonb("engines").$type<string[]>().notNull(),
  estimatedCostUsd: doublePrecision("estimated_cost_usd").notNull(),
  costUsd: doublePrecision("cost_usd").notNull().default(0),
  error: text("error"),
  startedAt: timestamp("started_at", { withTimezone: true }),
  finishedAt: timestamp("finished_at", { withTimezone: true }),
  createdAt: createdAt(),
});

export const aiSamples = pgTable(
  "ai_samples",
  {
    id: id(),
    runId: uuid("run_id")
      .notNull()
      .references(() => aiRuns.id, { onDelete: "cascade" }),
    promptId: uuid("prompt_id")
      .notNull()
      .references(() => aiPrompts.id, { onDelete: "cascade" }),
    engine: text("engine").notNull(),
    sampleIndex: integer("sample_index").notNull(),
    ok: boolean("ok").notNull(),
    mentioned: boolean("mentioned").notNull().default(false),
    cited: boolean("cited").notNull().default(false),
    citedDomains: jsonb("cited_domains").$type<string[]>().notNull().default([]),
    answerHash: text("answer_hash"),
    answer: text("answer"),
    error: text("error"),
    costUsd: doublePrecision("cost_usd").notNull().default(0),
    createdAt: createdAt(),
  },
  (t) => [index("ai_samples_run_idx").on(t.runId, t.promptId, t.engine)],
);

export const adsImports = pgTable("ads_imports", {
  id: id(),
  siteId: siteRef(),
  kind: text("kind").notNull(),
  filename: text("filename").notNull(),
  rowCount: integer("row_count").notNull(),
  currency: text("currency"),
  periodStart: date("period_start"),
  periodEnd: date("period_end"),
  createdAt: createdAt(),
});

const adsMetrics = () => ({
  clicks: integer("clicks").notNull().default(0),
  impressions: integer("impressions").notNull().default(0),
  cost: doublePrecision("cost").notNull().default(0),
  conversions: doublePrecision("conversions").notNull().default(0),
});

export const adsSearchTerms = pgTable("ads_search_terms", {
  id: id(),
  importId: uuid("import_id")
    .notNull()
    .references(() => adsImports.id, { onDelete: "cascade" }),
  siteId: siteRef(),
  term: text("term").notNull(),
  matchType: text("match_type"),
  campaign: text("campaign"),
  ...adsMetrics(),
});

export const adsLandingPages = pgTable("ads_landing_pages", {
  id: id(),
  importId: uuid("import_id")
    .notNull()
    .references(() => adsImports.id, { onDelete: "cascade" }),
  siteId: siteRef(),
  url: text("url").notNull(),
  ...adsMetrics(),
});

export const adsCampaignDays = pgTable("ads_campaign_days", {
  id: id(),
  importId: uuid("import_id")
    .notNull()
    .references(() => adsImports.id, { onDelete: "cascade" }),
  siteId: siteRef(),
  campaign: text("campaign").notNull(),
  day: date("day").notNull(),
  ...adsMetrics(),
});

export const reports = pgTable(
  "reports",
  {
    id: id(),
    siteId: siteRef(),
    weekStart: date("week_start").notNull(),
    data: jsonb("data").notNull(),
    summary: text("summary"),
    createdAt: createdAt(),
  },
  (t) => [uniqueIndex("reports_site_week_uq").on(t.siteId, t.weekStart)],
);

export const llmUsage = pgTable("llm_usage", {
  id: id(),
  siteId: uuid("site_id").references(() => sites.id, { onDelete: "cascade" }),
  purpose: text("purpose").notNull(),
  model: text("model").notNull(),
  inputTokens: integer("input_tokens").notNull().default(0),
  outputTokens: integer("output_tokens").notNull().default(0),
  cacheReadTokens: integer("cache_read_tokens").notNull().default(0),
  createdAt: createdAt(),
});

export const auditLog = pgTable("audit_log", {
  id: id(),
  userId: uuid("user_id"),
  siteId: uuid("site_id"),
  action: text("action").notNull(),
  details: jsonb("details"),
  createdAt: createdAt(),
});
