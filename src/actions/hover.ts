import { When } from "@cucumber/cucumber";
import { Page } from "@playwright/test"; // Assuming `page` is globally available in your Playwright tests
import { getPlaywrightElement } from "../utils";

/**
 * When I hover over the element:
 *
 * ```gherkin
 * When I hover over the element
 * ```
 *
 * @example
 *
 * ```gherkin
 * When I hover over the element
 * ```
 *
 * @remarks
 *
 * A preceding step like {@link When_I_find_element_by_selector | "When I find element by selector"} is required.
 * For example:
 *
 * ```gherkin
 * When I find element by selector "#my-element"
 *   And I hover over the element
 * ```
 */
export async function When_I_hover() {
  const element = await getPlaywrightElement();
  await element.hover();
}

When("I hover over the element", When_I_hover);
