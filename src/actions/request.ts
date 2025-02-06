import { APIRequestContext, request, expect } from "@playwright/test";
import { When } from "@cucumber/cucumber";

/**
 * Makes an HTTP request using Playwright's APIRequestContext.
 *
 * @param method - The HTTP method to use (e.g., GET, POST, PUT, DELETE).
 * @param url - The endpoint URL for the request.
 * @param options - Additional options for the request, including headers, body, and query parameters.
 * @param options.headers - Optional headers to include in the request.
 * @param options.body - Optional body data for POST/PUT requests.
 * @param options.params - Optional query parameters for GET requests.
 * @param options.apiKeyAlias - Optional environment variable name containing an API key.
 * @param apiRequestContext - An optional APIRequestContext to reuse across tests.
 * @returns The response object from the request.
 *
 * @example
 * ```typescript
 * const response = await makeRequest('GET', 'https://example.com/api', {
 *   params: { key: 'value' },
 * });
 * expect(response.status()).toBe(200);
 * ```
 */
async function makeRequest(
  method: string,
  url: string,
  options: {
    headers?: Record<string, string>;
    body?: any;
    params?: Record<string, string>;
    apiKeyAlias?: string;
  },
  apiRequestContext?: APIRequestContext
) {
  const context = apiRequestContext ?? (await request.newContext());

  // Prepare request options
  const requestOptions: Record<string, any> = {
    method,
    url,
  };

  if (options.headers) {
    requestOptions.headers = options.headers;
  }

  if (options.apiKeyAlias) {
    const apiKey = process.env[options.apiKeyAlias];
    if (apiKey) {
      requestOptions.headers = {
        ...requestOptions.headers,
        "X-Api-Key": apiKey,
      };
    }
  }

  if (method.toUpperCase() === "GET" && options.params) {
    const queryParams = new URLSearchParams(options.params).toString();
    requestOptions.url = `${url}?${queryParams}`;
  }

  if (method.toUpperCase() !== "GET" && options.body) {
    requestOptions.data = options.body;
  }

  const response = await context.fetch(requestOptions.url, {
    method: requestOptions.method,
    headers: requestOptions.headers,
    data: requestOptions.data,
  });

  expect(response.status()).toBeLessThan(400);
  return response;
}

/**
 * Gherkin Step Definition: Makes an HTTP request with the given method, URL, and body data.
 *
 * @example
 * Given I make a "POST" request to "https://example.com/api" with body
 *   | key   | value     |
 *   | name  | Playwright|
 */
When(
  "I make a {string} request to {string} with body",
  async function (method: string, url: string, dataTable: any) {
    const requestBody = dataTable.rowsHash(); // Convert Gherkin DataTable to object
    const response = await makeRequest(method, url, { body: requestBody });

    // Store the response for future steps
    this.response = response;
  }
);

export { makeRequest };
