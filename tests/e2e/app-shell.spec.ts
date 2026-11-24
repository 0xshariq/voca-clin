import { expect, test } from "@playwright/test";

test("public foundation renders the main experience at desktop size", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto("/");

  await expect(page).toHaveTitle(/VocaClin/);
  await expect(
    page.getByRole("heading", { name: "Find the words for better care." }),
  ).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Primary navigation" }),
  ).toBeVisible();
});

test("mobile navigation opens and reaches the learner section", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const menu = page.getByText("Menu", { exact: true });
  await expect(menu).toBeVisible();
  await menu.click();

  const mobileNavigation = page.getByRole("navigation", {
    name: "Mobile navigation",
  });
  await expect(mobileNavigation).toBeVisible();
  await mobileNavigation.getByRole("link", { name: "For learners" }).click();
  await expect(page).toHaveURL(/#learners$/);
  await expect(
    page.getByRole("heading", { name: /Language learning that keeps/ }),
  ).toBeVisible();
});
