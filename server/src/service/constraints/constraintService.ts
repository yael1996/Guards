import { Shift } from "../../../../common/objects/shifts/shift";
import { Month } from "../../../../common/objects/month/month";
import { Constraint } from "../../../../common/objects/constraints/constraint";
import { ShiftTime } from "../../../../common/objects/shifts/shiftTime";
var _ = require("underscore");

export class ConstraintService {
  constructor() {}

  public getWorkerConstraintsByMonth(
    workerId: string,
    month: Month
  ): Array<Constraint> {
    return new Array<Constraint>();
  }
  public isShiftInWorkerConstraints(
    workerId: string,
    shiftTime: ShiftTime,
    month: Month
  ): boolean {
    const workerConstrains = this.getWorkerConstraintsByMonth(workerId, month);

    return !!workerConstrains.find(c => _.isEqual(c.shiftTime, shiftTime));
  }
}
