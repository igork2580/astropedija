import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("home page loads with correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/AstroPut|Astro/i);
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });

  test("header logo links to home", async ({ page }) => {
    await page.goto("/znakovi");
    await page.locator('header a[href="/"]').click();
    await expect(page).toHaveURL("/");
  });

  test.describe("Main nav links", () => {
    const navItems = [
      { label: "Znakovi", href: "/znakovi" },
      { label: "Horoskop", href: "/dnevni-horoskop" },
      { label: "Kalkulatori", href: "/astro-kalkulatori" },
      { label: "Enciklopedija", href: "/planete" },
      { label: "Nebo", href: "/trenutne-planete" },
    ];

    for (const item of navItems) {
      test(`nav link "${item.label}" navigates to ${item.href}`, async ({
        page,
      }) => {
        await page.goto("/");
        await page
          .locator("header nav")
          .getByRole("link", { name: item.label })
          .click();
        await expect(page).toHaveURL(item.href);
      });
    }
  });

  test.describe("Footer links", () => {
    const footerLinks = [
      { label: "O nama", href: "/o-nama" },
      { label: "Kontakt", href: "/kontakt" },
      { label: "Politika privatnosti", href: "/politika-privatnosti" },
      { label: "Uslovi koriscenja", href: "/uslovi-koriscenja" },
    ];

    for (const link of footerLinks) {
      test(`footer link "${link.label}" navigates to ${link.href}`, async ({
        page,
      }) => {
        await page.goto("/");
        await page
          .locator("footer")
          .getByRole("link", { name: link.label })
          .click();
        await expect(page).toHaveURL(link.href);
      });
    }
  });

  test("calculator hub page lists calculators", async ({ page }) => {
    await page.goto("/astro-kalkulatori");
    await expect(
      page.getByRole("link", { name: /natalna karta/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /uporedna karta/i }),
    ).toBeVisible();
  });
});
