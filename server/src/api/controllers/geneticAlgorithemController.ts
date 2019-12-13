// import { Router } from "express";
// import { AlgorithemService } from "../../services/algorithemService";
// import { Month } from "../../../../common/objects/time/month";
// const Hebcal = require("hebcal");
// export class GeneticAlgorithemController {
//   public routs: Router;
//   private algorithemService: AlgorithemService;
//
//   constructor() {
//     this.routs = Router();
//     this.algorithemService = new AlgorithemService();
//     this.InitRoutes();
//   }
//
//   private async InitRoutes() {
//     this.routs.post("", async (req, res) => {
//       const bordId = req.query.bord;
//       const month = req.body.month as Month;
//
//       const best = await this.algorithemService.runAlgorithem(bordId, month);
//       res.json({ best: best });
//     });
//   }
// }
