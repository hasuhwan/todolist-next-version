import userData from "../../data/userData";
const { MongoClient } = require("mongodb");
export default async function signInRequest(req, res) {
  const { username, userid, password } = req.body;
  const url = `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PASSWORD}@cluster0.d8pefpp.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(url);
  try {
    await client.connect();
    const db = client.db("users");
    const usersCollection = db.collection("users");
    const insertUser = await usersCollection.insertOne({
      username,
      userid,
      password,
      todo: [],
    });
    console.log(insertUser); //insertone 정보 넣기 // findone 찾기
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

// if (userData.every((el) => el.userid !== userid)) {
//   userData.push({
//     username,
//     userid,
//     password,
//     todo: [],
//   });
//   res.status(201).send(userData[userData.length - 1]);
// } else {
//   res.status(401).send("same id");
// }
