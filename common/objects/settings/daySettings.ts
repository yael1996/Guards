import { Hour } from "../time/hour";

export class DaySettings {
  public numShiftsInDay: number;
  public startHour: Hour;

  constructor(numShiftsInDay: number, startHour: Hour) {
    this.numShiftsInDay = numShiftsInDay;
    this.startHour = startHour;
  }
}
