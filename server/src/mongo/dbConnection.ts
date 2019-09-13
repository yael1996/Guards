import { connect, connection, Connection } from "mongoose";
import { Bord, BordModel } from "./models/bord";
import { ShiftModel, Shift } from "./models/shift";
import { UserModel, User } from "./models/user";
import { ConstraintModel, Constraint } from "./models/constraint";

declare interface IModels {
  Bord: BordModel;
  Shift: ShiftModel;
  User: UserModel;
  Constraint: ConstraintModel;
}

export class DBConnection {
  private static instance: DBConnection;

  private db: Connection;
  private models: IModels;

  private constructor() {
    // ToDo : replace mongoUrl with process.env.MONGO_URI and add config
    const mongoURL =
      "mongodb://ec2-3-9-169-24.eu-west-2.compute.amazonaws.com:27017/guards";

    connect(
      mongoURL,
      { useNewUrlParser: true }
    );
    this.db = connection;
    this.db.on("open", this.connected);
    this.db.on("error", this.error);

    this.models = {
      Bord: new Bord().model,
      Shift: new Shift().model,
      User: new User().model,
      Constraint: new Constraint().model
    };
  }

  public static get Models() {
    if (!DBConnection.instance) {
      DBConnection.instance = new DBConnection();
    }
    return DBConnection.instance.models;
  }

  private connected() {
    console.log("Mongoose has connected");
  }

  private error(error) {
    console.log("Mongoose has errored", error);
  }
}
