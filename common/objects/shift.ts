import { SHIFT_TYPE } from "./shiftTypeEnum";
import { ShiftTime } from "./shiftTime";

export class Shift {
  public id: string;
  public shiftTime: ShiftTime;
  public shiftType: SHIFT_TYPE;
  public workersIds: Array<string>;

  constructor(shiftTime: ShiftTime, shiftType: SHIFT_TYPE) {
    //this.id =
    this.shiftTime = shiftTime;
    this.shiftType = shiftType;
    this.workersIds = new Array<string>();
  }

  public addWorkerToShift(workerId: string): void {
    this.workersIds.push(workerId);
  }
}
