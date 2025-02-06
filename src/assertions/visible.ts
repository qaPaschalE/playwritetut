import { Then } from "@cucumber/cucumber";
import { Locator, expect } from "@playwright/test";
import { getOptions, getPlaywrightElement } from "../utils";

/**
 * Then I see element is visible:
 *
 * ```gherkin
 * Then I see element is visible
 * ```
 *
 * Assert element **_is visible_** on the screen.
 *
 * @example
 *
 * ```gherkin
 * Then I see element is visible
 * ```
 *
 * With options:
 *
 * ```gherkin
 * Then I see element is visible
 *   | timeout | 4000 |
 * ```
 */
Then("I see element is visible", async function (options?: any) {
  const timeout = Number(getOptions(options)?.timeout) || 3000; // Convert timeout to a number, default to 3000ms

  const element: Locator = getPlaywrightElement(); // Assuming `getCypressElement` provides the correct locator

  // Wait for the element to be visible
  await expect(element).toBeVisible({ timeout });
});

/**
 * Then I see element is not visible:
 *
 * ```gherkin
 * Then I see element is not visible
 * ```
 *
 * Assert element **_exists_** but is **_hidden_** on the screen.
 *
 * @example
 *
 * ```gherkin
 * Then I see element is not visible
 * ```
 *
 * With options:
 *
 * ```gherkin
 * Then I see element is not visible
 *   | timeout | 4000 |
 * ```
 */
Then("I see element is not visible", async function (options?: any) {
  const timeout = Number(getOptions(options)?.timeout) || 3000; // Convert timeout to a number, default to 3000ms

  const element: Locator = getPlaywrightElement(); // Assuming `getCypressElement` provides the correct locator

  // Wait for the element to be not visible
  await expect(element).not.toBeVisible({ timeout });
});
