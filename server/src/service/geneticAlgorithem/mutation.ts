import { Shift } from "../../../../common/objects/shifts/shift";

export class Mutation {
  constructor() {}

  public doAction(oldPhenotype: Array<Shift>): Array<Shift> {
    // use oldPhenotype and some random
    // function to make a change to your
    // phenotype
    let resultPhenotype = oldPhenotype;
    return this.switchShifts(resultPhenotype);
  }

  private switchShifts(resultPhenotype) {
    const randomIndex1 = this.getRandomShiftIndex(resultPhenotype);
    const randomIndex2 = this.getRandomShiftIndex(resultPhenotype);

    const temp = resultPhenotype[randomIndex1];
    resultPhenotype[randomIndex1] = resultPhenotype[randomIndex2];
    resultPhenotype[randomIndex2] = temp;

    return resultPhenotype;
  }

  private getRandomShiftIndex(oldPhenotype: Array<Shift>): number {
    return Math.floor(Math.random() * oldPhenotype.length);
  }
}
