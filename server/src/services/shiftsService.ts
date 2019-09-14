import { ShiftDal } from "../mongo/dal/shiftDal";

export class ShiftsService {
  private dal: ShiftDal;

  constructor() {
    this.dal = new ShiftDal();
  }

  public async getWorkerShifts(req, res) {}

  public async getShifts(req, res) {
    try {
      const month = req.body.month;
      const result = await this.dal.getByMonth(month);
      return res.send(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  public async addWorkerToShift(req, res) {}

  public async deleteWorkerFromShift(req, res) {}
}
