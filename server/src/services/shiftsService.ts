import { Shift } from "../../../common/objects/shifts/shift";
import { Month } from "../../../common/objects/time/month";

export class ShiftsService {
  constructor() {}

  public getWorkerShiftsByMonth(workerId: string, month: Month): Array<Shift> {
    return null;
  }

  public getMonthShifts(month: Month): Array<Shift> {
    return null;
  }

  public getCapacity() {}
}
