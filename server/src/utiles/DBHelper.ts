import { models } from "../mongo/connection";
import { Shift, Month } from "../mongo/models/concreteBoard";
import { Constraint } from "../mongo/models/User";

export class DBHelper {
  constructor() {}

  public async updateDissatisfiedInDB(best: Shift[]) {
    // ToDo
  }

  public async getBordById(boardId: string) {
    return await models.board.findById(boardId);
  }

  public async getAllWorkers(bordId: string): Promise<string[]> {
    const bord = await models.board.findById(bordId);
    if (!bord) {
      //ToDo
    }
    return bord.workerIds;
  }

  public async getUserById(workerId: string) {
    return await models.user.findById(workerId);
  }

  public async getWorkerDissatisfieds(allWorkers: string[]) {
    const workersDissatisfied: { [id: string]: number } = {};

    for (let workerId in allWorkers) {
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

    for (let workerId in allWorkers) {
      const user = await this.getUserById(workerId);
      if (!user) {
        //ToDo
      }
      // ToDo - refactor or get from db
      const usersConstraints = await user.monthlyConstraints.find(
        x => x.month.year == month.month && x.month.year == month.year
      ).constraints;

      workersConstraints[workerId] = usersConstraints;
    }

    return workersConstraints;
  }
}
