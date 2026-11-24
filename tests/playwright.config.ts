import path from "node:path";
import { defineConfig } from "@playwright/test";

// Commands run from the repo root, not from tests/.
const cwd = path.resolve(import.meta.dirname, "..");

// The whole product in a browser: web app, worker and the demo site, on a test database.
const env = {
  DATABASE_URL: process.env.TEST_DATABASE_URL ?? "postgres://localhost:5432/leaflyst_test",
  APP_URL: "http://localhost:3200",
  DEV_LOGIN: "true",
  NEXT_TELEMETRY_DISABLED: "1",
};

export default defineConfig({
  testDir: "./e2e",
  timeout: 120_000,
  retries: 0,
  workers: 1,
  reporter: [["list"]],
  use: { baseURL: env.APP_URL, trace: "retain-on-failure" },
  webServer: [
    {
      command:
        "pnpm --filter demo-site build && pnpm --filter demo-site exec next start --port 3210",
      url: "http://localhost:3210",
      timeout: 180_000,
      cwd,
      reuseExistingServer: false,
    },
    {
      command: "pnpm db:migrate && pnpm build && pnpm exec next start --port 3200",
      url: "http://localhost:3200/api/health",
      timeout: 240_000,
      cwd,
      reuseExistingServer: false,
      env,
    },
    {
      command: "pnpm worker",
      wait: { stdout: /worker ready/ },
      timeout: 60_000,
      cwd,
      reuseExistingServer: false,
      env,
    },
  ],
});
