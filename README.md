# @paschalQA/Playwright-cucumber-ts-library 🎉

<table align="center" style="margin-bottom:30px;"><tr><td align="center" width="9999" heigth="9999">
 <img src="https://indicina.decide.indicina.co/_next/image?url=%2Ficons%2Flogo.png&w=384&q=75" alt="Decide Logo" style="margin-top:25px;" align="center"/>

#

Decide's UI test automation project using Cypress Cucumber and TypeScript.

</td></tr></table>

[![Cypress](https://img.shields.io/badge/built%20with-Cypress-15B392)](https://www.cypress.io/)
[![Cucumber](https://img.shields.io/badge/built%20with-Cucumber-B6FFA1)](https://www.npmjs.com/package/@badeball/cypress-cucumber-preprocessor/)
[![TypeScript](https://img.shields.io/badge/built%20with-TypeScript-blue)](https://www.typescriptlang.org/)
[![Linting with ESLint](https://img.shields.io/badge/linting-ESLint-blueviolet)](https://eslint.org/)
[![Formatting with Prettier](https://img.shields.io/badge/formatting-Prettier-ff69b4)](https://prettier.io/)
[![Slack Reporter](https://img.shields.io/badge/reporting-cypress--slack--reporter-green)](https://www.npmjs.com/package/cypress-slack-reporter)
[![HTML Reporter](https://img.shields.io/badge/reporting-cypress--mochawesome--reporter-green)](https://www.npmjs.com/package/cypress-mochawesome-reporter)

## Getting Started 🚀

This **README** covers both API and UI tests using the **cypress-cucumber-steps** library and Cypress Cucumber with TypeScript and includes dynamic API requests, handling captured values like authorization tokens and `href` links, integration with UI tests, and reporting to Slack via `cypress-slack-reporter`.

---

## Documentation

### **Cypress**

Cypress is a fast, reliable, and flexible JavaScript-based end-to-end testing framework built for modern web applications. It simplifies testing by providing a developer-friendly API to interact with web applications, handle network requests, and capture various testing aspects such as UI components and API responses.

- **Key Features**:

  - Runs in the same environment as the application (browser)
  - Automatically waits for actions (no need for explicit waits)
  - Handles AJAX, timers, and DOM events without extra configurations
  - Provides debugging capabilities through detailed error messages, stack traces, and snapshots
  - Parallel test execution and CI/CD integration

- **Cypress Configuration**:
  You can configure Cypress using the `cypress.config.ts` file for settings such as timeouts, base URLs, and environment variables.

  Learn more at [Cypress Documentation](https://docs.cypress.io).

### **Cucumber**

Cucumber is a Behavior-Driven Development (BDD) tool that allows you to write human-readable test scenarios in Gherkin syntax. It emphasizes collaboration between developers, testers, and non-technical stakeholders. Cucumber tests are written in plain English using the Given-When-Then structure, which makes it easy for everyone to understand the requirements.

- **Key Concepts**:

  - **Feature Files**: Where tests are written in Gherkin.
  - **Step Definitions**: Code that executes steps described in feature files.
  - **Tags**: Categorize tests to control execution.

  Learn more at [Cucumber Documentation](https://cucumber.io/docs/guides/10-minute-tutorial/).

### **Cypress-Slack-Reporter**

`cypress-slack-reporter` enables automated reporting of Cypress test results directly to Slack. This helps teams stay updated on the testing status and receive notifications for failed test cases.

Learn more at [cypress-slack-reporter Documentation](https://www.npmjs.com/package/cypress-slack-reporter).

---

## Features and Dependencies

- **API Testing**: Supports all HTTP request methods (GET, POST, PUT, DELETE, etc.) with dynamic data, headers, and parameters.
- **UI Testing**: Allows testing of UI elements with Gherkin syntax and Cucumber steps.
- **Authorization Handling**: Captures and reuses authorization tokens from API responses in subsequent requests.
- **Dynamic Alias Handling**: Captures and replaces alias values (e.g., `href` links) in request bodies and supports visiting URLs stored from API responses.
- **Cucumber BDD Support**: Write both API and UI tests in Gherkin syntax, integrated with TypeScript step definitions.
- **HTML Reporting**: Generates HTML testing results using `cypress-mochawesome-reporter` for proper monitoring and quick issue resolution.
- **Slack Reporting**: Notifies UI testing results in `Decide` Slack channel(s) for continuous monitoring and quick issue resolution.

---

### **Cypress-Cucumber-Steps**

`cypress-cucumber-steps` is a library that simplifies the integration of Cucumber with Cypress by providing predefined step definitions for common actions like clicking, typing, and navigating. This allows you to avoid duplicating steps and helps speed up test writing by reusing existing steps.

- **Key Features**:

  - Provides a predefined library of step definitions for UI and API actions.
  - Reduces boilerplate code when writing Gherkin scenarios.
  - Allows for easy customization and extension of existing steps.

- **Usage Example**:

  ```gherkin
  Scenario: Login to the application
    Given I visit "login"
    When I type into the "username" field "user@example.com"
    And I type into the "password" field "password123"
    Then I click the "login" button
    And I should see the "dashboard" page
  ```

  For more information, visit the [Cypress Cucumber Steps documentation](https://www.npmjs.com/package/cypress-cucumber-steps).
  For test documentation, visit the [test documentation](https://remarkablemark.org/cypress-cucumber-steps)

---

# Cypress Cucumber TypeScript API & UI Testing

This project is a testing framework built with Cypress, TypeScript, and the **cypress-cucumber-steps** library for writing BDD-style tests with Cucumber. It supports both **API** and **UI** testing, allowing for dynamic handling of authorization tokens, capturing URLs (`href`), and visiting them in UI tests.

## Features

- **API Testing**: Supports all HTTP request methods (GET, POST, PUT, DELETE, etc.) with dynamic data, headers, and parameters.
- **UI Testing**: Allows testing of UI elements with Gherkin syntax and Cucumber steps.
- **Authorization Handling**: Captures and reuses authorization tokens from API responses in subsequent requests.
- **Dynamic Alias Handling**: Captures and replaces alias values (e.g., `href` links) in request bodies and supports visiting URLs stored from API responses.
- **Cucumber BDD Support**: Write both API and UI tests in Gherkin syntax, integrated with TypeScript step definitions.
- **Custom Commands**: Add custom Cypress commands for UI interactions (e.g., filling forms, clicking buttons).

---

## Installation

1. Clone the repository and navigate to the project directory.

   ```bash
   git clone https://gitlab.com/indicina1/decide/decide.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Go to project directory:

   ```bash
   cd apps/qa
   ```

4. Configure environment variables in a `.env` file from `.env.example` for sensitive values:

   ```env
   NODE_ENV=development
   SLACK_WEBHOOK_URL=https://hooks.slack.com/services/------
   CYPRESS_BASE_URL='https://staging-decide.indicina.net/'
   CYPRESS_TEST_TAGS='@regression'
   ```

---

## Folder Structure

```bash
|-- @paschalQA/Playwright-cucumber-ts-library/
  |-- playwrite-test-examples/
    |-- features/
        |-- example-test.feature
    |-- step_definitions/
        |-- index.ts
  |-- src/
    |-- actions/
    |-- assertions/
    |-- constants/
    |-- queries/
    |-- utils/
  |-- .gitignore
  |-- cucumber.json
  |-- package.json
  |-- README.md
```

---

## Usage

### API Testing

You can make API requests dynamically, capture tokens, visit captured URLs, and validate responses using the steps and commands provided.

#### Example Gherkin Syntax for API Testing

```gherkin
Feature: API Testing with Dynamic Authorization
@regression @e2e @sanity
  Scenario: Make API requests and capture values
    When I make a POST request to "/api/login" with body
      | username | user1    |
      | password | pass123  |
    Then the response status should be 200
    When I capture "token" from the response and store it as "authToken"
    When I make a GET request to "/api/user" with params
      | userId  | 1        |
    Then the response status should be 200
    When I capture href from response field "links", nested field "profile", and store it as "profileLink"
    When I visit the stored href "profileLink"
```

### UI Testing

For UI testing, Optionally, you can use the same framework with Gherkin syntax, interacting with elements on the page. The `selectors.json` file stores selectors used in the UI tests.

#### Example Gherkin Syntax for UI Testing

```gherkin
Feature: Customer details page TE-1764
  i want to navigate customer details page

@regression @e2e @sanity
  Scenario: Filter By Custom Data Type
    When I click on text "Source"
      | force | true |
    When I get element by selector "#react-select-4-option-0"
    And I click
    And I store element text as "Custom"
    When I get element by selector "tbody"
    Then I see text "Reset"
    Then I see text "No records found"
```

### Tags

The following tags are used to categorize the tests based on environment and purpose:

1. **sanity**: Focuses on minimal, essential tests on the **production** environment. Typically runs sanity checks to ensure core functionality is intact.

2. **e2e**: Represents **end-to-end** tests that ensure full flows work correctly in the **staging** environment. These tests simulate real-world scenarios from start to finish.

3. **regression**: Runs a comprehensive set of **regression tests** in the **sandbox** environment. These tests validate that existing features have not been affected by recent changes.

---

## Step Definitions

### API Step Definitions

The API step definitions are located in `cypress/e2e/step_definitions/index.ts`. These include dynamic API request handling and token management.

#### Example Step Definition

```ts
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import {
  When_I_make_a_request,
  validateResponseStatus,
} from "cypress-cucumber-steps";

// API request with authorization token handling
When("I make a {string} request to {string} with body", When_I_make_a_request);
Then("the response status should be {int}", validateResponseStatus);
```

### UI Step Definitions

The UI step definitions are located in `cypress/e2e/step_definitions/index.ts`, and map to the Gherkin scenarios for UI interactions. the cypress-cucumber-steps library handles this

#### Example Step Definition

```ts
import { Given, When, Then } from "cypress-cucumber-steps";

// Visit page
When("I visit {string}", When_I_visit_URL);

// Finding an input element by name
When("I find input by name {string}", When_I_find_input_by_name);

// Type into input field
When("I type {string}", When_I_type);

// Click element
When("I click", When_I_click);

// Validate page content
Then("I see text {string}", Then_I_see_text);
```

---

## Running Tests

### Open Cypress Test Runner

```bash
npm run cypress:open
```

This will open the interactive test runner, where you can choose API or UI test files to run.

### Headless Test Execution

To run tests locally in headless mode, use the following command:

```bash
npm run cy:run
```

### Post Test Report (slack&html)

To run Report tests locally in Slack, use the following command:

```bash
npm run posttest
```

---

## Example Test Scenarios

### API Test Scenario

```gherkin
Feature: API Authentication and Data Retrieval

  Scenario: User login and data fetch with dynamic token handling
    When I make a POST request to "/api/auth/login" with body
      | username | user123 |
      | password | pass456 |
    Then the response status should be 200
    When I capture "token" from the response and store it as "authToken"
    When I make a GET request to "/api/data" with params
      | userId  | 123 |
    Then the response status should be 200
```

### UI Test Scenario

```gherkin
Feature: Customer page TE-1763
  i want to navigate customer page, search List page, details page, paginations and run new analysis

  Background:
    Given I login with valid email
    When I visit "/"
    When I click on link "Customers"
    Then I see text "Customer ID"

  @regression @e2e @sanity
  Scenario: Create New Customer with only required fields (Basic Flow)
    When I click on button "New Customer"
    And I find input by name "name"
    And I type random "Full Name"
    And I find input by name "email"
    And I type random "Email"
    And I wait 1 second
    And I click on button "Save"
    Then I see text "Customers created successfully"

```

---

## Contributing

Feel free to open issues or pull requests if you encounter bugs or have suggestions for new features or improvements.

---

## License

This project is licensed under the MIT License.
