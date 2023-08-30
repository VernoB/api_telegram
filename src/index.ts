import express, { Express } from "express";
import { debug } from "console";
import { Server } from "http";
import "dotenv/config";

import { bot } from "./bot.js";

const app: Express = express();
const port = process.env.PORT || 3000;

console.log(port);

//Set the API endpoint
app.use(
  await bot.createWebhook({
    domain: "https://api.telegram.org/bot",
    secret_token: process.env.API_HASH,
    ip_address: "149.154.167.40",
  })
);

//Start webhook
const server: Server = app.listen(port, () => {
  bot.launch();
  console.log("Started webhook with port " + port);
});

process.on("SIGTERM" || "SIGINT", () => {
  debug("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    debug("HTTP server closed");
    bot.stop("SIGINT");
    bot.stop("SIGTERM");
  });
});
