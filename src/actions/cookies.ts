import { DataTable, When } from "@cucumber/cucumber";
import { Page } from "playwright";
import { getOptions } from "../utils";

/**
 * When I clear cookies:
 *
 * ```gherkin
 * When I clear cookies
 * ```
 *
 * Clear browser cookies for a domain.
 *
 * @example
 *
 * ```gherkin
 * When I clear cookies
 * ```
 *
 * With options:
 *
 * ```gherkin
 * When I clear cookies
 *   | domain  | example.com |
 * ```
 *
 * @remarks
 *
 * Playwright does not automatically clear cookies before each test, so use this step to clear cookies as needed.
 *
 * @see
 *
 * - {@link When_I_clear_cookie | When I clear cookie}
 * - {@link When_I_clear_all_cookies | When I clear all cookies}
 */
export async function When_I_clear_cookies(page: Page, options?: DataTable) {
  const opts: any = getOptions(options);

  // Retrieve cookies for the specified domain
  const domain: any = opts.domain || new URL(page.url()).hostname;
  const cookies = await page.context().cookies();
  const filteredCookies = cookies.filter((cookie) =>
    cookie.domain.includes(domain)
  );

  // Clear the filtered cookies by passing only necessary fields
  await Promise.all(
    filteredCookies.map((cookie) =>
      page.context().clearCookies({
        name: cookie.name,
        domain: cookie.domain,
        path: cookie.path,
      })
    )
  );
}

When("I clear cookies", When_I_clear_cookies);

/**
 * When I clear all cookies:
 *
 * ```gherkin
 * When I clear all cookies
 * ```
 *
 * Clear all browser cookies.
 *
 * @example
 *
 * ```gherkin
 * When I clear all cookies
 * ```
 *
 * With options:
 *
 * ```gherkin
 * When I clear all cookies
 * ```
 *
 * @remarks
 *
 * Use this step to clear all cookies in the current browser context.
 *
 * @see
 *
 * - {@link When_I_clear_cookies | When I clear cookies}
 */
export async function When_I_clear_all_cookies(
  page: Page,
  options?: DataTable
) {
  // Clear all cookies
  await page.context().clearCookies();
}

When("I clear all cookies", When_I_clear_all_cookies);
