## Function Documentation: `createFolderIfNotExists`

### Description:

The function `createFolderIfNotExists` creates a folder named `waters-cms` in the GitHub repository if it doesn't already exist. This is typically for storing content. The folder is created by adding a `.gitkeep` file inside it. (Since Git does not track empty folders, the `.gitkeep` file is a convention used to force Git to track the folder.)

### Function Signature:

```typescript
async function createFolderIfNotExists(): Promise<void>;
```

### Parameters:

None.

### Returns:

- `Promise<void>`:  
  A promise which resolves to `void` once the folder is checked or created. If the folder creation or check fails, it will throw an error.

### Functionality:

1. **Check if the folder already exists**:

   - Makes a request to GitHub to check if the `waters-cms` folder exists in the repository `johncwaters/waters-cms-test`.
   - Uses the GitHub access token from the environment variable `SECRET_GITHUB_ACCESS_TOKEN` for authorization.
   - If the folder exists, the function logs a message and returns.

2. **Create the folder**:

   - If the folder does not exist, it sends a PUT request to GitHub to create a `.gitkeep` file inside the `waters-cms` folder. This effectively creates the folder.
   - Again, uses the GitHub access token from the environment variable for authorization.

3. **Error Handling**:
   - If any step in the process fails (checking or creating), the function throws an error. A detailed error message is provided if the creation request to GitHub is not successful.

### Known TODOs:

1. Update to use settings repo and username dynamically instead of the hardcoded value `johncwaters/waters-cms-test`.

### Important Notes:

- The function interacts directly with the GitHub API to check for and create a folder. Ensure you handle rate limits and potential API changes when using this in production.
- The function uses the GitHub access token from an environment variable. Ensure the token has the necessary permissions to read and create content in the repository. Keep the token secret and never expose it in client-side code.

- The function checks for folder existence based on the HTTP status `404`. Any status other than `404` is considered as the folder exists. However, other non-`404` statuses could be indicative of different issues and might need special handling.

### Further considerations:

- Consider enhancing the error handling to provide more granular feedback based on specific GitHub API error responses.
- It might be useful to introduce retry logic, especially for transient errors or rate limit-related issues when interacting with the GitHub API.
