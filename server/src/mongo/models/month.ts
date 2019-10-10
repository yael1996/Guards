import { Schema, model, Document, Model } from "mongoose";

declare interface IMonth extends Document {
  month: number;
  year: number;
}

export interface MonthModel extends Model<IMonth> {}

export class Month {
  private _model: Model<IMonth>;

  constructor() {
    const schema = new Schema({
      month: { type: Number, required: true },
      year: { type: Number, required: true }
    });

    this._model = model<IMonth>("months", schema);
  }

  public get model(): Model<IMonth> {
    return this._model;
  }
}
