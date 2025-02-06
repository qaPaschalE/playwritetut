import { Then } from "@cucumber/cucumber";
import { Locator, expect } from "@playwright/test";
import { getPlaywrightElement, getOptions } from "../utils";

/**
 * Then I see element exists:
 *
 * ```gherkin
 * Then I see element exists
 * ```
 *
 * Assert element **_exists_** in the screen.
 */
Then("I see element exists", async (options?: any) => {
  const element: Locator = getPlaywrightElement(); // Get the stored Playwright element
  const timeout = Number(getOptions(options)?.timeout) || 3000; // Convert timeout to a number, default to 3000ms

  // Wait for the element to be attached and check if it exists
  await expect(element).toBeAttached({ timeout });
});

/**
 * Then I see element does not exist:
 *
 * ```gherkin
 * Then I see element does not exist
 * ```
 *
 * Assert element **_does not exist_** in the screen.
 */
Then("I see element does not exist", async (options?: any) => {
  const element: Locator = getPlaywrightElement(); // Get the stored Playwright element
  const timeout: any = getOptions(options)?.timeout || 3000; // Default timeout if not provided

  // Wait for the element to be detached and check if it does not exist
  await expect(element).not.toBeAttached({ timeout });
});
