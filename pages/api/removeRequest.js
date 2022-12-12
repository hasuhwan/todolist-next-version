const { MongoClient } = require("mongodb");

export default async function removeRequest(req, res) {
  const { userid, id } = req.body;
  const url = `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PASSWORD}@cluster0.d8pefpp.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(url);
  try {
    await client.connect();
    const db = client.db("users");
    const usersCollection = db.collection("users");
    await usersCollection.findOneAndUpdate(
      { userid: userid },
      { $pull: { todo: { id: id } } }
    );

    res.status(200);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
