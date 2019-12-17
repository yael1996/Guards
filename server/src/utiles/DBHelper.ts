import { models } from "../mongo/connection";
import { Shift, Month } from "../mongo/models/concreteBoard";
import { Constraint } from "../mongo/models/User";

export class DBHelper {
  constructor() {}

  public async updateDissatisfiedInDB(
    best: Shift[],
    workers: string[],
    month: Month
  ) {
    const workersConstraints = this.getWorkerConstraints(workers, month);
    for (let worker in workers) {
      const dissatisfieds = await this.getWorkerNotAppliedConstraints(
        worker,
        best,
        workersConstraints
      );

      const user = await this.getUserById(worker);
      const old = user.unSatisfiedConstraints;
      user.unSatisfiedConstraints = old + dissatisfieds;
      await user.save();
    }
  }

  public getWorkerNotAppliedConstraints(
    workerId: string,
    monthShifts: Shift[],
    workersConstraints
  ): number {
    let workerNotApplied = 0;

    for (let constraint of workersConstraints[workerId]) {
      let shift = this.getConstraintShift(constraint, monthShifts);
      if (shift && shift.workersId.some(x => x == workerId)) workerNotApplied++;
    }
    return workerNotApplied;
  }

  private getConstraintShift(constraint: Constraint, monthShifts: Shift[]) {
    return monthShifts.find(
      x =>
        x.shiftTime.fromTime.getTime() === constraint.time.fromTime.getTime() &&
        x.shiftTime.toTime.getTime() === constraint.time.toTime.getTime()
    );
  }

  public async saveBestToDB(best: Shift[][], month: Month, bordId: string) {
    return await new models.concreteBoard({
      bordId: bordId,
      month: month,
      shifts: best
    }).save();
  }

  public async getBordById(boardId: string) {
    return await models.board.findById(boardId);
  }

  public async getAllWorkers(bordId: string): Promise<string[]> {
    const bord = await models.board.findById(bordId);
    if (!bord) {
      //ToDo
    }

    return bord.workerIds.map(x => x.toString());
  }

  public async getUserById(workerId: string) {
    return await models.user.findById(workerId);
  }

  public async getWorkerDissatisfieds(allWorkers: string[]) {
    const workersDissatisfied: { [id: string]: number } = {};

    for (let workerId of allWorkers) {
      const user = await this.getUserById(workerId);
      if (!user) {
        //ToDo
      }
      workersDissatisfied[workerId] = user.unSatisfiedConstraints;
    }

    return workersDissatisfied;
  }

  public async getWorkerConstraints(allWorkers: string[], month: Month) {
    const workersConstraints: { [id: string]: Constraint[] } = {};

    for (let workerId of allWorkers) {
      const user = await this.getUserById(workerId);
      if (!user) {
        //ToDo
      }
      // ToDo - refactor or get from db
      if (user.monthlyConstraints && user.monthlyConstraints.length > 0) {
        const usersConstraints = await user.monthlyConstraints.find(
          x => x.month.year == month.year && x.month.month == month.month
        ).constraints;

        workersConstraints[workerId] = usersConstraints;
      } else {
        workersConstraints[workerId] = [];
      }
    }

    return workersConstraints;
  }
}
