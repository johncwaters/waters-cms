export interface cmsSettings {
  websiteName: string;
  collections: {
    [key: string]: collection | undefined;
  };
}

export interface collection {
  name: string; // Unique Identifier
  label: string; // Label for the collection in the editor
  fields: {
    [key: string]: field | undefined;
  };
}

// Build each field from this
export interface field {
  name: string; // Unique Identifier
  label: string; // Label for the field in the editor
  type: "string" | "boolean" | "select"; // Type of input
  required: boolean;
  options?: string[];
  booleanValue?: boolean;
}
