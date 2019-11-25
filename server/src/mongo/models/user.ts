import { Schema, model, Document } from "mongoose";

interface JSONUser {
  firstname: String;
  lastname: String;
  email: String;
  tokens: [String];
  type: String;
}
interface User extends Document {
  firstname: Schema.Types.String;
  lastname: Schema.Types.String;
  email: Schema.Types.String;
  tokens: [Schema.Types.String];
  type: Schema.Types.String;
}
const schemaUser = new Schema({
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
export { register, JSONUser, User }
