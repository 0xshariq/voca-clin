import { expect, test } from "@playwright/test";

test("homepage follows the approved public design at desktop size", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto("/");

  await expect(page).toHaveTitle(/VocaClin/);
  await expect(
    page.getByRole("heading", {
      name: "Communicate with confidence in every healthcare setting.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Primary navigation" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Frequently asked questions" }),
  ).toBeVisible();
});

test("mobile navigation reaches the how-it-works section", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const menu = page.getByRole("button", { name: "Open navigation menu" });
  await expect(menu).toBeVisible();
  await expect(page.locator(".mobile-navigation")).toHaveAttribute(
    "data-hydrated",
    "true",
  );
  await menu.click();

  const mobileNavigation = page.getByRole("navigation", {
    name: "Mobile navigation",
  });
  await expect(mobileNavigation).toBeVisible();
  await mobileNavigation.getByRole("link", { name: "How it works" }).click();
  await expect(page).toHaveURL(/#how-it-works$/);
  await expect(
    page.getByRole("heading", {
      name: "One connected journey, from first lesson to next step.",
    }),
  ).toBeVisible();
});

test("public access and enquiry screens render their designed entry states", async ({
  page,
}) => {
  await page.goto("/sign-in");
  await expect(
    page.getByRole("heading", { name: "Welcome back" }),
  ).toBeVisible();
  await expect(page.getByLabel("Email address")).toBeVisible();

  await page.goto("/sign-up");
  await expect(
    page.getByRole("heading", { name: "Create your account" }),
  ).toBeVisible();
  await expect(page.getByLabel("First name")).toBeVisible();

  await page.goto("/institutions/enquiry");
  await expect(
    page.getByRole("heading", { name: "Your enquiry" }),
  ).toBeVisible();
  await expect(page.getByLabel("Organisation name *")).toBeVisible();
});
