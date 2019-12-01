import { Router } from "express";
import { models } from "../../mongo/connection";

const router = Router();

router.get("/:metaId/:month", async (req, res) => {
    try {

    } catch (error) {
        res.status(400).end(error);
    }
    const { metaId, month } = req.params;
    const concreteData = await models.concreteBoard.findOne({ metaId, month });
});
router.get("/:metaId", async (req, res) => {
    const { metaId } = req.params;
    const month = new Date().getMonth();
    const concreteData = await models.concreteBoard.findOne({ metaId, month });
});
router.patch("/:id", async (req, res) => {
    try {
        const board = await models.concreteBoard.findById(req.params.id);
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