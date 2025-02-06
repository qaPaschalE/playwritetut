import { DataTable, When } from "@cucumber/cucumber"; // Correct import for Playwright and Cucumber integration

import { PseudoSelector } from "../constants";
import { getHeadingElements, setPlaywrightElement } from "../utils";
import { Page } from "@playwright/test";

/**
 * When I find headings by text:
 *
 * ```gherkin
 * When I find headings by text {string}
 * ```
 *
 * @example
 *
 * ```gherkin
 * When I find headings by text "Heading"
 * ```
 *
 * With [options](https://playwright.dev/docs/selectors#locator-options):
 *
 * ```gherkin
 * When I find headings by text "Heading"
 *   | log | true |
 *   | timeout | 4000 |
 *   | withinSubject | null |
 *   | includeShadowDom | false |
 * ```
 *
 * @remarks
 *
 * This precedes steps like {@link When_I_click | "When I click"}. For example:
 *
 * ```gherkin
 * When I find headings by text "Heading"
 *   And I get 1st element
 *   And I click
 * ```
 *
 * @see
 *
 * - {@link When_I_find_heading_by_text | When I find heading by text}
 */
export async function When_I_find_headings_by_text(
  page: Page, // Accept the page as a parameter
  text: string,
  options?: DataTable
) {
  const elements = await getHeadingElements(
    page,
    text,
    PseudoSelector.visible,
    options
  );
  setPlaywrightElement(elements);
}

When("I find headings by text {string}", When_I_find_headings_by_text);

/**
 * When I find heading by text:
 *
 * ```gherkin
 * When I find heading by text {string}
 * ```
 *
 * Finds the first heading element that matches text.
 *
 * @example
 *
 * ```gherkin
 * When I find heading by text "Heading"
 * ```
 *
 * With [options](https://playwright.dev/docs/selectors#locator-options):
 *
 * ```gherkin
 * When I find heading by text "Heading"
 *   | log | true |
 *   | timeout | 4000 |
 *   | withinSubject | null |
 *   | includeShadowDom | false |
 * ```
 *
 * @remarks
 *
 * This precedes steps like {@link When_I_click | "When I click"}. For example:
 *
 * ```gherkin
 * When I find heading by text "Heading"
 *   And I click
 * ```
 *
 * @see
 *
 * - {@link When_I_find_headings_by_text | When I find headings by text}
 */
export async function When_I_find_heading_by_text(
  page: Page, // Accept the page as a parameter
  text: string,
  options?: DataTable
) {
  const element = await getHeadingElements(
    page,
    text,
    PseudoSelector.visible,
    options
  ).first();
  setPlaywrightElement(element);
}

When("I find heading by text {string}", When_I_find_heading_by_text);
