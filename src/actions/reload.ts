import { When } from "@cucumber/cucumber";
import { Page } from "@playwright/test";

/**
 * When I reload the page:
 *
 * ```gherkin
 * When I reload the page
 * ```
 *
 * @example
 *
 * ```gherkin
 * When I reload the page
 * ```
 */
export function When_I_reload_the_page(page: Page) {
  page.reload(); // Reloads the current page in Playwright
}

When("I reload the page", When_I_reload_the_page);
