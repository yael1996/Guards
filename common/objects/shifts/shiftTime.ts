import { Month } from "../time/month";

export class ShiftTime {
  public fromTime: Date;
  public toTime: Date;

  constructor(fromTime, toTime) {
    this.fromTime = fromTime;
    this.toTime = toTime;
  }

  public getShiftMonth(): Month {
    return new Month(this.toTime.getFullYear(), this.toTime.getMonth());
  }
}
