type cmsSettings = {
  // Define the structure of your settings data here
  [key: string]: any;
};

/**
 * Updates and validates the settings data in the JSON file on Github.
 *
 * @param newSettings The new settings data to update.
 * @throws Will throw an error if the update fails.
 */
export async function githubUpdateSettings(
  newSettings: cmsSettings
): Promise<void> {
  // TODO: Update to use settings repo and username
  try {
    // Step 1: Fetch the current file content and SHA
    const getFileResponse = await fetch(
      `https://api.github.com/repos/johncwaters/waters-cms-test/contents/waters-cms-collections.json`,
      {
        headers: {
          Authorization: `token ${import.meta.env.SECRET_GITHUB_ACCESS_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    const fileData = await getFileResponse.json();
    const fileSha = fileData.sha;

    // Step 2: Update the file with new JSON data
    const updateFileResponse = await fetch(
      // TODO: Update to use settings repo and username
      `https://api.github.com/repos/johncwaters/waters-cms-test/contents/waters-cms-collections.json`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${import.meta.env.SECRET_GITHUB_ACCESS_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify({
          message: "Update settings",
          content: Buffer.from(JSON.stringify(newSettings, null, 2)).toString(
            "base64"
          ),
          sha: fileSha,
        }),
      }
    );

    const updateData = await updateFileResponse.json();
    if (updateFileResponse.status !== 200) {
      throw new Error(`Failed to update settings: ${updateData.message}`);
    }

    console.log("Settings updated successfully", updateData);
  } catch (error) {
    console.error("Failed to update settings", error);
    throw error;
  }
}
