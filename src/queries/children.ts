import { When } from "@cucumber/cucumber";
import { Page, Locator } from "@playwright/test";
import { setPlaywrightElement, getPlaywrightElement } from "../utils/element";

/**
 * When I get children:
 *
 * ```gherkin
 * When I get children
 * ```
 *
 * Get the children of each DOM element within a set of DOM elements.
 *
 * The querying behavior of this command matches exactly how [`.children()`](https://api.jquery.com/children/) works in jQuery.
 *
 * @example
 *
 * ```gherkin
 * When I find form
 *   And I get children
 *   And I get last element
 *   And I click
 * ```
 *
 * @remarks
 *
 * A preceding step like {@link When_I_find_form | "When I find form"} is required. For example:
 *
 * ```gherkin
 * When I find form
 *   And I get children
 *   And I get last element
 *   And I click
 * ```
 */
export async function When_I_get_children(page: Page) {
  const parentLocator: Locator = await getPlaywrightElement();
  const childrenLocator: Locator = parentLocator.locator("> *");
  setPlaywrightElement(childrenLocator);
}

When("I get children", When_I_get_children);
