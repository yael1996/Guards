import { Router } from "express";
import { models } from "../../mongo/connection";

const router = Router();

router.get("/:metaId/:month", async (req, res) => {
    try {
        const { metaId, month } = req.params;
        const result = await models.concreteBoard.findOne({ metaId, month });
        if (!result) {
            return res.sendStatus(404);
        }
        res.status(200).end(result);
    } catch (error) {
        res.status(400).end(error);
    }
});
router.get("/:metaId", async (req, res) => {
    try {
        const { metaId } = req.params;
        const month = new Date().getMonth();
        const result = await models.concreteBoard.findOne({ metaId, month });
        if (!result) {
            return res.sendStatus(404);
        }
        res.status(200).end(JSON.stringify(result));
    } catch (error) {
        res.status(400).end({ error: error.message });
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
        res.status(200).end(JSON.stringify(result));
    } catch (error) {
        res.status(400).end({ error: error.message });
    }
});

export { router };