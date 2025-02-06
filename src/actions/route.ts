import { DataTable, When } from "@cucumber/cucumber";
import { Page } from "@playwright/test";
import { getOptions } from "../utils";

/**
 * When I intercept URL:
 *
 * ```gherkin
 * When I intercept URL {string}
 * ```
 *
 * Stub [network requests](https://playwright.dev/docs/network).
 *
 * @example
 *
 * Intercept HTTP request and stub response body:
 *
 * ```gherkin
 * When I intercept URL "/api/users/1"
 *   | body | {"name":"Mark"} |
 * ```
 *
 * With [routeMatcher](https://playwright.dev/docs/network#route-matcher) options:
 *
 * ```gherkin
 * When I intercept URL "/api/users/1"
 *   | auth | {"username":"user","password":"pass"} |
 *   | body | {"name":"Mark"} |
 *   | headers | {"X-Requested-With":"exampleClient"} |
 *   | hostname | localhost |
 *   | method | GET |
 *   | path | /api/commands/intercept?foo=bar |
 *   | query | {"foo":"bar"} |
 *   | times | 1 |
 * ```
 *
 * @remarks
 *
 * Intercepting requests is typically done in the `beforeAll` hook or directly inside your test function.
 *
 * @see
 *
 * - {@link When_I_intercept_URL_and_stub_body | When I intercept URL and stub body}
 */
export function When_I_intercept_URL(
  page: Page,
  url: string,
  routeMatcher?: DataTable
) {
  page.route(url, (route) => {
    const options = getOptions(routeMatcher) as any;
    route.continue(options); // Use the options to mock the request
  });
}

When("I intercept URL {string}", When_I_intercept_URL);

/**
 * When I intercept URL and stub body:
 *
 * ```gherkin
 * When I intercept URL {string} and stub body {string}
 * ```
 *
 * @example
 *
 * Intercept HTTP request and stub body with JSON:
 *
 * ```gherkin
 * When I intercept URL "/api/users/1" and stub body '{"name":"Mark"}'
 * ```
 *
 * Intercept HTTP request and stub body with text:
 *
 * ```gherkin
 * When I intercept URL "/page" and stub body "Text"
 * ```
 *
 * @remarks
 *
 * Intercepts are typically cleared before every test, but Playwright handles them differently.
 *
 * @see
 *
 * - {@link When_I_intercept_URL | When I intercept URL}
 */
export function When_I_intercept_URL_and_stub_body(
  page: Page,
  url: string,
  body: string
) {
  let parsedBody;
  try {
    parsedBody = JSON.parse(body);
  } catch (error) {
    parsedBody = body; // If not JSON, treat it as plain text
  }

  page.route(url, (route) => {
    route.fulfill({
      status: 200,
      body: parsedBody,
      contentType: "application/json", // You can adjust the content type accordingly
    });
  });
}

When(
  "I intercept URL {string} and stub body {string}",
  When_I_intercept_URL_and_stub_body
);
