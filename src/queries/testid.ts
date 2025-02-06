import { DataTable, When } from "@cucumber/cucumber";
import { Page } from "@playwright/test";
import { PseudoSelector } from "../constants";
import { getTestIdElements, setPlaywrightElement } from "../utils";

/**
 * When I find elements by test ID:
 *
 * ```gherkin
 * When I find elements by test ID {string}
 * ```
 *
 * Finds all elements that match the `data-testid` or `data-test-id` attribute:
 *
 * ```html
 * <div data-testid="test"></div>
 * <div data-test-id="test"></div>
 * ```
 *
 * _Use this only if the other queries don't work. `data-testid` or `data-test-id` don't resemble how your software is used and should be avoided if possible._
 *
 * @example
 *
 * ```gherkin
 * When I find elements by test ID "testID"
 * ```
 *
 * With options:
 *
 * ```gherkin
 * When I find elements by test ID "testID"
 *   | timeout | 4000 |
 * ```
 *
 * @remarks
 *
 * This precedes steps like {@link When_I_click | "When I click"}. For example:
 *
 * ```gherkin
 * When I find elements by test ID "testID"
 *   And I get 1st element
 *   And I click
 * ```
 *
 * Inspired by Testing Library's [ByTestId](https://testing-library.com/docs/queries/bytestid).
 *
 * @see
 *
 * - {@link When_I_find_element_by_testid | When I find element by test ID}
 */
export async function When_I_find_elements_by_testid(
  page: Page,
  testId: string,
  options?: DataTable
) {
  const elements = getTestIdElements(
    page,
    testId,
    PseudoSelector.visible,
    options
  );
  setPlaywrightElement(elements);
}

When(
  "I find elements by test ID {string}",
  async function (testId: string, options?: DataTable) {
    const page: Page = this.page;
    await When_I_find_elements_by_testid(page, testId, options);
  }
);

/**
 * When I find element by test ID:
 *
 * ```gherkin
 * When I find element by test ID {string}
 * ```
 *
 * Finds the first element that has the matching `data-testid` or `data-test-id` attribute:
 *
 * ```html
 * <div data-testid="test"></div>
 * <div data-test-id="test"></div>
 * ```
 *
 * _Use this only if the other queries don't work. `data-testid` or `data-test-id` don't resemble how your software is used and should be avoided if possible._
 *
 * @example
 *
 * ```gherkin
 * When I find element by test ID "testID"
 * ```
 *
 * With options:
 *
 * ```gherkin
 * When I find element by test ID "testID"
 *   | timeout | 4000 |
 * ```
 *
 * @remarks
 *
 * This precedes steps like {@link When_I_click | "When I click"}. For example:
 *
 * ```gherkin
 * When I find element by test ID "testID"
 *   And I click
 * ```
 *
 * Inspired by Testing Library's [ByTestId](https://testing-library.com/docs/queries/bytestid).
 *
 * @see
 *
 * - {@link When_I_find_elements_by_testid | When I find elements by test ID}
 */
export async function When_I_find_element_by_testid(
  page: Page,
  testId: string,
  options?: DataTable
) {
  const elements = getTestIdElements(
    page,
    testId,
    PseudoSelector.visible,
    options
  );
  setPlaywrightElement(elements.first());
}

When(
  "I find element by test ID {string}",
  async function (testId: string, options?: DataTable) {
    const page: Page = this.page;
    await When_I_find_element_by_testid(page, testId, options);
  }
);
