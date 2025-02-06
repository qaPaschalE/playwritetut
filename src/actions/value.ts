import { When } from "@cucumber/cucumber";
import { getPlaywrightElement } from "../utils";

/**
 * When I set value:
 *
 * ```gherkin
 * When I set value {string}
 * ```
 *
 * @example
 *
 * ```gherkin
 * When I set value "Value"
 * ```
 *
 * @remarks
 *
 * A preceding step like {@link When_I_get_element_by_display_value | "When I get element by display value"} is required. For example:
 *
 * ```gherkin
 * When I get element by display value "Input"
 *   And I set value "Value"
 * ```
 */
export async function When_I_set_value(value: string) {
  const element = getPlaywrightElement(); // Retrieves the stored Playwright Locator
  await element.fill(value); // Fills the input element with the specified value
  await element.evaluate((node) => {
    const event = new Event("change", { bubbles: true });
    node.dispatchEvent(event); // Triggers a 'change' event after updating the value
  });
}

When("I set value {string}", async (value: string) => {
  await When_I_set_value(value);
});
