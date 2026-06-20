import { SlashCommandBuilder } from "discord.js";
import { PING_COMMAND } from "./definition.js";

export const buildPingCommand = (): SlashCommandBuilder =>
  new SlashCommandBuilder()
    .setName(PING_COMMAND.name)
    .setDescription(PING_COMMAND.description);
