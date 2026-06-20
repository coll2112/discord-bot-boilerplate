import { COMMAND_NAMES } from "../definitions.js";

export const PING_COMMAND = {
  name: COMMAND_NAMES.ping,
  description: "Check whether the bot is online."
} as const;
