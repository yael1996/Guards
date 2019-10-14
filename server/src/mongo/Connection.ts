import { Board, register as registerBoard } from "./models/Board";
import { connect, Connection, Model } from "mongoose";
import { User, register as registerUser } from "./models/User";

interface Models {
    board: Model<Board>,
    user: Model<User>
}

connect("mongodb://ec2-3-9-169-24.eu-west-2.compute.amazonaws.com:27017/guards", { useNewUrlParser: true });

const models: Models = {
    board: registerBoard(),
    user: registerUser()
};

export { Connection, models };
