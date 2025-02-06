import { DataTable, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test"; // Playwright expect for assertions
import { getOptions } from "../../utils";

/**
 * Then I see pathname:
 *
 * ```gherkin
 * Then I see pathname {string}
 * ```
 *
 * @example
 *
 * ```gherkin
 * Then I see pathname "/pathname"
 * ```
 *
 * @see
 *
 * - {@link Then_I_see_pathname_contains | Then I see pathname contains}
 */
export function Then_I_see_pathname(pathname: string, options?: DataTable) {
  const optionsData = getOptions(options);
  const currentPathname = window.location.pathname;

  expect(currentPathname).toBe(pathname);
}

Then("I see pathname {string}", Then_I_see_pathname);

/**
 * Then I see pathname contains:
 *
 * ```gherkin
 * Then I see pathname contains {string}
 * ```
 *
 * @example
 *
 * ```gherkin
 * Then I see pathname contains "pathname"
 * ```
 *
 * @see
 *
 * - {@link Then_I_see_pathname | Then I see pathname}
 */
export function Then_I_see_pathname_contains(
  pathname: string,
  options?: DataTable
) {
  const optionsData = getOptions(options);
  const currentPathname = window.location.pathname;

  expect(currentPathname).toContain(pathname);
}

Then("I see pathname contains {string}", Then_I_see_pathname_contains);
