## API Documentation: Update Settings Endpoint

### Endpoint

`POST /api/form-update-settings`

### Description

This API endpoint allows the user to update the settings in `waters-cms-settings.json`. The updated settings are also saved to GitHub.

### Request Headers

- **Content-Type**: Should be set to `application/json`. Any other content type will result in a `400 Bad Request` with a message indicating the required content type.

### Request Body

JSON object with settings to be updated. The structure and valid fields of the JSON object are not specified in the provided code snippet. Ensure that the request body conforms to the validation requirements imposed by the `updateSettings` function.

**Example:**

```json
{
  "setting1": "value1",
  "setting2": "value2"
}
```

### Responses

#### Success Response

- **Status Code**: `200 OK`
- **Body**: A JSON object that reflects the updated settings. The exact structure is determined by the `updateSettings` function.

**Example:**

```json
{
  "setting1": "new_value1",
  "setting2": "new_value2"
}
```

#### Error Responses

1. Invalid JSON

   - **Status Code**: `400 Bad Request`
   - **Body**:
     ```json
     {
       "message": "Invalid JSON"
     }
     ```

2. Invalid Content-Type Header
   - **Status Code**: `400 Bad Request`
   - **Body**:
     ```json
     {
       "message": "Content-Type must be application/json"
     }
     ```

### Important Notes

- Ensure that the request's `Content-Type` header is set to `application/json`. Any other content type will result in an error.
- Any JSON parsing errors, or any validation issues identified by the `updateSettings` function, will result in a `400 Bad Request` with an "Invalid JSON" message. Ensure that the request body contains valid JSON data that adheres to the expected format.
- The updated settings are also saved to GitHub using the `githubUpdateSettings` function.
