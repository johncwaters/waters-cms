import { cmsSettings, collection } from "./cmsSettingsTypes.types.js";
import { getCollections } from "./getCollections.js";

interface UpdatePayload {
  formLabel: string; // This will now refer to the label, e.g., "Social Media"
  data: {
    [key: string]: string;
  };
}

/**
 * Updates old settings with new settings, validate, and return updated settings
 *
 * @param data The new settings data.
 */
export async function updateCollections(
  formData: UpdatePayload
): Promise<cmsSettings> {
  const currentSettings = await getCollections();

  let collectionToUpdate: collection | undefined; // Adjusted the type

  // Locate the collection by its label
  for (const collectionKey in currentSettings.collections) {
    const currentCollection = currentSettings.collections[collectionKey];

    if (currentCollection && currentCollection.label === formData.formLabel) {
      collectionToUpdate = currentCollection;
      break;
    }
  }

  // Check if collectionToUpdate is defined before accessing its properties
  if (collectionToUpdate) {
    for (const fieldKey in formData.data) {
      const normalizedFieldKey = fieldKey.toLowerCase();
      const field = collectionToUpdate.fields[normalizedFieldKey];
      if (field) {
        field.value = formData.data[fieldKey];
      }
    }
  }

  return currentSettings as cmsSettings;
}
