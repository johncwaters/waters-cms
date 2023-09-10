import type { AstroIntegration } from "astro";

//export { default as WatersCmsAdminPage } from "./src/pages/admin.astro";

type WatersCMSOptions = {
  example: boolean;
};

export default function watersCmsIntegration(
  options?: WatersCMSOptions
): AstroIntegration {
  const exampleResult = options?.example;

  return {
    name: "waters-cms",
    hooks: {
      "astro:config:setup": async ({
        command,
        config,
        updateConfig,
        injectScript,
        injectRoute,
      }) => {
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

        // Add API Endpoint
        injectRoute({
          pattern: "/api/form",
          entryPoint: "./node_modules/waters-cms/src/pages/api/form.ts",
        });
      },
    },
  };
}
