import { Month } from "../month";
import { WorkerConstraints } from "./workerConstraints";

export class MonthConstraints {
  public constraints: Array<WorkerConstraints>;
  public month: Month;

  constructor(month: Month) {
    this.month = month;
    this.constraints = new Array<WorkerConstraints>();
  }

  public addWorkerConstraint(constraint: WorkerConstraints) {
    this.constraints.push(constraint);
  }

  public updateWorkerConstraint(constraint: WorkerConstraints) {
    this.constraints.find;
  }
}
