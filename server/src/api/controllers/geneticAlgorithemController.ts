import { Router } from "express";
import { GeneticAlgorithm } from "../../geneticAlgorithem/geneticAlgorithem";
import { Month } from "../../mongo/models/concreteBoard";

export class GeneticAlgorithemController {
  public routs: Router;
  private algorithem: GeneticAlgorithm;

  constructor() {
    this.routs = Router();
    this.algorithem = new GeneticAlgorithm();
    this.InitRoutes();
  }

  private async InitRoutes() {
    this.routs.post("", async (req, res) => {
      const bordId = req.query.bord;
      const month = req.body.month as Month;

      const reasult = await this.algorithem.runGeneticAlgorithm(bordId, month);
      res.json({ reasult: reasult });
    });
  }
}
