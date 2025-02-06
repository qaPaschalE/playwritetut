import { When } from "@cucumber/cucumber";
import { Page } from "@playwright/test";
import { getPlaywrightElement } from "../utils";

/**
 * When I submit:
 *
 * ```gherkin
 * When I submit
 * ```
 *
 * Submits a form.
 *
 * @example
 *
 * ```gherkin
 * When I submit
 * ```
 *
 * @remarks
 *
 * A preceding step like {@link When_I_find_form | "When I find form"} is required. For example:
 *
 * ```gherkin
 * When I find form
 *   And I submit
 * ```
 */
export async function When_I_submit(page: Page) {
  const element = getPlaywrightElement();
  await element.evaluate((form: HTMLFormElement) => form.submit());
}

When("I submit", async (page: Page) => {
  await When_I_submit(page);
});
