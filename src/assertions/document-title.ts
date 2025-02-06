import { Then } from "@cucumber/cucumber";
import { Page, expect } from "@playwright/test";
import { getOptions } from "../utils";

/**
 * Then I see document title:
 *
 * ```gherkin
 * Then I see document title {string}
 * ```
 *
 * @example
 *
 * Assert that the `document.title` property of the page is "Title":
 *
 * ```gherkin
 * Then I see document title "Title"
 * ```
 *
 * @see
 *
 * - {@link Then_I_see_document_title_contains | Then I see document title contains}
 */
export async function Then_I_see_document_title(
  page: Page,
  title: string,
  options?: any
) {
  const opts = getOptions(options); // If options are needed for logging or other purposes
  const actualTitle = await page.title();
  expect(actualTitle).toBe(title);
}

Then("I see document title {string}", Then_I_see_document_title);

/**
 * Then I see document title contains:
 *
 * ```gherkin
 * Then I see document title contains {string}
 * ```
 *
 * @example
 *
 * Assert that the document's title contains "Title":
 *
 * ```gherkin
 * Then I see document title contains "Title"
 * ```
 *
 * @see
 *
 * - {@link Then_I_see_document_title | Then I see document title}
 */
export async function Then_I_see_document_title_contains(
  page: Page,
  title: string,
  options?: any
) {
  const opts = getOptions(options); // If options are needed for logging or other purposes
  const actualTitle = await page.title();
  expect(actualTitle).toContain(title);
}

Then(
  "I see document title contains {string}",
  Then_I_see_document_title_contains
);
