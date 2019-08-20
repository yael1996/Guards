import { SHIFT_TYPE } from "./shiftTypeEnum";
import { User } from "../user/user";

class Shift {
  public fromTime: any;
  public toTime: any;
  public shiftType: SHIFT_TYPE;
  public peope: Array<User>;

  constructor(fromTime: any, toTime: any, shiftType: SHIFT_TYPE) {
    this.fromTime = fromTime;
    this.toTime = toTime;
    this.shiftType = shiftType;
    this.peope = new Array<User>();
  }

  public addPersonToShift(person: User): void {
    this.peope.push(person);
  }
}
