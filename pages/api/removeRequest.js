import userData from "../../data/userData";

export default function removeRequest(req, res) {
  const { userid, id } = req.body;
  for (let i = 0; i < userData.length; i++) {
    if (userData[i].userid === userid) {
      userData[i].todo = userData[i].todo.filter((el) => el.id !== id);
      break;
    }
  }

  res.status(204);
}
