import { Schema, model, Document, Model } from "mongoose";
import { BordSettings } from "../../../../common/objects/settings/boardSettings";

declare interface IBord extends Document {
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
      name: { type: String, required: true },
      description: { type: String },
      ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      settings: { type: Schema.Types.Mixed, ref: "", required: true },
      workersIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
      numShiftsForWorker: { type: Number }
    });

    this._model = model<IBord>("boards", schema);
  }

  public get model(): Model<IBord> {
    return this._model;
  }
}
