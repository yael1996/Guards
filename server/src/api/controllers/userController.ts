import { Router } from "express";
import { models } from "../../mongo/connection";
import { safeAsync } from "../../utiles/safeAsync";

const router = Router();

router.get("/", safeAsync(async (req, res) => {
  return await models.user.find();
}));
router.get("/:id", safeAsync(async (req, res) => {
  return await models.user.findById(req.params.id);
}));
router.post("/", safeAsync(async (req, res) => {
  return await models.user.create(req.body);
}));
router.delete("/:id", safeAsync(async (req, res) => {
  return await models.user.findByIdAndRemove(req.params.id);
}));
router.patch("/:id", safeAsync(async (req, res) => {
  return await models.user.findByIdAndUpdate(req.params.id, req.body);
}));

export { router };