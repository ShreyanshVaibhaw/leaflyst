# Leaflyst

Leaflyst connects to a website's GitHub repo and Search Console, finds what holds back its search and AI visibility, ships each fix as a small pull request, checks the fix on the live site, and records what changed.

Read `plan.md` before working on the code.
It holds the scope, the rules for AI agents, and who owns which files.

## Run it locally

You need Node 22 or newer, pnpm 10, and Postgres running on localhost.

```bash
pnpm install
createdb leaflyst && createdb leaflyst_test
cp .env.example .env   # then set ENCRYPTION_KEY: openssl rand -base64 32
pnpm db:migrate
pnpm exec playwright install chromium
pnpm --filter demo-site build
```

Then start three processes, each in its own terminal.

```bash
pnpm dev                        # web app on http://localhost:3000
pnpm worker                     # background jobs
pnpm --filter demo-site start   # demo site on http://localhost:3100
```

Open http://localhost:3000, choose "Continue as local developer", and add `http://localhost:3100` as a site.
The audit finishes in a few seconds and lists the problems planted in the demo site.

## What works without any accounts

- The audit: crawl, crawler report, render check, all checks, ranked findings.
- Google Ads CSV import, the paid and organic table, and landing page health.
- The weekly report, with template text.

## What needs credentials

Each of these is written but has not been run against the real service yet.
Fill in `.env` and follow the notes in `.env.example`.

| Feature                                                           | Needs                                                                                            |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Sign in with GitHub, pull requests, preview and live verification | A GitHub App and its keys                                                                        |
| Fix agent                                                         | `ANTHROPIC_API_KEY`, then `pnpm tsx agents/fix-agent/setup.ts` for the agent and environment IDs |
| Search Console data and change scoring                            | A Google OAuth client                                                                            |
| AI visibility runs                                                | A DataForSEO account                                                                             |

## Tests

```bash
pnpm lint
pnpm typecheck
pnpm test    # unit tests, plus audits of the real demo site and a fixed copy of it
pnpm e2e     # browser test of the whole app on the test database
```

`pnpm test` and `pnpm e2e` use the `leaflyst_test` database, never the development one.

## Layout

See section 6 of `plan.md`.
