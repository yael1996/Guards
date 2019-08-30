import { ShiftSettings } from "./shiftSettings";

export class RegularDaySettings extends ShiftSettings {
  public regularDays: Array<number>;

  constructor(numPeople, numShifts, shiftLength, startHour: Hour, regularDays) {
    super(numPeople, numShifts, shiftLength, startHour);
    this.regularDays = regularDays;
  }
}
