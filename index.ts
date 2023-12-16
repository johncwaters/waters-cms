import type { AstroIntegration } from "astro";

export default function watersCmsIntegration(): AstroIntegration {
  return {
    name: "waters-cms",
    hooks: {
      "astro:config:setup": async ({
        command,
        config: astroConfig,
        injectRoute,
      }) => {
        if (astroConfig.output === "static")
          throw new Error(
            'Waters-Cms requires server-side rendering. Please set output to "server" & install an adapter. See https://docs.astro.build/en/guides/deploy/#adding-an-adapter-for-ssr'
          );

        // Add Waters-CMS Admin Page
        injectRoute({
          pattern: "/waters-cms/admin",
          entryPoint: "./node_modules/waters-cms/src/pages/admin.astro",
        });

        // Add Form Update Collection API Route
        injectRoute({
          pattern: "/waters-cms/api/form-update-collection",
          entryPoint:
            "./node_modules/waters-cms/src/pages/api/form-update-collection.ts",
        });

        // * Auth API Routes * //
        // Login Page
        injectRoute({
          pattern: "/waters-cms/auth/login",
          entryPoint:
            "./node_modules/waters-cms/src/components/auth/Login.astro",
        });

        // API Login Endpoint
        injectRoute({
          pattern: "/waters-cms/api/auth/login",
          entryPoint: "./node_modules/waters-cms/src/pages/api/login.ts",
        });

        // API Logout Endpoint
        injectRoute({
          pattern: "/waters-cms/api/auth/logout",
          entryPoint: "./node_modules/waters-cms/src/pages/api/logout.ts",
        });

        // API Callback Endpoint
        injectRoute({
          pattern: "/waters-cms/api/auth/callback",
          entryPoint: "./node_modules/waters-cms/src/pages/api/callback.ts",
        });
      },
    },
  };
}
