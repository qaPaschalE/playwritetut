import { When } from "@cucumber/cucumber";
import { Page } from "@playwright/test"; // Ensure Page is imported for proper type checking

/**
 * When I clear local storage:
 *
 * ```gherkin
 * When I clear local storage
 * When I clear local storage {string}
 * ```
 *
 * Clear [`localStorage`](https://developer.mozilla.org/docs/Web/API/Window/localStorage) data for current domain and subdomain.
 *
 * @example
 *
 * Clear all localStorage:
 *
 * ```gherkin
 * When I clear local storage
 * ```
 *
 * Clear localStorage with the key `appName`:
 *
 * ```gherkin
 * When I clear local storage "appName"
 * ```
 */
export function When_I_clear_local_storage(page: Page, key?: string) {
  if (key) {
    // Clear specific key from localStorage
    page.evaluate((key: string) => {
      localStorage.removeItem(key);
    }, key); // Only passing key to the evaluate function
  } else {
    // Clear all localStorage
    page.evaluate(() => {
      localStorage.clear();
    });
  }
}

When("I clear local storage", When_I_clear_local_storage);
When("I clear local storage {string}", When_I_clear_local_storage);

/**
 * When I clear all local storage:
 *
 * ```gherkin
 * When I clear all local storage
 * ```
 *
 * Clear [`localStorage`](https://developer.mozilla.org/docs/Web/API/Window/localStorage) data for all origins with which the test has interacted.
 *
 * @example
 *
 * ```gherkin
 * When I clear all local storage
 * ```
 */
export function When_I_clear_all_local_storage(page: Page) {
  page.evaluate(() => {
    localStorage.clear();
  });
}

When("I clear all local storage", When_I_clear_all_local_storage);

/**
 * When I set local storage item:
 *
 * ```gherkin
 * When I set local storage item {string} to {string}
 * ```
 *
 * @example
 *
 * ```gherkin
 * When I set local storage item "key" to "value"
 * ```
 */
export function When_I_set_local_storage_item(
  page: Page,
  key: string,
  value: string
) {
  // Pass both key and value as arguments to evaluate function
  page.evaluate(
    (key: string, value: string) => {
      localStorage.setItem(key, value);
    },
    key,
    value
  ); // Correctly pass key and value
}

When(
  "I set local storage item {string} to {string}",
  When_I_set_local_storage_item
);
