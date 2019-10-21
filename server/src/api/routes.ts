import { Router } from "express";
import { GeneticAlgorithemController } from "./controllers/geneticAlgorithemController";
import { router as boardRouter } from "./controllers/boardController";
import { ShiftsController } from "./controllers/shiftsController";

export class Routes {
  public appRouts: Router;

  constructor() {
    this.appRouts = Router();
    this.initMainRout();
    this.initOtherRouts();
  }

  private initMainRout() {
    this.appRouts.get("/api", (req, res) =>
      res.json({ application: "App is good" })
    );
  }

  private initOtherRouts() {
    this.appRouts.use("/geneticAlgo", new GeneticAlgorithemController().routs);
    this.appRouts.use("/board", boardRouter);
    this.appRouts.use("/shifts", new ShiftsController().routs);
  }
}
