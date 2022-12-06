import userData from "../../data/userData";

export default function signInRequest(req, res) {
  const { username, userid, password } = req.body;

  if (userData.every((el) => el.id !== userid)) {
    userData.push({
      username,
      userid,
      password,
      todo: [],
    });
  }
  res.status(201).send();
}
