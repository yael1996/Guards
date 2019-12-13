import { BoardSettings } from "../../mongo/models/board";
import { Month } from "../../mongo/models/concreteBoard";
import { HolidaysDates } from "./holidaysDates";

export class EmptyMonthBord {
  public specialDates: Date[];
  public specialDays: Date[];
  public regularDays: Date[];

  private bordSettings: BoardSettings;
  private year: number;
  private month: number;
  private holidays: HolidaysDates;

  constructor(month: Month, bordSettings: BoardSettings) {
    this.year = month.year;
    this.month = month.month;
    this.bordSettings = bordSettings;

    this.holidays = new HolidaysDates();

    this.datesByType();
  }

  private datesByType() {
    this.specialDates = [];
    this.specialDays = [];
    this.regularDays = [];
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
    if (!this.bordSettings.specialDatesSettings.dates) {
      return false;
    } else {
      return this.holidays.isDateHoliday(currDate);
      // return !!this.bordSettings.specialDates.dates.find(date => {
      //   return date.getTime() == currDate.getTime();
      //});
    }
  }

  private isDaySpecial(currDate: Date): boolean {
    if (!this.bordSettings.specialDaysSettings.days) {
      return false;
    } else {
      return this.bordSettings.specialDaysSettings.days.includes(
        currDate.getDay()
      );
    }
  }

  private numTotalDaysInMonth(): number {
    return new Date(this.year, this.month, 0).getDate();
  }
}
