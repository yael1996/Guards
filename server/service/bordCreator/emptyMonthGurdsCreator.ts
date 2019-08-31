import { Shift } from "../../../common/objects/shift";
import { SHIFT_TYPE } from "../../../common/objects/shiftTypeEnum";
import { BordSettings } from "../../../common/objects/settings/boardSettings";
import { Month } from "../../../common/objects/month";

export class EmptyMonthGurdsCreator {
  private bordSettings: BordSettings;
  private monthShifts: Array<Shift>;
  private specialDates: Array<Date>;
  private specialDays: Array<Date>;
  private regularDays: Array<Date>;
  private year: number;
  private month: number;

  constructor(month: Month) {
    this.year = month.year;
    this.month = month.month;

    let bordSettings; //get settings by month.bordId
    this.bordSettings = bordSettings;
  }

  public buildMonth(): Array<Shift> {
    this.init();
    this.orgenizeDatesByType();
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

  private orgenizeDatesByType(): void {
    for (var i = 1; i <= this.numTotalDaysInMonth(); i++) {
      var currDate = new Date(this.year, this.month, i);

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

  private numTotalDaysInMonth(): number {
    return new Date(this.year, this.month, 0).getDate();
  }
}
