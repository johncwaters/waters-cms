import type { APIRoute } from "astro";
import { updateCollections } from "../../util/settings/updateCollections";
import { validateSettings } from "../../util/settings/validateCollections.js";
import { githubUpdateSettings } from "../../util/github/githubUpdateSettings";

interface UpdatePayload {
  formLabel: string;
  data: {
    [key: string]: string;
  };
}

// API Route to update waters-cms-collections.json
export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    try {
      // Parse the incoming data
      const body = (await request.json()) as UpdatePayload;

      // Validate the incoming data
      const result = await updateCollections(body);

      // Step 4: Validate the updated settings using your existing validation functions
      validateSettings(result);

      // Save updated settings on GitHub
      githubUpdateSettings(result);

      return new Response(JSON.stringify(result), {
        status: 200,
      });
    } catch (error) {
      // TODO: Pass back JSON validation error
      console.error(
        "🚀 ~ file: form.ts:31 ~ constPOST:APIRoute= ~ error:",
        error
      );

      return new Response(JSON.stringify({ message: "Invalid JSON" }), {
        status: 400,
      });
    }
  }
  return new Response(
    JSON.stringify({ message: "Content-Type must be application/json" }),
    { status: 400 }
  );
};
