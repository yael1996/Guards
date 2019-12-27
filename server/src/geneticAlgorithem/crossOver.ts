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
    const firstPartOfA = phenoTypeA.slice(0, index);
    const firstPartOfB = phenoTypeB.slice(0, index);
    const secondpartOfA = phenoTypeA.slice(index, phenoTypeA.length);
    const secondpartOfB = phenoTypeB.slice(index, phenoTypeB.length);

    const result1 = firstPartOfA.concat(secondpartOfB);
    const result2 = firstPartOfB.concat(secondpartOfA);
    return [result1, result2];
  }
}
