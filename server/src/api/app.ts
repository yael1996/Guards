import express from "express";
import bodyParser from "body-parser";
import { router as boardRouter } from "./controllers/boardController";
import { router as userRouter } from "./controllers/userController";
import { router as concreteBoardRouter } from "./controllers/concreteBoardController";
import { router as algorithemRouter } from "./controllers/algorithemController";

const app = express();

var cors = require("cors");
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/board", boardRouter);
app.use("/user", userRouter);
app.use("/concreteBoard", concreteBoardRouter);
app.use("/algorithem", algorithemRouter);

export { app };
