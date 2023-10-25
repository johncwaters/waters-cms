import type { APIRoute } from "astro";

export const GET: APIRoute = ({ redirect, cookies }) => {
  cookies.delete("waters-cms-session", { path: "/" });
  return redirect("/", 302);
};
