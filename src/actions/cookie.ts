import { DataTable, When } from "@cucumber/cucumber";
import { Page } from "@playwright/test";
import { getOptions } from "../utils";

/**
 * When I clear cookie:
 *
 * ```gherkin
 * When I clear cookie {string}
 * ```
 *
 * Clear a specific browser cookie.
 *
 * @example
 *
 * Clear the `authId` cookie:
 *
 * ```gherkin
 * When I clear cookie "authId"
 * ```
 *
 * With options:
 *
 * ```gherkin
 * When I clear cookie "authId"
 *   | domain | example.com |
 * ```
 *
 * @see
 *
 * - {@link When_I_clear_cookies | When I clear cookies}
 * - {@link When_I_set_cookie | When I set cookie}
 */
export async function When_I_clear_cookie(page: Page, name: string) {
  // Delete the specified cookie
  await page.context().clearCookies();
  const cookies: any = await page.context().cookies();
  await page.context().clearCookies(cookies);
}

When("I clear cookie {string}", When_I_clear_cookie);

/**
 * When I set cookie:
 *
 * ```gherkin
 * When I set cookie {string} to {string}
 * ```
 *
 * @example
 *
 * Set a browser cookie:
 *
 * ```gherkin
 * When I set cookie "name" to "value"
 * ```
 *
 * With options:
 *
 * ```gherkin
 * When I set cookie "name" to "value"
 * ```
 *
 * @see
 *
 * - {@link When_I_clear_cookie | When I clear cookie}
 */
export async function When_I_set_cookie(
  page: Page,
  name: string,
  value: string
) {
  // Set a browser cookie
  await page.context().addCookies([
    {
      name,
      value,
      domain: new URL(page.url()).hostname,
      path: "/",
      httpOnly: false,
      secure: false,
      sameSite: "Lax",
    },
  ]);
}

When("I set cookie {string} to {string}", When_I_set_cookie);
