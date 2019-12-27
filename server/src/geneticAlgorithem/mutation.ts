import { Shift } from "../mongo/models/concreteBoard";

export class Mutation {
  constructor() {}

  getMutation = (oldPhenotype: Shift[]): Shift[] => {
    // use oldPhenotype and some random
    // function to make a change to your
    // phenotype
    let resultPhenotype = oldPhenotype;
    return this.switchTwoShifts(resultPhenotype);
  };

  private switchTwoShifts(resultPhenotype) {
    // can do for and switch more then two
    let index1 = this.getRandomShiftIndex(resultPhenotype);
    let index2 = this.getRandomShiftIndex(resultPhenotype);

    while (!this.areShiftsTheSameType(resultPhenotype, index1, index2)) {
      index1 = this.getRandomShiftIndex(resultPhenotype);
      index2 = this.getRandomShiftIndex(resultPhenotype);
    }
    const temp = resultPhenotype[index1].workersIds;
    resultPhenotype[index1].workersIds = resultPhenotype[index2].workersIds;
    resultPhenotype[index2].workersIds = temp;

    return resultPhenotype;
  }

  private getRandomShiftIndex(oldPhenotype: Shift[]): number {
    //ToDo:Cheack if shifts is the same type
    return Math.floor(Math.random() * oldPhenotype.length);
  }

  private areShiftsTheSameType(
    resultPhenotype,
    index1: number,
    index2: number
  ) {
    return (
      resultPhenotype[index1].shiftType === resultPhenotype[index2].shiftType
    );
  }
}
