import { Then } from "@cucumber/cucumber";
import { Page, Locator, expect } from "@playwright/test";
import { getPlaywrightElement } from "../utils";

/**
 * Then I see value:
 *
 * ```gherkin
 * Then I see value {string}
 * ```
 *
 * Assert element with exact value is **_visible_** on the screen.
 */
Then("I see value {string}", async function (value: string) {
  const element: Locator = getPlaywrightElement();
  const actualValue = await element.inputValue();
  expect(actualValue).toBe(value);
});

/**
 * Then I do not see value:
 *
 * ```gherkin
 * Then I do not see value {string}
 * ```
 *
 * Assert element with exact value **_does not exist_** on the screen.
 */
Then("I do not see value {string}", async function (value: string) {
  const element: Locator = getPlaywrightElement();
  const actualValue = await element.inputValue();
  expect(actualValue).not.toBe(value);
});

/**
 * Then I see input value:
 *
 * ```gherkin
 * Then I see input value {string}
 * ```
 *
 * Assert the first visible input has the exact value.
 */
Then("I see input value {string}", async function (value: string) {
  const page: Page = this.page;
  const input: Locator = page.locator("input:visible");
  const actualValue = await input.inputValue();
  expect(actualValue).toBe(value);
});

/**
 * Then I see input value contains:
 *
 * ```gherkin
 * Then I see input value contains {string}
 * ```
 *
 * Assert input with a partial value is **_visible_** on the screen.
 */
Then("I see input value contains {string}", async function (value: string) {
  const page: Page = this.page;
  const inputs: Locator = page.locator("input:visible");
  const visibleInputs = await inputs.elementHandles();

  let found = false;
  for (const inputHandle of visibleInputs) {
    const actualValue = await inputHandle.inputValue();
    if (actualValue.includes(value)) {
      found = true;
      break;
    }
  }
  expect(found).toBe(true);
});

/**
 * Then I see textarea value:
 *
 * ```gherkin
 * Then I see textarea value {string}
 * ```
 *
 * Assert the textarea with the exact value is **_visible_** on the screen.
 */
Then("I see textarea value {string}", async function (value: string) {
  const page: Page = this.page;
  const textarea: Locator = page.locator("textarea:visible");
  const actualValue = await textarea.inputValue();
  expect(actualValue).toBe(value);
});

/**
 * Then I see textarea value contains:
 *
 * ```gherkin
 * Then I see textarea value contains {string}
 * ```
 *
 * Assert textarea with a partial value is **_visible_** on the screen.
 */
Then("I see textarea value contains {string}", async function (value: string) {
  const page: Page = this.page;
  const textareas: Locator = page.locator("textarea:visible");
  const visibleTextareas = await textareas.elementHandles();

  let found = false;
  for (const textareaHandle of visibleTextareas) {
    const actualValue = await textareaHandle.inputValue();
    if (actualValue.includes(value)) {
      found = true;
      break;
    }
  }
  expect(found).toBe(true);
});
