import { Schema, model, Document, Model } from "mongoose";
import { ShiftTime } from "../../../../common/objects/shifts/shiftTime";
import { SHIFT_TYPE } from "../../../../common/objects/shifts/shiftTypeEnum";

const shiftTypes = ["REGULAR_DAY", "SPECIAL_DAY", "SPECIAL_DATE"];

declare interface IShift extends Document {
  id: string;
  shiftTime: ShiftTime;
  shiftType: SHIFT_TYPE;
  workersIds: Array<string>;
}

export interface ShiftModel extends Model<IShift> {}

export class Shift {
  private _model: Model<IShift>;

  constructor() {
    const schema = new Schema({
      id: { type: String, required: true, unique: true },
      shiftTime: { type: Schema.Types.Mixed, required: true },
      shiftType: {
        type: String,
        enum: shiftTypes,
        required: true
      },
      workersIds: [{ type: Schema.Types.ObjectId, ref: "User" }]
    });

    this._model = model<IShift>("Shift", schema);
  }

  public get model(): Model<IShift> {
    return this._model;
  }
}
