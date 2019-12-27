import { Router } from "express";
import { GeneratFirstPopulation } from "../../utiles/bordCreator/generatFirstPopulation";
import { Month } from "../../mongo/models/concreteBoard";
import { models } from "../../mongo/Connection";

const router = Router();

router.post("/emptyBoard", async (req, res) => {
  try {
    const board = await models.board.findById(req.query.board);
    const month = req.body.month as Month;
    const emptyBoard = new GeneratFirstPopulation(board, month);
    const result = emptyBoard.generateEmptyShifts();
    res.status(201).end(JSON.stringify(result));
  } catch (error) {
    res.status(406).end(JSON.stringify({ error: error.message }));
  }
});

export { router };