import { Router } from "express";
import { GeneratFirstPopulation } from "../../service/bordCreator/generatFirstPopulation";
import { Shift } from "../../../../common/objects/shifts/shift";
import { Bord } from "../../../../common/objects/bord";
import { MonthConstraints } from "../../../../common/objects/month/monthConstraints";

export class GeneticAlgorithemController {
  public routs: Router;

  constructor() {
    this.routs = Router();
    this.InitRoutes();
  }

  private InitRoutes() {
    this.routs.get("/run", async (req, res) => {
      this.generateFirstPopulation();

      // res.json({ application: "genetic algo" });
    });
  }

  private generateFirstPopulation(): Array<Array<Shift>> {
    const name = "test";
    const owner = "111";
    const numShiftsPerWorker = 10;

    const bord: Bord = new Bord(name, owner, numShiftsPerWorker);
    bord.addWorker("1");
    bord.addWorker("2");
    bord.addWorker("3");
    bord.addWorker("4");
    bord.addWorker("5");

    const monthConstraints: MonthConstraints = new MonthConstraints();

    const firstPopulation = new GeneratFirstPopulation(bord, monthConstraints);
    return firstPopulation.buildFirstPopulation(5);
  }
}
