import { DataTable, When } from "@cucumber/cucumber";
import { Page } from "@playwright/test";
import {
  getPlaywrightElement,
  getOptions,
  setPlaywrightElement,
} from "../utils";

/**
 * When I find elements by title:
 *
 * ```gherkin
 * When I find elements by title {string}
 * ```
 *
 * Finds elements with a matching `title` attribute. This will also find `title` elements within SVGs.
 *
 * @example
 *
 * ```gherkin
 * When I find elements by title "Title"
 * ```
 *
 * With [options](https://playwright.dev/docs/api/class-page#page-locator):
 *
 * ```gherkin
 * When I find elements by title "Title"
 *   | log | true |
 *   | timeout | 4000 |
 *   | withinSubject | null |
 *   | includeShadowDom | false |
 *   | pseudoSelector | visible |
 * ```
 *
 * @remarks
 *
 * This precedes steps like {@link When_I_click | "When I click"}. For example:
 *
 * ```gherkin
 * When I find elements by title "Close"
 *   And I get 1st element
 *   And I click
 * ```
 *
 * Inspired by Testing Library's [ByTitle](https://testing-library.com/docs/queries/bytitle).
 *
 * @see
 *
 * - {@link When_I_find_element_by_title | When I find element by title}
 */
export async function When_I_find_elements_by_title(
  page: Page,
  title: string,
  options?: DataTable
) {
  const titleSelector = `[title=${JSON.stringify(title)}]`;
  const svgTitleSelector = `svg title:has-text(${JSON.stringify(title)})`;

  const combinedSelector = `${titleSelector},${svgTitleSelector}`;

  const optionsObject = getOptions(options);
  const elements = page.locator(combinedSelector, optionsObject);

  setPlaywrightElement(elements);
}

When("I find elements by title {string}", async function (title: string) {
  const page: Page = this.page;
  await When_I_find_elements_by_title(page, title);
});

/**
 * When I find element by title:
 *
 * ```gherkin
 * When I find element by title {string}
 * ```
 *
 * Finds the first element that has a matching `title` attribute. This will also find a `title` element within an SVG.
 *
 * @example
 *
 * ```gherkin
 * When I find element by title "Title"
 * ```
 *
 * With [options](https://playwright.dev/docs/api/class-page#page-locator):
 *
 * ```gherkin
 * When I find element by title "Title"
 *   | log | true |
 *   | timeout | 4000 |
 *   | withinSubject | null |
 *   | includeShadowDom | false |
 *   | pseudoSelector | visible |
 * ```
 *
 * @remarks
 *
 * This precedes steps like {@link When_I_click | "When I click"}. For example:
 *
 * ```gherkin
 * When I find element by title "Close"
 *   And I click
 * ```
 *
 * Inspired by Testing Library's [ByTitle](https://testing-library.com/docs/queries/bytitle).
 *
 * @see
 *
 * - {@link When_I_find_elements_by_title | When I find elements by title}
 */
export async function When_I_find_element_by_title(
  page: Page,
  title: string,
  options?: DataTable
) {
  await When_I_find_elements_by_title(page, title, options);
  const firstElement = await getPlaywrightElement();
  setPlaywrightElement(firstElement.first());
}

When("I find element by title {string}", async function (title: string) {
  const page: Page = this.page;
  await When_I_find_element_by_title(page, title);
});
