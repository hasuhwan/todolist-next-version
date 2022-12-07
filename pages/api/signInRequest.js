import userData from "../../data/userData";

export default function signInRequest(req, res) {
  const { username, userid, password } = req.body;

  if (userData.every((el) => el.userid !== userid)) {
    userData.push({
      username,
      userid,
      password,
      todo: [],
    });
    res.status(201).send(userData[userData.length - 1]);
  } else {
    res.status(401).send("same id");
  }
}
