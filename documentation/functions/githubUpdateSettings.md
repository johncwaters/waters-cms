## Function Documentation: `githubUpdateSettings`

### Description:

Updates the settings data in the `waters-cms-settings.json` file on the GitHub repository.

### Function Signature:

```typescript
async function githubUpdateSettings(newSettings: cmsSettings): Promise<void>;
```

### Parameters:

- `newSettings` (_type: `cmsSettings`_):  
  The new settings data to update. The data type `cmsSettings` is an object where keys are strings and values can be of any type.

  **Example:**

  ```typescript
  {
    "settingKey1": "value1",
    "settingKey2": 123
  }
  ```

### Returns:

- `Promise<void>`:  
  A promise which resolves to `void` once the update is successful. If the update fails, it will throw an error.

### Functionality:

1. **Fetching current file content and SHA**:

   - Fetches the current content and SHA of `waters-cms-settings.json` from the GitHub repository `johncwaters/waters-cms-test`.
   - Uses the GitHub access token from the environment variable `SECRET_GITHUB_ACCESS_TOKEN` for authorization.

2. **Updating the file on GitHub**:

   - Sends a PUT request to GitHub to update the file with the new settings data. This data is converted to a Base64-encoded string after stringifying it to JSON format.
   - Uses the previously fetched SHA for the file to ensure the update is atomic.

3. **Error Handling**:
   - If any step in the process fails (fetching or updating), the function throws an error. A detailed error message is provided if the update request to GitHub is not successful.

### Known TODOs:

1. Update to use settings repo and username dynamically instead of the hardcoded value `johncwaters/waters-cms-test`.

### Important Notes:

- This function directly interacts with the GitHub API to fetch and update a file's content. Ensure you handle rate limits and potential API changes when using this in production.
- The function uses the GitHub access token from an environment variable. Ensure the token has the necessary permissions to read and update content in the repository. Keep the token secret and never expose it in client-side code.

- Always handle potential errors gracefully when using this function. Check for thrown errors and inform the user or take appropriate recovery actions.

### Further considerations:

- Introduce retry logic in case of transient errors when interacting with the GitHub API.
- Consider enhancing the error handling to provide more granular feedback based on specific GitHub API error responses.
