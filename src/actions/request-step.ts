import { When } from "@cucumber/cucumber";
import { APIRequestContext, request, APIResponse } from "@playwright/test";
import { getOptions } from "../utils";

const storedResponses: Record<string, APIResponse> = {};

/**
 * Stores an API response object for later use.
 * @param response The APIResponse object to store.
 * @param key Optional key to identify the response (defaults to "default").
 */
export function setApiResponse(response: APIResponse, key = "default") {
  storedResponses[key] = response;
}

/**
 * Retrieves a previously stored API response object.
 * @param key Optional key to retrieve the response (defaults to "default").
 * @returns The stored APIResponse object.
 */
export function getApiResponse(key = "default"): APIResponse {
  if (!storedResponses[key]) {
    throw new Error(`No API response found for key "${key}".`);
  }
  return storedResponses[key];
}

/**
 * When I make an HTTP request:
 *
 * ```gherkin
 * When I make a {string} request to {string}
 * ```
 *
 * @example
 *
 * Make a `GET` request to `http://dev.local/seed`:
 *
 * ```gherkin
 * When I make a "GET" request to "http://dev.local/seed"
 * ```
 *
 * Make an `OPTIONS` request to `/api`:
 *
 * ```gherkin
 * When I make an "OPTIONS" request to "/api"
 * ```
 *
 * @remarks
 *
 * If you make a request after visiting a page, Playwright assumes the base URL is determined by the context of the test:
 *
 * ```gherkin
 * When I navigate to "http://localhost:8080/app"
 *   And I make a "POST" request to "users/1.json"
 *   # URL is http://localhost:8080/users/1.json
 * ```
 *  Scenario: Make a GET request and validate the response
  When I make a "GET" request to "https://jsonplaceholder.typicode.com/posts/1"
  Then the response status should be "200"
  And the response body should contain:
    | userId | 1 |
    | id     | 1 |
 * If you make a request prior to navigating to a page, Playwright assumes the base URL is the one provided during test setup.
 */

export async function When_I_make_a_request(
  method:
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"
    | "PATCH"
    | "HEAD"
    | "OPTIONS"
    | "TRACE"
    | "COPY"
    | "LOCK"
    | "MKCOL"
    | "MOVE"
    | "PURGE"
    | "PROPFIND"
    | "PROPPATCH"
    | "UNLOCK"
    | "REPORT"
    | "MKACTIVITY"
    | "CHECKOUT"
    | "MERGE"
    | "M-SEARCH"
    | "NOTIFY"
    | "SUBSCRIBE"
    | "UNSUBSCRIBE"
    | "SEARCH"
    | "CONNECT",
  url: string,
  options?: any
) {
  // Create a new APIRequestContext for making requests
  const apiRequestContext: APIRequestContext = await request.newContext();

  // Parse additional options (headers, body, params, etc.)
  const requestOptions = getOptions(options);

  // Make the request and store the result using `setApiResponse`
  const response: APIResponse = await apiRequestContext.fetch(url, {
    method,
    ...requestOptions,
  });

  // Store the response for later use
  setApiResponse(response);

  // Optionally, validate the response status (e.g., ensure it's not an error)
  if (response.status() >= 400) {
    throw new Error(
      `Request failed with status code ${response.status()}: ${response.statusText()}`
    );
  }
}

// Register Gherkin step definitions
When("I make a {string} request to {string}", When_I_make_a_request);
When("I make an {string} request to {string}", When_I_make_a_request);
