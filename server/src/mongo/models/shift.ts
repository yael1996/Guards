import { Schema, model, Document, Model } from "mongoose";

declare interface IShift extends Document {
  shiftTime: string;
  shiftType: string;
  workersIds: Array<string>;
}

export interface ShiftModel extends Model<IShift> {}

export class Shift {
  private _model: Model<IShift>;

  constructor() {
    const schema = new Schema({
      shiftTime: {
        type: Schema.Types.ObjectId,
        ref: "ShiftTime",
        required: true,
        unique: true
      },
      shiftType: {
        type: String,
        enum: ["REGULAR_DAY", "SPECIAL_DAY", "SPECIAL_DATE"],
        required: true
      },
      workersIds: [{ type: Schema.Types.ObjectId, ref: "User" }]
    });

    this._model = model<IShift>("shifts", schema);
  }

  public get model(): Model<IShift> {
    return this._model;
  }
}
