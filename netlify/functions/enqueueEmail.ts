import { Handler } from "@netlify/functions";

import emailQueue from "./emailQueue";
export const handler: Handler = async (request) => {
  const { body } = request;
  if (!body) {
    return {
      statusCode: 400,
    };
  }
  await emailQueue.enqueue(body, {
    delay: 5000,
  });

  return {
    statusCode: 200,
  };
};
