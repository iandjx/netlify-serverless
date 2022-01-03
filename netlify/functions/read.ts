import faunadb from "faunadb";
import { Handler } from "@netlify/functions";
import { Response } from "./create";

/* configure faunaDB Client with our secret */

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET as any,
});

const handler: Handler = async (event, context) => {
  try {
    const response = await client.query<Response>(
      q.Map(
        q.Paginate(q.Match(q.Index("all_notes"))),
        q.Lambda((x) => q.Get(x))
      )
    );

    console.log(response.data);

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
