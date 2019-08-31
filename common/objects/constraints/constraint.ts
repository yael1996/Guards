import { User } from "../user/user";
import { Bord } from "../bord";

// cant
class Constraint {
  public fromDate: Date;
  public toDate: Date;
  public reason: string;
  public workerId: string;
  public bordId: string;

  constructor(
    bord: Bord,
    worker: User,
    fromDate: Date,
    toDate: Date,
    reason?: string
  ) {}
}
