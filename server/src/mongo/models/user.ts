import { Schema, model, Document } from "mongoose";

interface User extends Document {
  firstname: string;
  lastname: string;
  email: string;
  tokens: [string];
  type: string;
}
const schemaUser = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  tokens: [String],
  type: String
});

const register = () => model<User>("users", schemaUser)
export { register, User }
