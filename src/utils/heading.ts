import { Page } from "playwright";
import { DataTable } from "@cucumber/cucumber";
import { PseudoSelector } from "../constants";
import { getOptions } from "./options";

/**
 * Get heading elements.
 *
 * @param page - Playwright Page object.
 * @param text - Heading text.
 * @param selector - Pseudo selector (e.g., ':visible', ':hidden').
 * @param options - Additional options from a DataTable.
 * @returns - Playwright Locator for the heading elements.
 * @private
 */
export function getHeadingElements(
  page: Page,
  text: string,
  selector?: PseudoSelector,
  options?: DataTable
) {
  const headings = ["h1", "h2", "h3", "h4", "h5", "h6"];

  // Build the locator for headings with the specified text
  let headingLocators = headings.map(
    (heading) => `${heading}:has-text(${text})`
  );

  // Apply pseudo-selector if provided (e.g., ':visible', ':hidden')
  if (selector) {
    headingLocators = headingLocators.map((heading) => `${heading}${selector}`);
  }

  // Combine the locators and return the Playwright Locator
  const combinedLocator = headingLocators.join(", ");
  const optionsObject = getOptions(options);

  return page.locator(combinedLocator, optionsObject);
}
