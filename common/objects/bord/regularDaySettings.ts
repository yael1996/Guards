import { ShiftSettings } from "./shiftSettings";
import { DaySettings } from "./daySettings";

export class RegularDaySettings {
  public regularDays: Array<number>;
  public daySettings;
  public shiftSettings;

  constructor(
    daySettings: DaySettings,
    shiftSettings: ShiftSettings,
    regularDays: Array<number>
  ) {
    this.daySettings = daySettings;
    this.shiftSettings = shiftSettings;
    this.regularDays = regularDays;
  }
}
