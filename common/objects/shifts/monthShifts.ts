import { Month } from "../time/month";
import { Shift } from "./shift";

export class MonthShifts {
  public month: Month;
  public shifts: Array<Shift>;

  constructor(month: Month) {
    this.month = month;
    this.shifts = new Array<Shift>();
  }
}
