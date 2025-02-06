import { Locator } from "playwright";

let playwrightElement: Locator | null = null;

/**
 * Set a Playwright Locator:
 *
 * ```ts
 * setPlaywrightElement(page.locator('...'));
 * ```
 *
 * @example
 *
 * ```ts
 * setPlaywrightElement(page.locator('text=Submit'));
 * ```
 *
 * @see
 *
 * - {@link getPlaywrightElement}
 *
 * @param element - Playwright Locator.
 * @returns - Playwright Locator.
 * @private
 */
export function setPlaywrightElement(element: Locator): Locator {
  playwrightElement = element;
  return playwrightElement;
}

/**
 * Get the stored Playwright Locator:
 *
 * ```ts
 * getPlaywrightElement();
 * ```
 *
 * @example
 *
 * ```ts
 * const element = getPlaywrightElement();
 * await element.click();
 * ```
 *
 * @see
 *
 * - {@link setPlaywrightElement}
 *
 * @returns - Playwright Locator.
 * @private
 */
export function getPlaywrightElement(): Locator {
  if (!playwrightElement) {
    throw new Error(
      `No Playwright element has been set.

Add a preceding step like "When I find element by ..."`
    );
  }
  return playwrightElement;
}
