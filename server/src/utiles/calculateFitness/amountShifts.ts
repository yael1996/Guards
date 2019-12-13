import { Shift } from "../../mongo/models/concreteBoard";

export class AmountShifts {
  private workersId: string[];
  private monthShifts: Shift[];

  constructor() {}

  public getAmountShiftMeasurement(
    workersId: string[],
    monthShifts: Shift[]
  ): number {
    this.workersId = workersId;
    this.monthShifts = monthShifts;

    let workerNumShifts = this.getWorkerNumShifts();
    let workersAvgShifts = this.getWorkersAvgShifts();
    let sumVariance = this.getSumVariance(workerNumShifts, workersAvgShifts);

    return sumVariance / monthShifts.length;
  }

  private getWorkerNumShifts() {
    let workersSiftsCount = this.initWorkersSifts();

    for (let shift of this.monthShifts) {
      for (let worker of shift.workersId) {
        workersSiftsCount[worker]++;
      }
    }

    return workersSiftsCount;
  }

  private initWorkersSifts(): { [id: string]: number } {
    let workersSiftsCount: { [id: string]: number } = {};
    for (let worker of this.workersId) {
      workersSiftsCount[worker] = 0;
    }

    return workersSiftsCount;
  }

  private getWorkersAvgShifts() {
    return this.monthShifts.length / this.workersId.length;
  }

  private getSumVariance(
    workersSiftsCount: { [id: string]: number },
    avgShiftsForPerson: number
  ) {
    let sumVariance = 0;

    for (let worker of this.workersId) {
      sumVariance += Math.abs(workersSiftsCount[worker] - avgShiftsForPerson);
    }

    return sumVariance;
  }
}
