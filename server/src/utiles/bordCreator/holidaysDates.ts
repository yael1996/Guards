const Hebcal = require("hebcal");

export class HolidaysDates {
  private holidays;
  constructor() {
    Hebcal.defaultCity = "Jerusalem";
    Hebcal.holidays.Event.isIL = true;
    this.holidays = new Hebcal().holidays;
  }

  public isDateHoliday(date: Date): boolean {
    const currDate = new Hebcal.HDate(date).toString();
    return this.holidays[currDate];
  }
}
