import { DataTable, When } from "@cucumber/cucumber";
import { Page } from "@playwright/test"; // Playwright expect for assertions
import { PseudoSelector } from "../constants";
import { getLabelElements, setPlaywrightElement, getOptions } from "../utils";

/**
 * When I find elements by label text:
 *
 * ```gherkin
 * When I find elements by label text {string}
 * ```
 *
 * Find all visible `label`, `aria-labelledby`, or `aria-label` that matches the text.
 *
 * @example
 *
 * ```gherkin
 * When I find elements by label text "Email"
 * ```
 *
 * @see
 *
 * - {@link When_I_find_element_by_label_text | When I find element by label text }
 */
export async function When_I_find_elements_by_label_text(
  page: Page,
  text: string,
  options?: DataTable
) {
  const optionsData: any = getOptions(options); // Ensure options data is handled properly

  // Include pseudoSelector in the options
  const labelLocator = await getLabelElements(page, text, {
    pseudoSelector: PseudoSelector.visible,
    ...optionsData,
  });

  // Set the found elements for later usage
  setPlaywrightElement(labelLocator);
}

When(
  "I find elements by label text {string}",
  When_I_find_elements_by_label_text
);

/**
 * When I find element by label text:
 *
 * ```gherkin
 * When I find element by label text {string}
 * ```
 *
 * Find the first visible `label`, `aria-labelledby`, or `aria-label` that matches the text.
 *
 * @example
 *
 * ```gherkin
 * When I find element by label text "Email"
 * ```
 *
 * @see
 *
 * - {@link When_I_find_elements_by_label_text | When I find elements by label text }
 */
export async function When_I_find_element_by_label_text(
  page: Page,
  text: string,
  options?: DataTable
) {
  const optionsData: any = getOptions(options); // Ensure options data is handled properly

  // Await the label locator and then get the first matching element
  const labelLocator = await getLabelElements(page, text, {
    pseudoSelector: PseudoSelector.visible,
    ...optionsData,
  });

  // Set the found element for later usage
  setPlaywrightElement(labelLocator.first());
}

When(
  "I find element by label text {string}",
  When_I_find_element_by_label_text
);
