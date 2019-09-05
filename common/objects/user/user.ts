import { USER_TYPE } from "./userTypeEnum";
import { Bord } from "../bord";

export class User {
  public type: USER_TYPE;
  public id: string;
  public dorbdsIds: Array<string>; // bordId

  constructor(type: USER_TYPE, id: string) {
    this.type = type;
    this.id = id;
    this.dorbdsIds = new Array<string>();
  }
}
