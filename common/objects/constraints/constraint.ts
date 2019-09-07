import { ShiftTime } from "../shifts/shiftTime";

// cant
export class Constraint {
  public shiftTime: ShiftTime;
  public workerId: string; //?
  public reason?: string;

  constructor(shiftTime: ShiftTime, workerId: string, reason?: string) {
    this.shiftTime = shiftTime;
    this.workerId = workerId;
    this.reason = reason;
  }
}
