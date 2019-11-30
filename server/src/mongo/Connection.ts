import { config } from "dotenv";
import { connect, connection, Model, set, plugin } from "mongoose";
import { Board, register as registerBoard } from "./models/board";
import { User, register as registerUser } from "./models/User";
import { ConcreteBoard, register as registerConcreteBoard } from "./models/concreteBoard";

interface Models {
    board: Model<Board>,
    concreteBoard: Model<ConcreteBoard>,
    user: Model<User>
}

config();

let models: Models;

set("runValidators", true);

connect(process.env.DB, { useNewUrlParser: true }).then(() => {
    connection.db.on("open", () => console.log("Connected to mongo database"));
    connection.db.on("error", () => {
        console.error("Database connection failed!");
        process.exit(1);
    })

    models = {
        board: registerBoard(),
        concreteBoard: registerConcreteBoard(),
        user: registerUser()
    };
});

export { connection, models };
