class SpecialDaySettings extends ShiftSettings {
  // like weekend
  public specialDays: Array<Date>;

  constructor(numPeople, numShifts, shiftLength, startTim, specialDays) {
    super(numPeople, numShifts, shiftLength, startTim);

    this.specialDays = specialDays;
  }
}
