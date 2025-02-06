import { When } from "@cucumber/cucumber";
import { Page } from "@playwright/test";
import { setPlaywrightElement, getPlaywrightElement } from "../utils/element";

/**
 * When I find elements by name:
 *
 * ```gherkin
 * When I find elements by name {string}
 * ```
 *
 * _A name is not a good substitute for a label so you should generally use {@link When_I_find_element_by_label_text | "When I find element by label text"} instead._
 *
 * @example
 *
 * ```gherkin
 * When I find elements by name "text"
 * ```
 *
 * @remarks
 *
 * This precedes steps like {@link When_I_type | "When I type"}. For example:
 *
 * ```gherkin
 * When I find elements by name "password"
 *   And I get 1st element
 *   And I type "password"
 * ```
 *
 * @see
 *
 * - {@link When_I_find_element_by_name | When I find element by name}
 */
export async function When_I_find_elements_by_name(page: Page, name: string) {
  // Locate all elements with the specified name that are visible
  const elements = page.locator(`[name=${JSON.stringify(name)}]:visible`);
  setPlaywrightElement(elements); // Store the located elements for future use
}

// Define the Gherkin step for finding elements by name
When("I find elements by name {string}", async function (name: string) {
  const page: Page = this.page; // Get the Playwright page from the test context
  await When_I_find_elements_by_name(page, name);
});

/**
 * When I find element by name:
 *
 * ```gherkin
 * When I find element by name {string}
 * ```
 *
 * _A name is not a good substitute for a label so you should generally use {@link When_I_find_element_by_label_text | "When I find element by label text"} instead._
 *
 * @example
 *
 * ```gherkin
 * When I find element by name "text"
 * ```
 *
 * @remarks
 *
 * This precedes steps like {@link When_I_type | "When I type"}. For example:
 *
 * ```gherkin
 * When I find element by name "password"
 *   And I type "password"
 * ```
 *
 * @see
 *
 * - {@link When_I_find_elements_by_name | When I find elements by name}
 */
export async function When_I_find_element_by_name(page: Page, name: string) {
  await When_I_find_elements_by_name(page, name); // Reuse the function to find elements by name
  const element = getPlaywrightElement().first(); // Select the first element from the results
  setPlaywrightElement(element); // Store the selected element for future use
}

// Define the Gherkin step for finding a single element by name
When("I find element by name {string}", async function (name: string) {
  const page: Page = this.page; // Get the Playwright page from the test context
  await When_I_find_element_by_name(page, name);
});

/**
 * When I find inputs by name:
 *
 * ```gherkin
 * When I find inputs by name {string}
 * ```
 *
 * _A name is not a good substitute for a label so you should generally use {@link When_I_find_element_by_label_text | "When I find element by label text"} instead._
 *
 * @example
 *
 * ```gherkin
 * When I find inputs by name "text"
 * ```
 *
 * @remarks
 *
 * This precedes steps like {@link When_I_type | "When I type"}. For example:
 *
 * ```gherkin
 * When I find inputs by name "password"
 *   And I get 1st element
 *   And I type "password"
 * ```
 *
 * @see
 *
 * - {@link When_I_find_input_by_name | When I find input by name}
 */
export async function When_I_find_inputs_by_name(page: Page, name: string) {
  await When_I_find_elements_by_name(page, name); // Reuse the function to find elements by name
  const inputs = getPlaywrightElement().locator("input"); // Filter to get only <input> elements
  setPlaywrightElement(inputs); // Store the filtered inputs for future use
}

// Define the Gherkin step for finding input elements by name
When("I find inputs by name {string}", async function (name: string) {
  const page: Page = this.page; // Get the Playwright page from the test context
  await When_I_find_inputs_by_name(page, name);
});

/**
 * When I find input by name:
 *
 * ```gherkin
 * When I find input by name {string}
 * ```
 *
 * _A name is not a good substitute for a label so you should generally use {@link When_I_find_element_by_label_text | "When I find element by label text"} instead._
 *
 * @example
 *
 * ```gherkin
 * When I find input by name "text"
 * ```
 *
 * @remarks
 *
 * This precedes steps like {@link When_I_type | "When I type"}. For example:
 *
 * ```gherkin
 * When I find input by name "password"
 *   And I type "password"
 * ```
 *
 * @see
 *
 * - {@link When_I_find_inputs_by_name | When I find inputs by name}
 */
export async function When_I_find_input_by_name(page: Page, name: string) {
  await When_I_find_inputs_by_name(page, name); // Reuse the function to find input elements by name
  const input = getPlaywrightElement().first(); // Select the first <input> element from the results
  setPlaywrightElement(input); // Store the selected input for future use
}

// Define the Gherkin step for finding a single input element by name
When("I find input by name {string}", async function (name: string) {
  const page: Page = this.page; // Get the Playwright page from the test context
  await When_I_find_input_by_name(page, name);
});
