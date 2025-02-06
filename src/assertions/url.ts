import { Then } from "@cucumber/cucumber";
import { Page, expect } from "@playwright/test";
import { getOptions } from "../utils";

/**
 * Then I see URL:
 *
 * ```gherkin
 * Then I see URL {string}
 * ```
 *
 * Assert that the current URL matches the given URL.
 */
Then("I see URL {string}", async function (url: string, options?: any) {
  const page: Page = this.page; // Access Playwright `page` from Cucumber's world context
  const baseUrl = process.env.BASE_URL || ""; // Replace with your method of retrieving baseUrl
  const fullUrl = baseUrl + url;
  const timeout = Number(getOptions(options)?.timeout) || 3000; // Convert timeout to a number, default to 3000ms

  // Wait for the current URL to match the expected URL
  await expect(page).toHaveURL(fullUrl, { timeout });
});

/**
 * Then I see URL contains:
 *
 * ```gherkin
 * Then I see URL contains {string}
 * ```
 *
 * Assert that the current URL contains the given substring.
 */
Then(
  "I see URL contains {string}",
  async function (url: string, options?: any) {
    const page: Page = this.page; // Access Playwright `page` from Cucumber's world context
    const timeout = getOptions(options)?.timeout || 3000; // Default timeout if not provided

    // Wait for the current URL to contain the expected substring
    const currentUrl = await page.url();
    expect(currentUrl).toContain(url);
  }
);

/**
 * Then I do not see URL:
 *
 * ```gherkin
 * Then I do not see URL {string}
 * ```
 *
 * Assert that the current URL does not match the given URL.
 */
Then("I do not see URL {string}", async function (url: string, options?: any) {
  const page: Page = this.page; // Access Playwright `page` from Cucumber's world context
  const baseUrl = process.env.BASE_URL || ""; // Replace with your method of retrieving baseUrl
  const fullUrl = baseUrl + url;

  // Wait for the current URL to not match the given URL
  const currentUrl = await page.url();
  expect(currentUrl).not.toBe(fullUrl);
});

/**
 * Then I do not see URL contains:
 *
 * ```gherkin
 * Then I do not see URL contains {string}
 * ```
 *
 * Assert that the current URL does not contain the given substring.
 */
Then(
  "I do not see URL contains {string}",
  async function (url: string, options?: any) {
    const page: Page = this.page; // Access Playwright `page` from Cucumber's world context

    // Wait for the current URL to not contain the expected substring
    const currentUrl = await page.url();
    expect(currentUrl).not.toContain(url);
  }
);
