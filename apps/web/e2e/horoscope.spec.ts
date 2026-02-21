import { test, expect } from "@playwright/test";

test.describe("Horoscope pages", () => {
  test("daily horoscope index page loads", async ({ page }) => {
    await page.goto("/dnevni-horoskop");
    await expect(page.locator("h1")).toBeVisible();
    // Should list all zodiac signs
    await expect(page.getByRole("link", { name: /ovan/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /bik/i })).toBeVisible();
  });

  test("individual sign horoscope page loads content", async ({ page }) => {
    await page.goto("/dnevni-horoskop/ovan");
    await expect(page.locator("h1")).toContainText(/ovan/i);
    // Should have some horoscope text content
    await expect(page.locator("main")).toBeVisible();
  });

  test("weekly horoscope index page loads", async ({ page }) => {
    await page.goto("/nedeljni-horoskop");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("monthly horoscope index page loads", async ({ page }) => {
    await page.goto("/mesecni-horoskop");
    await expect(page.locator("h1")).toBeVisible();
  });
});
