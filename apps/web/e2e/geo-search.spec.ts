import { test, expect } from "@playwright/test";

test.describe("Geo location search", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/izrada-natalne-karte");
    await page.evaluate(() => localStorage.clear());

    // Navigate to location step
    await page.locator('input[placeholder="Unesite ime"]').fill("Test");
    await page.locator('input[placeholder="DD"]').fill("1");
    await page.locator('input[placeholder="MM"]').fill("1");
    await page.locator('input[placeholder="GGGG"]').fill("2000");
    await page.getByRole("button", { name: "Dalje" }).click();
    await page.getByRole("button", { name: "Dalje" }).click();

    // Now on location step
    await expect(
      page.locator('input[placeholder="Počnite da kucate mesto..."]'),
    ).toBeVisible();
  });

  test("typing a city name shows suggestions", async ({ page }) => {
    const locationInput = page.locator(
      'input[placeholder="Počnite da kucate mesto..."]',
    );
    await locationInput.fill("Beograd");

    // Wait for suggestions dropdown
    const suggestions = page.locator("ul li button, ul button");
    await suggestions.first().waitFor({ timeout: 10_000 });

    const count = await suggestions.count();
    expect(count).toBeGreaterThan(0);
  });

  test("selecting a suggestion fills the input", async ({ page }) => {
    const locationInput = page.locator(
      'input[placeholder="Počnite da kucate mesto..."]',
    );
    await locationInput.fill("Beograd");

    // Wait for and click first suggestion
    const firstSuggestion = page.locator("ul li button, ul button").first();
    await firstSuggestion.waitFor({ timeout: 10_000 });
    await firstSuggestion.click();

    // Input should now contain the selected city name
    await expect(locationInput).toHaveValue(/Beograd/);
  });

  test("selecting a suggestion enables the submit button", async ({
    page,
  }) => {
    const locationInput = page.locator(
      'input[placeholder="Počnite da kucate mesto..."]',
    );
    await locationInput.fill("Beograd");

    const firstSuggestion = page.locator("ul li button, ul button").first();
    await firstSuggestion.waitFor({ timeout: 10_000 });
    await firstSuggestion.click();

    // The submit button should now be enabled
    const submitBtn = page.getByRole("button", { name: /izradi kartu/i });
    await expect(submitBtn).toBeEnabled();
  });

  test("short input does not trigger search", async ({ page }) => {
    const locationInput = page.locator(
      'input[placeholder="Počnite da kucate mesto..."]',
    );
    await locationInput.fill("B");

    // Wait a bit for any potential suggestions
    await page.waitForTimeout(500);

    // No suggestions should appear (minimum 2 characters required)
    const suggestions = page.locator("ul li button, ul button");
    await expect(suggestions).toHaveCount(0);
  });
});
