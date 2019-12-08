import { Schema, model, Document } from "mongoose";
import { USER_TYPE } from "../../utiles/userTypeEnum";
import {
  Month,
  schemaMonth,
  ShiftTime,
  schemaShiftTime
} from "./concreteBoard";

interface Constraint {
  time: ShiftTime;
  text: string;
}
const schemaConstraint = new Schema<Constraint>({
  time: {
    type: schemaShiftTime,
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

interface UserModel {
  firstname: string;
  lastname: string;
  email: string;
  type: USER_TYPE;
  boardId: string;
  unSatisfiedConstraints: number;
  monthlyConstraints: MonthlyConstraints[];
}
interface JSONUser extends UserModel {
  _id: string;
}
interface User extends UserModel, Document {}
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
  type: {
    type: Schema.Types.Number,
    enum: [USER_TYPE.MANAGER, USER_TYPE.WORKER],
    required: true
  },
  boardId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  unSatisfiedConstraints: {
    type: Schema.Types.Number,
    default: 0
  },
  monthlyConstraints: {
    type: schemaMonthlyConstraints,
    required: false,
    default: []
  }
});

schemaUser.pre("save", function(this: User, next) {
  next();
});

const register = () => model<User>("users", schemaUser);
export { register, User, JSONUser, Constraint, MonthlyConstraints };
