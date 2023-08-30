import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import DateTime from "date-and-time";

import { userAction } from "./actionBot/userActionBot.js";
import { analystActionBot } from "./actionBot/analystActionBot.js";
import { analyzeAction } from "./actionBot/AnalyseActionBot.js";
import { helpAction } from "./actionBot/HelpActionBot.js";

const token: string | undefined = process.env.API_TOKEN
  ? process.env.API_TOKEN
  : undefined;
("");

export const bot: Telegraf<Context<Update>> = new Telegraf(token! && token!);

//Start conversation
bot
  .command("start", (ctx) => {
    console.log(ctx.from);
    console.log(
      DateTime.format(new Date(ctx.message.date * 1000), "DD/MM HH:mm")
    );

    const message: string = "К какой из двух ролей он относиться";

    bot.telegram.sendMessage(
      ctx.chat.id,
      "Welcome to our telegram bot, you are now connected"
    );

    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, message, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Пользователь", callback_data: "Пользователь" },
            { text: "Аналитик", callback_data: "Аналитик" },
          ],
        ],
      },
    });
  })
  .catch((err) => console.log(err));

// Пользователь
userAction();

// Аналитик
analystActionBot();

//Analyze all Eth
analyzeAction();

//Clear the message
bot.command("clear", (ctx) => {
  //Clears
  bot.telegram.sendMessage(ctx.chat.id, "Give me a moment to clear ...", {});
});

// Help command
helpAction();
