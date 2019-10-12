import { Month } from "../../../common/objects/time/month";
import { ShiftTime } from "../../../common/objects/shifts/shiftTime";
import { ConstraintDal } from "../mongo/dal/constraintDal";
import { Request, Response } from "express-serve-static-core";
import { Dictionary } from "underscore";

const _ = require("underscore");

export class ConstraintService {
  private dal: ConstraintDal;

  constructor() {
    this.dal = new ConstraintDal();
  }

  public async getMonthConstraints(req: Request<Dictionary<string>>, res: Response) {
    try {
      const month = req.body.month;
      const result = await this.dal.getByMonth(month);
      return res.send(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  public async getWorkerConstraints(req: Request<Dictionary<string>>, res: Response) {
    try {
      const workerId = req.body.worker;
      const result = await this.dal.getByMonth(workerId);
      return res.send(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  public async addConstraint(req: Request<Dictionary<string>>, res: Response) {
    try {
      const constraint = JSON.stringify(req.body.constraint);
      await this.dal.insert(constraint);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  public async deleteConstraint(req: Request<Dictionary<string>>, res: Response) {
    try {
      const shiftTime = req.body.shiftTime;
      const workerId = req.body.worker;
      await this.dal.remove(workerId, shiftTime);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  public isShiftInWorkerConstraints(
    workerId: string,
    shiftTime: ShiftTime,
    month: Month
  ): boolean {
    // const workerConstrains = this.getWorkerConstraints(workerId, month);
    //return !!workerConstrains.find(c => _.isEqual(c.shiftTime, shiftTime));

    return true;
  }
}
