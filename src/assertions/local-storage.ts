import { Then } from "@cucumber/cucumber";
import { Page, expect } from "@playwright/test";

/**
 * Then I see local storage item:
 *
 * ```gherkin
 * Then I see local storage item {string}
 * ```
 *
 * Assert local storage item **_exists_**.
 *
 * @example
 *
 * ```gherkin
 * Then I see local storage item "key"
 * ```
 */
Then("I see local storage item {string}", async function (key: string) {
  const page: Page = this.page; // Access Playwright `page` from Cucumber's world context
  const value = await page.evaluate((key) => localStorage.getItem(key), key); // Retrieve local storage item
  expect(value).not.toBeNull(); // Assert the item exists
});

/**
 * Then I see local storage item equals:
 *
 * ```gherkin
 * Then I see local storage item {string} equals {string}
 * ```
 *
 * Assert local storage item has exact value.
 *
 * @example
 *
 * ```gherkin
 * Then I see local storage item "key" equals "value"
 * ```
 */
Then(
  "I see local storage item {string} equals {string}",
  async function (key: string, expectedValue: string) {
    const page: Page = this.page; // Access Playwright `page` from Cucumber's world context
    const value = await page.evaluate((key) => localStorage.getItem(key), key); // Retrieve local storage item
    expect(value).toBe(expectedValue); // Assert the item matches the expected value
  }
);

/**
 * Then I see local storage item contains:
 *
 * ```gherkin
 * Then I see local storage item {string} contains {string}
 * ```
 *
 * Assert local storage item has partial value.
 *
 * @example
 *
 * ```gherkin
 * Then I see local storage item "key" contains "value"
 * ```
 */
Then(
  "I see local storage item {string} contains {string}",
  async function (key: string, substring: string) {
    const page: Page = this.page; // Access Playwright `page` from Cucumber's world context
    const value = await page.evaluate((key) => localStorage.getItem(key), key); // Retrieve local storage item
    expect(value).toContain(substring); // Assert the item contains the substring
  }
);

/**
 * Then I do not see local storage item:
 *
 * ```gherkin
 * Then I do not see local storage item {string}
 * ```
 *
 * Assert local storage item **_does not exist_**.
 *
 * @example
 *
 * ```gherkin
 * Then I do not see local storage item "key"
 * ```
 */
Then("I do not see local storage item {string}", async function (key: string) {
  const page: Page = this.page; // Access Playwright `page` from Cucumber's world context
  const value = await page.evaluate((key) => localStorage.getItem(key), key); // Retrieve local storage item
  expect(value).toBeNull(); // Assert the item does not exist
});
