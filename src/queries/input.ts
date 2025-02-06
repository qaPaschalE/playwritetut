import { DataTable, When } from "@cucumber/cucumber"; // Correct import for Playwright and Cucumber integration
import { Element } from "../constants";
import { getByLabelText, setPlaywrightElement } from "../utils";
import { Page } from "@playwright/test";

/**
 * When I find input by label text:
 *
 * ```gherkin
 * When I find input by label text {string}
 * ```
 *
 * Finds the first input element that matches the label text.
 *
 * @example
 *
 * ```gherkin
 * When I find input by label text "Email"
 * ```
 *
 * With [options](https://playwright.dev/docs/selectors#locator-options):
 *
 * ```gherkin
 * When I find input by label text "Email"
 *   | log | true |
 *   | timeout | 4000 |
 *   | withinSubject | null |
 *   | includeShadowDom | false |
 *   | pseudoSelector | visible |
 * ```
 *
 * @remarks
 *
 * This precedes steps like {@link Then_I_see_value | "Then I see value"}. For example:
 *
 * ```gherkin
 * When I find input by label text "Email"
 * Then I see value "user@example.com"
 * ```
 *
 * Inspired by Testing Library's [ByLabelText](https://testing-library.com/docs/queries/bylabeltext).
 *
 * @see
 *
 * - {@link When_I_find_element_by_label_text | When I find element by label text }
 */
export async function When_I_find_input_by_label_text(
  page: Page, // Add page as the first parameter
  text: string,
  options?: DataTable
) {
  // Await the result of getByLabelText and pass the Locator to setPlaywrightElement
  const element = await getByLabelText(page, Element.input, text, options); // Pass page object to getByLabelText
  setPlaywrightElement(element);
}

When("I find input by label text {string}", When_I_find_input_by_label_text);
