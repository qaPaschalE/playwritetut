import { DataTable, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test"; // Playwright expect for assertions
import { getOptions } from "../../utils";

/**
 * Then I see search:
 *
 * ```gherkin
 * Then I see search {string}
 * ```
 *
 * @example
 *
 * ```gherkin
 * Then I see search "?key=value"
 * ```
 *
 * @see
 *
 * - {@link Then_I_see_search_contains | Then I see search contains}
 */
export function Then_I_see_search(search: string, options?: DataTable) {
  const optionsData = getOptions(options);
  const currentSearch = window.location.search;

  expect(currentSearch).toBe(search);
}

Then("I see search {string}", Then_I_see_search);

/**
 * Then I see search contains:
 *
 * ```gherkin
 * Then I see search contains {string}
 * ```
 *
 * @example
 *
 * ```gherkin
 * Then I see search contains "key=value"
 * ```
 *
 * @see
 *
 * - {@link Then_I_see_search | Then I see search}
 */
export function Then_I_see_search_contains(
  search: string,
  options?: DataTable
) {
  const optionsData = getOptions(options);
  const currentSearch = window.location.search;

  expect(currentSearch).toContain(search);
}

Then("I see search contains {string}", Then_I_see_search_contains);
