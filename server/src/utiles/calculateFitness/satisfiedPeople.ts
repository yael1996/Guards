import { Shift } from "../../mongo/models/concreteBoard";
import { Constraint } from "../../mongo/models/User";

export class SatisfiedPeople {
  private monthShifts: Array<Shift>;
  private workersConstraints: { [id: string]: Constraint[] };

  constructor() {}

  public getSatisfiedPeopleMeasurement(
    monthShifts: Array<Shift>,
    workersConstraints: { [id: string]: Constraint[] }
  ): number {
    this.monthShifts = monthShifts;
    this.workersConstraints = workersConstraints;

    let notAppliedConstraints = this.getTotalNotAppliedConstraints();
    let totalConstraints = this.getTotalConstraintsByMonth();

    return notAppliedConstraints / totalConstraints;
  }

  private getTotalNotAppliedConstraints(): number {
    let notAppliedConstraints = 0;
    for (let workerId in this.workersConstraints) {
      notAppliedConstraints += this.getWorkerNotAppliedConstraints(workerId);
    }

    return notAppliedConstraints;
  }

  private getWorkerNotAppliedConstraints(workerId: string): number {
    let workerNotApplied = 0;
    let workerConstraint = this.workersConstraints[workerId];

    for (let constraint of workerConstraint) {
      let shift = this.getConstraintShift(constraint);
      if (shift.workersId.some(x => x == workerId)) workerNotApplied++;
    }
    return workerNotApplied;
  }

  private getConstraintShift(constraint: Constraint) {
    return this.monthShifts.find(
      x =>
        x.shiftTime.fromTime == constraint.time.fromTime &&
        x.shiftTime.toTime == constraint.time.toTime
    );
  }

  private getTotalConstraintsByMonth(): number {
    let totalConstraints = 0;
    for (let worker in this.workersConstraints) {
      totalConstraints += this.workersConstraints[worker].length;
    }

    return totalConstraints;
  }
}
