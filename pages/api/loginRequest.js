import { generateToken, verfiyToken } from "../../func/tokenFunction";
const { MongoClient } = require("mongodb");
export default async function loginRequest(req, res) {
  // const cookiesOption = {
  //   domain: "localhost",
  //   path: "/",
  //   httpOnly: true,
  //   sameSite: "none",
  //   secure: true,
  // };
  const url = `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PASSWORD}@cluster0.d8pefpp.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(url);
  if (req.method === "GET") {
    const token = req.cookies;
    if (Object.keys(token).length === 0) {
      res.status(200).send("");
    } else {
      let response = await verfiyToken("access", token.access_jwt);
      try {
        await client.connect();
        const db = client.db("users");
        const usersCollection = db.collection("users");
        const [user] = await usersCollection
          .find({ userid: response.userid, password: response.password })
          .toArray();
        if (Object.keys(user).length == 0) {
          res.send("");
        } else {
          delete user.password;
          delete user._id;
          res.status(200).json(user);
        }
      } catch (e) {
        console.error(e);
      } finally {
        await client.close();
      }
    }
  } else if (req.method === "POST") {
    try {
      const db = client.db("users");
      const usersCollection = db.collection("users");
      const [user] = await usersCollection
        .find({ userid: req.body.userid, password: req.body.password })
        .toArray();
      if (user.userid === undefined) {
        res.status(401).send("Not Authorized");
      } else {
        const response = await generateToken(user.userid, user.password);
        res.setHeader(
          "Set-Cookie",
          `access_jwt=${response.acccessToken}; path=/;`
        );
        delete user._id;
        delete user.password;
      }

      res.status(200).json(user);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  }
}
