import { When } from "@cucumber/cucumber";
import { Page, Locator } from "@playwright/test";
import { getOptions, setPlaywrightElement } from "../utils";
import { getByDisplayValue } from "../utils/display-value";

/**
 * When I get element by display value:
 *
 * ```gherkin
 * When I get element by display value {string}
 * ```
 *
 * Finds an element (`input`, `textarea`, or `select`) by its display value.
 *
 * @example
 *
 * ```gherkin
 * When I get element by display value "Hello World"
 * ```
 */
export async function When_I_get_element_by_display_value(
  page: Page,
  value: string,
  options?: any
) {
  // @ts-expect-error Property 'pseudoSelector' does not exist on type 'object | undefined'.

  const { pseudoSelector, ...opts } = getOptions(options);

  // Try to find the element based on its display value
  if (await hasDisplayValue(page, "input", value, opts)) {
    return await When_I_find_input_by_display_value(page, value, opts);
  }

  if (await hasDisplayValue(page, "textarea", value, opts)) {
    return await When_I_find_textarea_by_display_value(page, value, opts);
  }

  if (await hasDisplayValue(page, "option", value, opts)) {
    return await When_I_find_select_by_display_value(page, value, opts);
  }

  throw new Error(`Unable to find element by display value: "${value}"`);
}

When(
  "I get element by display value {string}",
  When_I_get_element_by_display_value
);

/**
 * Checks if an element with the specified display value exists.
 *
 * @param page - Playwright Page instance.
 * @param elementName - Element type ('input', 'textarea', or 'option').
 * @param value - Display value to match.
 * @param options - Query options.
 */
async function hasDisplayValue(
  page: Page,
  elementName: "input" | "textarea" | "option",
  value: string,
  options?: any
): Promise<boolean> {
  if (elementName === "option") {
    const optionsLocator = page.locator(
      `option${options?.pseudoSelector || ""}`
    );
    return (await optionsLocator.filter({ hasText: value }).count()) > 0;
  }

  const locator = await getByDisplayValue(page, elementName, value);
  return (await locator.count()) > 0;
}

/**
 * When I find input by display value:
 *
 * ```gherkin
 * When I find input by display value {string}
 * ```
 *
 * Finds an `input` element by its display value.
 *
 * @example
 *
 * ```gherkin
 * When I find input by display value "Input Value"
 * ```
 */
export async function When_I_find_input_by_display_value(
  page: Page,
  value: string,
  options?: any
) {
  const locator = await getByDisplayValue(page, "input", value);
  setPlaywrightElement(locator);
}

When(
  "I find input by display value {string}",
  When_I_find_input_by_display_value
);

/**
 * When I find textarea by display value:
 *
 * ```gherkin
 * When I find textarea by display value {string}
 * ```
 *
 * Finds a `textarea` element by its display value.
 *
 * @example
 *
 * ```gherkin
 * When I find textarea by display value "Textarea Value"
 * ```
 */
export async function When_I_find_textarea_by_display_value(
  page: Page,
  value: string,
  options?: any
) {
  const locator = await getByDisplayValue(page, "textarea", value);
  setPlaywrightElement(locator);
}

When(
  "I find textarea by display value {string}",
  When_I_find_textarea_by_display_value
);

/**
 * When I find select by display value:
 *
 * ```gherkin
 * When I find select by display value {string}
 * ```
 *
 * Finds a `select` element containing an option with the specified display value.
 *
 * @example
 *
 * ```gherkin
 * When I find select by display value "Option Value"
 * ```
 */
export async function When_I_find_select_by_display_value(
  page: Page,
  value: string,
  options?: any
) {
  const optionLocator = page.locator(`option:text("${value}")`);
  const selectLocator = optionLocator.locator("xpath=ancestor::select");
  setPlaywrightElement(selectLocator);
}

When(
  "I find select by display value {string}",
  When_I_find_select_by_display_value
);
