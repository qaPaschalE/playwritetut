import { Then } from "@cucumber/cucumber";
import { Page, Locator, expect } from "@playwright/test";
import { PseudoSelector } from "../constants";
import { getOptions, getLinkElements } from "../utils";

/**
 * Then I see link:
 *
 * ```gherkin
 * Then I see link {string}
 * ```
 *
 * Assert link with text **_exists_** and is **_visible_** on the screen.
 */
Then("I see link {string}", async function (text: string, options?: any) {
  const page: Page = this.page; // Retrieve Playwright's `page` from Cucumber's world context
  const timeout = Number(getOptions(options)?.timeout) || 3000; // Convert timeout to a number, default to 3000ms

  const link: Locator = getLinkElements(
    page,
    text,
    PseudoSelector.visible,
    options
  ); // Use PseudoSelector.visible for readability

  // Assert that the link is attached to the DOM and is visible
  await expect(link).toBeAttached({ timeout });
  await expect(link).toBeVisible({ timeout });
});

/**
 * Then I do not see link:
 *
 * ```gherkin
 * Then I do not see link {string}
 * ```
 *
 * Assert link with text **_does not exist_** on the screen.
 */
Then(
  "I do not see link {string}",
  async function (text: string, options?: any) {
    const page: Page = this.page; // Retrieve Playwright's `page` from Cucumber's world context
    const timeout = Number(getOptions(options)?.timeout) || 3000; // Convert timeout to a number, default to 3000ms

    const link: Locator = getLinkElements(
      page,
      text,
      PseudoSelector.visible,
      options
    ); // Use PseudoSelector.visible for readability

    // Assert that the link is not attached to the DOM
    await expect(link).not.toBeAttached({ timeout });
  }
);
