import type {
  Awaitable,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
  SlashCommandSubcommandsOnlyBuilder
} from "discord.js";

export type CommandData =
  | SlashCommandBuilder
  | SlashCommandOptionsOnlyBuilder
  | SlashCommandSubcommandsOnlyBuilder;

export interface Command {
  data: CommandData;
  execute: (interaction: ChatInputCommandInteraction) => Awaitable<unknown>;
}
