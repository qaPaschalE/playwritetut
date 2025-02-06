import { DataTable, When } from "@cucumber/cucumber";
import { Page } from "@playwright/test"; // Assuming `page` is globally available in your Playwright tests
import { getOptions } from "../utils";

/**
 * When I wait:
 *
 * ```gherkin
 * When I wait {int} seconds
 * ```
 *
 * @example
 *
 * ```gherkin
 * When I wait 5 seconds
 * ```
 *
 * @remarks
 *
 * The number of seconds to wait before continuing the test.
 * It uses `page.waitForTimeout()` to pause the test for the specified duration.
 */
export async function When_I_wait(
  page: Page,
  seconds: number,
  options?: DataTable
) {
  const opts: any = getOptions(options);

  // Default is to wait in milliseconds, so convert seconds to milliseconds
  const timeout = seconds * 1000;

  // Optionally, use any custom options (if applicable)
  if (opts.log) {
    console.log(`Waiting for ${seconds} seconds...`);
  }

  await page.waitForTimeout(timeout);
}

When("I wait {int} seconds", When_I_wait);
