import { When } from "@cucumber/cucumber";
import { Locator, Page } from "@playwright/test";
import { getPlaywrightElement } from "../utils";

/**
 * When I select:
 *
 * ```gherkin
 * When I select {string}
 * ```
 *
 * @example
 *
 * ```gherkin
 * When I select "Option"
 * ```
 *
 * @remarks
 *
 * A preceding step like {@link When_I_get_element_by_selector | "When I get element by selector"} is required. For example:
 *
 * ```gherkin
 * When I get element by selector "select"
 *   And I select "Option"
 * ```
 *
 * @see
 *
 * - {@link When_I_select_option | When I select option}
 */
export async function When_I_select(page: Page, displayValue: string) {
  const selectElement: Locator = getPlaywrightElement();
  await selectElement.selectOption({ label: displayValue });
}

When("I select {string}", async (page: Page, displayValue: string) => {
  await When_I_select(page, displayValue);
});

/**
 * When I select option:
 *
 * ```gherkin
 * When I select option {string}
 * ```
 *
 * Select the first option by display value.
 *
 * @example
 *
 * ```gherkin
 * When I select option "Option"
 * ```
 *
 * @see
 *
 * - {@link When_I_select | When I select}
 */
export async function When_I_select_option(page: Page, displayValue: string) {
  const optionElement = await page.locator("option", { hasText: displayValue });
  const selectElement = optionElement.locator("xpath=ancestor::select");
  await selectElement.selectOption({ label: displayValue });
}

When("I select option {string}", async (page: Page, displayValue: string) => {
  await When_I_select_option(page, displayValue);
});
