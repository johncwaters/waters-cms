import type { APIRoute } from "astro";

// * Update CMS API POST Route * //
// API Route to update waters-cms collections

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json();
    console.log("🚀form-update-collection.ts:9 ~ POST:APIRoute= ~ body:", body);

    // TODO: 1. Update correct GitHub file with new JSON content

    // TODO: Trigger the cache to reset
    return new Response(null, {
      status: 200,
    });
  }
  return new Response(
    JSON.stringify({ message: "Content-Type must be application/json" }),
    { status: 400 }
  );
};
