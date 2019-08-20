class ShiftSettings {
  public numPeopleInShift: number;
  public numShiftsInDay: number;
  public shiftLengthInHouers: number;
  public startTimeInDay: any;

  constructor(numPeople, numShifts, shiftLength, startTime) {
    this.numPeopleInShift = numPeople;
    this.numShiftsInDay = numShifts;
    this.shiftLengthInHouers = shiftLength;
    this.startTimeInDay = startTime;
  }
}
