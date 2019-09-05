import { Shift } from "./shift";

export class WorkerShifts {
  public workerId: string;
  public shifts: Array<Shift>;

  constructor(workerId: string) {
    this.workerId = workerId;
    this.shifts = new Array<Shift>();
  }
}
