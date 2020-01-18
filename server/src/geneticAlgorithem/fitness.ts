import { Shift } from "../mongo/models/concreteBoard";
import { AmountShifts } from "../utiles/calculateFitness/amountShifts";
import { Equlity } from "../utiles/calculateFitness/equlity";
import { SatisfiedPeople } from "../utiles/calculateFitness/satisfiedPeople";
import { Constraint } from "../mongo/models/User";
import { createGraph } from "../utiles/fordFulkerson";
import { Board } from "../mongo/models/board";

export class Fitness {
  private amount: AmountShifts;
  private equlity: Equlity;
  private satisfie: SatisfiedPeople;

  private amountShiftsPart;
  private equityPart;
  private satisfiedPeoplePart;

  private workersDissatisfied;
  private workersConstraints;
  private workersIds;

  private board: Board;

  constructor(
    workersDissatisfied,
    workersConstraints,
    workersIds,
    amountShiftsPart,
    equityPart,
    satisfiedPeoplePart,
    board: Board
  ) {
    this.amount = new AmountShifts();
    this.equlity = new Equlity();
    this.satisfie = new SatisfiedPeople();
    this.workersDissatisfied = workersDissatisfied;
    this.workersConstraints = workersConstraints;
    this.workersIds = workersIds;
    this.amountShiftsPart = amountShiftsPart;
    this.equityPart = equityPart;
    this.satisfiedPeoplePart = satisfiedPeoplePart;
    this.board = board;
  }

  getFitness = (monthShifts: Shift[]): number => {
    // use phenotype and possibly some other information
    // to determine the fitness number.  Higher is better, lower is worse.

    this.fixMonthDates(monthShifts);

    let fitness = 0;
    fitness += this.fitness(
      monthShifts,
      this.workersDissatisfied,
      this.workersConstraints,
      this.workersIds
    );
    return fitness;
  };

  private fixMonthDates(monthShifts) {
    for (let shift of monthShifts) {
      if (!(shift.shiftTime.fromTime instanceof Date)) {
        shift.shiftTime.fromTime = new Date(
          Date.parse(shift.shiftTime.fromTime)
        );
        shift.shiftTime.toTime = new Date(Date.parse(shift.shiftTime.toTime));
      }
    }
  }

  private fitness = (
    monthShifts: Shift[],
    workersDissatisfied: { [id: string]: number },
    workersConstraints: { [id: string]: Constraint[] },
    workersIds: string[]
  ) => {
    let amountShifts = this.getAmountShifts(workersIds, monthShifts);
    let equit = this.getEquity(workersIds, workersDissatisfied);
    let satisfiedPeople = this.getSatisfiedPeople(
      monthShifts,
      workersConstraints
    );
    
    const { boardSettings: {
              regularDaySettings: { shiftSettings: regularSettings },
              specialDaysSettings: { shiftSettings: specialSettings },
              specialDatesSettings: { shiftSettings: holidaySettings }
            } } = this.board;
    
    const [ff, maxFlow] = createGraph(
      monthShifts,
      regularSettings,
      specialSettings,
      holidaySettings,
      workersConstraints
    );

    const { value } = ff();
    
    let fitness = value;
    if (value === maxFlow) return Number.MAX_SAFE_INTEGER;

    fitness -= (
      amountShifts * this.amountShiftsPart +
      equit * this.equityPart +
      satisfiedPeople * this.satisfiedPeoplePart
    );

    return fitness;
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
    return this.satisfie.getSatisfiedPeopleMeasurement(
      monthShifts,
      workersConstraints
    );
  };
}
