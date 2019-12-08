import { Shift } from "../../mongo/models/concreteBoard";
import { Constraint } from "../../mongo/models/User";
import { DBHelper } from "../DBHelper";

export class SatisfiedPeople {
  private monthShifts: Shift[];
  private workersConstraints: { [id: string]: Constraint[] };
  private utiles: DBHelper;

  constructor() {}

  public getSatisfiedPeopleMeasurement(
    monthShifts: Shift[],
    workersConstraints: { [id: string]: Constraint[] }
  ): number {
    this.monthShifts = monthShifts;
    this.workersConstraints = workersConstraints;
    this.utiles = new DBHelper();

    let notAppliedConstraints = this.getTotalNotAppliedConstraints();
    let totalConstraints = this.getTotalConstraintsByMonth();

    return notAppliedConstraints / totalConstraints;
  }

  private getTotalNotAppliedConstraints(): number {
    let notAppliedConstraints = 0;
    for (let workerId in this.workersConstraints) {
      notAppliedConstraints += this.utiles.getWorkerNotAppliedConstraints(
        workerId,
        this.monthShifts,
        this.workersConstraints
      );
    }

    return notAppliedConstraints;
  }

  private getTotalConstraintsByMonth(): number {
    let totalConstraints = 0;
    for (let worker in this.workersConstraints) {
      totalConstraints += this.workersConstraints[worker].length;
    }

    return totalConstraints;
  }
}
