import { Shift } from "../../../common/objects/shift";
import { SHIFT_TYPE } from "../../../common/objects/shiftTypeEnum";
import { BordSettings } from "../../../common/objects/bord/boardSettings";

class MonthGurdsCreator {
  private bordSettings: BordSettings;
  private monthShifts: Array<Shift>;
  private specialDates: Array<Date>;
  private specialDays: Array<Date>;
  private regularDays: Array<Date>;

  constructor(bordSettings: BordSettings) {
    this.bordSettings = bordSettings;
  }

  public buildMonth(month: number, year: number): Array<Shift> {
    this.init();
    this.orgenizeDatesByType(month, year);
    this.fillMonthWithShifts();
    return this.monthShifts;
  }

  private init() {
    this.monthShifts = new Array<Shift>();
    this.specialDates = new Array<Date>();
    this.specialDays = new Array<Date>();
    this.regularDays = new Array<Date>();
  }

  private fillMonthWithShifts(): void {
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
    let daySettings = settings.daySettings;
    let shiftSettings = settings.shiftSettings;

    for (let day of days) {
      let startShift = day.setHours(daySettings.startTimeInDay);
      for (var i = 1; i <= daySettings.numShiftsInDay; i++) {
        let toTime = startShift.addHours(shiftSettings.shiftLengthInHouers);
        let shift: Shift = new Shift(startShift, toTime, type);
        this.monthShifts.push(shift);
        startShift = toTime;
      }
    }
  }

  private orgenizeDatesByType(month, year): void {
    for (var i = 1; i <= this.numTotalDaysInMonth(month, year); i++) {
      var currDate = new Date(year, month, i);

      if (this.isDateSpecial(currDate)) this.specialDates.push(currDate);
      else if (this.isDaySpecial(currDate)) this.specialDays.push(currDate);
      else this.regularDays.push(currDate);
    }
  }

  private isDateSpecial(currDate: Date): boolean {
    return (
      this.bordSettings.specialDates &&
      !!this.bordSettings.specialDates.dates.find(date => {
        return date.getTime() == currDate.getTime();
      })
    );
  }

  private isDaySpecial(currDate: Date): boolean {
    return this.bordSettings.specialDays.days.includes(currDate.getDay());
  }

  private numTotalDaysInMonth(month, year): number {
    return new Date(year, month, 0).getDate();
  }
}
