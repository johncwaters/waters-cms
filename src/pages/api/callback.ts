import type { APIRoute, AstroCookies } from "astro";

// * Google Auth Callback Endpoint * //

export const GET: APIRoute = async ({ url, redirect, cookies }) => {
  try {
    const params = new URLSearchParams(url.search);
    const code = params.get("code");

    if (!code) {
      throw new Error("No code parameter provided in callback URL");
    }

    // Step 1: Exchange the authorization code for an access token
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: import.meta.env.SECRET_GOOGLE_CLIENT_ID as string,
        client_secret: import.meta.env.SECRET_GOOGLE_CLIENT_SECRET as string,
        redirect_uri: "http://localhost:4321/waters-cms/api/auth/callback",
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Step 2: Use the access token to get the user's profile information
    const profileResponse = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const profile = await profileResponse.json();
    const usersEmail = profile.email;

    // Step 3: Check the user's email against a list of allowed emails
    // * process.env.ALLOWED_EMAILS as string
    const allowedEmails = import.meta.env.WATERS_CMS_USERS.split(",");
    if (!allowedEmails.includes(usersEmail)) {
      throw new Error("Access not allowed");
    }

    // Step 4: Set a session cookie to indicate that the user is authenticated
    cookies.set("waters-cms-session", usersEmail, {
      maxAge: tokenData.expires_in, // 1 hours
      path: "/",
      sameSite: "strict",
      httpOnly: true,
      secure: true,
    });

    return redirect("/waters-cms/admin", 302);
  } catch (error) {
    console.error(error);
    return redirect("/", 302);
  }
};
