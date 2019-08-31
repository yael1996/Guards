export class ShiftSettings {
  public numPeopleInShift: number;
  public shiftLengthInHouers: number;

  constructor(numPeople, shiftLength) {
    this.numPeopleInShift = numPeople;
    this.shiftLengthInHouers = shiftLength;
  }
}
