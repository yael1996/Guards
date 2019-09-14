import { Shift } from "../../../../common/objects/shifts/shift";
import { SHIFT_TYPE } from "../../../../common/objects/shifts/shiftTypeEnum";
import { Month } from "../../../../common/objects/time/month";
import { EmptyMonthBord } from "./emptyMonthBord";
import { ShiftTime } from "../../../../common/objects/shifts/shiftTime";
import { Bord } from "../../../../common/objects/bord/bord";

export class GeneratFirstPopulation {
  private month: Month;
  private bord: Bord;
  private emptyBord: EmptyMonthBord;

  constructor(bord: Bord, month: Month) {
    this.month = month;
    this.bord = bord;
    this.emptyBord = new EmptyMonthBord(this.month, this.bord.settings);
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
      this.bord.settings.specialDates,
      SHIFT_TYPE.SPECIAL_DATE,
      monthShift
    );

    this.fillShiftsByType(
      specialDays,
      this.bord.settings.specialDays,
      SHIFT_TYPE.SPECIAL_DAY,
      monthShift
    );

    this.fillShiftsByType(
      regularDays,
      this.bord.settings.regularDays,
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
    return new ShiftTime(startShift, toTime);
  }

  private createNewShift(shiftTime, type, numWorkers: number): Shift {
    let shift: Shift = new Shift(shiftTime, type);
    let numAddedWorkers = 0;
    while (numAddedWorkers < numWorkers) {
      let workerId = this.getRandomWorkerId();
      if (!this.isWorkerAlreadyInShift(shift, workerId)) {
        shift.addWorkerToShift(workerId);
        numAddedWorkers++;
      }
    }
    return shift;
  }

  private getRandomWorkerId(): string {
    return this.bord.workersIds[
      Math.floor(Math.random() * this.bord.workersIds.length)
    ];
  }

  private isWorkerAlreadyInShift(shift: Shift, workerId: string): boolean {
    return shift.workersIds.includes(workerId);
  }
}
