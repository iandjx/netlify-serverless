import { Queue } from "quirrel/netlify";
import sgMail from "@sendgrid/mail";

export const handler = Queue(
  ".netlify/functions/emailQueue",
  async (name: string) => {
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
      console.log("email sent");
    } catch (err: any) {
      console.error("email not sent");
    }
  }
);

export default handler;
