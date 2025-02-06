import { When } from "@cucumber/cucumber";
import { Page } from "@playwright/test";

/**
 * When I log:
 *
 * ```gherkin
 * When I log {string}
 * ```
 *
 * @example
 *
 * ```gherkin
 * When I log "Hello, world!"
 * ```
 *
 * @remarks
 *
 * Prints a message to the Playwright Test log.
 */
export function When_I_log(page: Page, message: string) {
  console.log(message); // Use console.log to log messages in Playwright context
  // If you want to also log it in Playwright Test logs
  page.locator("body").evaluate(() => console.log(message)); // Optionally log to browser console
}

When("I log {string}", When_I_log);
