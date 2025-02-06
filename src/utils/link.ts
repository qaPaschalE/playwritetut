import { Page } from "playwright";
import { DataTable } from "@cucumber/cucumber";
import { PseudoSelector } from "../constants";
import { getOptions } from "./options";

/**
 * Get link elements.
 *
 * @param page - Playwright Page object.
 * @param text - Link text.
 * @param selector - Pseudo selector (e.g., ':visible', ':hidden').
 * @param options - Additional options from a DataTable.
 * @returns - Playwright Locator for the link elements.
 * @private
 */
export function getLinkElements(
  page: Page,
  text: string,
  selector?: PseudoSelector,
  options?: DataTable
) {
  // Build the locator for links with the specified text
  let linkLocator = `a:has-text(${text})`;

  // Apply pseudo-selector if provided (e.g., ':visible', ':hidden')
  if (selector) {
    linkLocator = `${linkLocator}${selector}`;
  }

  // Use the combined locator to get the Playwright Locator
  const optionsObject = getOptions(options);
  return page.locator(linkLocator, optionsObject);
}
