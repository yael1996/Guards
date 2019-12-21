import { Router } from "express";
import { TestAlgo } from "../../utiles/test/TestAlgo";
import { Month } from "../../mongo/models/concreteBoard";
import { models } from "../../mongo/Connection";
import { GeneratFirstPopulation } from "../../utiles/bordCreator/generatFirstPopulation";

const router = Router();
const algorithem = new TestAlgo();

router.get("/best", async (req, res) => {
  try {
    const boardId = "5ded3d8f2c0fad49d4feae94";
    const month: Month = { year: 2019, month: 9 };
    const result = await algorithem.getbest(boardId, month, 0.1, 0.1, 0.8);
    res.status(200).end(JSON.stringify(result));
  } catch (error) {
    res.status(400).end(JSON.stringify({ error: error.message }));
  }
});

router.get("/", async (req, res) => {
  try {
    const boardId = "5ded3d8f2c0fad49d4feae94";
    const month: Month = { year: 2019, month: 9 };
    //const boardId = await algorithem.createFullBoard();
    //await algorithem.addUsersConstraints(boardId, month);
    const result = await algorithem.test(boardId, month);
    res.status(201).end(JSON.stringify(result));
  } catch (error) {
    res.status(406).end(JSON.stringify({ error: error.message }));
  }
});

router.get("/empty", async (req, res) => {
  try {
    const boardId = "5ded3d8f2c0fad49d4feae94";
    const month: Month = { year: 2019, month: 9 };
    const board = await models.board.findById(boardId);
    const emptyBoard = new GeneratFirstPopulation(board, month);
    const result = emptyBoard.generateEmptyShifts();
    res.status(201).end(JSON.stringify(result));
  } catch (error) {
    res.status(406).end(JSON.stringify({ error: error.message }));
  }
});

router.get("/build", async (req, res) => {
  try {
    const boardId = "5ded3d8f2c0fad49d4feae94";
    const month: Month = { year: 2019, month: 9 };
    //const boardId = await algorithem.createFullBoard();
    //await algorithem.addUsersConstraints(boardId, month);
    await algorithem.updateUsersHistory(boardId);
    res.status(406).end(JSON.stringify("done!"));
  } catch (error) {
    res.status(406).end(JSON.stringify({ error: error.message }));
  }
});

export { router };
