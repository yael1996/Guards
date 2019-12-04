import { Shift } from "../mongo/models/concreteBoard";
import { ConstraintService } from "../services/constraintService";

export class Fitness {
  private constraintsService: ConstraintService;
  constructor() {
    this.constraintsService = new ConstraintService();
  }

  getFitness = (monthShifts: Array<Shift>): number => {
    // use phenotype and possibly some other information
    // to determine the fitness number.  Higher is better, lower is worse.
    let fitness = 0;
    fitness += this.workersConstraints(monthShifts);
    return fitness;
  };

  private workersConstraints(monthShifts: Array<Shift>): number {
    let numSatisfiedWorkers = 0;

    for (let shift of monthShifts) {
      const month = shift.shiftTime.month;

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
    }

    return numSatisfiedWorkers;
  }

  private avalibleShifts(): boolean {
    // ford farcenson
    return true;
  }
}
