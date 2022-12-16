const { MongoClient } = require("mongodb");
import type { NextApiRequest, NextApiResponse } from "next";
interface IrequestBody {
  userid: string;
  id: string;
}
export default async function removeRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userid, id }: IrequestBody = req.body;
  const url: string = `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PASSWORD}@cluster0.d8pefpp.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(url);
  try {
    await client.connect();
    const db = client.db("users");
    const usersCollection = db.collection("users");
    await usersCollection.findOneAndUpdate(
      { userid: userid },
      { $pull: { todo: { id: id } } }
    );

    res.status(200).send(id);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
