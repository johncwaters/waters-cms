import type { APIRoute } from "astro";

export const GET: APIRoute = ({ redirect }) => {
  const googleAuthURL = "https://accounts.google.com/o/oauth2/v2/auth";
  const redirectURI = encodeURIComponent(
    "http://localhost:4321/waters-cms/api/auth/callback"
  );
  const scope = encodeURIComponent("email profile");
  const clientId = encodeURIComponent(
    import.meta.env.SECRET_GOOGLE_CLIENT_ID as string
  );
  const responseType = encodeURIComponent("code");

  const authURL = `${googleAuthURL}?redirect_uri=${redirectURI}&scope=${scope}&client_id=${clientId}&response_type=${responseType}`;

  return redirect(authURL, 302);
};
