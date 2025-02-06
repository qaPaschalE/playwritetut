import { DataTable, When } from "@cucumber/cucumber"; // Correct import for Playwright and Cucumber integration

import {
  getPlaywrightElement,
  getOptions,
  setPlaywrightElement,
} from "../utils";

/**
 * When I get element by selector:
 *
 * ```gherkin
 * When I get element by selector {string}
 * ```
 *
 * Get the first DOM element by selector.
 *
 * @example
 *
 * Yield the first `<li>` in `.list`:
 *
 * ```gherkin
 * When I get element by selector ".list > li"
 * ```
 *
 * With [options](https://playwright.dev/docs/selectors#locator-options):
 *
 * ```gherkin
 * When I get element by selector ".dropdown-menu"
 *   | log | true |
 *   | timeout | 4000 |
 *   | withinSubject | null |
 *   | includeShadowDom | false |
 * ```
 *
 * @see
 *
 * - {@link When_I_get_elements_by_selector | When I get elements by selector}
 * - {@link When_I_find_element_by_selector | When I find element by selector}
 */
export function When_I_get_element_by_selector(
  selector: string,
  options?: DataTable
) {
  When_I_get_elements_by_selector(selector, options);
  setPlaywrightElement(getPlaywrightElement().first());
}

When("I get element by selector {string}", When_I_get_element_by_selector);

/**
 * When I get elements by selector:
 *
 * ```gherkin
 * When I get elements by selector {string}
 * ```
 *
 * Get DOM elements by selector.
 *
 * @example
 *
 * Yield all `<li>` in `.list`:
 *
 * ```gherkin
 * When I get elements by selector ".list > li"
 * ```
 *
 * With [options](https://playwright.dev/docs/selectors#locator-options):
 *
 * ```gherkin
 * When I get element by selector ".dropdown-menu"
 *   | log | true |
 *   | timeout | 4000 |
 *   | withinSubject | null |
 *   | includeShadowDom | false |
 * ```
 *
 * @see
 *
 * - {@link When_I_get_element_by_selector | When I get element by selector}
 */
export function When_I_get_elements_by_selector(
  selector: string,
  options?: DataTable
) {
  setPlaywrightElement(
    getPlaywrightElement().locator(selector, getOptions(options))
  );
}

When("I get elements by selector {string}", When_I_get_elements_by_selector);
