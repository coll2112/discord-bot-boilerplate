import { Events } from "discord.js";
import { createClient } from "./client/client.js";
import { env } from "./config/env.js";
import { handleInteraction } from "./handlers/interaction.js";
import { logger } from "./utilities/logger.js";

const client = createClient();

client.rest.on("rateLimited", (info) => {
  logger.warn("Discord REST rate limited.", { info });
});

client.once(Events.ClientReady, (readyClient) => {
  logger.info(`Logged in as ${readyClient.user.tag}.`, {
    environment: env.nodeEnv
  });
});

client.on(Events.InteractionCreate, (interaction) => {
  void handleInteraction(interaction).catch((error: unknown) => {
    logger.error("Interaction handler failed.", { error });
  });
});

void client.login(env.token);
