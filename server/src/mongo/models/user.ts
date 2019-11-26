import { Schema, model, Document } from "mongoose";

interface JSONUser {
  firstname: String;
  lastname: String;
  email: String;
  tokens: [String];
  type: String;
}
interface User extends JSONUser, Document {}
const schemaUser = new Schema<User>({
  firstname: {
    type: Schema.Types.String,
    required: true
  },
  lastname: {
    type: Schema.Types.String,
    required: true
  },
  email: {
    type: Schema.Types.String,
    required: true
  },
  tokens: [String],
  type: {
    type: Schema.Types.String,
    required: true
  }
});

const register = () => model<User>("users", schemaUser)
export { register, User }
