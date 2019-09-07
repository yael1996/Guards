import { Router } from "express";
import { AlgorithemService } from "../../services/algorithemService";
import { Month } from "../../../../common/objects/time/month";

export class GeneticAlgorithemController {
  public routs: Router;
  private algorithemService: AlgorithemService;

  constructor() {
    this.routs = Router();
    this.algorithemService = new AlgorithemService();
    this.InitRoutes();
  }

  private InitRoutes() {
    this.routs.post("/geneticAlgo", async (req, res) => {
      const bordId = req.query.bord;
      const month = req.body.month as Month;

      const best = this.algorithemService.runAlgorithem(bordId, month);
      res.json({ best: JSON.stringify(best) });
    });
  }
}
