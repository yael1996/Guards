import { Router } from "express";
import { BordService } from "../../services/bordService";
import { Bord } from "../../../../common/objects/bord/bord";

export class BordController {
  public routs: Router;
  private bordService: BordService;

  constructor() {
    this.routs = Router();
    this.bordService = new BordService();
    this.InitRoutes();
  }

  private InitRoutes() {
    this.routs.post("/addBord", async (req, res) => {
      await this.bordService.addNewBord(req, res);
    });

    this.routs.get("/allBords", async (req, res) => {
      await this.bordService.getAllBords(req, res);
    });

    this.routs.get("/joinBord", async (req, res) => {
      await this.bordService.AddWorkerToBord(req, res);
    });

    this.routs.get("/leaveBord", async (req, res) => {
      const bordId = req.query.bord;
      const workerId = req.query.worker;
      const isSucceeded = this.bordService.RemoveWorkerFromBord(req, res);
      res.json({ success: isSucceeded });
    });
  }
}
