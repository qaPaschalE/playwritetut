/**
 * @private
 */
export enum Element {
  input = "input",
  textarea = "textarea",
}

/**
 * @private
 *
 * These pseudo-selectors can be used in combination with Playwright locators.
 */
export enum PseudoSelector {
  hidden = ":hidden", // Matches hidden elements
  visible = ":visible", // Matches visible elements
  none = "", // No pseudo-class
}
