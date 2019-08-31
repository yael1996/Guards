import { User } from "../user/user";
import { Bord } from "../bord";
import { Month } from "../month";
import { ShiftTime } from "../shiftTime";

// cant
export class Constraint {
  public shiftTime: ShiftTime;
  public reason?: string;

  constructor(shiftTime: ShiftTime, reason?: string) {}
}
