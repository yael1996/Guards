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

  public buildFirstPopulation(populationSize: number): Array<Array<Shift>> {
    let monthShiftsOptions = new Array<Array<Shift>>();
    for (let i = 0; i < populationSize; i++) {
      let monthShift: Array<Shift> = this.fillOneMonthWithShifts();
      monthShiftsOptions.push(monthShift);
    }
    return monthShiftsOptions;
  }

  private fillOneMonthWithShifts(): Array<Shift> {
    let monthShift = new Array<Shift>();
    let specialDates = this.emptyBord.specialDates;
    let specialDays = this.emptyBord.specialDays;
    let regularDays = this.emptyBord.regularDays;

    this.fillShiftsByType(
      specialDates,
      this.board.boardSettings.specialDatesSettings,
      SHIFT_TYPE.SPECIAL_DATE,
      monthShift
    );

    this.fillShiftsByType(
      specialDays,
      this.board.boardSettings.specialDaysSettings,
      SHIFT_TYPE.SPECIAL_DAY,
      monthShift
    );

    this.fillShiftsByType(
      regularDays,
      this.board.boardSettings.regularDaySettings,
      SHIFT_TYPE.REGULAR_DAY,
      monthShift
    );

    return monthShift;
  }

  private fillShiftsByType(
    days: Array<Date>,
    settings,
    type: SHIFT_TYPE,
    monthShift: Array<Shift>
  ): void {
    for (let day of days) {
      let startShift = new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDay(),
        settings.daySettings.startHour.hour,
        settings.daySettings.startHour.min
      );
      for (var i = 1; i <= settings.daySettings.numShiftsInDay; i++) {
        let shiftTime = this.getShiftTime(startShift, settings.shiftSettings);
        let numWorkers = settings.shiftSettings.numWorkersInShift;

        let shift: Shift = this.createNewShift(shiftTime, type, numWorkers);
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
      startShift.getHours() + shiftSettings.shiftLengthInHouers
    );

    let shiftTime: ShiftTime = {
      month: this.month,
      fromTime: startShift,
      toTime: toTime
    };

    return shiftTime;
  }

  private createNewShift(shiftTime, type, numWorkers: number): Shift {
    let shift: Shift = {
      shiftTime: shiftTime,
      shiftType: type,
      workersId: []
    };

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
    return this.board.workerIds[
      Math.floor(Math.random() * this.board.workerIds.length)
    ];
  }

  private isWorkerAlreadyInShift(shift: Shift, workerId: string): boolean {
    return shift.workersId.includes(workerId);
  }
}
