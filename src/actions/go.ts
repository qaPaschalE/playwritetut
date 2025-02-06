import { When } from "@cucumber/cucumber";
import { Page } from "@playwright/test";

/**
 * When I go:
 *
 * ```gherkin
 * When I go {int}
 * ```
 *
 * @example
 *
 * Navigate forward to the next URL in the browser's history:
 *
 * ```gherkin
 * # equivalent to clicking the forward button
 * When I go 1
 * ```
 *
 * Navigate back to the previous URL in the browser's history:
 *
 * ```gherkin
 * # equivalent to clicking the back button
 * When I go -1
 * ```
 *
 * @see
 *
 * - {@link When_I_go_back | When I go back}
 * - {@link When_I_go_forward | When I go forward}
 */
export async function When_I_go(direction: number, page: Page) {
  if (direction === 1) {
    await page.goForward(); // Navigate forward
  } else if (direction === -1) {
    await page.goBack(); // Navigate back
  }
}

When("I go {int}", When_I_go);

/**
 * When I go back:
 *
 * ```gherkin
 * When I go back
 * ```
 *
 * Alias for {@link When_I_go | "When I go"}:
 *
 * ```gherkin
 * When I go -1
 * ```
 *
 * @example
 *
 * Navigate back to the previous URL in the browser's history:
 *
 * ```gherkin
 * When I go back
 * ```
 *
 * @see
 *
 * - {@link When_I_go | When I go}
 * - {@link When_I_go_forward | When I go forward}
 */
export async function When_I_go_back(page: Page) {
  await page.goBack(); // Go back in browser history
}

When("I go back", When_I_go_back);

/**
 * When I go forward:
 *
 * ```gherkin
 * When I go forward
 * ```
 *
 * Alias for {@link When_I_go | "When I go"}:
 *
 * ```gherkin
 * When I go 1
 * ```
 *
 * @example
 *
 * Navigate forward to the next URL in the browser's history:
 *
 * ```gherkin
 * When I go forward
 * ```
 *
 * @see
 *
 * - {@link When_I_go | When I go}
 * - {@link When_I_go_back | When I go back}
 */
export async function When_I_go_forward(page: Page) {
  await page.goForward(); // Go forward in browser history
}

When("I go forward", When_I_go_forward);
