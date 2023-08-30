import { bot } from "../bot.js";

// Declare an object to store user request counts
const userRequest: { [userId: number]: number } = {};

// Declare an object to store the last request time for each user
const userLastRequest: { [userId: number]: number } = {};

// Пользователь
export const userAction = async () => {
  bot.action("Пользователь", async (ctx) => {
    const { id } = ctx.chat || {};

    try {
      // Fetch user's request count from the in-memory storage
      if (id === undefined) {
        return undefined;
      }

      const userRequestCount = userRequest[id] || 0;

      if (userRequestCount < 5) {
        // Check if the user has made less than 5 requests within the past 24 hours
        const currentTime = Date.now();
        const lastRequestTime = userLastRequest[id] || 0;
        const hoursPassed = (currentTime - lastRequestTime) / (60 * 60 * 1000);

        if (hoursPassed < 24) {
          // User has made a request within the past 24 hours
          bot.telegram.sendMessage(
            id,
            "Sorry, you've already made a request within the past 24 hours."
          );
        } else {
          // User can make a new request
          bot.telegram.sendMessage(id, "Welcome, user! You are now connected.");
          // Proceed with user-specific actions

          // Increment and update user's request count and last request time in the in-memory storage
          userRequest[id] = (userRequest[id] || 0) + 1;
          userLastRequest[id] = currentTime;
        }
      } else {
        bot.telegram.sendMessage(
          id,
          "Sorry, you've exceeded the request limit for the past 24 hours."
        );
      }
    } catch (error) {
      console.error("Error handling user action:", error);
    }
  });
};
