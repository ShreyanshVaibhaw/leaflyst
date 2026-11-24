import { expect, test } from "@playwright/test";

// A new user signs in, adds the demo site, and gets ranked findings without doing anything else.
test("sign in, add a site, see findings, crawler report and a finding", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/login$/);
  await page.getByRole("button", { name: "Continue as local developer" }).click();
  await expect(page.getByRole("heading", { name: "Your sites" })).toBeVisible();

  await page.getByLabel("Name").fill("Demo Ceramics");
  await page.getByLabel("Website address").fill("http://localhost:3210");
  await page.getByRole("button", { name: "Add and audit" }).click();

  // The page refreshes itself while the audit runs.
  const findings = page.getByRole("table");
  await expect(
    findings.getByRole("link", { name: /robots\.txt blocks OAI-SearchBot, PerplexityBot/ }),
  ).toBeVisible({ timeout: 90_000 });
  for (const title of [
    /Pages with no title \(1\)/,
    /The site has no sitemap/,
    /1 internal link leads to an error/,
    /1 page shows its content only after JavaScript runs/,
    /2 pages share the title "Blog - Demo Ceramics"/,
  ]) {
    await expect(findings.getByRole("link", { name: title })).toBeVisible();
  }
  // Most severe first.
  await expect(findings.getByRole("row").nth(1)).toContainText("critical");

  await page.getByRole("link", { name: "Crawlers" }).click();
  const productsRow = page.getByRole("row", { name: /\/products/ });
  await expect(productsRow).toContainText("100%");
  await expect(productsRow).toContainText("Blocked");

  await page.getByRole("link", { name: "Findings", exact: true }).click();
  await page.getByRole("link", { name: /The site has no sitemap/ }).click();
  await expect(page.getByRole("heading", { name: "Evidence" })).toBeVisible();
  // No repository or fix agent in this environment, so the fix button says why it is off.
  await expect(page.getByRole("button", { name: "Fix with a pull request" })).toBeDisabled();
  await expect(page.getByText("Connect a GitHub repository for this site first.")).toBeVisible();
});

test("a signed-out visitor cannot open a site", async ({ page }) => {
  await page.goto("/sites/00000000-0000-0000-0000-000000000000");
  await expect(page).toHaveURL(/\/login$/);
});
