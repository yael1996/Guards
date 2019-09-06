import { Shift } from "../../../../common/objects/shifts/shift";

export class CrossOver {
  constructor() {}

  public doAction(phenoTypeA: Array<Shift>, phenoTypeB: Array<Shift>) {
    var result1 = {},
      result2 = {};
    // use phenoTypeA and B to create phenotype result 1 and 2
    return [result1, result2];
  }
}
