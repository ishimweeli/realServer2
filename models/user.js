import mongoose from 'mongoose';
import model from "mongoose";

const userSchema = new mongoose.Schema ({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  registration_date: { type: String, default: new Date() }
});
const user = mongoose.model("user", userSchema);
export default user