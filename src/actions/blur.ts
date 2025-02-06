import { When, DataTable } from "@cucumber/cucumber";
import { getOptions, getPlaywrightElement } from "../utils";

/**
 * When I blur:
 *
 * ```gherkin
 * When I blur
 * ```
 *
 * Blurs the element with focus.
 *
 * @example
 *
 * ```gherkin
 * When I blur
 * ```
 *
 * With [options](https://playwright.dev/docs/api/class-locator#locator-blur):
 *
 * ```gherkin
 * When I blur
 *   | timeout | 4000 |
 *   | force   | true |
 * ```
 *
 * @remarks
 *
 * A preceding step like {@link When_I_find_input_by_label_text | "When I find input by label text"} is required. For example:
 *
 * ```gherkin
 * When I find input by label text "Text"
 *   And I blur
 * ```
 */
export async function When_I_blur(options?: DataTable) {
  const element = getPlaywrightElement(); // Get the currently focused Playwright element
  const optionsData: any = getOptions(options); // Extract options like timeout, force, etc.

  // Blur the focused element with the provided options
  await element.blur(optionsData);
}

When("I blur", When_I_blur);
