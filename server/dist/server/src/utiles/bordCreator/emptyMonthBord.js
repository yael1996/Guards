"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var holidaysDates_1 = require("./holidaysDates");
var EmptyMonthBord = /** @class */ (function () {
    function EmptyMonthBord(month, bordSettings) {
        this.year = month.year;
        this.month = month.month;
        this.bordSettings = bordSettings;
        this.holidays = new holidaysDates_1.HolidaysDates();
        this.datesByType();
    }
    EmptyMonthBord.prototype.datesByType = function () {
        this.specialDates = new Array();
        this.specialDays = new Array();
        this.regularDays = new Array();
        this.orgenizeDatesByType();
    };
    EmptyMonthBord.prototype.orgenizeDatesByType = function () {
        for (var i = 1; i <= this.numTotalDaysInMonth(); i++) {
            var currDate = new Date(this.year, this.month, i);
            if (this.isDateSpecial(currDate))
                this.specialDates.push(currDate);
            else if (this.isDaySpecial(currDate))
                this.specialDays.push(currDate);
            else
                this.regularDays.push(currDate);
        }
    };
    EmptyMonthBord.prototype.isDateSpecial = function (currDate) {
        if (!this.bordSettings.specialDates)
            return false;
        else {
            return this.holidays.isDateHoliday(currDate);
            // return !!this.bordSettings.specialDates.dates.find(date => {
            //   return date.getTime() == currDate.getTime();
            //});
        }
    };
    EmptyMonthBord.prototype.isDaySpecial = function (currDate) {
        if (!this.bordSettings.specialDays)
            return false;
        else {
            return this.bordSettings.specialDays.days.includes(currDate.getDay());
        }
    };
    EmptyMonthBord.prototype.numTotalDaysInMonth = function () {
        return new Date(this.year, this.month, 0).getDate();
    };
    return EmptyMonthBord;
}());
exports.EmptyMonthBord = EmptyMonthBord;
//# sourceMappingURL=emptyMonthBord.js.map