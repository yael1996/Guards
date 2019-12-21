import { Router } from "express";
import { models } from "../../mongo/connection";

const router = Router();

router.get("/:boardId/:year/:month", async (req, res) => {
  try {
    const { boardId, year, month } = req.params;
    const result = await models.concreteBoard.findOne({
      bordId: boardId,
      "month.month": month,
      "month.year": year
    });
    res.status(200).end(JSON.stringify(result));
  } catch (error) {
    res.status(400).end(JSON.stringify({ error: error.message }));
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const concreteBoard = await models.concreteBoard.findById(req.params.id);
    if (!concreteBoard) {
      return res.sendStatus(404);
    }
    Object.getOwnPropertyNames(req.body).forEach(prop => {
      concreteBoard[prop] = req.body[prop];
    });
    const result = await concreteBoard.save();
    res.status(200).end(JSON.stringify(result));
  } catch (error) {
    res.status(400).end(JSON.stringify({ error: error.message }));
  }
});

export { router };
