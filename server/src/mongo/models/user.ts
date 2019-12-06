import { Schema, model, Document } from "mongoose";

interface Constraint {
  time: Date,
  text: string
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
  month: number,
  constraints: Constraint[]
}
const schemaMonthlyConstraints = new Schema<MonthlyConstraints>({
  month: {
    type: Schema.Types.Number,
    required: true
  },
  constraints: {
    type: [schemaConstraint]
  }
});

interface JSONUser {
  firstname: string,
  lastname: string,
  email: string,
  tokens: [string],
  type: string,
  boardId: string,
  satisfiedConstraints: number,
  monthlyConstraints: MonthlyConstraints
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
    type: [Schema.Types.String]
  },
  type: {
    type: Schema.Types.String,
    enum: ['user', 'manager'],
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

schemaUser.pre('save', function(this: User, next) {
  next();
});

const register = () => model<User>('users', schemaUser);
export { register, User, JSONUser };
