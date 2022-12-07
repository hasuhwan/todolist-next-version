import jwt from "jsonwebtoken";

const generateToken = (userid, password) => {
  const payload = {
    userid,
    password,
  };
  let result = {
    acccessToken: jwt.sign(payload, process.env.ACCESS_KEY, {
      expiresIn: "10h",
    }),
  };
  return result;
};
const verfiyToken = (type, token) => {
  let secretKey, decoded;
  if (type === "access") {
    secretKey = process.env.ACCESS_KEY;
  }
  decoded = jwt.verify(token, secretKey);
  return decoded;
};

export { generateToken, verfiyToken };
