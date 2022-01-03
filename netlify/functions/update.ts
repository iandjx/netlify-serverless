import faunadb from "faunadb";
import { Handler } from "@netlify/functions";
import { Response } from "./create";

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET as any,
});

const q = faunadb.query;

const handler: Handler = async (event, context) => {
  /* configure faunaDB Client with our secret */
  if (!event.body) {
    throw "body null";
  }
  const data = JSON.parse(event.body);
  try {
    const response = await client.query<Response>(
      q.Update(q.Ref(q.Collection("notes"), "123"), {
        data,
      })
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
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};

export { handler };
