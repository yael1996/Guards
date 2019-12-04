import { Schema, model, Document } from "mongoose";
import { USER_TYPE } from "../../utiles/userTypeEnum";
import { Month, schemaMonth } from "./concreteBoard";

interface Constraint {
  time: Date;
  text: string;
}
const schemaConstraint = new Schema<Constraint>({
  time: {
    type: Schema.Types.Date,
    required: true
  },
  text: {
    type: Schema.Types.String,
    required: true
  }
});

interface MonthlyConstraints {
  month: Month;
  constraints: Constraint[];
}
const schemaMonthlyConstraints = new Schema<MonthlyConstraints>({
  month: {
    type: schemaMonth,
    required: true
  },
  constraints: {
    type: [schemaConstraint]
  }
});

interface JSONUser {
  firstname: string;
  lastname: string;
  email: string;
  tokens: [string];
  type: USER_TYPE;
  boardId: string;
  satisfiedConstraints: number;
  monthlyConstraints: MonthlyConstraints;
}
interface User extends JSONUser, Document {}
const schemaUser = new Schema<User>({
  firstname: {
    type: schemaMonth,
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
    type: Schema.Types.Number,
    enum: [USER_TYPE.MANAGER, USER_TYPE.WORKER],
    required: true
  },
  boardId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  satisfiedConstraints: {
    type: Schema.Types.Number,
    default: 0
  },
  monthlyConstraints: {
    type: schemaMonthlyConstraints
  }
});

schemaUser.pre("save", function(this: User, next) {
  next();
});

const register = () => model<User>("users", schemaUser);
export { register, User, JSONUser };
