import { DataTable, Then } from "@cucumber/cucumber";
import { Page } from "@playwright/test";
import { getOptions } from "../utils";

/**
 * Then I see cookie:
 *
 * ```gherkin
 * Then I see cookie {string}
 * ```
 *
 * Asserts that a cookie with the specified name **exists**.
 *
 * @example
 *
 * ```gherkin
 * Then I see cookie "my-session-cookie"
 * ```
 *
 * With options:
 *
 * ```gherkin
 * Then I see cookie "my-session-cookie"
 *   | domain | example.com |
 *   | log | true |
 *   | timeout | 3000 |
 * ```
 *
 * @see
 *
 * - {@link Then_I_see_cookie_has_value | Then I see cookie has value}
 * - {@link Then_I_do_not_see_cookie | Then I do not see cookie}
 */
export async function Then_I_see_cookie(
  page: Page,
  name: string,
  options?: DataTable
) {
  const opts = getOptions(options);
  const cookies = await page.context().cookies();
  const cookie = cookies.find((c) => c.name === name);

  if (!cookie) {
    throw new Error(`Cookie with name "${name}" does not exist.`);
  }
}

Then("I see cookie {string}", Then_I_see_cookie);

/**
 * Then I see cookie has value:
 *
 * ```gherkin
 * Then I see cookie {string} has value {string}
 * ```
 *
 * Asserts that a cookie has an exact value match.
 *
 * @example
 *
 * ```gherkin
 * Then I see cookie "name" has value "value"
 * ```
 *
 * With options:
 *
 * ```gherkin
 * Then I see cookie "name" has value "value"
 *   | domain | example.com |
 *   | log | true |
 *   | timeout | 3000 |
 * ```
 *
 * @see
 *
 * - {@link Then_I_see_cookie_contains_value | Then I see cookie contains value}
 */
export async function Then_I_see_cookie_has_value(
  page: Page,
  name: string,
  value: string,
  options?: DataTable
) {
  const opts = getOptions(options);
  const cookies = await page.context().cookies();
  const cookie = cookies.find((c) => c.name === name);

  if (!cookie) {
    throw new Error(`Cookie with name "${name}" does not exist.`);
  }

  if (cookie.value !== value) {
    throw new Error(
      `Cookie with name "${name}" does not have the expected value. Found: "${cookie.value}", Expected: "${value}".`
    );
  }
}

Then("I see cookie {string} has value {string}", Then_I_see_cookie_has_value);

/**
 * Then I see cookie contains value:
 *
 * ```gherkin
 * Then I see cookie {string} contains value {string}
 * ```
 *
 * Asserts that a cookie's value contains the expected substring.
 *
 * @example
 *
 * ```gherkin
 * Then I see cookie "name" contains value "value"
 * ```
 *
 * With options:
 *
 * ```gherkin
 * Then I see cookie "name" contains value "value"
 *   | domain | example.com |
 *   | log | true |
 *   | timeout | 3000 |
 * ```
 *
 * @see
 *
 * - {@link Then_I_see_cookie_has_value | Then I see cookie has value}
 */
export async function Then_I_see_cookie_contains_value(
  page: Page,
  name: string,
  value: string,
  options?: DataTable
) {
  const opts = getOptions(options);
  const cookies = await page.context().cookies();
  const cookie = cookies.find((c) => c.name === name);

  if (!cookie) {
    throw new Error(`Cookie with name "${name}" does not exist.`);
  }

  if (!cookie.value.includes(value)) {
    throw new Error(
      `Cookie with name "${name}" does not contain the expected value. Found: "${cookie.value}", Expected substring: "${value}".`
    );
  }
}

Then(
  "I see cookie {string} contains value {string}",
  Then_I_see_cookie_contains_value
);

/**
 * Then I do not see cookie:
 *
 * ```gherkin
 * Then I do not see cookie {string}
 * ```
 *
 * Asserts that a cookie with the specified name **does not exist**.
 *
 * @example
 *
 * ```gherkin
 * Then I do not see cookie "my-session-cookie"
 * ```
 *
 * With options:
 *
 * ```gherkin
 * Then I do not see cookie "my-session-cookie"
 *   | domain | example.com |
 *   | log | true |
 *   | timeout | 3000 |
 * ```
 *
 * @see
 *
 * - {@link Then_I_see_cookie | Then I see cookie}
 */
export async function Then_I_do_not_see_cookie(
  page: Page,
  name: string,
  options?: DataTable
) {
  const opts = getOptions(options);
  const cookies = await page.context().cookies();
  const cookie = cookies.find((c) => c.name === name);

  if (cookie) {
    throw new Error(`Cookie with name "${name}" exists.`);
  }
}

Then("I do not see cookie {string}", Then_I_do_not_see_cookie);
