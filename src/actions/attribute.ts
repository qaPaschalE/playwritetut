import { When } from "@cucumber/cucumber";
import { getPlaywrightElement } from "../utils";
import { Locator } from "@playwright/test";

/**
 * When I set attribute:
 *
 * ```gherkin
 * When I set attribute {string} to {string}
 * ```
 *
 * [**_GENERALLY DO NOT USE THIS AND PREFER STEPS THAT RESEMBLE HOW USERS USE YOUR SITE._**](https://testing-library.com/docs/guiding-principles/)
 *
 * @example
 *
 * ```gherkin
 * When I set attribute "checked" to "checked"
 * ```
 *
 * @remarks
 *
 * A preceding step like {@link When_I_find_element_by_label_text | "When I find element by label text"} is required. For example:
 *
 * ```gherkin
 * When I find element by label text "Input"
 *   And I set attribute "checked" to "checked"
 * ```
 */
export async function When_I_set_attribute(name: string, value: string) {
  const element: Locator = getPlaywrightElement(); // Get the previously stored Playwright element

  // Correct usage of evaluate
  await element.evaluate(
    (el: HTMLElement, attrName: string, attrValue: string) => {
      el.setAttribute(attrName, attrValue); // Set the attribute on the element
    },
    name, // Attribute name
    value // Attribute value
  );
}

When("I set attribute {string} to {string}", When_I_set_attribute);
