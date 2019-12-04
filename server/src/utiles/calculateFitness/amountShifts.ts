import { Shift } from "../../mongo/models/concreteBoard";

export class AmountShifts {
  private workersSiftsCount: { [id: string]: number };

  constructor() {}

  public getAmountShiftMeasurement(
    workersId: Array<string>,
    monthShifts: Array<Shift>
  ): number {
    this.initWorkersSifts(workersId);
    this.getAmountForPerson(monthShifts);
    let sumVariance = 0;
    let avgShiftsForPerson = monthShifts.length / workersId.length;
    for (let worker of workersId) {
      sumVariance += Math.abs(
        this.workersSiftsCount[worker] - avgShiftsForPerson
      );
    }
    return sumVariance;
  }

  private initWorkersSifts(workersId: Array<string>) {
    for (let worker of workersId) {
      this.workersSiftsCount[worker] = 0;
    }
  }

  private getAmountForPerson(monthShifts: Array<Shift>) {
    for (let shift of monthShifts) {
      for (let worker of shift.workersId) {
        this.workersSiftsCount[worker]++;
      }
    }
  }
}
