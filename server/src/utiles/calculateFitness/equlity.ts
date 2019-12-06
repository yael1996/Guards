export class Equlity {
  private workersId: Array<string>;
  constructor() {}

  public getEqulityMeasurement(workersId: Array<string>): number {
    this.workersId = workersId;

    let workerNumDissatisfied = this.getWorkersDissatisfied();
    let totalDissatisfied = this.getTotalDissatisfied(workerNumDissatisfied);
    let avgDissatisfied = this.getWorkersAvgDissatisfied(totalDissatisfied);
    let sumVariance = this.getSumVariance(
      workerNumDissatisfied,
      avgDissatisfied
    );

    return sumVariance / totalDissatisfied;
  }

  private getWorkersDissatisfied() {
    let workersDissatisfied: { [id: string]: number } = {};

    for (let worker of this.workersId) {
      workersDissatisfied[worker] = this.getWorkerDissatisfiedFromDB(worker);
    }

    return workersDissatisfied;
  }

  private getWorkerDissatisfiedFromDB(worker: string): number {
    // get from db
    return 0;
  }

  private getWorkersAvgDissatisfied(totalDissatisfied: number) {
    return totalDissatisfied / this.workersId.length;
  }

  private getTotalDissatisfied(workersDissatisfied: {
    [id: string]: number;
  }): number {
    let totalDissatisfied = 0;
    for (let worker in workersDissatisfied) {
      totalDissatisfied += workersDissatisfied[worker];
    }

    return totalDissatisfied;
  }

  private getSumVariance(
    workerNumDissatisfied: { [id: string]: number },
    workersAvgDissatisfied: number
  ) {
    let sumVariance = 0;

    for (let worker of this.workersId) {
      sumVariance += Math.abs(
        workerNumDissatisfied[worker] - workersAvgDissatisfied
      );
    }

    return sumVariance;
  }
}
