import { DataTable, When } from "@cucumber/cucumber";
import { Page } from "@playwright/test";
import { setPlaywrightElement } from "../utils/element";
import { getOptions } from "../utils/options";

/**
 * When I find links by text:
 *
 * ```gherkin
 * When I find links by text {string}
 * ```
 *
 * @example
 *
 * ```gherkin
 * When I find links by text "Link"
 * ```
 *
 * With options:
 *
 * ```gherkin
 * When I find links by text "Link"
 *   | log | true |
 *   | timeout | 4000 |
 * ```
 *
 * @param page - Playwright `Page` instance.
 * @param text - The text to find in links.
 * @param options - Additional options passed as a `DataTable`.
 */
export async function When_I_find_links_by_text(
  page: Page,
  text: string,
  options?: DataTable
) {
  const opts = getOptions(options);
  const links = page.locator(`a:has-text("${text}")`, opts);
  setPlaywrightElement(links); // Store the locator
}

When(
  "I find links by text {string}",
  async function (text: string, options?: DataTable) {
    const page: Page = this.page; // Access the `Page` instance from the context.
    await When_I_find_links_by_text(page, text, options);
  }
);

/**
 * When I find link by text:
 *
 * ```gherkin
 * When I find link by text {string}
 * ```
 *
 * Finds the first link element that matches text.
 *
 * @param page - Playwright `Page` instance.
 * @param text - The text to find in a link.
 * @param options - Additional options passed as a `DataTable`.
 */
export async function When_I_find_link_by_text(
  page: Page,
  text: string,
  options?: DataTable
) {
  const opts = getOptions(options);
  const link = page.locator(`a:has-text("${text}")`, opts).first();
  setPlaywrightElement(link); // Store the locator
}

When(
  "I find link by text {string}",
  async function (text: string, options?: DataTable) {
    const page: Page = this.page; // Access the `Page` instance from the context.
    await When_I_find_link_by_text(page, text, options);
  }
);
