import { ShiftSettings } from "./shiftSettings";
import { DaySettings } from "./daySettings";

export class SpecialDaySettings {
  // like weekend
  public days: Array<number>;
  public daySettings;
  public shiftSettings;

  constructor(
    daySettings: DaySettings,
    shiftSettings: ShiftSettings,
    specialDays: Array<number>
  ) {
    this.daySettings = daySettings;
    this.shiftSettings = shiftSettings;
    this.days = specialDays;
  }
}
