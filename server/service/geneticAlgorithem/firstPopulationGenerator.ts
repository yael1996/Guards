import { Shift } from "../../../common/objects/shift";
import { MonthConstraints } from "../../../common/objects/constraints/monthConstraints";
import { EmptyMonthGurdsCreator } from "../bordCreator/emptyMonthGurdsCreator";
import { Month } from "../../../common/objects/month";
// generate first population
export class firstPopulationGenerator {
  public constraints: MonthConstraints;
  private shifts: Array<Shift>;
  private month: Month;
  private filledShifts: Array<Array<Shift>>;

  constructor(constraints: MonthConstraints) {
    this.constraints = constraints;
    this.month = this.constraints.month;
    this.shifts = this.getEmptyShifts();
  }

  private getEmptyShifts(): Array<Shift> {
    let emptyMonthCreator = new EmptyMonthGurdsCreator(this.month);
    return emptyMonthCreator.buildMonth();
  }

  private fillInShifts() {
    let filledShift = this.shifts;

    this.filledShifts.push(filledShift);
  }
}
