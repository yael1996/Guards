import { User } from "../user/user";
import { Bord } from "../bord";
import { Month } from "../month";

// cant
export class Constraint {
  public fromDate: Date;
  public toDate: Date;
  public workerId: string;
  public reason?: string;

  constructor(
    fromDate: Date,
    toDate: Date,
    workerId: string,
    reason?: string
  ) {}
}
