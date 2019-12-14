import { Shift, ShiftTime } from "../../mongo/models/concreteBoard";
import { SHIFT_TYPE } from "../shiftTypeEnum";
import { Month } from "../../mongo/models/concreteBoard";
import { EmptyMonthBord } from "./emptyMonthBord";
import { Board } from "../../mongo/models/board";

export class GeneratFirstPopulation {
  private month: Month;
  private board: Board;
  private emptyBord: EmptyMonthBord;

  constructor(bord: Board, month: Month) {
    this.month = month;
    this.board = bord;
    this.emptyBord = new EmptyMonthBord(this.month, this.board.boardSettings);
  }

  public buildFirstPopulation(populationSize: number): Shift[][] {
    let monthShiftsOptions = [];
    for (let i = 0; i < populationSize; i++) {
      let monthShift: Shift[] = this.fillOneMonthWithShifts();
      monthShiftsOptions.push(monthShift);
    }
    return monthShiftsOptions;
  }

  public generateEmptyShifts() {
    return this.fillOneMonthWithShifts(true);
  }

  private fillOneMonthWithShifts(isEmpty: boolean = false): Shift[] {
    let monthShift = [];
    let specialDates = this.emptyBord.specialDates;
    let specialDays = this.emptyBord.specialDays;
    let regularDays = this.emptyBord.regularDays;

    this.fillShiftsByType(
      specialDates,
      this.board.boardSettings.specialDatesSettings,
      SHIFT_TYPE.SPECIAL_DATE,
      monthShift,
      isEmpty
    );

    this.fillShiftsByType(
      specialDays,
      this.board.boardSettings.specialDaysSettings,
      SHIFT_TYPE.SPECIAL_DAY,
      monthShift,
      isEmpty
    );

    this.fillShiftsByType(
      regularDays,
      this.board.boardSettings.regularDaySettings,
      SHIFT_TYPE.REGULAR_DAY,
      monthShift,
      isEmpty
    );

    return monthShift;
  }

  private fillShiftsByType(
    days: Date[],
    settings,
    type: SHIFT_TYPE,
    monthShift: Shift[],
    isEmpty
  ): void {
    for (let day of days) {
      let startShift = new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDay(),
        settings.daySettings.startHour.hour,
        settings.daySettings.startHour.minute
      );
      for (var i = 1; i <= settings.daySettings.numShiftsInDay; i++) {
        let shiftTime = this.getShiftTime(startShift, settings.shiftSettings);
        let numWorkers = settings.shiftSettings.numWorkersInShift;

        let shift: Shift = this.createNewShift(
          shiftTime,
          type,
          numWorkers,
          isEmpty
        );
        monthShift.push(shift);

        startShift = shift.shiftTime.toTime;
      }
    }
  }

  private getShiftTime(startShift: Date, shiftSettings) {
    let toTime = new Date(
      startShift.getFullYear(),
      startShift.getMonth(),
      startShift.getDay(),
      startShift.getHours() + shiftSettings.shiftLengthInHours
    );

    let shiftTime: ShiftTime = {
      fromTime: startShift,
      toTime: toTime
    };

    return shiftTime;
  }

  private createNewShift(
    shiftTime,
    type,
    numWorkers: number,
    isEmpty: boolean
  ): Shift {
    let shift: Shift = {
      shiftTime: shiftTime,
      shiftType: type,
      workersId: []
    };

    if (isEmpty) return shift;

    let numAddedWorkers = 0;
    while (numAddedWorkers < numWorkers) {
      let workerId = this.getRandomWorkerId();
      if (!this.isWorkerAlreadyInShift(shift, workerId)) {
        shift.workersId.push(workerId);
        numAddedWorkers++;
      }
    }

    return shift;
  }

  private getRandomWorkerId(): string {
    return this.board.workerIds.map(x => x.toString())[
      Math.floor(Math.random() * this.board.workerIds.length)
    ];
  }

  private isWorkerAlreadyInShift(shift: Shift, workerId: string): boolean {
    return shift.workersId.includes(workerId);
  }
}
