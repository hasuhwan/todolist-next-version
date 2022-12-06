import mongoose from "mongoose";

const { Schema } = mongoose;
const tododataSchema = new Schema({
  id: String,
  text: String,
});

const userdataSchema = new Schema({
  username: String,
  userid: String,
  password: Number,
  todo: [tododataSchema],
});
const User = mongoose.model("User", userdataSchema);
export default User;
