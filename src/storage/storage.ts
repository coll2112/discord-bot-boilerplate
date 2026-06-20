import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  writeFileSync
} from "node:fs";
import { dirname, join } from "node:path";
import { APP } from "../config/app.js";
import type { GuildStore, ServerConfig } from "../types/types.js";
import { isRecord } from "../utilities/utilities.js";

export const defaultServerConfig = (): ServerConfig => ({
  schemaVersion: APP.schemaVersion,
  features: {
    exampleFeature: true
  }
});

export const defaultGuildStore = (): GuildStore => ({
  config: defaultServerConfig()
});

const normalizeServerConfig = (value: unknown): ServerConfig => {
  if (!isRecord(value)) {
    return defaultServerConfig();
  }

  const features = isRecord(value.features) ? value.features : {};

  return {
    schemaVersion: APP.schemaVersion,
    features: {
      exampleFeature:
        typeof features.exampleFeature === "boolean"
          ? features.exampleFeature
          : true
    }
  };
};

const normalizeGuildStore = (value: unknown): GuildStore => {
  if (!isRecord(value)) {
    return defaultGuildStore();
  }

  return {
    config: normalizeServerConfig(value.config)
  };
};

const getGuildStorePath = (dataDir: string, guildId: string): string =>
  join(dataDir, "guilds", guildId, "store.json");

export const loadGuildStore = (dataDir: string, guildId: string): GuildStore => {
  const storePath = getGuildStorePath(dataDir, guildId);

  if (!existsSync(storePath)) {
    const store = defaultGuildStore();
    saveGuildStore(dataDir, guildId, store);
    return store;
  }

  try {
    return normalizeGuildStore(JSON.parse(readFileSync(storePath, "utf8")));
  } catch {
    const backupPath = `${storePath}.invalid-${Date.now()}`;
    renameSync(storePath, backupPath);

    const store = defaultGuildStore();
    saveGuildStore(dataDir, guildId, store);
    return store;
  }
};

export const saveGuildStore = (
  dataDir: string,
  guildId: string,
  store: GuildStore
): void => {
  const storePath = getGuildStorePath(dataDir, guildId);
  mkdirSync(dirname(storePath), { recursive: true });
  writeFileSync(
    storePath,
    `${JSON.stringify(normalizeGuildStore(store), null, 2)}\n`,
    "utf8"
  );
};

export const updateServerConfig = (
  dataDir: string,
  guildId: string,
  updater: (config: ServerConfig) => ServerConfig
): ServerConfig => {
  const store = loadGuildStore(dataDir, guildId);
  store.config = normalizeServerConfig(updater(store.config));
  saveGuildStore(dataDir, guildId, store);
  return store.config;
};
