import { SHIFT_TYPE } from "./shiftTypeEnum";

export class Shift {
  public id: string;
  public fromTime: Date;
  public toTime: Date;
  public shiftType: SHIFT_TYPE;
  public workersIds: Array<string>;

  constructor(fromTime: Date, toTime: Date, shiftType: SHIFT_TYPE) {
    //this.id =
    this.fromTime = fromTime;
    this.toTime = toTime;
    this.shiftType = shiftType;
    this.workersIds = new Array<string>();
  }

  public addPersonToShift(workerId: string): void {
    this.workersIds.push(workerId);
  }
}
