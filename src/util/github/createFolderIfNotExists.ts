/**
 * Creates a waters-cms folder in the GitHub repository if it doesn't already exist to store content.
 *
 * @throws Will throw an error if the folder creation fails.
 */
export async function createFolderIfNotExists(): Promise<void> {
  try {
    // Step 1: Check if the folder already exists
    const checkFolder = await fetch(
      // TODO: Update to use settings repo and username
      `https://api.github.com/repos/johncwaters/waters-cms-test/contents/waters-cms`,
      {
        headers: {
          Authorization: `token ${import.meta.env.SECRET_GITHUB_ACCESS_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (checkFolder.status !== 404) {
      console.log("The folder already exists");
      return;
    }

    // Step 2: Create a new file in the 'waters-cms' folder to create the folder
    const createFolder = await fetch(
      // TODO: Update to use settings repo and username
      `https://api.github.com/repos/johncwaters/waters-cms-test/contents/waters-cms/.gitkeep`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${import.meta.env.SECRET_GITHUB_ACCESS_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify({
          message: "Waters-CMS: Create waters-cms folder",
          content: Buffer.from("").toString("base64"),
        }),
      }
    );

    const response = await createFolder.json();
    if (createFolder.status !== 201) {
      throw new Error(`Failed to create folder: ${response.message}`);
    }
  } catch (error) {
    console.error("Failed to create folder", error);
    throw error;
  }
}
