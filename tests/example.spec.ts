import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  const home = await page.getByTestId("client-page");
  await expect(home).toBeInViewport();
});
