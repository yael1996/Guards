import { ShiftTime } from "../shifts/shiftTime";

// cant
export class Constraint {
  public shiftTime: ShiftTime;
  public reason?: string;

  constructor(shiftTime: ShiftTime, reason?: string) {
    this.shiftTime = shiftTime;
    this.reason = reason;
  }
}
