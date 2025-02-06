import { When, DataTable } from "@cucumber/cucumber";
import { getPlaywrightElement, getOptions, camelCase } from "../utils";
import { Locator, Page } from "@playwright/test";

/**
 * When I right-click:
 *
 * ```gherkin
 * When I right-click
 * ```
 *
 * @example
 *
 * ```gherkin
 * When I right-click
 * ```
 *
 * With options:
 *
 * ```gherkin
 * When I right-click
 *   | altKey | false |
 *   | shiftKey | false |
 *   | button | right |
 *   | force | false |
 * ```
 *
 * @remarks
 * A preceding step like {@link When_I_find_element_by_text} is required to locate the element.
 */
export async function When_I_right_click(options?: DataTable) {
  const element: Locator = getPlaywrightElement();
  const opts = getOptions(options);
  await element.click({ button: "right", ...opts });
}

When("I right-click", When_I_right_click);

/**
 * When I right-click position:
 *
 * ```gherkin
 * When I right-click {string}
 * ```
 *
 * Positions supported:
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
 * When I right-click "top-left"
 * ```
 *
 * With options:
 *
 * ```gherkin
 * When I right-click "center"
 *   | force | true |
 * ```
 *
 * @remarks
 * A preceding step like {@link When_I_find_element_by_text} is required to locate the element.
 */
export async function When_I_right_click_position(
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
  const element = getPlaywrightElement(); // Retrieve the Locator
  const opts = getOptions(options); // Parse any additional options

  // Map positions to relative coordinates
  const boundingBox = await element.boundingBox();
  if (!boundingBox) {
    throw new Error("Unable to retrieve bounding box for the element.");
  }

  const { x, y, width, height } = boundingBox;
  const positionMap: Record<string, { x: number; y: number }> = {
    top: { x: x + width / 2, y: y },
    left: { x: x, y: y + height / 2 },
    center: { x: x + width / 2, y: y + height / 2 },
    right: { x: x + width, y: y + height / 2 },
    bottom: { x: x + width / 2, y: y + height },
    "top-left": { x: x, y: y },
    "top-right": { x: x + width, y: y },
    "bottom-left": { x: x, y: y + height },
    "bottom-right": { x: x + width, y: y + height },
  };

  const coordinate = positionMap[position];

  // Perform the right-click at the calculated position
  await element.click({
    button: "right",
    position: coordinate,
    ...opts,
  });
}

When("I right-click {string}", When_I_right_click_position);

/**
 * When I right-click on text:
 *
 * ```gherkin
 * When I right-click on text {string}
 * ```
 *
 * @example
 *
 * ```gherkin
 * When I right-click on text "Submit"
 * ```
 *
 * With options:
 *
 * ```gherkin
 * When I right-click on text "Submit"
 *   | force | false |
 * ```
 *
 * @remarks
 * Uses Playwright's `locator` function with text matching to find the element.
 */
export async function When_I_right_click_on_text(
  page: Page,
  text: string,
  options?: DataTable
) {
  const opts = getOptions(options);

  await page.locator(`text="${text}"`).click({ button: "right", ...opts });
}

When("I right-click on text {string}", When_I_right_click_on_text);
