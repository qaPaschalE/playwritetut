import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

/**
 * Then I see response status:
 *
 * ```gherkin
 * Then I see response status {int}
 * ```
 *
 * @example
 *
 * ```gherkin
 * Then I see response status 200
 * ```
 *
 * @remarks
 *
 * A preceding step like `"When I make a request"` is required. For example:
 *
 * ```gherkin
 * When I make a "POST" request to "/api"
 * Then I see response status 200
 * ```
 */
Then("I see response status {int}", async function (statusCode: number) {
  // Assuming the response object is stored in the world context
  const response = this.response;

  if (!response) {
    throw new Error(
      "No response object found. Ensure a preceding step makes a request."
    );
  }

  // Assert the status code matches
  expect(response.status()).toBe(statusCode);
});

/**
 * Then I see response body:
 *
 * ```gherkin
 * Then I see response body {string}
 * ```
 *
 * @example
 *
 * ```gherkin
 * Then I see response body "OK"
 * ```
 *
 * @remarks
 *
 * A preceding step like `"When I make a request"` is required. For example:
 *
 * ```gherkin
 * When I make a "GET" request to "/user.json"
 * Then I see response body '{"name":"Mark"}'
 * ```
 */
Then("I see response body {string}", async function (expectedBody: string) {
  // Assuming the response object is stored in the world context
  const response = this.response;

  if (!response) {
    throw new Error(
      "No response object found. Ensure a preceding step makes a request."
    );
  }

  // Get the response body as text
  const actualBody = await response.text();

  // Compare body as JSON or as a plain string
  try {
    const expectedJson = JSON.parse(expectedBody);
    const actualJson = JSON.parse(actualBody);
    expect(actualJson).toEqual(expectedJson);
  } catch {
    // Fallback to string comparison if JSON parsing fails
    expect(actualBody).toBe(expectedBody);
  }
});
