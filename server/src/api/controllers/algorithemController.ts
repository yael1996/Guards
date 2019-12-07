import { Router } from "express";
import { GeneticAlgorithm } from "../../geneticAlgorithem/geneticAlgorithem";
import { Month } from "../../mongo/models/concreteBoard";

const router = Router();
const algorithem = new GeneticAlgorithm();

router.post("/", async (req, res) => {
  try {
    const bordId = "1"; //req.query.bord; //req.param
    const month = req.body.month as Month;
    const result = await algorithem.runGeneticAlgorithm(bordId, month);
    res.status(201).end(JSON.stringify(result));
  } catch (error) {
    res.status(406).end(JSON.stringify({ error: error.message }));
  }
});

export { router };
