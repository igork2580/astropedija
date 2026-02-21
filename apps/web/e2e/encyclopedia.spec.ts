import { test, expect } from "@playwright/test";

test.describe("Encyclopedia pages", () => {
  test("zodiac sign page loads content", async ({ page }) => {
    await page.goto("/znakovi/ovan");
    await expect(page.locator("h1")).toContainText(/ovan/i);
    await expect(page.locator("article, main")).toBeVisible();
  });

  test("planet page loads content", async ({ page }) => {
    await page.goto("/planete/sunce");
    await expect(page.locator("h1")).toContainText(/sunce/i);
    await expect(page.locator("article, main")).toBeVisible();
  });

  test("house page loads content", async ({ page }) => {
    await page.goto("/kuce/prva-kuca");
    await expect(page.locator("h1")).toContainText(/prva|1/i);
    await expect(page.locator("article, main")).toBeVisible();
  });

  test("aspect page loads content", async ({ page }) => {
    await page.goto("/aspekti/konjunkcija");
    await expect(page.locator("h1")).toContainText(/konjunkcija/i);
    await expect(page.locator("article, main")).toBeVisible();
  });

  test("zodiac index page lists all signs", async ({ page }) => {
    await page.goto("/znakovi");
    const signs = [
      "Ovan",
      "Bik",
      "Blizanci",
      "Rak",
      "Lav",
      "Devica",
      "Vaga",
      "Skorpija",
      "Strelac",
      "Jarac",
      "Vodolija",
      "Ribe",
    ];
    for (const sign of signs) {
      await expect(page.getByRole("link", { name: sign })).toBeVisible();
    }
  });

  test("planets index page lists planets", async ({ page }) => {
    await page.goto("/planete");
    await expect(
      page.getByRole("link", { name: /sunce/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /mesec/i }),
    ).toBeVisible();
  });
});
