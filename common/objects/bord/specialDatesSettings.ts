import { ShiftSettings } from "../shiftSettings";
import { DaySettings } from "../daySettings";

export class SpecialDatesSettings {
  // like holidays
  public specialDats: Array<number>;
  public daySettings;
  public shiftSettings;

  constructor(
    daySettings: DaySettings,
    shiftSettings: ShiftSettings,
    specialDats: Array<number>
  ) {
    this.daySettings = daySettings;
    this.shiftSettings = shiftSettings;
    this.specialDats = specialDats;
  }
}
