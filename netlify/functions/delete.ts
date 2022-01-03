import faunadb from "faunadb";
import { Handler } from "@netlify/functions";
import { Response } from "./create";
/* configure faunaDB Client with our secret */

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET as string,
});

const handler: Handler = async (event, context) => {
  try {
    const response = await client.query<Response>(
      q.Delete(q.Ref(q.Collection("notes"), "123"))
    );

    console.log(response);

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  } catch (error) {
    console.log("error", error);
    /* Error! return the error with statusCode 400 */
    return {
      statusCode: 422,
      body: JSON.stringify(error),
    };
  }
};
export { handler };
