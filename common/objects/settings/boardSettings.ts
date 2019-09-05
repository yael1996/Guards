import { RegularDaySettings } from "./regularDaySettings";
import { SpecialDaySettings } from "./specialDaysSettings";
import { SpecialDatesSettings } from "./specialDatesSettings";

export class BordSettings {
  public bordId: string;
  public regularDays: RegularDaySettings;
  public specialDays?: SpecialDaySettings;
  public specialDates?: SpecialDatesSettings;

  constructor(
    regularDays: RegularDaySettings,
    specialDays?: SpecialDaySettings,
    specialDates?: SpecialDatesSettings
  ) {
    this.bordId = "123"; //ToDo generate
    this.regularDays = regularDays;
    this.specialDays = specialDays;
    this.specialDates = specialDates;
  }
}
