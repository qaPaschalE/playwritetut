import { Then } from "@cucumber/cucumber";
import { Page, expect } from "@playwright/test";

/**
 * Then I see element by test ID:
 *
 * ```gherkin
 * Then I see element by test ID {string}
 * ```
 *
 * Assert that an element with the given test ID **_exists_** and is **_visible_** on the screen.
 *
 * @example
 *
 * ```gherkin
 * Then I see element by test ID "submit-button"
 * ```
 */
Then("I see element by test ID {string}", async function (testId: string) {
  const page: Page = this.page; // Access Playwright `page` from Cucumber's world context

  // Locate the element with the specified test ID
  const element = page.locator(`[data-testid="${testId}"]:visible`);

  // Assert that the element exists and is visible
  await expect(element).toBeAttached();
  await expect(element).toBeVisible();
});

/**
 * Then I do not see element by test ID:
 *
 * ```gherkin
 * Then I do not see element by test ID {string}
 * ```
 *
 * Assert that an element with the given test ID **_does not exist_** on the screen.
 *
 * @example
 *
 * ```gherkin
 * Then I do not see element by test ID "loading-spinner"
 * ```
 */
Then(
  "I do not see element by test ID {string}",
  async function (testId: string) {
    const page: Page = this.page; // Access Playwright `page` from Cucumber's world context

    // Locate the element with the specified test ID
    const element = page.locator(`[data-testid="${testId}"]:visible`);

    // Assert that the element does not exist
    await expect(element).not.toBeAttached();
  }
);
