import userData from "../../data/userData";
import { generateToken, verfiyToken } from "../../func/tokenFunction";
export default async function loginRequest(req, res) {
  // const cookiesOption = {
  //   domain: "localhost",
  //   path: "/",
  //   httpOnly: true,
  //   sameSite: "none",
  //   secure: true,
  // };

  if (req.method === "GET") {
    const token = req.cookies;
    if (Object.keys(token).length === 0) {
      res.status(200).send("");
    }
    let response = await verfiyToken("access", token.access_jwt);
    const [user] = userData.filter((user) => user.userid === response.userid);
    delete user.password;
    console.log(user);
    res.status(200).json(user);
  } else if (req.method === "POST") {
    const [user] = userData.filter((user) => {
      return (
        req.body.userid === user.userid && req.body.password === user.password
      );
    });
    if (user.userid === undefined) {
      res.status(401).send("Not Authorized");
    } else {
      const response = await generateToken(user.userid, user.password);
      res.setHeader(
        "Set-Cookie",
        `access_jwt=${response.acccessToken}; path=/;`
      );
      delete user.password;
      res.status(200).json(user);
    }
  }
}
