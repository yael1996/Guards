import { Schema, model, Document, Model } from "mongoose";

declare interface IUser extends Document {}

export interface UserModel extends Model<IUser> {}

export class User {
  private _model: Model<IUser>;

  constructor() {
    const schema = new Schema({
      name: { type: String, required: true }
    });

    this._model = model<IUser>("User", schema);
  }

  public get model(): Model<IUser> {
    return this._model;
  }
}
