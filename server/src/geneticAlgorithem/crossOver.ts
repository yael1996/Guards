import { Shift } from "../mongo/models/concreteBoard";

export class CrossOver {
  constructor() {}

  getCrossOver = (phenoTypeA: Shift[], phenoTypeB: Shift[]) => {
    // use phenoTypeA and B to create phenotype result 1 and 2
    return this.combineShifts(phenoTypeA, phenoTypeB);
  };

  private combineShifts(phenoTypeA: Shift[], phenoTypeB: Shift[]) {
    // assume that phenoTypeA and phenoTypeB are the same length
    const index = phenoTypeA.length / 2;
    const partOfA = phenoTypeA.slice(0, index);
    const partOfB = phenoTypeB.slice(index, phenoTypeB.length);
    return [partOfA, partOfB];
  }
}
