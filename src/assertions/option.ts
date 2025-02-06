import { Then } from "@cucumber/cucumber";
import { Page, expect } from "@playwright/test";

/**
 * Then I see option:
 *
 * ```gherkin
 * Then I see option {string}
 * ```
 *
 * Assert option with text **_exists_** and is **_visible_** on the screen.
 *
 * @example
 *
 * ```gherkin
 * Then I see option "Option"
 * ```
 */
Then("I see option {string}", async function (text: string) {
  const page: Page = this.page; // Access Playwright `page` from Cucumber's world context

  // Locate the visible option with the specified text
  const option = page.locator(`option:visible`, { hasText: text });

  // Assert that the option exists and is visible
  await expect(option).toBeAttached();
  await expect(option).toBeVisible();
});

/**
 * Then I do not see option:
 *
 * ```gherkin
 * Then I do not see option {string}
 * ```
 *
 * Assert option with text **_does not exist_** on the screen.
 *
 * @example
 *
 * ```gherkin
 * Then I do not see option "Option"
 * ```
 */
Then("I do not see option {string}", async function (text: string) {
  const page: Page = this.page; // Access Playwright `page` from Cucumber's world context

  // Locate the visible option with the specified text
  const option = page.locator(`option:visible`, { hasText: text });

  // Assert that the option does not exist
  await expect(option).not.toBeAttached();
});
