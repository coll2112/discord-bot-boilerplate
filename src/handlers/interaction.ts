import type { Interaction } from "discord.js";
import { executeCommand } from "../commands/registry.js";

export const handleInteraction = async (
  interaction: Interaction
): Promise<void> => {
  if (interaction.isChatInputCommand()) {
    await executeCommand(interaction);
  }
};
