import { Then } from "@cucumber/cucumber";
import { Page, Locator, expect } from "@playwright/test";
import { getHeadingElements, getOptions } from "../utils";
import { PseudoSelector } from "../constants";

/**
 * Then I see heading:
 *
 * ```gherkin
 * Then I see heading {string}
 * ```
 *
 * Assert heading (`h1`, `h2`, `h3`, `h4`, `h5`, or `h6`) with text **_exists_** and is **_visible_** in the screen.
 */
Then("I see heading {string}", async function (text: string, options?: any) {
  const page: Page = this.page; // Access Playwright `page` from Cucumber's world context
  const timeout = Number(getOptions(options)?.timeout) || 3000; // Convert timeout to a number, default to 3000ms

  const heading: Locator = getHeadingElements(
    page,
    text,
    PseudoSelector.visible,
    options
  );

  // Wait for the heading to be attached and visible
  await expect(heading).toBeAttached({ timeout });
  await expect(heading).toBeVisible({ timeout });
});

/**
 * Then I do not see heading:
 *
 * ```gherkin
 * Then I do not see heading {string}
 * ```
 *
 * Assert heading with text **_does not exist_** in the screen.
 */
Then(
  "I do not see heading {string}",
  async function (text: string, options?: any) {
    const page: Page = this.page; // Access Playwright `page` from Cucumber's world context
    const timeout = Number(getOptions(options)?.timeout) || 3000; // Convert timeout to a number, default to 3000ms

    const heading: Locator = getHeadingElements(
      page,
      text,
      PseudoSelector.visible,
      options
    );

    // Wait for the heading to be detached (does not exist)
    await expect(heading).not.toBeAttached({ timeout });
  }
);
