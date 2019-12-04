import { Router } from "express";
import { models } from "../../mongo/connection";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const result = await models.user.find();
        res.status(200).end(JSON.stringify(result));
    } catch (error) {
        res.status(400).end({ error: error.message });
    }
    res.end(await models.user.find());
});
router.get("/:id", async (req, res) => {
    try {
        const result = await models.user.findById(req.params.id);
        res.status(200).end(JSON.stringify(result));
    } catch (error) {
        res.status(400).end({ error: error.message });
    }
});
router.post("/", async (req, res) => {
    try {
        const result = await models.user.create(req.body);
        res.status(201).end(JSON.stringify(result));
    } catch (error) {
        res.status(406).end({ error: error.message });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const result = await models.user.findByIdAndRemove(req.params.id);
        res.status(200).end(JSON.stringify(result));
    } catch (error) {
        res.status(400).end({ error: error.message });
    }
});
router.patch("/:id", async (req, res) => {
    try {
        const user = await models.user.findById(req.params.id);
        if (!user) {
            return res.sendStatus(404);
        }
        Object.getOwnPropertyNames(req.body).forEach((name) => {
            user[name] = req.body[name];
        });
        const result = await user.save();
        res.status(200).end(JSON.stringify(result));
    } catch (error) {
        res.status(400).end({ error: error.message });
    }
});

export { router };