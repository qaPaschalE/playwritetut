import { Page } from "@playwright/test";

/**
 * Get the first Playwright element by display value.
 *
 * @param page - Playwright Page object.
 * @param element - Element type ('input' or 'textarea').
 * @param value - Display value.
 * @returns - Playwright Locator for the first matching element.
 * @private
 */
export async function getByDisplayValue(
  page: Page,
  element: "input" | "textarea",
  value: string
) {
  // Locate visible elements of the specified type
  const elements = page.locator(`${element}:visible`);

  // Filter elements where the `value` attribute matches the provided value
  return elements
    .filter({
      has: page.locator(`[value="${value}"]`),
    })
    .first();
}
