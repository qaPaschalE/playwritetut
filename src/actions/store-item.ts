import { When } from '@cucumber/cucumber';
import { getPlaywrightElement } from '../utils';
import dayjs from 'dayjs';

/**
 * Declare a global interface for dynamically storing variables.
 */
declare global {
  interface Global {
    [key: string]: any;
  }
}

// Augment the globalThis type
declare const globalThis: Global;

/**
 * When I store text from various selectors:
 *
 * ```gherkin
 * When I store element text as {string}
 * ```
 *
 * This command retrieves the visible text of an element based on various attributes and stores it under the provided alias.
 *
 * @example
 *
 * Store the visible text from an element as "labelText":
 *
 * ```gherkin
 * When I store element text as "labelText"
 * ```
 *
 * @param alias - The name under which the retrieved text should be stored.
 */
export async function When_I_store(alias: string) {
  const element = await getPlaywrightElement();
  const visibleText = (await element.inputValue()).trim(); // Get and trim the input value
  globalThis[alias] = visibleText; // Store trimmed text globally
  console.log(`Stored input text as alias: ${alias}, Value: ${visibleText}`);
}

/**
 * Store the visible text content of an element:
 *
 * ```gherkin
 * When I store element text as {string}
 * ```
 *
 * @param alias - The name under which the retrieved text should be stored.
 */
export async function When_I_copy_text_value(alias: string) {
  const element = await getPlaywrightElement();
  const uiText = (await element.textContent())?.trim() || ''; // Get and trim the text content
  globalThis[alias] = uiText; // Store trimmed text globally
  console.log(`Stored text content as alias: ${alias}, Value: ${uiText}`);
}

/**
 * Parse and adjust a stored date.
 * @param storedDate - The original date as a string.
 * @param adjustment - An object with the number and unit for adjustment (e.g., `{ number: 1, unit: "week" }`).
 * @returns The adjusted date in 'YYYY-MM-DD' format.
 */
export function getAdjustedDate(
  storedDate: string,
  adjustment: { number: number; unit: dayjs.ManipulateType }
): string {
  let parsedDate = dayjs(storedDate, [
    'MMM D, YYYY. h:mma',
    'MMM D, YYYY h:mma',
    'YYYY-MM-DD', // Add more fallback formats as needed
  ]);

  // If the parsed date is invalid, default to the current date
  if (!parsedDate.isValid()) {
    parsedDate = dayjs(); // Use the current date
  }

  return parsedDate
    .subtract(adjustment.number, adjustment.unit)
    .format('YYYY-MM-DD');
}

/**
 * When I store an adjusted date:
 *
 * ```gherkin
 * When I store {string} {string} {string} before as {string}
 * ```
 *
 * This step adjusts a stored date by a given number and unit, and stores the result for later use.
 *
 * @example
 * ```gherkin
 * When I store "@storedDate" "1" "week" before as "adjustedDate"
 * ```
 */
When(
  'I store {string} {string} {string} before as {string}',
  async (
    storedDateAlias: string,
    number: string,
    unit: string,
    aliasName: string
  ) => {
    const storedDate = globalThis[storedDateAlias];
    const adjustedDate = getAdjustedDate(storedDate, {
      number: parseInt(number),
      unit: unit as dayjs.ManipulateType,
    });
    globalThis[aliasName] = adjustedDate; // Store the adjusted date globally
    console.log(
      `Stored adjusted date as alias: ${aliasName}, Value: ${adjustedDate}`
    );
  }
);

/**
 * Store input text as alias:
 *
 * ```gherkin
 * When I store input text as {string}
 * ```
 *
 * @param alias - The name under which the input text should be stored.
 */
When('I store input text as {string}', When_I_store);

/**
 * Store element text as alias:
 *
 * ```gherkin
 * When I store element text as {string}
 * ```
 *
 * @param alias - The name under which the element text should be stored.
 */
When('I store element text as {string}', When_I_copy_text_value);
