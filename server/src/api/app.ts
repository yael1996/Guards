import express from "express";
import bodyParser from "body-parser";
import { router as boardRouter } from "./controllers/boardController";
import { router as userRouter } from "./controllers/userController";
import { router as concreteBoardRouter } from "./controllers/concreteBoardController";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/board", boardRouter);
app.use("/user", userRouter);
app.use("/concreteBoard", concreteBoardRouter);

export { app };
