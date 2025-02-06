import { DataTable, When } from "@cucumber/cucumber";
import { Page } from "@playwright/test";
import { PseudoSelector } from "../constants";
import { getRoleElements, setPlaywrightElement } from "../utils";

/**
 * When I find elements by role:
 *
 * ```gherkin
 * When I find elements by role {string}
 * ```
 *
 * Queries for elements with the given role.
 *
 * @example
 *
 * ```gherkin
 * When I find elements by role "progressbar"
 * ```
 *
 * With options:
 *
 * ```gherkin
 * When I find elements by role "progressbar"
 *   | name | "Loading" |
 *   | timeout | 4000 |
 * ```
 *
 * @remarks
 *
 * This precedes steps like {@link When_I_click | "When I click"}. For example:
 *
 * ```gherkin
 * When I find elements by role "progressbar"
 *   And I get 1st element
 *   And I click
 * ```
 *
 * Inspired by Testing Library's [ByRole](https://testing-library.com/docs/queries/byrole/).
 *
 * @see
 *
 * - {@link When_I_find_element_by_role | When I find element by role}
 */
export async function When_I_find_elements_by_role(
  page: Page,
  role: string,
  options?: DataTable
) {
  const elements = getRoleElements(page, role, PseudoSelector.visible, options);
  setPlaywrightElement(elements);
}

When(
  "I find elements by role {string}",
  async function (role: string, options?: DataTable) {
    const page: Page = this.page;
    await When_I_find_elements_by_role(page, role, options);
  }
);

/**
 * When I find element by role:
 *
 * ```gherkin
 * When I find element by role {string}
 * ```
 *
 * Queries for the first element with the given role.
 *
 * @example
 *
 * ```gherkin
 * When I find element by role "progressbar"
 * ```
 *
 * With options:
 *
 * ```gherkin
 * When I find element by role "progressbar"
 *   | name | "Loading" |
 *   | timeout | 4000 |
 * ```
 *
 * @remarks
 *
 * This precedes steps like {@link When_I_click | "When I click"}. For example:
 *
 * ```gherkin
 * When I find element by role "progressbar"
 *   And I click
 * ```
 *
 * Inspired by Testing Library's [ByRole](https://testing-library.com/docs/queries/byrole/).
 *
 * @see
 *
 * - {@link When_I_find_elements_by_role | When I find elements by role}
 */
export async function When_I_find_element_by_role(
  page: Page,
  role: string,
  options?: DataTable
) {
  const elements = getRoleElements(page, role, PseudoSelector.visible, options);
  setPlaywrightElement(elements.first());
}

When(
  "I find element by role {string}",
  async function (role: string, options?: DataTable) {
    const page: Page = this.page;
    await When_I_find_element_by_role(page, role, options);
  }
);
