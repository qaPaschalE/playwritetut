import { DataTable, When } from "@cucumber/cucumber";
import { getPlaywrightElement, getOptions } from "../utils";
import { Locator } from "@playwright/test";

/**
 * When I clear:
 *
 * ```gherkin
 * When I clear
 * ```
 *
 * Clears the value of an input field.
 *
 * @example
 *
 * ```gherkin
 * When I clear
 * ```
 *
 * With [options](https://playwright.dev/docs/api/class-locator#locator-fill):
 *
 * ```gherkin
 * When I clear
 *   | timeout | 4000 |
 *   | force   | false |
 *   | disabled | false |
 * ```
 *
 * @remarks
 *
 * A preceding step like {@link When_I_find_element_by_label_text | "When I find element by label text"} is required. For example:
 *
 * ```gherkin
 * When I find element by label text "Input"
 *   And I clear
 * ```
 */
export async function When_I_clear(options?: DataTable) {
  const element: Locator = getPlaywrightElement(); // Get the previously stored Playwright element
  const optionsData: any = getOptions(options); // Extract options like timeout, force, etc.

  // Clear the input field by setting its value to an empty string
  await element.fill("", optionsData);
}

When("I clear", When_I_clear);
