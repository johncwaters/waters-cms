import type { APIRoute } from "astro";
import { getSettings } from "../../util/importSettings";
import { validateNewSettings } from "../../util/validateNewSettings";

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    try {
      // Load the current settings
      const settings = getSettings();

      // Parse the incoming data
      const body = (await request.json()) as Record<string, any>;

      // Validate the incoming data
      const result = validateNewSettings(body);

      // DEBUG: Return the response object as JSON
      // TODO: Change to update Github file and post a new version of the site
      return new Response(JSON.stringify(result), {
        status: 200,
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: form.ts:31 ~ constPOST:APIRoute= ~ error:",
        error
      );
      // Handle JSON parsing errors
      // TODO: Pass back JSON validation error
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
