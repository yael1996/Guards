import { Router } from "express";
import { models } from "../../mongo/connection";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await models.board.find();
    res.status(200).end(JSON.stringify(result));
  } catch (error) {
    res.status(400).end(JSON.stringify({ error: error.message }));
  }
});
router.get("/:id", async (req, res) => {
  try {
    const result = await models.board.findById(req.params.id);
    if (!result) {
      return res.sendStatus(404);
    }
    res.status(200).end(JSON.stringify(result));
  } catch (error) {
    res.status(400).end(JSON.stringify({ error: error.message }));
  }
});
router.post("/", async (req, res) => {
  try {
    const result = await models.board.create(req.body);
    res.status(201).end(JSON.stringify(result));
  } catch (error) {
    console.log(error);
    res.status(400).end(JSON.stringify({ error: error.message }));
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const result = await models.board.findById(req.params.id);
    for (let workerId of result.workerIds) {
      await models.user.findByIdAndRemove(workerId);
    }
    await result.remove();
    res.status(200).end(JSON.stringify(result));
  } catch (error) {
    res.status(400).end(JSON.stringify({ error: error.message }));
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const board = await models.board.findById(req.params.id);
    if (!board) {
      return res.sendStatus(404);
    }
    Object.getOwnPropertyNames(req.body).forEach(prop => {
      board[prop] = req.body[prop];
    });
    const result = await board.save();
    res.status(200).end(JSON.stringify(result));
  } catch (error) {
    res.status(400).end(JSON.stringify({ error: error.message }));
  }
});

export { router };
