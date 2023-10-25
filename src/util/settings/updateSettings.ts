import { cmsSettings } from "./cmsSettingsTypes.types.js";
import { getSettings } from "./getSettings.js";
import { validateSettings } from "./validate.js";

/**
 * Updates old settings with new settings, validate, and return updated settings
 *
 * @data The new settings data.
 */
export function updateSettings(data: Record<string, any>): cmsSettings {
  // Step 1 & 2: Get the current settings and create a deep copy
  const currentSettings = getSettings();
  const updatedSettings = JSON.parse(JSON.stringify(currentSettings));

  // Step 3: Apply the changes to the copy of the current settings
  for (const collectionKey in updatedSettings.collections) {
    const collection = updatedSettings.collections[collectionKey];
    if (collection) {
      for (const fieldKey in collection.fields) {
        const field = collection.fields[fieldKey];
        if (field && data[field.name] !== undefined) {
          field.value = data[field.name];
        }
      }
    }
  }

  // Step 4: Validate the updated settings using your existing validation functions
  try {
    validateSettings(updatedSettings);
  } catch (error) {
    // Validation failed, throw the error further to be handled by the caller
    throw error;
  }

  // return valid updated settings
  return updatedSettings as cmsSettings;
}
