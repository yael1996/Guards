import { RegularDaySettings } from "./regularDaySettings";
import { SpecialDaySettings } from "./specialDaysSettings";
import { SpecialDatesSettings } from "./specialDatesSettings";

export class BordSettings {
  public regularDays;
  public specialDays;
  public specialDates;

  constructor(
    regularDays: RegularDaySettings,
    specialDays: SpecialDaySettings,
    specialDates: SpecialDatesSettings
  ) {}
}
