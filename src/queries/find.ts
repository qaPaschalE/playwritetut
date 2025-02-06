import { When } from "@cucumber/cucumber";
import { Page } from "@playwright/test";
import { setPlaywrightElement } from "../utils";

/**
 * When I find element by selector:
 *
 * ```gherkin
 * When I find element by selector {string}
 * ```
 *
 * Get the descendent DOM elements of a specific selector.
 *
 * The querying behavior of this command matches exactly how [`.find()`](https://api.jquery.com/find/) works in jQuery.
 *
 * @example
 *
 * Find the element with the class `banner`:
 *
 * ```gherkin
 * When I find element by selector ".banner"
 * ```
 *
 * @remarks
 *
 * A preceding step like {@link When_I_find_form | "When I find form"} is required. For example:
 *
 * ```gherkin
 * When I find form
 *   And I find element by selector "input[type='checkbox']"
 *   And I click
 * ```
 *
 * @see
 *
 * - {@link When_I_get_element_by_selector | When I get element by selector}
 */
export async function When_I_find_element_by_selector(
  page: Page,
  selector: string
) {
  const element = await page.locator(selector); // Playwright's locator method
  setPlaywrightElement(element);
}

When("I find element by selector {string}", async function (selector: string) {
  const page: Page = this.page; // The `page` object is automatically available in the context
  await When_I_find_element_by_selector(page, selector);
});
