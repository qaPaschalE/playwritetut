import { When } from "@cucumber/cucumber";
import { Page } from "@playwright/test";

/**
 * When I clear session storage:
 *
 * ```gherkin
 * When I clear session storage
 * ```
 *
 * Clear [`sessionStorage`](https://developer.mozilla.org/docs/Web/API/Window/sessionStorage) data for all origins with which the test has interacted.
 *
 * @example
 *
 * Clear all sessionStorage:
 *
 * ```gherkin
 * When I clear session storage
 * ```
 *
 * @remarks
 *
 * Unlike Cypress, Playwright does not automatically clear session storage between tests. This function explicitly clears session storage for the current page.
 */
export async function When_I_clear_session_storage(page: Page) {
  await page.evaluate(() => sessionStorage.clear());
}

When("I clear session storage", async (page: Page) => {
  await When_I_clear_session_storage(page);
});
