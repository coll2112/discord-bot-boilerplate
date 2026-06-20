import type { Command } from "../base.js";
import { buildPingCommand } from "./build.js";
import { handlePing } from "./handlers.js";

export const pingCommand: Command = {
  data: buildPingCommand(),
  execute: handlePing
};
