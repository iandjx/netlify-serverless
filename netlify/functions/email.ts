import { Handler } from "@netlify/functions";

import sgMail from "@sendgrid/mail";

export const handler: Handler = async (event, context) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
  const msg = {
    to: "ian.dejesus.md.jp@gmail.com", // Change to your recipient
    from: "ian.dejesus.md@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js. sent via quirrelll",
    html: "<strong>and easy to do anywhere, even with Node.js qith quireellll</strong>",
  };

  try {
    await sgMail.send(msg);
    return {
      statusCode: 200,
    };
  } catch (err: any) {
    return {
      statusCode: 400,
    };
  }
};
