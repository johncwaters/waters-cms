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
            'auth-astro requires server-side rendering. Please set output to "server" & install an adapter. See https://docs.astro.build/en/guides/deploy/#adding-an-adapter-for-ssr'
          );

        if (command === "dev") {
          injectRoute({
            pattern: "/admin",
            entryPoint: "./node_modules/waters-cms/src/pages/admin.astro",
          });
          // prod
        } else {
          injectRoute({
            pattern: "/admin",
            entryPoint: "./node_modules/waters-cms/src/pages/admin.astro",
            //entryPoint: "waters-cms/src/pages/admin.astro",
          });
        }

        // Add Form API Route
        injectRoute({
          pattern: "/api/form",
          entryPoint: "./node_modules/waters-cms/src/pages/api/form.ts",
        });

        // Add Auth API Route
        injectRoute({
          pattern: "/auth/waters-cms-authorize",
          entryPoint:
            "./node_modules/waters-cms/src/pages/waters-cms-authorize.astro",
        });
      },
    },
  };
}
