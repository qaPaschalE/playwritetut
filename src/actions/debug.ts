import { When } from "@cucumber/cucumber";
import { Page } from "@playwright/test";
import { getPlaywrightElement } from "../utils";

/**
 * When I debug:
 *
 * ```gherkin
 * When I debug
 * ```
 *
 * Sets a `debugger` and logs what the previous command yields.
 *
 * @example
 *
 * ```gherkin
 * When I debug
 * ```
 *
 * @remarks
 *
 * Sets a `debugger` and logs the value of the previous element or operation.
 *
 * _The Playwright debugger will be triggered during the test run if needed._
 *
 * @see
 *
 * - {@link When_I_pause | When I pause}
 */
export async function When_I_debug(page: Page) {
  try {
    // Trigger Playwright's debug logging
    const element = await getPlaywrightElement();
    console.log("Debugging Element:", element);

    // Optionally, invoke the debugger to pause execution
    debugger; // This will trigger the Playwright debugger if developer tools are open
  } catch (error) {
    console.error("Error during debugging:", error);
  }
}

When("I debug", When_I_debug);
