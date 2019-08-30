import { Shift } from "../../../common/objects/shift";
import { SHIFT_TYPE } from "../../../common/objects/shiftTypeEnum";

class MonthGurdsCreator {
  private bordSettings;
  private monthShifts;
  private currMonth;
  private currYear;
  private specialDates;
  private specialDays;
  private regularDays;

  constructor(bordSettings) {
    this.bordSettings = bordSettings;
  }

  public buildMonth(month, year): Array<Shift> {
    this.monthShifts = new Array<Shift>();
    this.currMonth = month;
    this.currYear = year;

    this.specialDates = new Array<Date>();
    this.specialDays = new Array<Date>();
    this.regularDays = new Array<Date>();

    this.fillMonthWithShifts();
    return this.monthShifts;
  }

  private fillMonthWithShifts(): void {
    this.orgenizeDatesByType(this.currMonth, this.currYear);

    this.fillShiftsByType(
      this.specialDates,
      this.bordSettings.specialDates,
      SHIFT_TYPE.special_date
    );

    this.fillShiftsByType(
      this.specialDays,
      this.bordSettings.specialDays,
      SHIFT_TYPE.special_day
    );

    this.fillShiftsByType(
      this.regularDays,
      this.bordSettings.regularDays,
      SHIFT_TYPE.regular_day
    );
  }

  private fillShiftsByType(days, settings, type: SHIFT_TYPE): void {
    for (let day of days) {
      let startShift = day;
      startShift.setHours(settings.startTimeInDay);
      for (var i = 1; i <= settings.numShiftsInDay; i++) {
        let toTime = startShift.addHours(settings.shiftLengthInHouers);
        let shift: Shift = new Shift(startShift, toTime, type);
        this.monthShifts.push(shift);
        startShift = toTime;
      }
    }
  }

  private orgenizeDatesByType(month, year): void {
    for (var i = 1; i <= this.numTotalDaysInMonth(); i++) {
      var currDate = new Date(this.currYear, this.currMonth, i);
      if (
        this.bordSettings.specialDates.any(
          d => d.getTime() === currDate.getTime()
        )
      )
        this.specialDates.push(currDate);
      else if (this.bordSettings.specialDays.includes(currDate.getDay()))
        this.specialDays.push(currDate);
      else this.regularDays.push(currDate);
    }
  }

  private numTotalDaysInMonth(): number {
    return new Date(this.currYear, this.currMonth, 0).getDate();
  }
}
