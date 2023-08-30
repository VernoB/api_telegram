export const userRequest: Record<number, number> = {};

export const analystRequest: Record<number, number> = {};

const resetRequestCounts = () => {
  //reset user request count
  for (const userId in userRequest) {
    userRequest[userId] = 0;
  }

  for (const userId in analystRequest) {
    analystRequest[userId] = 0;
  }

  console.log("Request counts reset successfully.");
};

// Schedule the resetRequestCounts function to run every 24 hours
setInterval(resetRequestCounts, 24 * 60 * 60 * 1000); // Run every 24 hours
