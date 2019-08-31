import { BordSettings } from "./settings/boardSettings";
import { User } from "./user/user";

export class Bord {
  public id: number;
  public name: string;
  public description: string;
  public owner: User;
  public bordSettings: BordSettings;
  public workers: Array<User>;
  constructor() {}
}
