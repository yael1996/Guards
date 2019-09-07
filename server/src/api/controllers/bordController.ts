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

  private async InitRoutes() {
    this.routs.post("/addBord", async (req, res) => {
      const bord = req.body.bord as Bord;
      const isSucceeded = this.bordService.addNewBord(bord);
      res.json({ success: isSucceeded });
    });

    this.routs.get("/joinBord", async (req, res) => {
      const bordId = req.query.bord;
      const workerId = req.query.worker;
      const isSucceeded = this.bordService.AddWorkerToBord(workerId, bordId);
      res.json({ success: isSucceeded });
    });

    this.routs.get("/leaveBord", async (req, res) => {
      const bordId = req.query.bord;
      const workerId = req.query.worker;
      const isSucceeded = this.bordService.RemoveWorkerFromBord(
        workerId,
        bordId
      );
      res.json({ success: isSucceeded });
    });

    this.routs.get("/allBords", async (req, res) => {
      const allBords = this.bordService.getAllBords();
      res.json({ bordsList: allBords });
    });
  }
}
