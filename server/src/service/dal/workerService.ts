import { Shift } from "../../../../common/objects/shifts/shift";
import { Month } from "../../../../common/objects/month/month";

export class WorkerService {
  constructor() {}

  public getWorkerShiftsByMonth(workerId: string, month: Month): Array<Shift> {
    return new Array<Shift>();
  }

  public getCapacity() {}
}
