export class ShiftSettings {
  public numPeopleInShift: number;
  public shiftLengthInHouers: number;

  constructor(numPeople: number, shiftLength: number) {
    this.numPeopleInShift = numPeople;
    this.shiftLengthInHouers = shiftLength;
  }
}
