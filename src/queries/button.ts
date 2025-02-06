import { When } from "@cucumber/cucumber";
import { Page, Locator } from "@playwright/test";
import { PseudoSelector } from "../constants";
import { setPlaywrightElement, getOptions } from "../utils/";

/**
 * When I find buttons by text:
 *
 * ```gherkin
 * When I find buttons by text {string}
 * ```
 *
 * Finds all visible buttons that match the text.
 *
 * @example
 *
 * ```gherkin
 * When I find buttons by text "Button"
 * ```
 *
 * @remarks
 *
 * This precedes steps like {@link When_I_click | "When I click"}. For example:
 *
 * ```gherkin
 * When I find buttons by text "Button"
 *   And I get 1st element
 *   And I click
 * ```
 */
export async function When_I_find_buttons_by_text(
  page: Page,
  text: string,
  options?: any
) {
  // @ts-expect-error Property 'pseudoSelector' does not exist on type 'object | undefined'.

  const { pseudoSelector, ...opts } = getOptions(options);
  const locator: Locator = page.locator(
    `button:text("${text}")${pseudoSelector ? `:${pseudoSelector}` : ""}`,
    opts
  );
  setPlaywrightElement(locator);
}

When("I find buttons by text {string}", When_I_find_buttons_by_text);

/**
 * When I find button by text:
 *
 * ```gherkin
 * When I find button by text {string}
 * ```
 *
 * Finds the first button element that matches the text.
 *
 * @example
 *
 * ```gherkin
 * When I find button by text "Button"
 * ```
 *
 * @remarks
 *
 * This precedes steps like {@link When_I_click | "When I click"}. For example:
 *
 * ```gherkin
 * When I find button by text "Button"
 *   And I click
 * ```
 */
export async function When_I_find_button_by_text(
  page: Page,
  text: string,
  options?: any
) {
  await When_I_find_buttons_by_text(page, text, options);
  const locator: Locator = page.locator(`button:text("${text}")`).first();
  setPlaywrightElement(locator);
}

When("I find button by text {string}", When_I_find_button_by_text);
