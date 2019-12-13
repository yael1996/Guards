import { Router } from "express";
import { models } from "../../mongo/connection";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await models.board.find();
    res.status(200).json(result).end();
  } catch (error) {
    res.status(400).json({ error: error.message }).end();
  }
});
router.get("/:id", async (req, res) => {
  try {
    const result = await models.board.findById(req.params.id);
    if (!result) {
      return res.sendStatus(404);
    }
    res.status(200).json(result).end();
  } catch (error) {
    res.status(400).json({ error: error.message }).end();
  }
});
router.get("/user/:id", async (req, res) => {
  try {
    const result = await models.board.find({ workerIds: { $eq: req.params.id } });
    res.status(200).json(result || []).end();
  } catch (error) {
    res.status(400).json({ error: error.message }).end();
  }
})
router.get("/manager/:id", async (req, res) => {
  try {
    const result = await models.board.find({ ownerId: req.params.id });
    res.status(200).json(result || []).end();
  } catch (error) {
    res.status(400).json({ error: error.message }).end();
  }
})
router.post("/", async (req, res) => {
  try {
    const result = await models.board.create(req.body);
    res.status(201).json(result).end();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message }).end();
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const result = await models.board.findById(req.params.id);
    for (let workerId of result.workerIds) {
      await models.user.findByIdAndRemove(workerId);
    }
    await result.remove();
    res.status(200).json(result).end();
  } catch (error) {
    res.status(400).json({ error: error.message }).end();
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const board = await models.board.findById(req.params.id);
    if (!board) {
      return res.sendStatus(404);
    }
    Object.getOwnPropertyNames(req.body).forEach((prop) => {
      board[prop] = req.body[prop];
    });
    const result = await board.save();
    res.status(200).json(result).end();
  } catch (error) {
    res.status(400).json({ error: error.message }).end();
  }
});

export { router };
