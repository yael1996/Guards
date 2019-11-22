import express from "express";
import bodyParser from "body-parser";
import { router as boardRouter } from "./controllers/boardController/boardController";
import { router as userRouter } from "./controllers/userController";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/board", boardRouter);
app.use("/user", userRouter);

export { app };
