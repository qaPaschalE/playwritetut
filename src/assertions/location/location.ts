import { DataTable, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { getOptions } from "../../utils";

/**
 * Then I see location:
 *
 * ```gherkin
 * Then I see location
 *   | hash | {string} |
 *   | host | {string} |
 *   | hostname | {string} |
 *   | href | {string} |
 *   | origin | {string} |
 *   | pathname | {string} |
 *   | port | {string} |
 *   | protocol | {string} |
 *   | search | {string} |
 * ```
 *
 * @example
 *
 * Make assertions about every location property:
 *
 * ```gherkin
 * Then I see location
 *   | hash | #hash |
 *   | host | localhost:8081 |
 *   | hostname | localhost |
 *   | href | http://localhost:8081/commands/querying?key=value#hash |
 *   | origin | http://localhost:8081 |
 *   | pathname | /commands/querying |
 *   | port | 8081 |
 *   | protocol | http: |
 *   | search | ?key=value |
 * ```
 *
 * Check location for query params and pathname:
 *
 * ```gherkin
 * Then I see location
 *   | search | ?key=value |
 *   | pathname | /commands/querying |
 * ```
 */
Then("I see location", async function (location: DataTable) {
  const loc = getOptions(location);

  // Ensure loc is defined before proceeding
  if (loc) {
    // Get the current URL of the page
    const url = new URL(await this.page.url()); // Assuming `this.page` is the Playwright page

    // Perform assertions based on the location data
    if (loc.hash) {
      expect(url.hash).toBe(loc.hash);
    }
    if (loc.host) {
      expect(url.host).toBe(loc.host);
    }
    if (loc.hostname) {
      expect(url.hostname).toBe(loc.hostname);
    }
    if (loc.href) {
      expect(url.href).toBe(loc.href);
    }
    if (loc.origin) {
      expect(url.origin).toBe(loc.origin);
    }
    if (loc.pathname) {
      expect(url.pathname).toBe(loc.pathname);
    }
    if (loc.port) {
      expect(url.port).toBe(loc.port);
    }
    if (loc.protocol) {
      expect(url.protocol).toBe(loc.protocol);
    }
    if (loc.search) {
      expect(url.search).toBe(loc.search);
    }
  } else {
    throw new Error("Location options are undefined or invalid.");
  }
});
