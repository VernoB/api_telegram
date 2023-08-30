export type Chat = {
  id: number;
  first_name: string;
  username: string;
  type: string;
  PrivateChat: string;
  GroupChat: string;
  SupergroupChat: string;
};

// List of available commands
export const availableCommands: string[] = [
  "/start - Start the bot",
  "/help - Show available commands",
  "/analyze - Analyze all available ETH",
  "/clear - Clear messages",
];
