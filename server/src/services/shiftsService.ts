import { ShiftDal } from "../mongo/dal/shiftDal";
import { Request, Dictionary, Response } from "express-serve-static-core";

export class ShiftsService {
  private dal: ShiftDal;

  constructor() {
    this.dal = new ShiftDal();
  }

  public async getWorkerShifts(req: Request<Dictionary<string>>, res: Response) {}

  public async getShifts(req: Request<Dictionary<string>>, res: Response) {
    try {
      const month = req.body.month;
      const result = await this.dal.getByMonth(month);
      return res.send(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  public async addWorkerToShift(req: Request<Dictionary<string>>, res: Response) {}

  public async deleteWorkerFromShift(req: Request<Dictionary<string>>, res: Response) {}
}
