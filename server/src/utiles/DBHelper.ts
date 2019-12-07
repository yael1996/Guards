import { models } from "../mongo/connection";
import { Shift, Month } from "../mongo/models/concreteBoard";
import { Constraint } from "../mongo/models/User";
import {
  Board,
  DaySettings,
  ShiftSettings,
  RegularDaySettings,
  SpecialDaysSettings,
  SpecialDatesSettings,
  BoardSettings
} from "../mongo/models/board";

export class DBHelper {
  constructor() {}

  public async updateDissatisfiedInDB(best: Shift[]) {
    // ToDo
    // save
  }

  public getTestBord(): Board {
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
      workerIds: [
        "5deb83df7d397ebd14092577",
        "5deb83e70f2f65f48ebc6a50",
        "5deb83f37dcda30838421318",
        "5deb83fb6a7dc10bc8f85ebd",
        "5deb840375bd721e8353a9bd",
        "5deb840b2942a44aa2c00a00",
        "5deb8413b38c88f38b86aa2d",
        "5deb841b12294e2e588ce76e"
      ]
    });

    return board;
  }

  public async getBordById(boardId: string) {
    return await models.board.findById(boardId);
  }

  public async getAllWorkers(bordId: string): Promise<string[]> {
    // const bord = await models.board.findById(bordId);
    // if (!bord) {
    //   //ToDo
    // }
    // return bord.workerIds;

    return [
      "5deb83df7d397ebd14092577",
      "5deb83e70f2f65f48ebc6a50",
      "5deb83f37dcda30838421318",
      "5deb83fb6a7dc10bc8f85ebd",
      "5deb840375bd721e8353a9bd",
      "5deb840b2942a44aa2c00a00",
      "5deb8413b38c88f38b86aa2d",
      "5deb841b12294e2e588ce76e"
    ];
  }

  public async getUserById(workerId: string) {
    //return await models.user.findById(workerId);
  }

  public async getWorkerDissatisfieds(allWorkers: string[]) {
    const workersDissatisfied: { [id: string]: number } = {};

    // for (let workerId of allWorkers) {
    //   const user = await this.getUserById(workerId);
    //   if (!user) {
    //     //ToDo
    //   }
    //   workersDissatisfied[workerId] = user.unSatisfiedConstraints;
    // }

    for (let workerId of allWorkers) {
      workersDissatisfied[workerId] = 0;
    }

    return workersDissatisfied;
  }

  public async getWorkerConstraints(allWorkers: string[], month: Month) {
    const workersConstraints: { [id: string]: Constraint[] } = {};

    // for (let workerId of allWorkers) {
    //   const user = await this.getUserById(workerId);
    //   if (!user) {
    //     //ToDo
    //   }
    //   // ToDo - refactor or get from db
    //   const usersConstraints = await user.monthlyConstraints.find(
    //     x => x.month.year == month.month && x.month.year == month.year
    //   ).constraints;

    //   workersConstraints[workerId] = usersConstraints;
    // }

    allWorkers.forEach(workerId => {
      workersConstraints[workerId] = [];
    });

    return workersConstraints;
  }
}
