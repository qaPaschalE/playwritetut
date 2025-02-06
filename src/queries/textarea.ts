import { DataTable, When } from "@cucumber/cucumber";
import { Page } from "@playwright/test";
import { Element } from "../constants";
import { getByLabelText, setPlaywrightElement } from "../utils";

/**
 * When I find textarea by label text:
 *
 * ```gherkin
 * When I find textarea by label text {string}
 * ```
 *
 * Finds the first textarea element that matches the label text.
 *
 * @example
 *
 * ```gherkin
 * When I find textarea by label text "Comments"
 * ```
 *
 * With [options](https://playwright.dev/docs/api/class-page#page-locator):
 *
 * ```gherkin
 * When I find textarea by label text "Comments"
 *   | log | true |
 *   | timeout | 4000 |
 *   | withinSubject | null |
 *   | includeShadowDom | false |
 *   | pseudoSelector | visible |
 * ```
 *
 * @remarks
 *
 * This precedes steps like {@link When_I_type | "When I type"}. For example:
 *
 * ```gherkin
 * When I find textarea by label text "Comments"
 *   And I type "Lorem ipsum"
 * ```
 *
 * Inspired by Testing Library's [ByLabelText](https://testing-library.com/docs/queries/bylabeltext).
 *
 * @see
 *
 * - {@link When_I_find_element_by_label_text | When I find element by label text}
 */
export async function When_I_find_textarea_by_label_text(
  page: Page,
  text: string,
  options?: DataTable
) {
  const element = await getByLabelText(page, Element.textarea, text, options);
  setPlaywrightElement(element);
}

When("I find textarea by label text {string}", async function (text: string) {
  const page: Page = this.page;
  await When_I_find_textarea_by_label_text(page, text);
});
