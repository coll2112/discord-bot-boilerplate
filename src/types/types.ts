export interface ServerConfig {
  schemaVersion: number;
  features: {
    exampleFeature: boolean;
  };
}

export interface GuildStore {
  config: ServerConfig;
}
