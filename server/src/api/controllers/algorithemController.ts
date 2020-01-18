import { Router } from "express";
import { GeneticAlgorithm } from "../../geneticAlgorithem/geneticAlgorithem";
import { Month } from "../../mongo/models/concreteBoard";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const boardId = req.body.board;
    const month = req.body.month as Month;
    const result = await new GeneticAlgorithm().runGeneticAlgorithm(boardId, month);
    res.status(201).end(JSON.stringify(result));
  } catch (error) {
    throw error;
    // res.status(406).end(JSON.stringify({ error: error.message }));
  }
});

export { router };
