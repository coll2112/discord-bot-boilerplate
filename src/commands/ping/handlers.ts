import { MessageFlags } from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";

export const handlePing = async (
  interaction: ChatInputCommandInteraction
): Promise<void> => {
  await interaction.reply({
    content: "Pong.",
    flags: MessageFlags.Ephemeral
  });
};
