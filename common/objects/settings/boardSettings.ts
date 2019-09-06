import { RegularDaySettings } from "./regularDaySettings";
import { SpecialDaySettings } from "./specialDaysSettings";
import { SpecialDatesSettings } from "./specialDatesSettings";
import { DaySettings } from "./daySettings";
import { Hour } from "../hour";
import { ShiftSettings } from "./shiftSettings";

export class BordSettings {
  public bordId: string;
  public regularDays: RegularDaySettings;
  public specialDays?: SpecialDaySettings;
  public specialDates?: SpecialDatesSettings;

  constructor(
    regularDays?: RegularDaySettings,
    specialDays?: SpecialDaySettings,
    specialDates?: SpecialDatesSettings
  ) {
    this.bordId = "123"; //ToDo generate
    this.regularDays = regularDays
      ? regularDays
      : this.getDefultRegularDaySettings();
    this.specialDays = specialDays;
    this.specialDates = specialDates;
  }

  private getDefultRegularDaySettings(): RegularDaySettings {
    const numShiftsInday = 1;
    const startTime = new Hour(8);
    const numPeople = 2;
    const shiftLength = 4;

    const daySettings: DaySettings = new DaySettings(numShiftsInday, startTime);
    const shiftSettings: ShiftSettings = new ShiftSettings(
      numPeople,
      shiftLength
    );
    const regularDays: Array<number> = [1, 2, 3, 4];

    return new RegularDaySettings(daySettings, shiftSettings, regularDays);
  }
}
