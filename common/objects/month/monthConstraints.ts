import { Month } from "./month";
import { WorkerConstraints } from "../constraints/workerConstraints";
import { WorkerShifts } from "../shifts/workerShifts";

export class MonthConstraints {
  // maby seperate constraints and shifts into two objects
  public constraints: Array<WorkerConstraints>;
  //public shifts: Array<WorkerShifts>;
  public month: Month;

  constructor(month?: Month) {
    this.month = month ? month : this.getCurrentMonth();
    this.constraints = new Array<WorkerConstraints>();
    //this.shifts = new Array<WorkerShifts>();
  }

  private getCurrentMonth(): Month {
    const today = new Date();
    return new Month(today.getFullYear(), today.getMonth() + 1);
  }
}
