import { Router } from "express";
import { BordService } from "../../services/bordService";
import { models } from "../../mongo/connection"
import { Bord } from "../../../../common/objects/bord/bord";
import { Board } from "../../mongo/models/Board";
import { Response } from "express-serve-static-core";

const router = Router();

const safeAsync = (fn) => (req, res: Response) => {
  try {
    res.status(200).send(fn(req, res));
  } catch (error) {
    res.status(500).send(error);
  }
}

router.post("/add", async (req, res) => {
  try {
    const board = await models.board.create(req.body);
    res.status(200).send(board);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.post("/delete", async (req, res) => {
  try {
    const board = await models.board.findByIdAndRemove(req.body.id);
    res.status(200).send(board);
  } catch (error) {
    res.status(500).send(error);
  }
});



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

    this.routs.get("/testmongo", async (req, res) => {
      await this.bordService.addNewBord(req, res);
    });

    this.routs.post("/deleteBord", async (req, res) => {
      await this.bordService.deleteBord(req, res);
    });

    this.routs.get("/allBords", async (req, res) => {
      await this.bordService.getAllBords(req, res);
    });

    this.routs.get("/joinBord", async (req, res) => {
      await this.bordService.AddWorkerToBord(req, res);
    });

    this.routs.get("/leaveBord", async (req, res) => {
      await this.bordService.RemoveWorkerFromBord(req, res);
    });
  }
}
