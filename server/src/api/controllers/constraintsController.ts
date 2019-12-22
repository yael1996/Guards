import { Router } from "express";
import { EmptyMonthBord } from "../../utiles/bordCreator/emptyMonthBord";
import { Month } from "../../mongo/models/concreteBoard";
import { models } from "../../mongo/Connection";

const router = Router();

router.post("/emptyBoard", async (req, res) => {
  try {
    const bord = await models.board.findById(req.query.board);
    const month = req.body.month as Month;
    const emptyBoard = new EmptyMonthBord(month, bord.boardSettings);
    res
      .status(200)
      .json(emptyBoard)
      .end();
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message })
      .end();
  }
});

export { router };