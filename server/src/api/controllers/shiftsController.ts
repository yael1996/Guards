import { ShiftsService } from "../../services/shiftsService";
import { Router } from "express";

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
      await this.shiftsService.getShifts(req, res);
    });
  }
}
