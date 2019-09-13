import { Schema, model, Document, Model } from "mongoose";
import { Guid } from "guid-typescript";
import { BordSettings } from "../../../../common/objects/settings/boardSettings";

declare interface IBord extends Document {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  settings: BordSettings;
  workersIds: Array<string>;
  numShiftsForWorker: number;
}

export interface BordModel extends Model<IBord> {}

export class Bord {
  private _model: Model<IBord>;

  constructor() {
    const schema = new Schema({
      id: {
        type: String,
        required: true,
        unique: true,
        default: Guid.create().toString()
      },
      name: { type: String, required: true },
      description: { type: String },
      ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      settings: { type: Schema.Types.Mixed, required: true },
      workersIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
      numShiftsForWorker: { type: Number }
    });

    this._model = model<IBord>("Bord", schema);
  }

  public get model(): Model<IBord> {
    return this._model;
  }
}
