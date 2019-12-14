import { Router } from "express";
import { GeneratFirstPopulation } from "../../utiles/bordCreator/generatFirstPopulation";
import { Month } from "../../mongo/models/concreteBoard";
import { models } from "../../mongo/Connection";

const router = Router();

router.post("/emptyBoard", async (req, res) => {
  try {
    const bord = await models.board.findById(req.query.board);
    const month = req.body.month as Month;
    const emptyBoard = new GeneratFirstPopulation(bord, month);
    const result = emptyBoard.generateEmptyShifts();
    res
      .status(200)
      .json(result)
      .end();
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message })
      .end();
  }
});
