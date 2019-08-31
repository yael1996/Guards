import { Month } from "../month";
import { Constraint } from "./constraint";

export class MonthConstraints {
  public constraints: Array<Constraint>;
  public month: Month;

  constructor(month: Month) {
    this.month = month;
    this.constraints = new Array<Constraint>();
  }

  public addConstraint(constraint: Constraint) {
    this.constraints.push(constraint);
  }
}
