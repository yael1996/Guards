import { Router } from "express";
import { models } from "../../mongo/connection";
import { safeAsync } from "../../utiles/safeAsync";

const router = Router();

router.get("/:metaId", safeAsync(async (req, res) => {
  const { metaId } = req.params;
  const currentMonth = new Date().getMonth();
  res.redirect(`/${metaId}/${currentMonth}`);
}));
router.get("/:metaId/:month", safeAsync(async (req, res) => {
  const { metaId, month } = req.params;
  return await models.concreteBoard.find({ metaId, month })
}));
router.patch("/:id", safeAsync(async (req, res) => {
  const board = await models.board.findById(req.params.id);
  if (!board) {
    throw new Error("Entity not found!");
  }
  Object.getOwnPropertyNames(req.body).forEach((prop) => {
    board[prop] = req.body[prop];
  })
  return await board.save();
}));

export { router };