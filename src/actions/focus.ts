import { DataTable, When } from "@cucumber/cucumber";
import { getPlaywrightElement, getOptions } from "../utils";

/**
 * When I focus:
 *
 * ```gherkin
 * When I focus
 * ```
 *
 * @example
 *
 * ```gherkin
 * When I focus
 * ```
 *
 * With [options](https://playwright.dev/docs/api/class-locator#locator-focus):
 *
 * ```gherkin
 * When I focus
 *   | timeout | 4000 |
 * ```
 *
 * @remarks
 *
 * A preceding step like {@link When_I_find_element_by_text | "When I find element by text"} is required. For example:
 *
 * ```gherkin
 * When I find element by text "Text"
 *   And I focus
 * ```
 */
export async function When_I_focus(options?: DataTable) {
  const element = getPlaywrightElement(); // Use your function to get the element
  await element.focus(getOptions(options)); // Focus the element with optional parameters
}

When("I focus", When_I_focus);
