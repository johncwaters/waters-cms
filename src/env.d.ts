// TODO: Update to more generic names so adaptater can adjust
interface ImportMetaEnv {
  readonly SECRET_GITHUB_ACCESS_TOKEN: string;
  readonly SECRET_AUTH0_DOMAIN: string;
  readonly SECRET_AUTH0_CLIENT_ID: string;
  readonly SECRET_AUTH0_CLIENT_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
