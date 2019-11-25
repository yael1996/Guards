import { ShiftSettings } from "./shiftSettings";
import { DaySettings } from "./daySettings";

export class RegularDaySettings {
  public days: Array<number>;
  public daySettings: DaySettings;
  public shiftSettings: ShiftSettings;

  constructor(
    daySettings: DaySettings,
    shiftSettings: ShiftSettings,
    regularDays: Array<number>
  ) {
    this.daySettings = daySettings;
    this.shiftSettings = shiftSettings;
    this.days = regularDays;
  }
}
