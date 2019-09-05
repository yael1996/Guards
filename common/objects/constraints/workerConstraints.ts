import { Constraint } from "./constraint";

export class WorkerConstraints {
  public workerId: string;
  public constraints: Array<Constraint>;

  constructor(workerId: string) {
    this.workerId = workerId;
    this.constraints = new Array<Constraint>();
  }
}
