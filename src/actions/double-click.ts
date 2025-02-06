import { DataTable, When } from "@cucumber/cucumber";
import { Page, Locator } from "@playwright/test";
import { camelCase, getPlaywrightElement, getOptions } from "../utils";

/**
 * When I double-click:
 *
 * ```gherkin
 * When I double-click
 * ```
 *
 * @example
 *
 * ```gherkin
 * When I double-click
 * ```
 *
 * With [options](https://playwright.dev/docs/api/class-locator#locator-dblclick):
 *
 * ```gherkin
 * When I double-click
 *   | delay | 100 |
 *   | button | left |
 *   | clickCount | 2 |
 * ```
 */
export async function When_I_double_click(options?: DataTable) {
  const element = await getPlaywrightElement();
  await element.dblclick(getOptions(options));
}

When("I double-click", When_I_double_click);

/**
 * When I double-click position:
 *
 * ```gherkin
 * When I double-click {string}
 * ```
 *
 * You can double-click on 9 specific positions of an element:
 *
 * ```
 *  -------------------------------------
 * | top-left        top       top-right |
 * |                                     |
 * |                                     |
 * |                                     |
 * | left          center          right |
 * |                                     |
 * |                                     |
 * |                                     |
 * | bottom-left   bottom   bottom-right |
 *  -------------------------------------
 * ```
 *
 * @example
 *
 * ```gherkin
 * When I double-click "top-left"
 * ```
 *
 * @remarks
 *
 * A preceding step like {@link When_I_find_element_by_text | "When I find element by text"} is required. For example:
 *
 * ```gherkin
 * When I find element by text "Text"
 *   And I double-click "top-right"
 * ```
 */
export async function When_I_double_click_position(
  position:
    | "top"
    | "left"
    | "center"
    | "right"
    | "bottom"
    | "bottom-left"
    | "bottom-right"
    | "top-left"
    | "top-right",
  options?: DataTable
) {
  const element = await getPlaywrightElement();
  const positionValue: any = camelCase(position) as keyof Locator;
  await element.dblclick({ position: positionValue, ...getOptions(options) });
}

When("I double-click {string}", When_I_double_click_position);

/**
 * When I double-click on text:
 *
 * ```gherkin
 * When I double-click on text {string}
 * ```
 *
 * @example
 *
 * ```gherkin
 * When I double-click on text "Text"
 * ```
 */
export async function When_I_double_click_on_text(
  text: string,
  options?: DataTable
) {
  const element = await getPlaywrightElement();
  const locator = element.locator(`text=${text}`);
  await locator.dblclick(getOptions(options));
}

When("I double-click on text {string}", When_I_double_click_on_text);
