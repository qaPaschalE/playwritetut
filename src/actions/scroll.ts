import { When } from "@cucumber/cucumber";
import { Page, Locator } from "@playwright/test";

/**
 * Scroll by a specific number of pixels:
 *
 * ```gherkin
 * When I scroll by {int} pixels vertically and {int} pixels horizontally
 * ```
 *
 * @example
 *
 * ```gherkin
 * When I scroll by 100 pixels vertically and 50 pixels horizontally
 * ```
 *
 * @remarks
 * This scrolls the page by a specific number of pixels, both horizontally and vertically.
 */
export async function When_I_scroll_by_pixels(
  page: Page,
  verticalPixels: number,
  horizontalPixels: number
) {
  // Use page.evaluate to run the scrolling logic in the browser context
  await page.evaluate(
    ({ vertical, horizontal }) => {
      window.scrollBy(horizontal, vertical); // This scrolls by the given number of pixels
    },
    { vertical: verticalPixels, horizontal: horizontalPixels } // Pass as an object
  );
}

When(
  "I scroll by {int} pixels vertically and {int} pixels horizontally",
  async (page: Page, verticalPixels: number, horizontalPixels: number) => {
    await When_I_scroll_by_pixels(page, verticalPixels, horizontalPixels);
  }
);

When(
  "I scroll by {int} pixels vertically and {int} pixels horizontally",
  async (page: Page, verticalPixels: number, horizontalPixels: number) => {
    await When_I_scroll_by_pixels(page, verticalPixels, horizontalPixels);
  }
);

/**
 * Scroll to an element:
 *
 * ```gherkin
 * When I scroll to element {string}
 * ```
 *
 * @example
 *
 * ```gherkin
 * When I scroll to element "footer"
 * ```
 *
 * @remarks
 * Scrolls to a specific element on the page.
 */
export async function When_I_scroll_to_element(page: Page, selector: string) {
  const element: Locator = page.locator(selector);
  await element.scrollIntoViewIfNeeded();
}

When("I scroll to element {string}", async (page: Page, selector: string) => {
  await When_I_scroll_to_element(page, selector);
});

/**
 * Scroll to a specific position:
 *
 * ```gherkin
 * When I scroll to position {int} vertically and {int} horizontally
 * ```
 *
 * @example
 *
 * ```gherkin
 * When I scroll to position 500 vertically and 0 horizontally
 * ```
 *
 * @remarks
 * Scrolls to the exact position within the page.
 */
export async function When_I_scroll_to_position(
  page: Page,
  verticalPosition: number,
  horizontalPosition: number
) {
  await page.evaluate(
    ({ vertical, horizontal }) => {
      window.scrollTo(horizontal, vertical);
    },
    { vertical: verticalPosition, horizontal: horizontalPosition }
  );
}

When(
  "I scroll to position {int} vertically and {int} horizontally",
  async (page: Page, verticalPosition: number, horizontalPosition: number) => {
    await When_I_scroll_to_position(page, verticalPosition, horizontalPosition);
  }
);

/**
 * Scroll using mouse wheel:
 *
 * ```gherkin
 * When I scroll with mouse wheel {int} pixels vertically and {int} pixels horizontally
 * ```
 *
 * @example
 *
 * ```gherkin
 * When I scroll with mouse wheel 0 pixels vertically and 200 pixels horizontally
 * ```
 *
 * @remarks
 * Scrolls the page using the mouse wheel, similar to simulating the mouse wheel movement.
 */
export async function When_I_scroll_with_mouse_wheel(
  page: Page,
  verticalPixels: number,
  horizontalPixels: number
) {
  await page.mouse.wheel(horizontalPixels, verticalPixels);
}

When(
  "I scroll with mouse wheel {int} pixels vertically and {int} pixels horizontally",
  async (page: Page, verticalPixels: number, horizontalPixels: number) => {
    await When_I_scroll_with_mouse_wheel(
      page,
      verticalPixels,
      horizontalPixels
    );
  }
);

/**
 * Scroll to an element with a delay:
 *
 * ```gherkin
 * When I scroll to element {string} with delay {int}ms
 * ```
 *
 * @example
 *
 * ```gherkin
 * When I scroll to element "footer" with delay 1000ms
 * ```
 *
 * @remarks
 * Scrolls to an element and adds a delay (useful for animations).
 */
export async function When_I_scroll_to_element_with_delay(
  page: Page,
  selector: string,
  delay: number
) {
  const element: Locator = page.locator(selector);
  await element.scrollIntoViewIfNeeded();
  await page.waitForTimeout(delay); // Adding delay
}

When(
  "I scroll to element {string} with delay {int}ms",
  async (page: Page, selector: string, delay: number) => {
    await When_I_scroll_to_element_with_delay(page, selector, delay);
  }
);
