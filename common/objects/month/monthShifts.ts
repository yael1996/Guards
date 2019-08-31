import { Shift } from "../shift";
import { Month } from "../month";

export class MonthShifts {
  public monthShifts: Array<Shift>;
  public month: Month;

  constructor(month: Month) {
    this.month = month;
    this.monthShifts = new Array<Shift>();
  }

  public changeShiftsManually() {}
}
