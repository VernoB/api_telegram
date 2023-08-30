import axios, { AxiosResponse } from "axios";
import xlsx from "xlsx";

import { bot } from "../bot.js";

export const analyzeAction = () => {
  bot.command("analyze", async (ctx) => {
    const { text, chat } = ctx.message || {}; // Provide an empty object as a default value
    if (text) {
      const ethAddress = text.split(" ")[1]; // Extract the ETH address from the text
      const isEth = text.split(" ")[2] ? text.split(" ")[2] : "eth"; // Check if eth is end, and add if not present

      if (ethAddress) {
        try {
          const apiUrl: string = `https://api.etherscan.io/api?module=account&action=txlist&address=${ethAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${process.env.ETHER_TOKEN}`;
          const response: AxiosResponse = await axios.get(apiUrl);

          const tradeData = [
            ["Block", "Timestamp", "From", "To", "Value (ETH)"],
            ...response.data.result.map(
              (trade: {
                blockNumber: any;
                timeStamp: number;
                from: any;
                to: any;
                value: number;
              }) => [
                trade.blockNumber,
                new Date(trade.timeStamp * 1000).toLocaleString(),
                trade.from,
                trade.to,
                trade.value / 1e18, // Convert from wei to ETH
              ]
            ),
          ];

          // Create a new workbook and add the trade data to a worksheet
          const workbook = xlsx.utils.book_new();
          const worksheet = xlsx.utils.aoa_to_sheet(tradeData);

          // Add the worksheet to the workbook
          xlsx.utils.book_append_sheet(workbook, worksheet, "Trade Data");

          // Generate an Excel file buffer
          const excelBuffer = xlsx.write(workbook, {
            bookType: "xlsx",
            type: "buffer",
          });

          // Send the generated Excel file to the user
          bot.telegram.sendDocument(chat.id, {
            source: excelBuffer,
            filename: "trade_data.xlsx",
          });
        } catch (error) {}
        // Fetch data based on the provided ETH address
        const ethMessage = `Analyzing ETH address: ${ethAddress}`;
        bot.telegram.sendMessage(chat.id, ethMessage);
      } else {
        const errorMessage = "Please provide a valid ETH address.";
        bot.telegram.sendMessage(chat.id, errorMessage);
      }
    } else {
      const errorMessage =
        "Please provide an ETH address after the /analyze command.";
      bot.telegram.sendMessage(chat.id, errorMessage);
    }
  });
};
