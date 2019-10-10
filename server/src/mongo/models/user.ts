import { Schema, model, Document, Model } from "mongoose";

declare interface IUser extends Document {
  firstName: String;
  lastName: String;
  email: String;
  tokens: Array<String>;
  userType: String;
}

export interface UserModel extends Model<IUser> {}

export class User {
  private _model: Model<IUser>;

  constructor() {
    const schema = new Schema({
      firstName: { type: String },
      lastName: { type: String },
      email: { type: String, required: true, unique: true },
      tokens: { type: [String] },
      userType: {
        type: String,
        enum: ["MANAGER", "WORKER"],
        required: true
      }
    });

    this._model = model<IUser>("users", schema);
  }

  public get model(): Model<IUser> {
    return this._model;
  }
}
