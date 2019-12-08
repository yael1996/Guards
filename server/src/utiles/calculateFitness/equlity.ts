export class Equlity {
  private workersId: string[];
  private workersDissatisfied: { [id: string]: number };

  constructor() {}

  public getEqulityMeasurement(
    workersId: string[],
    workersDissatisfied: { [id: string]: number }
  ): number {
    this.workersId = workersId;
    this.workersDissatisfied = workersDissatisfied;

    let totalDissatisfied = this.getTotalDissatisfied();
    let avgDissatisfied = this.getWorkersAvgDissatisfied(totalDissatisfied);
    let sumVariance = this.getSumVariance(avgDissatisfied);

    return sumVariance / totalDissatisfied;
  }

  private getWorkersAvgDissatisfied(totalDissatisfied: number) {
    return totalDissatisfied / this.workersId.length;
  }

  private getTotalDissatisfied(): number {
    let totalDissatisfied = 0;
    for (let worker in this.workersDissatisfied) {
      totalDissatisfied += this.workersDissatisfied[worker];
    }

    return totalDissatisfied;
  }

  private getSumVariance(workersAvgDissatisfied: number) {
    let sumVariance = 0;

    for (let worker of this.workersId) {
      sumVariance += Math.abs(
        this.workersDissatisfied[worker] - workersAvgDissatisfied
      );
    }

    return sumVariance;
  }
}
