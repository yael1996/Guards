import { Router } from "express";
import { models } from "../../mongo/connection";
import { safeAsync } from "../../utiles/safeAsync";

const router = Router();

router.get("/", safeAsync(async (req, res) => {  
  return await models.board.find();
}));
router.get("/:id", safeAsync(async (req, res) => {
  return await models.board.findById(req.params.id);
}));
router.post("/", safeAsync(async (req, res) => {
  return await models.board.create(req.body);
}));
router.delete("/:id", safeAsync(async (req, res) => {
  return await models.board.findByIdAndRemove(req.params.id);
}));
router.patch("/:id", safeAsync(async (req, res) => {
  const board = await models.board.findById(req.params.id);
  Object.getOwnPropertyNames(req.body).forEach((prop) => {
    board[prop] = req.body[prop];
  })
  return await board.save();
}));

export { router };