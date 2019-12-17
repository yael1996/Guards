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
    this.month = month.month - 1;
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
    const numTotalDaysInMonth = this.numTotalDaysInMonth();
    for (var i = 1; i <= numTotalDaysInMonth; i++) {
      let currDate = new Date(this.year, this.month, i);
      if (this.isDateSpecial(currDate)) this.specialDates.push(currDate);
    }
    this.specialDays = this.getIndexDates(
      this.bordSettings.specialDaysSettings,
      numTotalDaysInMonth
    );

    this.regularDays = this.getIndexDates(
      this.bordSettings.regularDaySettings,
      numTotalDaysInMonth
    );
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

  private getIndexDates(settings: IndexSettings, numTotalDaysInMonth: number) {
    if (!settings.days) return [];
    let indexes: number[] = settings.days;
    let dates: Date[] = [];

    for (let index of indexes) {
      let i = index;
      while (i <= numTotalDaysInMonth) {
        dates.push(new Date(this.year, this.month, i));
        i += 7;
      }
    }
    return dates;
  }

  private numTotalDaysInMonth(): number {
    return new Date(this.year, this.month + 1, 0).getDate();
  }
}
