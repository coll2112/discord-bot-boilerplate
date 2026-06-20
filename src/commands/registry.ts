import { MessageFlags } from "discord.js";
import type {
  ChatInputCommandInteraction,
  RESTPostAPIChatInputApplicationCommandsJSONBody
} from "discord.js";
import { MESSAGES } from "../config/constants.js";
import { logger } from "../utilities/logger.js";
import type { Command } from "./base.js";
import { pingCommand } from "./ping/index.js";

const commands = [pingCommand] as const;

const commandByName = new Map(
  commands.map((command) => [command.data.name, command])
);

export const getCommandData =
  (): RESTPostAPIChatInputApplicationCommandsJSONBody[] =>
    commands.map((command) => command.data.toJSON());

export const executeCommand = async (
  interaction: ChatInputCommandInteraction
): Promise<void> => {
  const command = commandByName.get(interaction.commandName) as
    | Command
    | undefined;

  if (!command) {
    logger.warn("Unknown command.", { commandName: interaction.commandName });
    await interaction.reply({
      content: MESSAGES.unknownCommand,
      flags: MessageFlags.Ephemeral
    });
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    logger.error("Command execution failed.", {
      commandName: interaction.commandName,
      error
    });

    if (interaction.deferred || interaction.replied) {
      await interaction.editReply(MESSAGES.commandError);
      return;
    }

    await interaction.reply({
      content: MESSAGES.commandError,
      flags: MessageFlags.Ephemeral
    });
  }
};
