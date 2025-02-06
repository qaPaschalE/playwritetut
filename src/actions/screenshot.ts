import { When } from "@cucumber/cucumber";
import { Page, Locator } from "@playwright/test";

/**
 * Take a full-page screenshot:
 *
 * ```gherkin
 * When I take a full-page screenshot
 * ```
 *
 * @example
 *
 * ```gherkin
 * When I take a full-page screenshot
 * ```
 *
 * The screenshot will include all content on the page, not just the visible viewport.
 */
export async function When_I_take_full_page_screenshot(
  page: Page,
  filename: string
) {
  await page.screenshot({ path: filename, fullPage: true });
}

When(
  "I take a full-page screenshot {string}",
  async (page: Page, filename: string) => {
    await When_I_take_full_page_screenshot(page, filename);
  }
);
/**
 * Capture a screenshot into a buffer:
 *
 * ```gherkin
 * When I capture a screenshot into a buffer
 * ```
 *
 * @example
 *
 * ```gherkin
 * When I capture a screenshot into a buffer
 * ```
 *
 * The screenshot will not be saved to a file but can be used programmatically.
 */
export async function When_I_capture_screenshot_into_buffer(
  page: Page
): Promise<Buffer> {
  return await page.screenshot(); // Returns a Buffer
}

When("I capture a screenshot into a buffer", async (page: Page) => {
  const buffer = await When_I_capture_screenshot_into_buffer(page);
  // You can process or validate the buffer as needed
  console.log("Screenshot buffer length:", buffer.length);
});

/**
 * Capture a screenshot of an element:
 *
 * ```gherkin
 * When I take a screenshot of element {string}
 * ```
 *
 * @example
 *
 * ```gherkin
 * When I take a screenshot of element "header"
 * ```
 *
 * The screenshot will include only the specified element.
 */
export async function When_I_take_element_screenshot(
  page: Page,
  selector: string,
  filename: string
) {
  const element: Locator = page.locator(selector);
  await element.screenshot({ path: filename });
}

When(
  "I take a screenshot of element {string} with filename {string}",
  async (page: Page, selector: string, filename: string) => {
    await When_I_take_element_screenshot(page, selector, filename);
  }
);
