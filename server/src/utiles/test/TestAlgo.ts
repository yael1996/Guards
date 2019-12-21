import { models } from "../../mongo/Connection";
import {
  DaySettings,
  ShiftSettings,
  IndexSettings,
  DateSettings,
  BoardSettings
} from "../../mongo/models/board";
import { USER_TYPE } from "../userTypeEnum";
import { ITestReasult } from "./ITestReasult";
import { GeneticAlgorithm } from "../../geneticAlgorithem/geneticAlgorithem";
import { Month, Shift } from "../../mongo/models/concreteBoard";
import { Fitness } from "../../geneticAlgorithem/fitness";
import { DBHelper } from "../DBHelper";
import { MonthlyConstraints, Constraint } from "../../mongo/models/User";
import { GeneratFirstPopulation } from "../bordCreator/generatFirstPopulation";

export class TestAlgo {
  private db: DBHelper;
  private algo: GeneticAlgorithm;
  public NUM_WORKE_CONSTRAINTSR = 10;
  constructor() {
    this.db = new DBHelper();
    this.algo = new GeneticAlgorithm();
  }

  public async getbest(boardId: string, month: Month, x, y, z) {
    const best = await this.algo.runGeneticAlgorithm(boardId, month, x, y, z);
    //const fitness = this.algo.getBestFitness();
    return best;
  }

  private async getBestFitness(boardId, month, x, y, z, best) {
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

    return await fitness.getFitness(best);
  }

  public async test(boardId: string, month: Month) {
    const testResult: ITestReasult[] = [];
    for (let i = 0.1; i <= 0.9; i = i + 0.1) {
      for (let j = 0.1; j <= 0.9; j = j + 0.1) {
        const x = i;
        const y = j;
        const z = 1 - (i + j);
        if (x + y <= 1) {
          const best = await this.getbest(boardId, month, x, y, z);
          // const bestFitness = await this.getBestFitness(
          //   boardId,
          //   month,
          //   x,
          //   y,
          //   z,
          //   best
          // );
          const bestFitness = this.algo.getBestFitness();
          testResult.push({ x: x, y: y, z: z, fitness: bestFitness });
        }
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

    let regularDaySettings: IndexSettings = {
      days: [1, 2, 3, 4],
      shiftSettings: shiftSettings,
      daySettings: daySettings
    };

    let specialDaySettings: IndexSettings = {
      days: null,
      shiftSettings: shiftSettings,
      daySettings: daySettings
    };

    let specialDateSettings: DateSettings = {
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

  public async updateUsersHistory(boardId) {
    const board = await models.board.findById(boardId);
    for (let workerId of board.workerIds) {
      const user = await models.user.findById(workerId);
      user.unSatisfiedConstraints = Math.floor(Math.random() * 21);
      await user.save();
    }
  }

  public async addUsersConstraints(boardId: string, month: Month) {
    const board = await models.board.findById(boardId);
    const emptyBoard = new GeneratFirstPopulation(
      board,
      month
    ).generateEmptyShifts();
    for (let workerId of board.workerIds) {
      const user = await models.user.findById(workerId);
      const constraints: Constraint[] = await this.getUserConstraint(
        emptyBoard
      );
      const monthConstraint: MonthlyConstraints = {
        month: month,
        constraints: constraints
      };
      user.monthlyConstraints = [monthConstraint];
      await user.save();
    }
  }

  private async getUserConstraint(emptyBoard) {
    const indexies = [];
    const constraints: Constraint[] = [];

    for (let i = 0; i < this.NUM_WORKE_CONSTRAINTSR; i++) {
      const index = this.getIndex(indexies, emptyBoard.length - 1);
      indexies.push(index);
      constraints.push(this.createConstraint(i, index, emptyBoard));
    }

    return constraints;
  }

  private createConstraint(text, index, best) {
    return {
      text: text.toString(),
      time: {
        fromTime: new Date(best[index].shiftTime.fromTime),
        toTime: new Date(best[index].shiftTime.toTime)
      }
    };
  }

  private getIndex(indexies: number[], numShifts): number {
    let index = Math.floor(Math.random() * numShifts);
    while (indexies.some(x => x == index)) {
      index = Math.floor(Math.random() * numShifts);
    }
    return index;
  }
}
