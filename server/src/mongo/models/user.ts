import { Schema, model, Document } from "mongoose";

interface JSONUser {
  firstname: string,
  lastname: string,
  email: string,
  tokens: [string],
  type: string,
  boardIds: string[]
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
  tokens: {
    type: Schema.Types.String
  },
  type: {
    type: Schema.Types.String,
    enum: ['user', 'manager'],
    required: true
  },
  boardIds: {
    type: [Schema.Types.ObjectId],
    required: true
  }
});

schemaUser.pre('save', function(this: User, next) {
  next();
});

const register = () => model<User>("users", schemaUser);
export { register, User };
