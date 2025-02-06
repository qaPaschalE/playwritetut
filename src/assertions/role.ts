import { Then } from "@cucumber/cucumber";
import { Page, Locator, expect } from "@playwright/test";
import { PseudoSelector } from "../constants";
import { getOptions, getRoleElements } from "../utils";

/**
 * Then I see role:
 *
 * ```gherkin
 * Then I see role {string}
 * ```
 *
 * Assert role **_exists_** and is **_visible_** on the screen.
 *
 * @example
 *
 * ```gherkin
 * Then I see role "progressbar"
 * ```
 *
 * With additional options:
 *
 * ```gherkin
 * Then I see role "progressbar"
 *   | timeout | 4000 |
 * ```
 *
 * Inspired by Testing Library's [ByRole](https://testing-library.com/docs/queries/byrole/).
 *
 * @see
 *
 * - {@link Then_I_do_not_see_role | Then I do not see role}
 */
Then("I see role {string}", async function (role: string, options?: any) {
  const page: Page = this.page; // Assuming `page` is part of the context
  const timeout = Number(getOptions(options)?.timeout) || 3000; // Convert timeout to a number, default to 3000ms

  const element: Locator = getRoleElements(
    page,
    role,
    PseudoSelector.visible,
    options
  ); // Using PseudoSelector.visible

  // Wait for the role element to exist and be visible
  await expect(element).toBeAttached({ timeout });
  await expect(element).toBeVisible({ timeout });
});

/**
 * Then I do not see role:
 *
 * ```gherkin
 * Then I do not see role {string}
 * ```
 *
 * Assert role **_does not exist_** on the screen.
 *
 * @example
 *
 * ```gherkin
 * Then I do not see role "progressbar"
 * ```
 *
 * With additional options:
 *
 * ```gherkin
 * Then I do not see role "progressbar"
 *   | timeout | 4000 |
 * ```
 *
 * Inspired by Testing Library's [ByRole](https://testing-library.com/docs/queries/byrole/).
 *
 * @see
 *
 * - {@link Then_I_see_role | Then I see role}
 */
Then(
  "I do not see role {string}",
  async function (role: string, options?: any) {
    const page: Page = this.page; // Assuming `page` is part of the context
    const timeout = Number(getOptions(options)?.timeout) || 3000; // Convert timeout to a number, default to 3000ms

    const element: Locator = getRoleElements(
      page,
      role,
      PseudoSelector.visible,
      options
    ); // Using PseudoSelector.visible

    // Wait for the role element to not exist
    await expect(element).not.toBeAttached({ timeout });
  }
);
