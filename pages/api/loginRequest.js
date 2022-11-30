import userData from "../../data/userData";

export default function loginRequest(req, res) {
  const [user] = userData.filter((user) => {
    return (
      req.body.userid === user.userid && req.body.password === user.password
    );
  });
  if (user !== undefined) {
    delete user.password;
  }
  console.log(user);
  res.status(200).json(user);
}
