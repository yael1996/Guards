import { Board, register as registerBoard } from "./models/Board";
import { connect, connection, Model } from "mongoose";
import { User, register as registerUser } from "./models/User";

interface Models {
    board: Model<Board>,
    user: Model<User>
}

connect("mongodb://ec2-3-9-169-24.eu-west-2.compute.amazonaws.com:27017/guards", { useNewUrlParser: true });

connection.db.on("open", () => console.log("Connected to mongo database"));
connection.db.on("error", () => {
    console.error("Database connection failed!");
    process.exit(1);
})

const models: Models = {
    board: registerBoard(),
    user: registerUser()
};

export { connection, models };
