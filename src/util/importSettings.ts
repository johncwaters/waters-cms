import fs from "fs";
import type {
  cmsSettings,
  collection,
  field,
} from "./cmsSettingsTypes.types.ts";

/**
 * Asserts the given condition and throws an error with the given message if the condition is falsy.
 *
 * @param condition - The condition to assert.
 * @param errorMsg - The error message to throw if the condition is falsy.
 */
function assert(condition: any, errorMsg: string): asserts condition {
  if (!condition) {
    throw new Error(errorMsg);
  }
}

/**
 * Validates the structure of the settings data against the cmsSettings interface.
 * TODO: Move validation to seperate file since it is used in multiple places
 *
 * @param settings - The settings data to validate.
 * @returns True if the settings data is valid, otherwise throws an error.
 */
export function validateSettings(settings: any): settings is cmsSettings {
  assert(settings, "Settings data is undefined or null");
  assert(
    typeof settings.websiteName === "string",
    "websiteName must be a string"
  );
  assert(
    settings.collections && typeof settings.collections === "object",
    "collections must be an object"
  );

  for (const key in settings.collections) {
    assert(
      validateCollection(settings.collections[key]),
      `Invalid collection data at collections.${key}`
    );
  }

  return true;
}

/**
 * Validates the structure of a collection against the collection interface.
 *
 * @param collection - The collection to validate.
 * @returns True if the collection is valid, otherwise throws an error.
 */
function validateCollection(collection: any): collection is collection {
  assert(collection, "Collection data is undefined or null");
  assert(
    typeof collection.name === "string",
    "Collection name must be a string"
  );
  assert(
    typeof collection.label === "string",
    "Collection label must be a string"
  );
  assert(
    collection.fields && typeof collection.fields === "object",
    "Collection fields must be an object"
  );

  for (const key in collection.fields) {
    assert(
      validateField(collection.fields[key]),
      `Invalid field data at fields.${key}`
    );
  }

  return true;
}

/**
 * Validates the structure of a field against the field interface.
 *
 * @param field - The field to validate.
 * @returns True if the field is valid, otherwise throws an error.
 */
function validateField(field: any): field is field {
  assert(field, "Field data is undefined or null");
  assert(typeof field.name === "string", "Field name must be a string");
  assert(typeof field.label === "string", "Field label must be a string");
  assert(
    ["string", "boolean", "select"].includes(field.type),
    'Field type must be one of "string", "boolean", or "select"'
  );
  assert(
    typeof field.required === "boolean",
    "Field required must be a boolean"
  );

  if (field.type === "select") {
    assert(
      field.options &&
        Array.isArray(field.options) &&
        field.options.every((option: any) => typeof option === "string"),
      "Field options must be an array of strings"
    );
  }

  if (field.type === "boolean" && field.booleanValue !== undefined) {
    assert(
      typeof field.booleanValue === "boolean",
      "Field booleanValue must be a boolean"
    );
  }

  return true;
}
/**
 * Reads and validates the settings data from the JSON file.
 *
 * @returns The validated settings data.
 * @throws Will throw an error if the settings data is invalid.
 */
export function getSettings(): cmsSettings {
  const data = fs.readFileSync("./waters-cms-settings.json", "utf-8");
  const parsedData = JSON.parse(data);

  assert(validateSettings(parsedData), "Invalid settings data");

  return parsedData as cmsSettings;
}
