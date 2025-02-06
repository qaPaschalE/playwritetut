import { DataTable } from "@cucumber/cucumber";
import { PseudoSelector } from "../constants";
import { getOptions } from "./options";

/**
 * Get button elements.
 *
 * @param page - Playwright Page object.
 * @param text - Button text.
 * @param selector - Pseudo selector (e.g., ':visible', ':hidden').
 * @param options - Additional options from a DataTable.
 * @returns - Playwright Locator.
 * @private
 */
export function getButtonElements(
  page: import("playwright").Page,
  text: string,
  selector?: PseudoSelector,
  options?: DataTable
) {
  let selectors = [
    "button",
    "[type='button']",
    "[type='submit']",
    "[role='button']",
  ];

  // Add text filtering to the selectors
  selectors = selectors.reduce((accumulator: string[], button: string) => {
    accumulator.push(`${button}:has-text(${JSON.stringify(text)})`);
    accumulator.push(`${button}[value=${JSON.stringify(text)}]`);
    return accumulator;
  }, []);

  // Append pseudo-selector if provided (e.g., ':visible')
  if (selector) {
    selectors = selectors.map((button) => `${button}${selector}`);
  }

  // Join selectors into a single string and return a Playwright locator
  const finalSelector = selectors.join(", ");
  const optionsObject = getOptions(options);

  return page.locator(finalSelector, optionsObject);
}
