import userData from "../../data/userData";

export default function addRequest(req, res) {
  const { todotext, userid, todoid } = req.body;
  for (let i = 0; i < userData.length; i++) {
    if (userData[i].userid === userid) {
      userData[i].todo.push({ id: todoid, text: todotext });
      break;
    }
  }
  res.status(201);
}
