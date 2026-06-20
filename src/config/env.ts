import { resolve } from "node:path";

const getEnv = (key: string): string => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`${key} is required.`);
  }

  return value;
};

const getOptionalEnv = (key: string): string | undefined => {
  const value = process.env[key];
  return value && value.length > 0 ? value : undefined;
};

const resolveProjectPath = (pathValue: string): string =>
  resolve(process.cwd(), pathValue);

export const env = {
  token: getEnv("DISCORD_TOKEN"),
  clientId: getEnv("CLIENT_ID"),
  guildId: getOptionalEnv("GUILD_ID"),
  nodeEnv: getOptionalEnv("NODE_ENV") ?? "development",
  dataDir: resolveProjectPath(getOptionalEnv("DATA_DIR") ?? "./data")
} as const;
