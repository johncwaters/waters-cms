import type { APIRoute } from "astro";
import { createFolderIfNotExists } from "../../util/github/createFolderIfNotExists";

// * Create GitHub Folder if needed * //
export const GET: APIRoute = async ({}) => {
  // Make sure content folder is created in target Github
  await createFolderIfNotExists();

  return new Response(null, {
    status: 200,
  });
};
