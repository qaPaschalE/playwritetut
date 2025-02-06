import { DataTable } from "@cucumber/cucumber";

/**
 * Transforms a DataTable to options.
 *
 * @param table - Cucumber DataTable.
 * @returns - Options as a record of key-value pairs.
 */
export function getOptions(table?: DataTable) {
  if (!table) {
    return;
  }

  // Convert the table to a key-value hash and parse values where possible
  return Object.entries(table.rowsHash()).reduce(
    (result, [key, value]) => {
      try {
        result[key] = JSON.parse(value); // Parse JSON if applicable
      } catch (error) {
        result[key] = value; // Use raw value if parsing fails
      }
      return result;
    },
    {} as Record<string, string | number | boolean> // Type definition
  );
}
