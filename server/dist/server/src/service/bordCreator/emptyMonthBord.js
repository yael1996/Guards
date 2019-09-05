"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmptyMonthBord {
    constructor(month, bordSettings) {
        this.year = month.year;
        this.month = month.month;
        this.bordSettings = bordSettings;
        this.datesByType();
    }
    datesByType() {
        this.specialDates = new Array();
        this.specialDays = new Array();
        this.regularDays = new Array();
        this.orgenizeDatesByType();
    }
    orgenizeDatesByType() {
        for (var i = 1; i <= this.numTotalDaysInMonth(); i++) {
            var currDate = new Date(this.year, this.month, i);
            if (this.isDateSpecial(currDate))
                this.specialDates.push(currDate);
            else if (this.isDaySpecial(currDate))
                this.specialDays.push(currDate);
            else
                this.regularDays.push(currDate);
        }
    }
    isDateSpecial(currDate) {
        return (this.bordSettings.specialDates &&
            !!this.bordSettings.specialDates.dates.find(date => {
                return date.getTime() == currDate.getTime();
            }));
    }
    isDaySpecial(currDate) {
        return this.bordSettings.specialDays.days.includes(currDate.getDay());
    }
    numTotalDaysInMonth() {
        return new Date(this.year, this.month, 0).getDate();
    }
}
exports.EmptyMonthBord = EmptyMonthBord;
//# sourceMappingURL=emptyMonthBord.js.map