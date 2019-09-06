import { BordSettings } from "../../../../common/objects/settings/boardSettings";
import { Month } from "../../../../common/objects/month/month";

export class EmptyMonthBord {
  public specialDates: Array<Date>;
  public specialDays: Array<Date>;
  public regularDays: Array<Date>;

  private bordSettings: BordSettings;
  private year: number;
  private month: number;

  constructor(month: Month, bordSettings: BordSettings) {
    this.year = month.year;
    this.month = month.month;
    this.bordSettings = bordSettings;

    this.datesByType();
  }

  private datesByType() {
    this.specialDates = new Array<Date>();
    this.specialDays = new Array<Date>();
    this.regularDays = new Array<Date>();
    this.orgenizeDatesByType();
  }

  private orgenizeDatesByType(): void {
    for (var i = 1; i <= this.numTotalDaysInMonth(); i++) {
      var currDate = new Date(this.year, this.month, i);

      if (this.isDateSpecial(currDate)) this.specialDates.push(currDate);
      else if (this.isDaySpecial(currDate)) this.specialDays.push(currDate);
      else this.regularDays.push(currDate);
    }
  }

  private isDateSpecial(currDate: Date): boolean {
    if (!this.bordSettings.specialDates) return false;
    else {
      return !!this.bordSettings.specialDates.dates.find(date => {
        return date.getTime() == currDate.getTime();
      });
    }
  }

  private isDaySpecial(currDate: Date): boolean {
    if (!this.bordSettings.specialDays) return false;
    else {
      return this.bordSettings.specialDays.days.includes(currDate.getDay());
    }
  }

  private numTotalDaysInMonth(): number {
    return new Date(this.year, this.month, 0).getDate();
  }
}
