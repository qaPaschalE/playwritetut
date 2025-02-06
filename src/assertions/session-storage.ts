import { Then } from "@cucumber/cucumber";
import { Page } from "@playwright/test";
/**
 * Then I see session storage item:
 *
 * ```gherkin
 * Then I see session storage item {string}
 * ```
 *
 * Assert session storage item **_exists_**.
 *
 * @example
 *
 * ```gherkin
 * Then I see session storage item "key"
 * ```
 *
 * @see
 *
 * - {@link Then_I_see_session_storage_item_equals | Then I see session storage item equals}
 * - {@link Then_I_do_not_see_session_storage_item | Then I do not see session storage item}
 */
export async function Then_I_see_session_storage_item(key: string) {
  const page: Page = this.page; // Access Playwright `page` from Cucumber's world context

  const value = await page.evaluate((key) => sessionStorage.getItem(key), key);
  if (!value) {
    throw new Error(
      `Expected session storage item with key "${key}" to exist, but it does not.`
    );
  }
}

Then("I see session storage item {string}", Then_I_see_session_storage_item);

/**
 * Then I see session storage item equals:
 *
 * ```gherkin
 * Then I see session storage item {string} equals {string}
 * ```
 *
 * Assert session storage item has exact value.
 *
 * @example
 *
 * ```gherkin
 * Then I see session storage item "key" equals "value"
 * ```
 *
 * @see
 *
 * - {@link Then_I_see_session_storage_item_contains | Then I see session storage item contains}
 * - {@link Then_I_see_session_storage_item | Then I see session storage item}
 */
export async function Then_I_see_session_storage_item_equals(
  page: Page, // Access Playwright `page` from Cucumber's world context
  key: string,
  value: string
) {
  const itemValue = await page.evaluate(
    (key) => sessionStorage.getItem(key),
    key
  );
  if (itemValue !== value) {
    throw new Error(
      `Expected session storage item with key "${key}" to equal "${value}", but got "${itemValue}".`
    );
  }
}

Then(
  "I see session storage item {string} equals {string}",
  Then_I_see_session_storage_item_equals
);

/**
 * Then I see session storage item contains:
 *
 * ```gherkin
 * Then I see session storage item {string} contains {string}
 * ```
 *
 * Assert session storage item has partial value.
 *
 * @example
 *
 * ```gherkin
 * Then I see session storage item "key" contains "value"
 * ```
 *
 * @see
 *
 * - {@link Then_I_see_session_storage_item_equals | Then I see session storage item equals}
 * - {@link Then_I_see_session_storage_item | Then I see session storage item}
 */
export async function Then_I_see_session_storage_item_contains(
  page: Page, // Access Playwright `page` from Cucumber's world context
  key: string,
  value: string
) {
  const itemValue = await page.evaluate(
    (key) => sessionStorage.getItem(key),
    key
  );
  if (!itemValue?.includes(value)) {
    throw new Error(
      `Expected session storage item with key "${key}" to contain "${value}", but got "${itemValue}".`
    );
  }
}

Then(
  "I see session storage item {string} contains {string}",
  Then_I_see_session_storage_item_contains
);

/**
 * Then I do not see session storage item:
 *
 * ```gherkin
 * Then I do not see session storage item {string}
 * ```
 *
 * Assert session storage item **_does not exist_**.
 *
 * @example
 *
 * ```gherkin
 * Then I do not see session storage item "key"
 * ```
 *
 * @see
 *
 * - {@link Then_I_see_session_storage_item | Then I see session storage item}
 */
export async function Then_I_do_not_see_session_storage_item(key: string) {
  const page: Page = this.page; // Access Playwright `page` from Cucumber's world context
  const value = await page.evaluate((key) => sessionStorage.getItem(key), key);
  if (value) {
    throw new Error(
      `Expected session storage item with key "${key}" to not exist, but it does.`
    );
  }
}

Then(
  "I do not see session storage item {string}",
  Then_I_do_not_see_session_storage_item
);
