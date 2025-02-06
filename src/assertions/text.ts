import { Then } from "@cucumber/cucumber";
import { Page, expect } from "@playwright/test";

/**
 * Then I see text:
 *
 * ```gherkin
 * Then I see text {string}
 * ```
 *
 * Assert text **_exists_** and is **_visible_** on the screen.
 *
 * @example
 *
 * ```gherkin
 * Then I see text "Text"
 * ```
 */
Then("I see text {string}", async function (text: string) {
  const page: Page = this.page; // Access Playwright `page` from Cucumber's world context

  // Locate the element containing the text
  const element = page
    .locator(`text=${text}`)
    .filter({ has: page.locator(":visible") });

  // Assert that the element exists and is visible
  await expect(element).toBeVisible();
});

/**
 * Then I do not see text:
 *
 * ```gherkin
 * Then I do not see text {string}
 * ```
 *
 * Assert text **_does not exist_** on the screen.
 *
 * @example
 *
 * ```gherkin
 * Then I do not see text "Text"
 * ```
 */
Then("I do not see text {string}", async function (text: string) {
  const page: Page = this.page; // Access Playwright `page` from Cucumber's world context

  // Locate the element containing the text
  const element = page.locator(`text=${text}`);

  // Assert that the element does not exist
  await expect(element).not.toBeAttached();
});

/**
 * Then I do not see visible text:
 *
 * ```gherkin
 * Then I do not see visible text {string}
 * ```
 *
 * Assert text **_exists_** on the screen but is **_hidden_**.
 *
 * @example
 *
 * ```gherkin
 * Then I do not see visible text "Text"
 * ```
 */
Then("I do not see visible text {string}", async function (text: string) {
  const page: Page = this.page; // Access Playwright `page` from Cucumber's world context

  // Locate the element containing the text
  const element = page.locator(`text=${text}`);

  // Assert that the element exists but is not visible
  await expect(element).not.toBeVisible();
});
