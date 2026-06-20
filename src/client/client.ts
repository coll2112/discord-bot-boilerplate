import { Client, GatewayIntentBits } from "discord.js";

export const createClient = (): Client =>
  new Client({
    intents: [GatewayIntentBits.Guilds]
  });
