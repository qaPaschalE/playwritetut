import { Locator, Page } from "@playwright/test";
import { DataTable, When } from "@cucumber/cucumber";
import { getPlaywrightElement, getOptions } from "../utils";

/**
 * When I select file:
 *
 * ```gherkin
 * When I select file {string}
 * ```
 *
 * Selects a file in an HTML5 input element.
 *
 * @example
 *
 * Select file:
 *
 * ```gherkin
 * When I select file "path/to/file.json"
 * ```
 *
 * Drag and drop file:
 *
 * ```gherkin
 * When I select file "path/to/file.json"
 *   | action | drag-drop |
 * ```
 *
 * @remarks
 *
 * A preceding step like {@link When_I_get_element_by_selector | "When I get element by selector"} is required. For example:
 *
 * ```gherkin
 * When I get element by selector "input[type=file]"
 *   And I select file "path/to/file.json"
 * ```
 */
export async function When_I_select_file(
  page: Page,
  filePath: string,
  options?: DataTable
) {
  const optionsObj = getOptions(options); // Extract the options as an object

  const action = optionsObj?.action as string | undefined; // Safely access and type the 'action' property
  const fileInput: Locator = getPlaywrightElement();

  if (action === "drag-drop") {
    // For drag and drop, simulate dragging the file to the target element.
    await fileInput.dragTo(fileInput);
  } else {
    // Select file via file input field
    await fileInput.setInputFiles(filePath);
  }
}

When("I select file {string}", async (page: Page, filePath: string) => {
  await When_I_select_file(page, filePath);
});

When(
  "I select file {string} with options",
  async (page: Page, filePath: string, options: DataTable) => {
    await When_I_select_file(page, filePath, options);
  }
);
