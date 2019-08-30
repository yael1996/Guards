import { ShiftSettings } from "../shiftSettings";
import { Hour } from "../hour";
import { DaySettings } from "../daySettings";

export class SpecialDaySettings {
  // like weekend
  public specialDays: Array<Date>;
  public daySettings;
  public shiftSettings;

  constructor(
    daySettings: DaySettings,
    shiftSettings: ShiftSettings,
    specialDays: Array<Date>
  ) {
    this.daySettings = daySettings;
    this.shiftSettings = shiftSettings;
    this.specialDays = specialDays;
  }
}
