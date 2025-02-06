import { When } from "@cucumber/cucumber";
import { Page } from "@playwright/test";
import { setPlaywrightElement } from "../utils/element";
import { getOptions } from "../utils/options";

/**
 * When I find elements by alt text:
 *
 * ```gherkin
 * When I find elements by alt text {string}
 * ```
 *
 * Finds elements (e.g., `<img>`) that match the `alt` text.
 *
 * @example
 *
 * ```gherkin
 * When I find elements by alt text "Image Description"
 * ```
 *
 * @remarks
 *
 * This precedes steps like {@link When_I_click | "When I click"}. For example:
 *
 * ```gherkin
 * When I find elements by alt text "Text"
 *   And I get 1st element
 *   And I click
 * ```
 */
export async function When_I_find_elements_by_alt_text(
  page: Page,
  altText: string
) {
  const locator = page.locator(`img[alt="${altText}"]:visible`);
  setPlaywrightElement(locator);
}

When("I find elements by alt text {string}", When_I_find_elements_by_alt_text);

/**
 * When I find element by alt text:
 *
 * ```gherkin
 * When I find element by alt text {string}
 * ```
 *
 * Finds the first element (e.g., `<img>`) that matches the `alt` text.
 *
 * @example
 *
 * ```gherkin
 * When I find element by alt text "Text"
 * ```
 *
 * @remarks
 *
 * This precedes steps like {@link When_I_click | "When I click"}. For example:
 *
 * ```gherkin
 * When I find element by alt text "Text"
 *   And I click
 * ```
 */
export async function When_I_find_element_by_alt_text(
  page: Page,
  altText: string
) {
  await When_I_find_elements_by_alt_text(page, altText);
  const locator = await page.locator(`img[alt="${altText}"]:visible`).first();
  setPlaywrightElement(locator);
}

When("I find element by alt text {string}", When_I_find_element_by_alt_text);

/**
 * When I find images by alt text:
 *
 * ```gherkin
 * When I find images by alt text {string}
 * ```
 *
 * Finds all `<img>` that match the `alt` text.
 *
 * @example
 *
 * ```gherkin
 * When I find images by alt text "Text"
 * ```
 *
 * @remarks
 *
 * This precedes steps like {@link When_I_click | "When I click"}. For example:
 *
 * ```gherkin
 * When I find images by alt text "Text"
 *   And I get 1st element
 *   And I click
 * ```
 */
export async function When_I_find_images_by_alt_text(
  page: Page,
  altText: string
) {
  await When_I_find_elements_by_alt_text(page, altText);
  const locator = await page.locator(`img[alt="${altText}"]:visible`);
  setPlaywrightElement(locator);
}

When("I find images by alt text {string}", When_I_find_images_by_alt_text);

/**
 * When I find image by alt text:
 *
 * ```gherkin
 * When I find image by alt text {string}
 * ```
 *
 * Finds the first `<img>` that matches the `alt` text.
 *
 * @example
 *
 * ```gherkin
 * When I find image by alt text "Text"
 * ```
 *
 * @remarks
 *
 * This precedes steps like {@link When_I_click | "When I click"}. For example:
 *
 * ```gherkin
 * When I find image by alt text "Text"
 *   And I click
 * ```
 */
export async function When_I_find_image_by_alt_text(
  page: Page,
  altText: string
) {
  await When_I_find_images_by_alt_text(page, altText);
  const locator = await page.locator(`img[alt="${altText}"]:visible`).first();
  setPlaywrightElement(locator);
}

When("I find image by alt text {string}", When_I_find_image_by_alt_text);
