import { Month } from "./month";
import { WorkerConstraints } from "../constraints/workerConstraints";
import { WorkerShifts } from "../shifts/workerShifts";

export class MonthShifts {
  // maby seperate constraints and shifts into two objects
  public constraints: Array<WorkerConstraints>;
  public shifts: Array<WorkerShifts>;
  public month: Month;

  constructor(month: Month) {
    this.month = month;
    this.constraints = new Array<WorkerConstraints>();
    this.shifts = new Array<WorkerShifts>();
  }
}
