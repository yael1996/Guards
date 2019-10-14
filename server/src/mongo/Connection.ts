import { Board, register as registerBoard } from "./models/Board";
import { connect, Connection, Model } from "mongoose";

interface Models {
    board: Model<Board>
}

connect("mongodb://ec2-3-9-169-24.eu-west-2.compute.amazonaws.com:27017/guards", { useNewUrlParser: true });

const models: Models = {
    board: registerBoard()
};

export { Connection, models };