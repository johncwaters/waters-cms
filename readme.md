# Waters CMS

Waters CMS is a customizable content management system that allows website owners to easily manage and update their website content through a user-friendly admin interface. The CMS is built with Astro and TypeScript.

**Note:** This project is designed for my own use but can be added to any Astro project as an integration. It is not meant to be a full CMS replacement and is designed with simplicity in mind.

## Install

No NPM package is available yet.

**Requires** `output: "hybrid"` or `output: "server"` as it injects Astro API routes.

```js ins={3}
// astro.config.mjs
import { defineConfig } from "astro/config";
import waterscms from "waters-cms";

export default defineConfig({
  // ...
  integrations: [waterscms()],
});
```

## Configuration

Configure your CMS by updating the waters-cms-collections.json file with your website settings. The JSON file should adhere to the structure defined in the cmsSettingsTypes.types.ts file.

Here is an example structure:

```json
{
  "websiteName": "My Website",
  "collections": {
    "contactInfo": {
      "name": "Contact Info",
      "label": "Contact Info",
      "fields": {
        "phoneNumber": {
          "name": "Phone Number",
          "label": "Phone Number",
          "type": "string",
          "required": true
        }
      }
    }
  }
}
```

## Set-up Authentication

Authentication currently only works through Google Oauth2. Provide your client_id and client_secret in your websites .env file.

Also set-up a Github fine-grained personal access token with Content Read/Write permission for the target repo.

```
SECRET_GITHUB_ACCESS_TOKEN = "somethng"

SECRET_GOOGLE_CLIENT_ID = "my-client-id"
SECRET_GOOGLE_CLIENT_SECRET = "my-client-secret"
```

Waters-CMS does not track users or sessions in a database, instead only allowing a few whitelisted users access to the page. Provide a comma delimited list of users to provide access in your .env file.

```
WATERS_CMS_USERS = "myemail@gmail.com, clientemail@gmail.com, 2ndclient@gmail.com"
```

## How It Works

When installed as an Astro integration the package injects a Dashboard to `.com/admin` that the website owner can visit to adjust available settings.

The developer then sets up and uses these 'settings' throughout the application.

This allows website owners to make their own changes quickly without using developer time.
