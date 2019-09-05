import { Shift } from "../../../../common/objects/shifts/shift";
import { SHIFT_TYPE } from "../../../../common/objects/shifts/shiftTypeEnum";
import { WorkerConstraints } from "../../../../common/objects/constraints/workerConstraints";
import { Month } from "../../../../common/objects/month/month";
import { MonthConstraints } from "../../../../common/objects/month/monthConstraints";
import { EmptyMonthBord } from "./emptyMonthBord";
import { ShiftTime } from "../../../../common/objects/shifts/shiftTime";
import { Bord } from "../../../../common/objects/bord";
var _ = require("underscore");

export class generatFirstPopulation {
  private constraints: Array<WorkerConstraints>;
  private month: Month;
  private bord: Bord;
  private emptyBord: EmptyMonthBord;

  constructor(bord: Bord, monthConstraints: MonthConstraints) {
    this.constraints = monthConstraints.constraints;
    this.month = monthConstraints.month;
    this.bord = bord;
    this.emptyBord = new EmptyMonthBord(this.month, this.bord.settings);
  }

  public buildFirstPopulation(numOptions: number): Array<Array<Shift>> {
    let monthShiftsOptions = new Array<Array<Shift>>();
    for (let i = 0; i < numOptions; i++) {
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
      SHIFT_TYPE.special_date,
      monthShift
    );

    this.fillShiftsByType(
      specialDays,
      this.bord.settings.specialDays,
      SHIFT_TYPE.special_day,
      monthShift
    );

    this.fillShiftsByType(
      regularDays,
      this.bord.settings.regularDays,
      SHIFT_TYPE.regular_day,
      monthShift
    );

    return monthShift;
  }

  private fillShiftsByType(
    days,
    settings,
    type: SHIFT_TYPE,
    monthShift: Array<Shift>
  ): void {
    for (let day of days) {
      let startShift = day.setHours(settings.daySettings.startTimeInDay);
      for (var i = 1; i <= settings.daySettings.numShiftsInDay; i++) {
        let shiftTime = this.getShiftTime(startShift, settings.shiftSettings);
        let numWorkers = settings.shiftSettings.numWorkersInShift;

        let shift: Shift = this.createNewShift(shiftTime, type, numWorkers);
        monthShift.push(shift);

        startShift = shift.shiftTime.toTime;
      }
    }
  }

  private getShiftTime(startShift, shiftSettings) {
    let toTime = startShift.addHours(shiftSettings.shiftLengthInHouers);
    return new ShiftTime(startShift, toTime);
  }

  private createNewShift(shiftTime, type, numWorkers: number): Shift {
    let shift: Shift = new Shift(shiftTime, type);
    let numAddedWorkers = 0;
    while (numAddedWorkers < numWorkers) {
      let workerId = this.getRandomWorkerId();
      if (this.canWorkerDoTheShift(shift, workerId)) {
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

  private canWorkerDoTheShift(shift, workerId): boolean {
    return (
      !this.isWorkerAlreadyInShift(shift, workerId) &&
      !this.isShiftInWorkersConstraints(shift, workerId) &&
      this.isWorkerHasAvalibleShifts()
    );
  }

  private isWorkerAlreadyInShift(shift: Shift, workerId: string): boolean {
    return shift.workersIds.includes(workerId);
  }

  private isShiftInWorkersConstraints(shift: Shift, workerId: string): boolean {
    let workerConstraints = this.constraints.find(c => (c.workerId = workerId));

    return !!workerConstraints.constraints.find(c =>
      _.isEqual(c.shiftTime, shift.shiftTime)
    );
  }

  private isWorkerHasAvalibleShifts(): boolean {
    //ToDo
    return true;
  }
}
