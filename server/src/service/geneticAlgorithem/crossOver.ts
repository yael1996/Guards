import { Shift } from "../../../../common/objects/shifts/shift";

export class CrossOver {
  constructor() {}

  doAction = (phenoTypeA: Array<Shift>, phenoTypeB: Array<Shift>) => {
    // use phenoTypeA and B to create phenotype result 1 and 2
    return this.combineShifts(phenoTypeA, phenoTypeB);
  };

  private combineShifts(phenoTypeA: Array<Shift>, phenoTypeB: Array<Shift>) {
    // assume that phenoTypeA and phenoTypeB are the same length
    const index = phenoTypeA.length / 2;
    const partOfA = phenoTypeA.slice(0, index);
    const partOfB = phenoTypeB.slice(index, phenoTypeB.length);
    return [partOfA, partOfB];
  }
}
