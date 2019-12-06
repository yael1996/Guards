import { Shift } from "../mongo/models/concreteBoard";
import { AmountShifts } from "../utiles/calculateFitness/amountShifts";
import { Equlity } from "../utiles/calculateFitness/equlity";
import { SatisfiedPeople } from "../utiles/calculateFitness/satisfiedPeople";
import { Constraint } from "../mongo/models/User";

export class Fitness {
  private amount: AmountShifts;
  private equlity: Equlity;
  private Satisfie: SatisfiedPeople;

  constructor() {
    this.amount = new AmountShifts();
    this.equlity = new Equlity();
    this.Satisfie = new SatisfiedPeople();
  }

  getFitness = (
    monthShifts: Shift[],
    workersDissatisfied: { [id: string]: number },
    workersConstraints: { [id: string]: Constraint[] },
    workersIds: string[]
  ): number => {
    // use phenotype and possibly some other information
    // to determine the fitness number.  Higher is better, lower is worse.
    let fitness = 0;
    fitness += this.fitness(
      monthShifts,
      workersDissatisfied,
      workersConstraints,
      workersIds
    );
    return fitness;
  };

  private fitness = (
    monthShifts: Shift[],
    workersDissatisfied: { [id: string]: number },
    workersConstraints: { [id: string]: Constraint[] },
    workersIds: string[]
  ) => {
    const amountShiftsPart = 0;
    const equityPart = 0;
    const satisfiedPeoplePart = 0;

    let amountShifts = this.getAmountShifts(workersIds, monthShifts);
    let equit = this.getEquity(workersIds, workersDissatisfied);
    let satisfiedPeople = this.getSatisfiedPeople(
      monthShifts,
      workersConstraints
    );

    return -(
      amountShifts * amountShiftsPart +
      equit * equityPart +
      satisfiedPeople * satisfiedPeoplePart
    );
  };

  private getAmountShifts = (
    workersId: string[],
    monthShifts: Shift[]
  ): number => {
    return this.amount.getAmountShiftMeasurement(workersId, monthShifts);
  };

  private getEquity = (
    workersId: string[],
    workersDissatisfied: { [id: string]: number }
  ): number => {
    return this.equlity.getEqulityMeasurement(workersId, workersDissatisfied);
  };

  private getSatisfiedPeople = (
    monthShifts: Shift[],
    workersConstraints: { [id: string]: Constraint[] }
  ): number => {
    return this.Satisfie.getSatisfiedPeopleMeasurement(
      monthShifts,
      workersConstraints
    );
  };
}
