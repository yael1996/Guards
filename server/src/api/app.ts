import express from "express";
import bodyParser from "body-parser";
import { router as boardRouter } from "./controllers/boardController";
import { router as userRouter } from "./controllers/userController";
import { router as concreteBoardRouter } from "./controllers/concreteBoardController";
import { router as constraintsRouter } from "./controllers/constraintsController";
import { router as algorithemRouter } from "./controllers/algorithemController";
import { router as testRouter } from "./controllers/testController";

const app = express();

var cors = require("cors");
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/board", boardRouter);
app.use("/user", userRouter);
app.use("/concreteBoard", concreteBoardRouter);
app.use("/constraints", constraintsRouter);
app.use("/algorithem", algorithemRouter);
app.use("/test", testRouter);

export { app };
