import { BoardSettings, IndexSettings } from "../../mongo/models/board";
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
      else if (this.isIndexDay(currDate, this.bordSettings.specialDaysSettings))
        this.specialDays.push(currDate);
      else if (this.isIndexDay(currDate, this.bordSettings.regularDaySettings))
        this.regularDays.push(currDate);
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

  private isIndexDay(currDate: Date, settings: IndexSettings): boolean {
    if (!settings.days) {
      return false;
    } else {
      return !!this.getIndexDates(settings).find(
        x => x.getDay() === currDate.getDay()
      );
    }
  }

  private getIndexDates(settings: IndexSettings) {
    let indexes: number[] = settings.days;
    let specialDays: Date[] = [];

    for (let index of indexes) {
      let i = index;
      while (i < this.numTotalDaysInMonth()) {
        specialDays.push(new Date(this.year, this.month, i));
        i += 7;
      }
    }
    return specialDays;
  }

  private numTotalDaysInMonth(): number {
    return new Date(this.year, this.month, 0).getDate();
  }
}
