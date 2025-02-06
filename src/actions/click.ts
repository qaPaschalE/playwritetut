import { DataTable, When } from '@cucumber/cucumber';
import { Locator, Page } from 'playwright';
import {
  getPlaywrightElement,
  getOptions,
  camelCase,
  getButtonElements,
  getLinkElements,
  getTestIdElements,
} from '../utils';
import {
  When_I_find_element_by_label_text,
  When_I_find_element_by_title,
} from '../queries';
import { PseudoSelector } from '../constants';

/**
 * When I click:
 *
 * ```gherkin
 * When I click
 * ```
 *
 * Clicks on the element found in the previous step.
 *
 * @example
 *
 * ```gherkin
 * When I click
 * ```
 *
 * With [options](https://playwright.dev/docs/api/class-locator#locator-click):
 *
 * ```gherkin
 * When I click
 *   | force | false |
 *   | timeout | 4000 |
 * ```
 */
export async function When_I_click(options?: DataTable) {
  const element: Locator = getPlaywrightElement(); // Get the previously stored Playwright element
  const optionsData: any = getOptions(options); // Extract options like timeout, force, etc.

  // Click on the element with specified options
  await element.click(optionsData);
}

When('I click', When_I_click);

/**
 * When I click position:
 *
 * ```gherkin
 * When I click {string}
 * ```
 *
 * Clicks on the position of the element found in the previous step.
 *
 * You can click on 9 specific positions of an element:
 *
 * ```
 *  -------------------------------------
 * | top-left        top       top-right |
 * |                                     |
 * |                                     |
 * | left          center          right |
 * |                                     |
 * |                                     |
 * |                                     |
 * | bottom-left   bottom   bottom-right |
 *  -------------------------------------
 * ```
 *
 * @example
 *
 * ```gherkin
 * When I click "top-left"
 * ```
 *
 * With [options](https://playwright.dev/docs/api/class-locator#locator-click):
 *
 * ```gherkin
 * When I click "top"
 *   | force | false |
 *   | timeout | 4000 |
 * ```
 */
export async function When_I_click_position(
  position:
    | 'top'
    | 'left'
    | 'center'
    | 'right'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right'
    | 'top-left'
    | 'top-right',
  options?: DataTable
) {
  const element: Locator = getPlaywrightElement();
  const optionsData = getOptions(options);

  // Map position strings to { x, y } coordinates
  const positionMap: Record<string, { x: number; y: number }> = {
    'top-left': { x: 0, y: 0 },
    top: { x: 0.5, y: 0 },
    'top-right': { x: 1, y: 0 },
    left: { x: 0, y: 0.5 },
    center: { x: 0.5, y: 0.5 },
    right: { x: 1, y: 0.5 },
    'bottom-left': { x: 0, y: 1 },
    bottom: { x: 0.5, y: 1 },
    'bottom-right': { x: 1, y: 1 },
  };

  const clickPosition = positionMap[position];
  if (!clickPosition) {
    throw new Error(`Invalid position: ${position}`);
  }

  const boundingBox = await element.boundingBox();
  if (!boundingBox) {
    throw new Error('Unable to get bounding box for the element.');
  }

  const scaledPosition = {
    x: clickPosition.x * boundingBox.width,
    y: clickPosition.y * boundingBox.height,
  };

  await element.click({ position: scaledPosition, ...optionsData });
}

When('I click {string}', When_I_click_position);

/**
 * When I click x-y coordinates:
 *
 * ```gherkin
 * When I click {int}px and {int}px
 * ```
 *
 * Clicks on the x-y coordinates of the element found in the previous step.
 *
 * @example
 *
 * ```gherkin
 * When I click 80px and 75px
 * ```
 *
 * With [options](https://playwright.dev/docs/api/class-locator#locator-click):
 *
 * ```gherkin
 * When I click 80px and 75px
 *   | force | false |
 *   | timeout | 4000 |
 * ```
 */
export async function When_I_click_x_y_coordinates(
  x: number,
  y: number,
  options?: DataTable
) {
  const element: Locator = getPlaywrightElement();
  const optionsData = getOptions(options);

  // Click at specific x,y coordinates relative to the element
  await element.click({ position: { x, y }, ...optionsData });
}

When('I click {int}px and {int}px', When_I_click_x_y_coordinates);

/**
 * When I click on button:
 *
 * ```gherkin
 * When I click on button {string}
 * ```
 *
 * Clicks on the first button with the matching text.
 *
 * @example
 *
 * ```gherkin
 * When I click on button "Button"
 * ```
 */
export async function When_I_click_on_button(
  page: Page,
  text: string,
  options?: DataTable
) {
  const button: Locator = await getButtonElements(
    page,
    text,
    PseudoSelector.visible,
    options
  ); // Get the button element
  const optionsData = getOptions(options);

  // Click on the button
  await button.first().click(optionsData);
}

When('I click on button {string}', When_I_click_on_button);

/**
 * When I click on link:
 *
 * ```gherkin
 * When I click on link {string}
 * ```
 *
 * Clicks on the first link with the matching text.
 *
 * @example
 *
 * ```gherkin
 * When I click on link "Link"
 * ```
 */
export async function When_I_click_on_link(
  page: Page,
  text: string,
  options?: DataTable
) {
  const link: Locator = await getLinkElements(
    page,
    text,
    PseudoSelector.visible,
    options
  ); // Get the link element
  const optionsData = getOptions(options);

  // Click on the link
  await link.first().click(optionsData);
}

When('I click on link {string}', When_I_click_on_link);

/**
 * When I click on text:
 *
 * ```gherkin
 * When I click on text {string}
 * ```
 *
 * Clicks on the first element with the matching text.
 *
 * @example
 *
 * ```gherkin
 * When I click on text "Text"
 * ```
 */
export async function When_I_click_on_text(
  page: Page,
  text: string,
  options?: DataTable
) {
  const opts = getOptions(options);

  // Find the text element and click on it
  const element: Locator = await page.locator(`text=${text}`);
  await element.click(opts);
}

When('I click on text {string}', When_I_click_on_text);

/**
 * When I click on label:
 *
 * ```gherkin
 * When I click on label {string}
 * ```
 *
 * Clicks on the first label with the matching text.
 *
 * @example
 *
 * ```gherkin
 * When I click on label "Label"
 * ```
 */
export async function When_I_click_on_label(
  page: Page,
  text: string,
  options?: DataTable
) {
  // Pass the page, text, and options to the function
  await When_I_find_element_by_label_text(page, text, options);

  // Perform the click action
  await When_I_click(options);
}

// Register the step in Cucumber
When('I click on label {string}', When_I_click_on_label);

/**
 * When I click on test ID:
 *
 * ```gherkin
 * When I click on test ID {string}
 * ```
 *
 * Clicks on the first element with the matching `data-testid` or `data-test-id` attribute:
 *
 * ```html
 * <div data-testid="test"></div>
 * <div data-test-id="test"></div>
 * ```
 */
export async function When_I_click_on_testid(
  testId: string,
  options?: DataTable
) {
  const page: Page = getPlaywrightElement() as unknown as Page; // Ensure the Playwright page is accessible
  const element: Locator = await page.locator(
    `[data-testid="${testId}"], [data-test-id="${testId}"]`
  );
  const optionsData = getOptions(options);

  // Click on the element
  await element.first().click(optionsData);
}

When('I click on test ID {string}', When_I_click_on_testid);

/**
 * When I click on title:
 *
 * ```gherkin
 * When I click on title {string}
 * ```
 *
 * Clicks on the first element with the matching title.
 *
 * @example
 *
 * ```gherkin
 * When I click on title "Title"
 * ```
 */
export async function When_I_click_on_title(
  page: Page,
  text: string,
  options?: DataTable
) {
  await When_I_find_element_by_title(page, text, options);
  await When_I_click(options);
}

When('I click on title {string}', When_I_click_on_title);
