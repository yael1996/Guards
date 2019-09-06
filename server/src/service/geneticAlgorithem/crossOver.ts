import { Shift } from "../../../../common/objects/shifts/shift";

export class CrossOver {
  constructor() {}

  public doAction(phenoTypeA: Array<Shift>, phenoTypeB: Array<Shift>) {
    // use phenoTypeA and B to create phenotype result 1 and 2
    this.combineShifts(phenoTypeA, phenoTypeB);
  }

  private combineShifts(phenoTypeA: Array<Shift>, phenoTypeB: Array<Shift>) {
    // assume that phenoTypeA and phenoTypeB are the same length
    const index = phenoTypeA.length / 2;
    let partOfA = phenoTypeA.slice(0, index);
    let partOfB = phenoTypeB.slice(index);
    return [partOfA, partOfB];
  }
}
