import { Router } from "express";
import { GeneticAlgorithemController } from "./controllers/geneticAlgorithemController";

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
    this.appRouts.use("/", new GeneticAlgorithemController().routs);
  }
}
