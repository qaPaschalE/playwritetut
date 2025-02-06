import { DataTable, When } from "@cucumber/cucumber";
import { Page, Locator } from "@playwright/test";
import { getPlaywrightElement, getOptions } from "../utils";
import { When_I_find_input_by_label_text } from "../queries";

/**
 * When I check:
 *
 * ```gherkin
 * When I check
 * ```
 *
 * This element must be an `<input>` with type `checkbox` or `radio`.
 *
 * @example
 *
 * Check checkbox(es) or radio(s):
 *
 * ```gherkin
 * When I check
 * ```
 *
 * With [options](https://playwright.dev/docs/api/class-locator#locator-check):
 *
 * ```gherkin
 * When I check
 *   | timeout | 4000 |
 *   | force   | true |
 *   | disabled | false |
 * ```
 *
 * @remarks
 *
 * A preceding step like {@link When_I_find_input_by_label_text | "When I find input by label text"} is required. For example:
 *
 * ```gherkin
 * When I find input by label text "Checkbox"
 *   And I check
 * ```
 */
export async function When_I_check(options?: DataTable) {
  const element: Locator = getPlaywrightElement(); // Get the previously stored Playwright element
  const optionsData: any = getOptions(options); // Extract options like timeout, force, etc.

  // Check the checkbox or radio input using Playwright's check method
  await element.check(optionsData);
}

When("I check", When_I_check);

/**
 * When I check input:
 *
 * ```gherkin
 * When I check input {string}
 * ```
 *
 * Check checkbox or radio input by label text.
 *
 * @example
 *
 * ```gherkin
 * When I check input "Text"
 * ```
 *
 * With [options](https://playwright.dev/docs/api/class-locator#locator-check):
 *
 * ```gherkin
 * When I check input "Text"
 *   | timeout | 4000 |
 *   | force   | true |
 *   | disabled | false |
 *   | pseudoSelector | visible |
 * ```
 *
 * @remarks
 *
 * A preceding step like {@link When_I_find_input_by_label_text | "When I find input by label text"} is required. For example:
 *
 * ```gherkin
 * When I find input by label text "Checkbox"
 *   And I check input "Checkbox"
 * ```
 */
export async function When_I_check_input(
  page: Page,
  text: string,
  options?: DataTable
) {
  // Assuming "When_I_find_input_by_label_text" finds the checkbox or radio input by label text
  await When_I_find_input_by_label_text(page, text, options); // Pass page to find the element
  await When_I_check(options); // Check the found element
}

When("I check input {string}", When_I_check_input);
