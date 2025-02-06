import { When } from "@cucumber/cucumber";
import { Page } from "@playwright/test"; // Assuming `page` is globally available in your Playwright tests
import { getPlaywrightElement } from "../utils";

/**
 * When I press a key:
 *
 * ```gherkin
 * When I press {string}
 * ```
 *
 * Press a key using Playwright’s `keyboard.press()` function.
 *
 * @example
 *
 * ```gherkin
 * When I press "Enter"
 * ```
 *
 * With additional options like delay:
 *
 * ```gherkin
 * When I press "Enter"
 *   | delay | 100 |
 * ```
 *
 * @remarks
 *
 * A preceding step like {@link When_I_find_element_by_selector | "When I find element by selector"} is required. For example:
 *
 * ```gherkin
 * When I find element by selector "#input"
 *   And I press "Enter"
 * ```
 */
export async function When_I_press(
  page: Page,
  key: string,
  options?: { delay?: number }
) {
  const element = await getPlaywrightElement();

  // Use the Playwright keyboard.press() method to press the key
  await element.focus(); // Make sure the element is focused before pressing a key
  await page.keyboard.press(key, options || {});
}

When("I press {string}", When_I_press);
