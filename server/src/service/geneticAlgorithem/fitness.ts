import { Shift } from "../../../../common/objects/shifts/shift";
import { Month } from "../../../../common/objects/month/month";
import { ConstraintService } from "../constraints/constraintService";
import { ShiftTime } from "../../../../common/objects/shifts/shiftTime";

export class Fitness {
  private constraintsService: ConstraintService;
  constructor() {
    this.constraintsService = new ConstraintService();
  }

  // getFitness
  doAction = (month: Month, phenotype: Array<Shift>): number => {
    // use phenotype and possibly some other information
    // to determine the fitness number.  Higher is better, lower is worse.
    var fitness = 0;
    return fitness;
  };

  private workersConstraints(shift: Shift, month: Month): number {
    let numSatisfiedWorkers = 0;

    for (let worker of shift.workersIds) {
      if (
        !this.constraintsService.isShiftInWorkerConstraints(
          worker,
          shift.shiftTime,
          month
        )
      )
        // maby + more then one
        numSatisfiedWorkers++;
    }

    return numSatisfiedWorkers;
  }
  private isWorkerHasAvalibleShifts(): boolean {
    //ToDo
    return true;
  }
}
