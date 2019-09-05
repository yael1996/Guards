"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EmptyMonthBord = /** @class */ (function () {
    function EmptyMonthBord(month, bordSettings) {
        this.year = month.year;
        this.month = month.month;
        this.bordSettings = bordSettings;
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
        return (this.bordSettings.specialDates &&
            !!this.bordSettings.specialDates.dates.find(function (date) {
                return date.getTime() == currDate.getTime();
            }));
    };
    EmptyMonthBord.prototype.isDaySpecial = function (currDate) {
        return this.bordSettings.specialDays.days.includes(currDate.getDay());
    };
    EmptyMonthBord.prototype.numTotalDaysInMonth = function () {
        return new Date(this.year, this.month, 0).getDate();
    };
    return EmptyMonthBord;
}());
exports.EmptyMonthBord = EmptyMonthBord;
