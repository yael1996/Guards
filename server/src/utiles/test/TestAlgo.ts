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
import { DBHelper } from "../DBHelper";
import { MonthlyConstraints, Constraint } from "../../mongo/models/User";
import { GeneratFirstPopulation } from "../bordCreator/generatFirstPopulation";

export class TestAlgo {
  private algo: GeneticAlgorithm;
  constructor() {
    this.algo = new GeneticAlgorithm();
  }

  public async test(boardId: string, month: Month) {
    const testResult: ITestReasult[] = [];
    for (let i = 0.1; i <= 0.9; i = i + 0.1) {
      for (let j = 0.1; j <= 0.9; j = j + 0.1) {
        const x = i;
        const y = j;
        const z = 1 - (i + j);
        if (x + y <= 1) {
          const best = await this.algo.runGeneticAlgorithm(
            boardId,
            month,
            x,
            y,
            z
          );
          const bestFitness = this.algo.getBestFitness();
          testResult.push({ x: x, y: y, z: z, fitness: bestFitness });
        }
      }
    }
    return testResult;
  }

  public async createBoard(boardName: string, ownerId: string) {
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

    let settings: BoardSettings = {
      regularDaySettings: regularDaySettings
    };

    let board = new models.board({
      name: boardName,
      description: "test",
      ownerId: ownerId,
      boardSettings: settings,
      workerIds: []
    });

    return await models.board.create(board);
  }

  public async createWorkersForBoard(
    boardId: string,
    numUsers: number,
    unsetesfid?: number
  ) {
    const users = [];
    for (let i = 0; i < numUsers; i++) {
      let unsetesfidConstraints = unsetesfid
        ? unsetesfid
        : Math.floor(Math.random() * 21);

      const result = await this.createUser(
        i.toString(),
        USER_TYPE.WORKER,
        unsetesfidConstraints,
        boardId
      );
      users.push(result);
    }

    const board = await models.board.findById(boardId);
    board.workerIds = users;
    await board.save();
  }

  public async createUser(
    name: string,
    type: USER_TYPE,
    unSatisfied = 0,
    boardId?: string
  ) {
    let user = new models.user({
      firstname: name,
      lastname: name,
      email: name + ".gmail.com",
      type: type,
      unSatisfiedConstraints: unSatisfied
    });

    if (boardId) user.boardId = boardId;

    return await models.user.create(user);
  }

  public async addRandomUsersConstraints(
    boardId: string,
    month: Month,
    numConstraints = 10
  ) {
    const board = await models.board.findById(boardId);
    const emptyBoard = new GeneratFirstPopulation(
      board,
      month
    ).generateEmptyShifts();
    for (let workerId of board.workerIds) {
      const user = await models.user.findById(workerId);
      const constraints: Constraint[] = await this.createConstraints(
        emptyBoard,
        numConstraints
      );
      const monthConstraint: MonthlyConstraints = {
        month: month,
        constraints: constraints
      };
      user.monthlyConstraints = [monthConstraint];
      await user.save();
    }
  }

  private async createConstraints(emptyBoard, numConstraints: number) {
    const indexies = [];
    const constraints: Constraint[] = [];

    for (let i = 0; i < numConstraints; i++) {
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
