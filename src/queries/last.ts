import { DataTable, When } from "@cucumber/cucumber";
import { getPlaywrightElement, setPlaywrightElement } from "../utils/element";
import { getOptions } from "../utils/options";
import { Page, Locator } from "@playwright/test";

// import { page } from '.';  // Import Playwright page (you'll need this from your setup)

/**
 * When I get last element:
 *
 * ```gherkin
 * When I get last element
 * ```
 *
 * @example
 *
 * ```gherkin
 * When I get last element
 * ```
 *
 * With [options](https://playwright.dev/docs/selectors#locator-options):
 *
 * ```gherkin
 * When I get last element
 *   | log | true |
 *   | timeout | 4000 |
 * ```
 *
 * @remarks
 *
 * This follows steps like {@link When_I_find_links_by_text | "When I find links by text"} and precedes steps like {@link When_I_click | "When I click"}. For example:
 *
 * ```gherkin
 * When I find links by text "Link"
 *   And I get last element
 *   And I click
 * ```
 *
 * @see
 *
 * - {@link When_I_get_nth_element | When I get nth element}
 * - {@link When_I_get_first_element | When I get first element}
 */
export async function When_I_get_last_element(page: Page, options?: DataTable) {
  // Use the page object to query elements (this assumes `page` is already initialized)
  const selector: any = getOptions(options)?.selector || "div"; // Modify the selector based on options if provided
  const elements = await page.locator(selector); // Get all elements matching the selector

  const lastElement = elements.last(); // Get the last element from the selection
  setPlaywrightElement(lastElement); // Store the element for future steps
}

When("I get last element", When_I_get_last_element);
