import { Month } from "../time/month";

export class ShiftTime {
  public fromTime: Date;
  public toTime: Date;
  public month: Month;

  constructor(fromTime, toTime) {
    this.fromTime = fromTime;
    this.toTime = toTime;
    this.month = this.getShiftMonth();
  }

  private getShiftMonth(): Month {
    return new Month(this.toTime.getFullYear(), this.toTime.getMonth());
  }
}
