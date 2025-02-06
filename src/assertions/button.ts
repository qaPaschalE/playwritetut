import { DataTable, Then } from "@cucumber/cucumber";
import { Page } from "@playwright/test";
import { PseudoSelector } from "../constants";
import { getButtonElements } from "../utils";

/**
 * Then I see button:
 *
 * ```gherkin
 * Then I see button {string}
 * ```
 *
 * Asserts that a button with the specified text **exists** and is **visible** on the screen.
 *
 * @example
 *
 * ```gherkin
 * Then I see button "Button"
 * ```
 *
 * With options:
 *
 * ```gherkin
 * Then I see button "Button"
 *   | log | true |
 *   | timeout | 4000 |
 *   | withinSubject | null |
 *   | includeShadowDom | false |
 * ```
 *
 * @see
 *
 * - {@link Then_I_see_text | Then I see text}
 */
export async function Then_I_see_button(
  page: Page,
  text: string,
  options?: DataTable
) {
  const locator = await getButtonElements(
    page,
    text,
    PseudoSelector.visible,
    options
  );
  await locator.waitFor({ state: "visible" });
}

Then("I see button {string}", Then_I_see_button);

/**
 * Then I do not see button:
 *
 * ```gherkin
 * Then I do not see button {string}
 * ```
 *
 * Asserts that a button with the specified text **does not exist** or is **not visible** on the screen.
 *
 * @example
 *
 * ```gherkin
 * Then I do not see button "Button"
 * ```
 *
 * With options:
 *
 * ```gherkin
 * Then I do not see button "Button"
 *   | log | true |
 *   | timeout | 4000 |
 *   | withinSubject | null |
 *   | includeShadowDom | false |
 * ```
 *
 * @see
 *
 * - {@link Then_I_do_not_see_text | Then I do not see text}
 */
export async function Then_I_do_not_see_button(
  page: Page,
  text: string,
  options?: DataTable
) {
  const locator = await getButtonElements(
    page,
    text,
    PseudoSelector.visible,
    options
  );
  await locator.waitFor({ state: "detached" }).catch(() => {
    throw new Error(`Button with text "${text}" is still visible.`);
  });
}

Then("I do not see button {string}", Then_I_do_not_see_button);
