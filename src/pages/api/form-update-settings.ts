import type { APIRoute } from "astro";
import { updateSettings } from "../../util/settings/updateSettings";
import { githubUpdateSettings } from "../../util/github/githubUpdateSettings";

// API Route to update waters-cms-settings.json
export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    try {
      // Parse the incoming data
      const body = (await request.json()) as Record<string, any>;

      // Validate the incoming data
      const result = updateSettings(body);

      // Save updated settings on GitHub
      githubUpdateSettings(result);

      // TODO: Trigger the cache to reset
      return new Response(JSON.stringify(result), {
        status: 200,
      });
    } catch (error) {
      // Handle JSON parsing errors
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
