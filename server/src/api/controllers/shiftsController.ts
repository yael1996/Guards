import { ShiftsService } from "../../services/shiftsService";
import { Router } from "express";
import { Month } from "../../../../common/objects/time/month";

export class ShiftsController {
  public routs: Router;
  private shiftsService: ShiftsService;

  constructor() {
    this.routs = Router();
    this.shiftsService = new ShiftsService();
    this.InitRoutes();
  }

  private async InitRoutes() {
    this.routs.post("/monthShifts", async (req, res) => {
      const month = req.body.month as Month;
      const monthShifts = this.shiftsService.getMonthShifts(month);
      res.json({ shifts: monthShifts });
    });
  }
}
