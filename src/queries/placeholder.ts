import { When } from "@cucumber/cucumber";
import { Page } from "@playwright/test";
import { setPlaywrightElement, getPlaywrightElement } from "../utils/element";

/**
 * When I find elements by placeholder text:
 *
 * ```gherkin
 * When I find elements by placeholder text {string}
 * ```
 *
 * _A placeholder is not a good substitute for a label so you should generally use {@link When_I_find_element_by_label_text | "When I find element by label text"} instead._
 *
 * @example
 *
 * ```gherkin
 * When I find element by placeholder text "Text"
 * ```
 *
 * @remarks
 *
 * This precedes steps like {@link When_I_type | "When I type"}. For example:
 *
 * ```gherkin
 * When I find elements by placeholder text "Name"
 *   And I get 1st element
 *   And I type "John Smith"
 * ```
 */
export async function When_I_find_elements_by_placeholder_text(
  page: Page,
  placeholderText: string
) {
  const elements = page.locator(
    `[placeholder=${JSON.stringify(placeholderText)}]:visible`
  );
  setPlaywrightElement(elements); // Save the located elements
}

When(
  "I find elements by placeholder text {string}",
  async function (placeholderText: string) {
    const page: Page = this.page;
    await When_I_find_elements_by_placeholder_text(page, placeholderText);
  }
);

/**
 * When I find element by placeholder text:
 *
 * ```gherkin
 * When I find element by placeholder text {string}
 * ```
 *
 * @example
 *
 * ```gherkin
 * When I find element by placeholder text "Text"
 * ```
 */
export async function When_I_find_element_by_placeholder_text(
  page: Page,
  placeholderText: string
) {
  await When_I_find_elements_by_placeholder_text(page, placeholderText);
  const element = getPlaywrightElement().first(); // Select the first element
  setPlaywrightElement(element);
}

When(
  "I find element by placeholder text {string}",
  async function (placeholderText: string) {
    const page: Page = this.page;
    await When_I_find_element_by_placeholder_text(page, placeholderText);
  }
);

/**
 * When I find inputs by placeholder text:
 *
 * ```gherkin
 * When I find inputs by placeholder text {string}
 * ```
 *
 * @example
 *
 * ```gherkin
 * When I find inputs by placeholder text "Text"
 * ```
 */
export async function When_I_find_inputs_by_placeholder_text(
  page: Page,
  placeholderText: string
) {
  await When_I_find_elements_by_placeholder_text(page, placeholderText);
  const inputs = getPlaywrightElement().locator("input"); // Filter for input elements
  setPlaywrightElement(inputs);
}

When(
  "I find inputs by placeholder text {string}",
  async function (placeholderText: string) {
    const page: Page = this.page;
    await When_I_find_inputs_by_placeholder_text(page, placeholderText);
  }
);

/**
 * When I find input by placeholder text:
 *
 * ```gherkin
 * When I find input by placeholder text {string}
 * ```
 *
 * @example
 *
 * ```gherkin
 * When I find input by placeholder text "Text"
 * ```
 */
export async function When_I_find_input_by_placeholder_text(
  page: Page,
  placeholderText: string
) {
  await When_I_find_inputs_by_placeholder_text(page, placeholderText);
  const input = getPlaywrightElement().first(); // Get the first input element
  setPlaywrightElement(input);
}

When(
  "I find input by placeholder text {string}",
  async function (placeholderText: string) {
    const page: Page = this.page;
    await When_I_find_input_by_placeholder_text(page, placeholderText);
  }
);

/**
 * When I find textareas by placeholder text:
 *
 * ```gherkin
 * When I find textareas by placeholder text {string}
 * ```
 *
 * @example
 *
 * ```gherkin
 * When I find textareas by placeholder text "Text"
 * ```
 */
export async function When_I_find_textareas_by_placeholder_text(
  page: Page,
  placeholderText: string
) {
  await When_I_find_elements_by_placeholder_text(page, placeholderText);
  const textareas = getPlaywrightElement().locator("textarea"); // Filter for textarea elements
  setPlaywrightElement(textareas);
}

When(
  "I find textareas by placeholder text {string}",
  async function (placeholderText: string) {
    const page: Page = this.page;
    await When_I_find_textareas_by_placeholder_text(page, placeholderText);
  }
);

/**
 * When I find textarea by placeholder text:
 *
 * ```gherkin
 * When I find textarea by placeholder text {string}
 * ```
 *
 * @example
 *
 * ```gherkin
 * When I find textarea by placeholder text "Text"
 * ```
 */
export async function When_I_find_textarea_by_placeholder_text(
  page: Page,
  placeholderText: string
) {
  await When_I_find_textareas_by_placeholder_text(page, placeholderText);
  const textarea = getPlaywrightElement().first(); // Get the first textarea element
  setPlaywrightElement(textarea);
}

When(
  "I find textarea by placeholder text {string}",
  async function (placeholderText: string) {
    const page: Page = this.page;
    await When_I_find_textarea_by_placeholder_text(page, placeholderText);
  }
);
