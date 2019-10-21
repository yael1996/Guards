import { Router } from "express";
import { GeneticAlgorithemController } from "./controllers/geneticAlgorithemController";
import { router as boardRouter } from "./controllers/boardController";
import { router as userRouter } from "./controllers/userController";

const router = Router();

router.use("/board", boardRouter);
router.use("/user", userRouter);

export { router };
