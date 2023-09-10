import { getSettings, validateSettings } from "./importSettings.js"; // Adjust the path as necessary

export function validateNewSettings(data: Record<string, any>): string {
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

  // Step 5: If validation succeeds, apply the changes to the actual data
  // Here, save the updatedSettings back to your data store (e.g., a JSON file)
  //   fs.writeFileSync(
  //     "./waters-cms-settings.json",
  //     JSON.stringify(updatedSettings, null, 2)
  //   );

  // If everything went well, you can return a success message
  return "Settings updated successfully";
}
