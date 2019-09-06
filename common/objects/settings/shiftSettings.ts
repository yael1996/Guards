export class ShiftSettings {
  public numWorkersInShift: number;
  public shiftLengthInHouers: number;

  constructor(numWorkers: number, shiftLength: number) {
    this.numWorkersInShift = numWorkers;
    this.shiftLengthInHouers = shiftLength;
  }
}
