import { Then } from "@cucumber/cucumber";
import { Page, Locator, expect } from "@playwright/test";
import { PseudoSelector } from "../constants";
import { getLabelElements } from "../queries";
import { getOptions } from "../utils";

/**
 * Then I see label:
 *
 * ```gherkin
 * Then I see label {string}
 * ```
 *
 * Assert label with text **_exists_** and is **_visible_** on the screen.
 */
Then("I see label {string}", async function (text: string, options?: any) {
  const page: Page = this.page; // Retrieve Playwright's `page` from Cucumber's world context
  const timeout = Number(getOptions(options)?.timeout) || 3000; // Convert timeout to a number, default to 3000ms

  const label: Locator = getLabelElements(
    page,
    text,
    PseudoSelector.visible,
    options
  ); // Use PseudoSelector.visible for readability

  // Assert that the label is attached to the DOM and is visible
  await expect(label).toBeAttached({ timeout });
  await expect(label).toBeVisible({ timeout });
});

/**
 * Then I do not see label:
 *
 * ```gherkin
 * Then I do not see label {string}
 * ```
 *
 * Assert label with text **_does not exist_** on the screen.
 */
Then(
  "I do not see label {string}",
  async function (text: string, options?: any) {
    const page: Page = this.page; // Retrieve Playwright's `page` from Cucumber's world context
    const timeout = Number(getOptions(options)?.timeout) || 3000; // Convert timeout to a number, default to 3000ms

    const label: Locator = getLabelElements(
      page,
      text,
      PseudoSelector.visible,
      options
    ); // Use PseudoSelector.visible for readability

    // Assert that the label is not attached to the DOM
    await expect(label).not.toBeAttached({ timeout });
  }
);
