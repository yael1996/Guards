import { ShiftSettings } from "../shiftSettings";
import { DaySettings } from "../daySettings";

export class SpecialDatesSettings {
  // like holidays
  public dates: Array<Date>;
  public daySettings;
  public shiftSettings;

  constructor(
    daySettings: DaySettings,
    shiftSettings: ShiftSettings,
    specialDats: Array<Date>
  ) {
    this.daySettings = daySettings;
    this.shiftSettings = shiftSettings;
    this.dates = specialDats;
  }
}
