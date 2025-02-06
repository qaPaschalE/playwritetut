import { Page } from "playwright";
import { DataTable } from "@cucumber/cucumber";
import { PseudoSelector } from "../constants";
import { getOptions } from "./options";

/**
 * Get test ID elements.
 *
 * @param page - Playwright Page object.
 * @param testId - Test ID.
 * @param pseudoSelector - Pseudo selector (e.g., ':visible', ':hidden').
 * @param options - Additional options from a DataTable.
 * @returns - Playwright Locator for the test ID elements.
 * @private
 */
export function getTestIdElements(
  page: Page,
  testId: string,
  pseudoSelector?: PseudoSelector,
  options?: DataTable
) {
  // Build the selector for data-testid and data-test-id attributes
  let selectors = [
    `[data-testid=${JSON.stringify(testId)}]`,
    `[data-test-id=${JSON.stringify(testId)}]`,
  ];

  // Apply pseudo-selector if provided (e.g., ':visible', ':hidden')
  if (pseudoSelector) {
    selectors = selectors.map((selector) => `${selector}${pseudoSelector}`);
  }

  // Combine all selectors into one
  const combinedSelector = selectors.join(",");

  // Use the combined locator to get the Playwright Locator
  const optionsObject = getOptions(options);
  return page.locator(combinedSelector, optionsObject);
}
