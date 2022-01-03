import { Queue } from "quirrel/netlify";
import sgMail from "@sendgrid/mail";
export const handler = Queue(
  ".netlify/functions/emailQueue",
  async (name: string) => {
    console.log("greeeeattt", name);
    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
    const msg = {
      to: "ian.dejesus.md.jp@gmail.com", // Change to your recipient
      from: "ian.dejesus.md@gmail.com", // Change to your verified sender
      subject: "Sending with SendGrid is Fun",
      text: "and easy to do anywhere, even with Node.js. sent via quirrelll",
      html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  }
);

export default handler;
