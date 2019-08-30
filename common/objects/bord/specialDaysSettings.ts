import { ShiftSettings } from "./shiftSettings";

export class SpecialDaySettings extends ShiftSettings {
  // like weekend
  public specialDays: Array<Date>;

  constructor(numPeople, numShifts, shiftLength, startHour: Hour, specialDays) {
    super(numPeople, numShifts, shiftLength, startHour);
    this.specialDays = specialDays;
  }
}
