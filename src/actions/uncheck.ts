import { DataTable, When } from '@cucumber/cucumber';
import { Page } from '@playwright/test';
import { When_I_find_input_by_label_text } from '../queries';
import { getPlaywrightElement, getOptions } from '../utils';

/**
 * When I uncheck:
 *
 * ```gherkin
 * When I uncheck
 * ```
 *
 * This element must be an `<input>` with type `checkbox`.
 *
 * @example
 *
 * Uncheck checkbox(es):
 *
 * ```gherkin
 * When I uncheck
 * ```
 *
 * With options:
 *
 * ```gherkin
 * When I uncheck
 *   | force | true |
 * ```
 *
 * @remarks
 *
 * A preceding step like {@link When_I_find_input_by_label_text | "When I find input by label text"} is required. For example:
 *
 * ```gherkin
 * When I find input by label text "Checkbox"
 *   And I uncheck
 * ```
 *
 * @see
 *
 * - {@link When_I_uncheck_input | When I uncheck input}
 * - {@link When_I_check | When I check}
 */
export async function When_I_uncheck(options?: DataTable) {
  const element = getPlaywrightElement();
  const uncheckOptions = getOptions(options);

  if (uncheckOptions?.force) {
    await element.uncheck({ force: uncheckOptions.force === 'true' });
  } else {
    await element.uncheck();
  }
}

When('I uncheck', async (options?: DataTable) => {
  await When_I_uncheck(options);
});

/**
 * When I uncheck input:
 *
 * ```gherkin
 * When I uncheck input {string}
 * ```
 *
 * Uncheck checkbox input by label text.
 *
 * @example
 *
 * ```gherkin
 * When I uncheck input "Text"
 * ```
 *
 * With options:
 *
 * ```gherkin
 * When I uncheck input "Text"
 *   | force | true |
 * ```
 *
 * @see
 *
 * - {@link When_I_uncheck | When I uncheck}
 * - {@link When_I_check_input | When I check input}
 */
export async function When_I_uncheck_input(
  page: Page,
  text: string,
  options?: DataTable
) {
  await When_I_find_input_by_label_text(text, options);
  await When_I_uncheck(options);
}

When('I uncheck input {string}', async (text: string, options?: DataTable) => {
  await When_I_uncheck_input(text, options);
});
