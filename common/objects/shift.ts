import { SHIFT_TYPE } from "./shiftTypeEnum";
import { User } from "./user/user";

export class Shift {
  public id;
  public fromTime: any;
  public toTime: any;
  public shiftType: SHIFT_TYPE;
  public workers: Array<User>;

  constructor(fromTime: any, toTime: any, shiftType: SHIFT_TYPE) {
    //this.id =
    this.fromTime = fromTime;
    this.toTime = toTime;
    this.shiftType = shiftType;
    this.workers = new Array<User>();
  }

  public addPersonToShift(person: User): void {
    this.workers.push(person);
  }
}
