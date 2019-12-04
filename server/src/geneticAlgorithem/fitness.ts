import { Shift } from "../mongo/models/concreteBoard";
import { ConstraintService } from "../services/constraintService";

export class Fitness {
  private constraintsService: ConstraintService;
  constructor() {
    this.constraintsService = new ConstraintService();
  }

  getFitness = (monthShifts: Array<Shift>, workersIds: string[]): number => {
    // use phenotype and possibly some other information
    // to determine the fitness number.  Higher is better, lower is worse.
    let fitness = 0;
    //fitness += this.workersConstraints(monthShifts);
    return fitness;
  };

  private fitness = () => {
    const amountShiftsPart = 0;
    const equityPart = 0;
    const satisfiedPeoplePart = 0;

    let amountShifts = this.getAmountShifts();
    let equit = this.getEquity();
    let satisfiedPeople = this.getSatisfiedPeople();

    return -(
      amountShifts * amountShiftsPart +
      equit * equityPart +
      satisfiedPeople * satisfiedPeoplePart
    );
  };

  private getAmountShifts = (): number => {
    return 0;
  };

  private getEquity = (): number => {
    return 0;
  };

  private getSatisfiedPeople = (): number => {
    return 0;
  };
}

// private workersConstraints(monthShifts: Array<Shift>): number {
//   let numSatisfiedWorkers = 0;

//   for (let shift of monthShifts) {
//     const month = shift.shiftTime.month;

//     for (let worker of shift.workersId) {
//       if (
//         !this.constraintsService.isShiftInWorkerConstraints(
//           worker,
//           shift.shiftTime,
//           month
//         )
//       )
//         // maby + more then one
//         numSatisfiedWorkers++;
//     }
//   }

//   return numSatisfiedWorkers;
// }
