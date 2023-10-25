import type { cmsSettings } from "./cmsSettingsTypes.types";
import { validateSettings, assert } from "./validate";

let cache: cmsSettings | null = null;
let lastFetchTimestamp: number = 0;
const CACHE_TTL = 1000 * 60 * 5; // Cache for 5 minutes

/**
 * Reads and validates the settings data from the JSON file on Github or cache if recent.
 *
 * @returns The validated settings data.
 * @throws Will throw an error if the settings data is invalid.
 */
export async function getSettings() {
  const currentTimestamp = Date.now();

  // Check if we have cached data and it's still valid
  // TODO: Does is this cache per browser or is it shared? Can't be shared.
  if (cache && currentTimestamp - lastFetchTimestamp < CACHE_TTL) {
    console.log("🚀 ~ file: importSettings.ts:131 ~ getSettings ~ cache");

    return cache;
  }

  console.log("🚀 ~ file: importSettings.ts:131 ~ getSettings ~ no cache");
  // Step 1: Fetch the current file content and SHA
  // TODO: build from config settings (username, repo name, etc)
  const getFileResponse = await fetch(
    `https://api.github.com/repos/johncwaters/waters-cms-test/contents/waters-cms-settings.json`,
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

  // Update the cache with the new data
  cache = data;
  lastFetchTimestamp = currentTimestamp;

  return data;
}
