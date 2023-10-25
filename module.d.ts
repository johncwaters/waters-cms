export interface WatersCmsConfig {
  /**
   * Defines the base path for the auth routes.
   * @default '/api/auth'
   */
  prefix?: string;
  /**
   * Defineds wether or not you want the integration to handle the API routes
   * @default true
   */
  injectEndpoints?: boolean;
  /**
   * Path to the config file
   */
  configFile?: string;
}

declare module "auth:config" {
  // imports ./src/config file from users project
  // TODO: rename config to avoid conflics with other packages
  const config: import("./src/config").WatersCmsConfig;
  export default config;
}
