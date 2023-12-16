import type { cmsSettings } from "./cmsSettingsTypes.types";
import { validateSettings, assert } from "./validateCollections";

/**
 * Reads and validates the settings data from the JSON file on Github
 * @returns The validated settings data.
 * @throws Will throw an error if the settings data is invalid.
 */
export async function getCollections() {
  // TODO: build from config settings (username, repo name, etc)
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
  const content = Buffer.from(fileData.content, "base64").toString("utf8");
  const data = JSON.parse(content) as cmsSettings;

  assert(validateSettings(data), "Invalid settings data");

  return data;
}
