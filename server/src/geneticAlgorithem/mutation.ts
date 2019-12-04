import { Shift } from "../mongo/models/concreteBoard";

export class Mutation {
  constructor() {}

  getMutation = (oldPhenotype: Array<Shift>): Array<Shift> => {
    // use oldPhenotype and some random
    // function to make a change to your
    // phenotype
    let resultPhenotype = oldPhenotype;
    return this.switchTwoShifts(resultPhenotype);
  };

  private switchTwoShifts(resultPhenotype) {
    // can do for and switch more then two
    const index1 = this.getRandomShiftIndex(resultPhenotype);
    const index2 = this.getRandomShiftIndex(resultPhenotype);

    const temp = resultPhenotype[index1].workersIds;
    resultPhenotype[index1].workersIds = resultPhenotype[index2].workersIds;
    resultPhenotype[index2].workersIds = temp;

    return resultPhenotype;
  }

  private getRandomShiftIndex(oldPhenotype: Array<Shift>): number {
    return Math.floor(Math.random() * oldPhenotype.length);
  }
}
