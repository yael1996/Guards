class SpecialDatesSettings extends ShiftSettings {
  // like holidays
  public specialDays: Array<number>;

  constructor(numPeople, numShifts, shiftLength, startTim, specialDates) {
    super(numPeople, numShifts, shiftLength, startTim);

    this.specialDays = specialDates;
  }
}
