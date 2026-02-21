import { test, expect } from "@playwright/test";

test.describe("Natal Chart Calculator", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/izrada-natalne-karte");
    await page.evaluate(() => localStorage.clear());
  });

  test.describe("Step 1: Name & Date", () => {
    test("Dalje button is disabled when fields are empty", async ({
      page,
    }) => {
      const nextBtn = page.getByRole("button", { name: "Dalje" });
      await expect(nextBtn).toBeDisabled();
    });

    test("Dalje button enables when all fields are filled", async ({
      page,
    }) => {
      await page.locator('input[placeholder="Unesite ime"]').fill("Pera");
      await page.locator('input[placeholder="DD"]').fill("15");
      await page.locator('input[placeholder="MM"]').fill("3");
      await page.locator('input[placeholder="GGGG"]').fill("1990");

      const nextBtn = page.getByRole("button", { name: "Dalje" });
      await expect(nextBtn).toBeEnabled();
    });

    test("advances to step 2 on Dalje click", async ({ page }) => {
      await page.locator('input[placeholder="Unesite ime"]').fill("Pera");
      await page.locator('input[placeholder="DD"]').fill("15");
      await page.locator('input[placeholder="MM"]').fill("3");
      await page.locator('input[placeholder="GGGG"]').fill("1990");

      await page.getByRole("button", { name: "Dalje" }).click();
      await expect(page.getByText("Vreme rođenja")).toBeVisible();
    });
  });

  test.describe("Step 2: Time", () => {
    test.beforeEach(async ({ page }) => {
      // Fill step 1 and advance
      await page.locator('input[placeholder="Unesite ime"]').fill("Pera");
      await page.locator('input[placeholder="DD"]').fill("15");
      await page.locator('input[placeholder="MM"]').fill("3");
      await page.locator('input[placeholder="GGGG"]').fill("1990");
      await page.getByRole("button", { name: "Dalje" }).click();
    });

    test("time defaults are present", async ({ page }) => {
      const hourInput = page.locator('input[placeholder="HH"]');
      await expect(hourInput).toHaveValue("12");
    });

    test("can advance with default time", async ({ page }) => {
      await page.getByRole("button", { name: "Dalje" }).click();
      await expect(page.getByText("Mesto rođenja")).toBeVisible();
    });

    test("Nazad button returns to step 1", async ({ page }) => {
      await page.getByRole("button", { name: "Nazad" }).click();
      await expect(page.getByText("Ime i datum")).toBeVisible();
    });
  });

  test.describe("Step 3: Location", () => {
    test.beforeEach(async ({ page }) => {
      // Fill step 1
      await page.locator('input[placeholder="Unesite ime"]').fill("Pera");
      await page.locator('input[placeholder="DD"]').fill("15");
      await page.locator('input[placeholder="MM"]').fill("3");
      await page.locator('input[placeholder="GGGG"]').fill("1990");
      await page.getByRole("button", { name: "Dalje" }).click();
      // Step 2 — advance with defaults
      await page.getByRole("button", { name: "Dalje" }).click();
    });

    test("location step shows search input", async ({ page }) => {
      await expect(
        page.locator('input[placeholder="Počnite da kucate mesto..."]'),
      ).toBeVisible();
    });

    test("Izradi kartu button is disabled without location", async ({
      page,
    }) => {
      const submitBtn = page.getByRole("button", {
        name: /izradi kartu/i,
      });
      await expect(submitBtn).toBeDisabled();
    });
  });

  test("full flow: fill all steps and generate chart", async ({ page }) => {
    // Step 1: Name & Date
    await page.locator('input[placeholder="Unesite ime"]').fill("Pera Peric");
    await page.locator('input[placeholder="DD"]').fill("15");
    await page.locator('input[placeholder="MM"]').fill("3");
    await page.locator('input[placeholder="GGGG"]').fill("1990");
    await page.getByRole("button", { name: "Dalje" }).click();

    // Step 2: Time
    await page.locator('input[placeholder="HH"]').fill("14");
    await page.locator('input[placeholder="MM"]').fill("30");
    await page.getByRole("button", { name: "Dalje" }).click();

    // Step 3: Location
    const locationInput = page.locator(
      'input[placeholder="Počnite da kucate mesto..."]',
    );
    await locationInput.fill("Beograd");

    // Wait for suggestions to appear
    const suggestion = page.locator("ul li button, ul button").first();
    await suggestion.waitFor({ timeout: 10_000 });
    await suggestion.click();

    // Submit
    await page.getByRole("button", { name: /izradi kartu/i }).click();

    // Wait for chart result (may take a while due to API call)
    await expect(page.locator("#natal-chart-result")).toBeVisible({
      timeout: 30_000,
    });

    // Verify chart SVG is rendered
    await expect(page.locator("#natal-chart-result svg")).toBeVisible();

    // Verify planets table has content
    await expect(page.getByText(/planete/i)).toBeVisible();
  });
});
