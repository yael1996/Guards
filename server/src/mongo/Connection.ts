import { config } from "dotenv";
import { connect, connection, Model, set, plugin } from "mongoose";
import findOneErrorPlugin from "mongoose-findone-or-error";
import { Board, register as registerBoard } from "./models/board";
import { User, register as registerUser } from "./models/User";

interface Models {
    board: Model<Board>,
    user: Model<User>
}

config();

let models: Models;

set("runValidators", true);
plugin(findOneErrorPlugin);

connect(process.env.DB, { useNewUrlParser: true }).then(() => {
    connection.db.on("open", () => console.log("Connected to mongo database"));
    connection.db.on("error", () => {
        console.error("Database connection failed!");
        process.exit(1);
    })

    models = {
        board: registerBoard(),
        user: registerUser()
    };
});

export { connection, models };
