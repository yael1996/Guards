import { SHIFT_TYPE } from "./shiftTypeEnum";
import { ShiftTime } from "./shiftTime";
import { Guid } from "guid-typescript";

export class Shift {
  //public id: string;
  public shiftTime: ShiftTime;
  public shiftType: SHIFT_TYPE;
  public workersIds: Array<string>;

  constructor(shiftTime: ShiftTime, shiftType: SHIFT_TYPE) {
    //this.id = Guid.create().toString();
    this.shiftTime = shiftTime;
    this.shiftType = shiftType;
    this.workersIds = new Array<string>();
  }

  public addWorkerToShift(workerId: string): void {
    this.workersIds.push(workerId);
  }
}
