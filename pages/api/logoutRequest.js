export default function logoutRequest(req, res) {
  res.setHeader("Set-Cookie", `access_jwt=deleted; Max-Age=0; path=/`);
  res.status(200).send("success");
}
