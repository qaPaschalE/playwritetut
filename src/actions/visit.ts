import { DataTable, When } from '@cucumber/cucumber';
import { getOptions } from '../utils';
import { Page } from '@playwright/test';

/**
 * When I visit URL:
 *
 * ```gherkin
 * When I visit {string}
 * ```
 *
 * @example
 *
 * With absolute URL:
 *
 * ```gherkin
 * When I visit "https://example.com/"
 * ```
 *
 * With relative URL:
 *
 * ```gherkin
 * When I visit "/"
 * ```
 *
 * @remarks
 *
 * If the page does not respond with a `2xx` status code, this step will fail.
 * If you want to handle failure on non-2xx status codes, you can modify options.
 */
export async function When_I_visit_URL(
  page: Page,
  url: string,
  options?: DataTable
) {
  const opts: any = getOptions(options);

  // If the option 'failOnStatusCode' is passed, handle it in a custom way
  if (opts.failOnStatusCode === false) {
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
    } catch (error) {
      if (error instanceof Error) {
        // Narrowed down to 'Error' type
        console.error('Failed to visit URL:', error.message);
      } else {
        // Handle unknown errors
        console.error('An unexpected error occurred:', error);
      }
    }
  } else {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
  }
}

When('I visit {string}', When_I_visit_URL);
