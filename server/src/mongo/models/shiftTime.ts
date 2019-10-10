import { Schema, model, Document, Model } from "mongoose";

declare interface IShiftTime extends Document {
  month: Month;
  fromTime: Date;
  toTime: Date;
}

export interface ShiftTimeModel extends Model<IShiftTime> {}

export class Month {
  private _model: Model<IShiftTime>;

  constructor() {
    const schema = new Schema({
      month: { type: Schema.Types.ObjectId, ref: "Month", required: true },
      fromTime: { type: Date, required: true },
      toTime: { type: Date, required: true }
    });

    this._model = model<IShiftTime>("shifttimes", schema);
  }

  public get model(): Model<IShiftTime> {
    return this._model;
  }
}
