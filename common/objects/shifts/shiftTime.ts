import { Month } from "../time/month";

export class ShiftTime {
  public month: Month;
  public fromTime: Date;
  public toTime: Date;

  constructor(fromTime: Date, toTime: Date) {
    this.fromTime = fromTime;
    this.toTime = toTime;
    this.month = this.getShiftMonth(toTime);
  }

  private getShiftMonth(toTime: Date): Month {
    return new Month(toTime.getFullYear(), toTime.getMonth());
  }
}
