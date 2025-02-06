import { DataTable, When } from "@cucumber/cucumber";
import { getPlaywrightElement, getOptions } from "../utils";

/**
 * When I type:
 *
 * ```gherkin
 * When I type {string}
 * ```
 *
 * @example
 *
 * ```gherkin
 * When I type "Hello, world!"
 * ```
 *
 * With options:
 *
 * ```gherkin
 * When I type "Hello, world!"
 *   | force | true |
 * ```
 *
 * @remarks
 *
 * A preceding step like {@link When_I_find_element_by_label_text | "When I find element by label text"} is required. For example:
 *
 * ```gherkin
 * When I find element by label text "Email"
 *   And I type "user@example.com"
 * ```
 */
export async function When_I_type(text: string, options?: DataTable) {
  const element = getPlaywrightElement();
  const typingOptions = getOptions(options);

  if (typingOptions?.force) {
    await element.fill(text, { force: typingOptions.force === "true" });
  } else {
    await element.fill(text);
  }
}

When("I type {string}", async (text: string, options?: DataTable) => {
  await When_I_type(text, options);
});
