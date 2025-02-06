import { DataTable, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test"; // Playwright expect for assertions
import { getOptions } from "../../utils";

/**
 * Then I see hash:
 *
 * ```gherkin
 * Then I see hash {string}
 * ```
 *
 * @example
 *
 * ```gherkin
 * Then I see hash "#hash"
 * ```
 *
 * @remarks
 *
 * The URL hash includes the `#` character.
 *
 * @see
 *
 * - {@link Then_I_see_hash_contains | Then I see hash contains}
 */
export function Then_I_see_hash(hash: string, options?: DataTable) {
  const optionsData = getOptions(options);
  const currentHash = window.location.hash;

  expect(currentHash).toBe(hash);
}

Then("I see hash {string}", Then_I_see_hash);

/**
 * Then I see hash contains:
 *
 * ```gherkin
 * Then I see hash contains {string}
 * ```
 *
 * @example
 *
 * ```gherkin
 * Then I see hash contains "hash"
 * ```
 *
 * @see
 *
 * - {@link Then_I_see_hash | Then I see hash}
 */
export function Then_I_see_hash_contains(hash: string, options?: DataTable) {
  const optionsData = getOptions(options);
  const currentHash = window.location.hash;

  expect(currentHash).toContain(hash);
}

Then("I see hash contains {string}", Then_I_see_hash_contains);
