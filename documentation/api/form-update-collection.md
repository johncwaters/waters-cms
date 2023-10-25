## API Documentation: Update CMS Collections Endpoint

### Endpoint

`POST /api/form-update-collection`

### Description

This API endpoint allows the user to update the collections in the Waters CMS. The actual update logic is not specified in the provided code snippet, but this route serves as a placeholder for updating collections and triggering a cache reset.

### Request Headers

- **Content-Type**: Should be set to `application/json`. Any other content type will result in a `400 Bad Request` with a message indicating the required content type.

### Request Body

JSON object that represents the new collection data. The exact structure and valid fields of the JSON object are not specified in the provided code snippet.

**Example:**

```json
{
  "collectionName": "New Collection",
  "items": ["item1", "item2", "item3"]
}
```

### Responses

#### Success Response

- **Status Code**: `200 OK`
- **Body**: No content returned.

#### Error Response

Invalid Content-Type Header:

- **Status Code**: `400 Bad Request`
- **Body**:
  ```json
  {
    "message": "Content-Type must be application/json"
  }
  ```

### Important Notes

- Ensure that the request's `Content-Type` header is set to `application/json`. Any other content type will result in an error.
- Currently, the incoming request body is logged to the console but not utilized further.

### Known TODOs (based on the provided code)

1. Implement logic to update the correct GitHub file with the new JSON content representing the updated collection.
2. Implement triggering the cache to reset after updating the collection.
