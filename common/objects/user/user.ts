import { USER_TYPE } from "./userTypeEnum";
import { Bord } from "../bord";

export class User {
  public type: USER_TYPE;
  public id: number;
  public dorbds: Array<Bord>;

  constructor() {}
}
