import { bot } from "../bot.js";
import { availableCommands } from "../types/types.js";

export const helpAction = () => {
  bot.command("help", (ctx) => {
    const { id } = ctx.chat || {};
    const helpMessage = `The list of available commands for this bot:\n${availableCommands.join(
      "\n"
    )}`;

    bot.telegram.sendMessage(id, helpMessage);
  });
};
