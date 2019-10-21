import { Router } from "express";
import { models } from "../../mongo/connection"

const router = Router();

router.get("/", async (req, res) => {
  try {
    const boards = await models.user.find();
    res.status(200).end(boards);
  } catch (error) {
    res.status(500).end(error);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const board = await models.user.findById(req.params.id);
    res.status(200).end(board);
  } catch (error) {
    res.status(500).end(error);
  }
});
router.post("/", async (req, res) => {
  try {
    const board = await models.user.create(req.body);
    res.status(200).send(board);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const board = await models.user.findByIdAndRemove(req.params.id);
    res.status(200).send(board);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const board = await models.user.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).end(board);
  } catch (error) {
    res.status(500).end(error);
  }
});

export { router };