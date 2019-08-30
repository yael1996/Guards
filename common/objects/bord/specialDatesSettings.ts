import { ShiftSettings } from "./shiftSettings";

export class SpecialDatesSettings extends ShiftSettings {
  // like holidays
  public specialDays: Array<number>;

  constructor(
    numPeople,
    numShifts,
    shiftLength,
    startHour: Hour,
    specialDates
  ) {
    super(numPeople, numShifts, shiftLength, startHour);
    this.specialDays = specialDates;
  }
}
