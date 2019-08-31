import { Constraint } from "./constraint";
import { Month } from "../month";

export class WorkerConstraints {
  public workerId: string;
  public constraints: Array<Constraint>;

  constructor() {}
}
