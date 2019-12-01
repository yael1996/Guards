import { Router } from "express";
import { models } from "../../mongo/connection";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const result = await models.board.find();
        res.status(200).end(result);
    } catch (error) {
        res.status(400).end(error);
    }
});
router.get("/:id", async (req, res) => {
    try {
        const result = await models.board.findById(req.params.id);
        if (!result) {
            return res.sendStatus(404);
        }
        res.status(200).end(result);
    } catch (error) {
        res.status(400).end(error);
    }
});
router.post("/", async (req, res) => {
    try {
        const result = await models.board.create(req.body);
        res.status(201).end(result);
    } catch (error) {
        res.status(400).end(error);
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const result = await models.board.findByIdAndRemove(req.params.id);
        res.status(200).end(result);
    } catch (error) {
        res.status(400).end(error);
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
        res.status(200).end(result);
    } catch (error) {
        res.status(400).end(error);
    }
});

export { router };