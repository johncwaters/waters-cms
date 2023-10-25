interface ImportMetaEnv {
  readonly SECRET_GITHUB_ACCESS_TOKEN: string;
  readonly SECRET_GOOGLE_CLIENT_ID: string;
  readonly SECRET_GOOGLE_CLIENT_SECRET: string;
  readonly WATERS_CMS_USERS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
