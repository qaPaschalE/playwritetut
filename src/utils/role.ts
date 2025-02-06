import { Page } from "playwright";
import { DataTable } from "@cucumber/cucumber";
import { PseudoSelector } from "../constants";
import { getOptions } from "./options";

/**
 * Get role elements.
 *
 * @param page - Playwright Page object.
 * @param type - Role type.
 * @param selector - Pseudo selector (e.g., ':visible', ':hidden').
 * @param options - Additional options from a DataTable.
 * @returns - Playwright Locator for the role elements.
 * @private
 */
export function getRoleElements(
  page: Page,
  type: string,
  selector?: PseudoSelector,
  options?: DataTable
) {
  // Build the locator for elements with the specified role
  let roleLocator = `[role=${JSON.stringify(type)}]`;

  // Apply pseudo-selector if provided (e.g., ':visible', ':hidden')
  if (selector) {
    roleLocator = `${roleLocator}${selector}`;
  }

  // Use the combined locator to get the Playwright Locator
  const optionsObject = getOptions(options);
  return page.locator(roleLocator, optionsObject);
}
