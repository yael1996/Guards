import { Router } from "express";
import { GeneratFirstPopulation } from "../../utiles/bordCreator/generatFirstPopulation";
import { Month } from "../../mongo/models/concreteBoard";
import { models } from "../../mongo/Connection";

const router = Router();

router.get("/emptyBoard", async (req, res) => {
  try {
    const { board, year, month } = req.query;
    const theBoard = await models.board.findById(board);
    const theMonth = {
      year, month
    } as Month;
    const emptyBoard = new GeneratFirstPopulation(theBoard, theMonth);
    const result = emptyBoard.generateEmptyShifts();
    res.status(200).end(JSON.stringify(result));
  } catch (error) {
    res.status(400).end(JSON.stringify({ error: error.message }));
  }
});

export { router };