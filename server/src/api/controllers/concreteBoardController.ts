import { Router } from "express";
import { models } from "../../mongo/connection";

const router = Router();

router.get("/:metaId/:year/:month", async (req, res) => {
  try {
    const { metaId, year, month } = req.params;
    const result = await models.concreteBoard.findOne({ metaId, month: { year, month } });
    res.status(200).json(result || {}).end();
  } catch (error) {
    res.status(400).json(error).end();
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const concreteBoard = await models.concreteBoard.findById(req.params.id);
    if (!concreteBoard) {
      return res.sendStatus(404);
    }
    Object.getOwnPropertyNames(req.body).forEach((prop) => {
      concreteBoard[prop] = req.body[prop];
    });
    const result = await concreteBoard.save();
    res.status(200).json(result).end();
  } catch (error) {
    res.status(400).json({ error: error.message }).end();
  }
});

export { router };
