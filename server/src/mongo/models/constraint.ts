import { Schema, model, Document, Model } from "mongoose";
import { ShiftTime } from "../../../../common/objects/shifts/shiftTime";

declare interface IConstraint extends Document {
  // id: string;
  shiftTime: ShiftTime;
  workerId: string;
  reason: string;
}

export interface ConstraintModel extends Model<IConstraint> {}

export class Constraint {
  private _model: Model<IConstraint>;

  constructor() {
    const schema = new Schema({
      // id: { type: String, required: true, unique: true },
      shiftTime: { type: Schema.Types.Mixed, required: true },
      workerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
      },
      reason: { type: String, required: false }
    });

    this._model = model<IConstraint>("Constraint", schema);
  }

  public get model(): Model<IConstraint> {
    return this._model;
  }
}
