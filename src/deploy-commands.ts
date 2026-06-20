import { REST, Routes } from "discord.js";
import { getCommandData } from "./commands/registry.js";
import { env } from "./config/env.js";
import { logger } from "./utilities/logger.js";

type DeployTarget = "dev" | "prod";

const parseDeployTarget = (): DeployTarget => {
  const target = process.argv[2];

  if (target === "dev" || target === "prod") {
    return target;
  }

  throw new Error("Deploy target must be dev or prod.");
};

const deployCommands = async (): Promise<void> => {
  const target = parseDeployTarget();
  const rest = new REST({ version: "10" }).setToken(env.token);
  const commands = getCommandData();

  if (target === "dev") {
    if (!env.guildId) {
      throw new Error("GUILD_ID is required for dev command deployment.");
    }

    await rest.put(Routes.applicationGuildCommands(env.clientId, env.guildId), {
      body: commands
    });
    logger.info("Deployed guild commands.", { guildId: env.guildId });
    return;
  }

  await rest.put(Routes.applicationCommands(env.clientId), {
    body: commands
  });
  logger.info("Deployed global production commands.");
};

await deployCommands();
