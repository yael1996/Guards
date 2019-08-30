export class ShiftSettings {
  public numPeopleInShift: number;
  public numShiftsInDay: number;
  public shiftLengthInHouers: number;
  public startHour: any;

  constructor(numPeople, numShifts, shiftLength, startHour: Hour) {
    this.numPeopleInShift = numPeople;
    this.numShiftsInDay = numShifts;
    this.shiftLengthInHouers = shiftLength;
    this.startHour = startHour;
  }
}
