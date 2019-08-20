class RegularDaySettings extends ShiftSettings {
  public regularDays: Array<number>;

  constructor(numPeople, numShifts, shiftLength, startTim, regularDays) {
    super(numPeople, numShifts, shiftLength, startTim);

    this.regularDays = regularDays;
  }
}
