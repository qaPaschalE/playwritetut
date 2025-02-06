import { Page } from "@playwright/test";
import { DataTable } from "@cucumber/cucumber";
import { Element, PseudoSelector } from "../constants";
import { getOptions } from "./options";

/**
 * Get first Playwright element by label text.
 *
 * @param page - Playwright Page object.
 * @param element - Element name (e.g., 'input', 'textarea').
 * @param text - Label text.
 * @param options - Options (e.g., timeout, visibility).
 * @returns - Playwright Locator.
 * @private
 */
export async function getByLabelText(
  page: Page,
  element: Element,
  text: string,
  options?: DataTable
) {
  // Call the query method to find the label text
  const labelLocator = await getLabelElements(page, text, options);

  const elementLocator = await labelLocator.first(); // Grab first matching element

  const tagName = await elementLocator.evaluate((el) =>
    el.tagName.toLowerCase()
  );

  // Handle logic similar to Cypress
  if (tagName === "label") {
    const forValue = await elementLocator.getAttribute("for");
    if (forValue) {
      return page.locator(`#${forValue}`);
    } else {
      return elementLocator.locator(element).first();
    }
  }

  // Handle ARIA-labelledby or ARIA-label attributes
  if ((await elementLocator.getAttribute("aria-labelledby")) === text) {
    return page.locator(`#${text}`);
  }

  if (
    tagName === element &&
    (await elementLocator.getAttribute("aria-label")) === text
  ) {
    return elementLocator;
  }

  throw new Error(`Unable to get ${element} by label text: ${text}`);
}

/**
 * Get label elements based on text.
 *
 * @param page - Playwright Page object.
 * @param text - Label text to match.
 * @param options - Additional options (e.g., timeout, visibility).
 * @returns - Playwright Locator for the label elements.
 * @private
 */
export async function getLabelElements(
  page: Page,
  text: string,
  options?: DataTable
) {
  // Build selectors
  let selectors = [
    `label:text("${text}")`,
    `[aria-labelledby*="${text}"]`,
    `[aria-label*="${text}"]`,
  ];

  // Add pseudo-selector if available
  // @ts-expect-error Property 'pseudoSelector' does not exist on type 'object | undefined'.
  const { pseudoSelector, ...opts } = getOptions(options);
  if (pseudoSelector) {
    selectors = selectors.map((selector) => `${selector}:${pseudoSelector}`);
  }

  // Combine selectors into a locator string
  const combinedSelector = selectors.join(",");

  return page.locator(combinedSelector, opts);
}
