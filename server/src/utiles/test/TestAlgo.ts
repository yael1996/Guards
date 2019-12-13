import { models } from "../../mongo/Connection";
import {
  DaySettings,
  ShiftSettings,
  RegularDaySettings,
  SpecialDaysSettings,
  SpecialDatesSettings,
  BoardSettings
} from "../../mongo/models/board";
import { USER_TYPE } from "../userTypeEnum";
import { ITestReasult } from "./ITestReasult";
import { GeneticAlgorithm } from "../../geneticAlgorithem/geneticAlgorithem";
import { Month, Shift } from "../../mongo/models/concreteBoard";
import { Fitness } from "../../geneticAlgorithem/fitness";
import { DBHelper } from "../DBHelper";
import { MonthlyConstraints, Constraint } from "../../mongo/models/User";

export class TestAlgo {
  private db: DBHelper;
  private algo: GeneticAlgorithm;
  constructor() {
    this.db = new DBHelper();
    this.algo = new GeneticAlgorithm();
  }

  public async getbest(boardId: string, month: Month, x, y, z) {
    const best = await this.algo.runGeneticAlgorithm(boardId, month, x, y, z);
    return best;
  }

  public async test(boardId: string, month: Month) {
    const testResult: ITestReasult[] = [];
    for (let i = 0.1; i <= 0.9; i = i + 0.1) {
      for (let j = 0.1; j <= 0.9; j = j + 0.1) {
        const x = i;
        const y = j;
        const z = 1 - (i + j);

        const best = await this.getbest(boardId, month, x, y, z);

        const workersIds = await this.db.getAllWorkers(boardId);
        const workersDissatisfied = await this.db.getWorkerDissatisfieds(
          workersIds
        );
        const workersConstraints = await this.db.getWorkerConstraints(
          workersIds,
          month
        );

        const fitness = new Fitness(
          workersDissatisfied,
          workersConstraints,
          workersIds,
          x,
          y,
          z
        );

        const bestFitness = await fitness.getFitness(best);

        testResult.push({ x: x, y: y, z: z, fitness: bestFitness });
      }
    }
    return testResult;
  }

  public async createFullBoard() {
    const NUM_USERS = 8;
    const board = await this.createBoard();
    await this.createUsers(board.id, NUM_USERS);
    return board.id;
  }

  private async createBoard() {
    let daySettings: DaySettings = {
      numShiftsInDay: 2,
      startHour: { hour: 10, minute: 0 }
    };

    let shiftSettings: ShiftSettings = {
      numWorkersInShift: 2,
      shiftLengthInHours: 4
    };

    let regularDaySettings: RegularDaySettings = {
      days: [1, 2, 3, 4],
      shiftSettings: shiftSettings,
      daySettings: daySettings
    };

    let specialDaySettings: SpecialDaysSettings = {
      days: null,
      shiftSettings: shiftSettings,
      daySettings: daySettings
    };

    let specialDateSettings: SpecialDatesSettings = {
      dates: null,
      shiftSettings: shiftSettings,
      daySettings: daySettings
    };

    let settings: BoardSettings = {
      regularDaySettings: regularDaySettings,
      specialDaysSettings: specialDaySettings,
      specialDatesSettings: specialDateSettings
    };

    let board = new models.board({
      name: "test",
      description: "test",
      ownerId: "5deb83d26ab2e3d9e344343d",
      boardSettings: settings,
      workerIds: []
    });

    return await models.board.create(board);
  }

  private async createUsers(boardId: string, numUsers: number) {
    const users = [];
    for (let i = 0; i < numUsers; i++) {
      let user = new models.user({
        firstname: i.toString(),
        lastname: i.toString(),
        email: i.toString() + ".gmail.com",
        type: USER_TYPE.MANAGER,
        boardId: boardId,
        unSatisfiedConstraints: 0
      });

      const result = await models.user.create(user);
      users.push(result);
    }

    const board = await models.board.findById(boardId);
    board.workerIds = users;
    await board.save();
  }

  public async addUsersConstraints(boardId: string, month: Month) {
    const best: Shift[] = await this.getbest(boardId, month, 0.2, 0.2, 0.6);
    const board = await models.board.findById(boardId);
    for (let workerId of board.workerIds) {
      const user = await models.user.findById(workerId);
      const constraints: Constraint[] = await this.getUserConstraint(best);
      const monthConstraint: MonthlyConstraints = {
        month: month,
        constraints: constraints
      };
      user.monthlyConstraints = [monthConstraint];
      await user.save();
    }
  }

  private async getUserConstraint(best) {
    const numShifts = best.length - 1;
    const index1 = Math.floor(Math.random() * numShifts);
    const index2 = this.getSecondIndex(index1, numShifts);

    const constraints: Constraint[] = [
      {
        text: "1",
        time: {
          fromTime: new Date(best[index1].shiftTime.fromTime),
          toTime: new Date(best[index1].shiftTime.toTime)
        }
      },
      {
        text: "2",
        time: {
          fromTime: new Date(best[index2].shiftTime.fromTime),
          toTime: new Date(best[index2].shiftTime.toTime)
        }
      }
    ];

    return constraints;
  }

  private getSecondIndex(index1, numShifts): number {
    let index2 = Math.floor(Math.random() * numShifts);
    while (index2 == index1) {
      index2 = Math.floor(Math.random() * numShifts);
    }
    return index2;
  }
}
