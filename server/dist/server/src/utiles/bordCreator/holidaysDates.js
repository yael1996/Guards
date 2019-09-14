"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Hebcal = require("hebcal");
var HolidaysDates = /** @class */ (function () {
    function HolidaysDates() {
        Hebcal.defaultCity = "Jerusalem";
        Hebcal.holidays.Event.isIL = true;
        this.holidays = new Hebcal().holidays;
    }
    HolidaysDates.prototype.isDateHoliday = function (date) {
        var currDate = new Hebcal.HDate(date).toString();
        return this.holidays[currDate];
    };
    return HolidaysDates;
}());
exports.HolidaysDates = HolidaysDates;
//# sourceMappingURL=holidaysDates.js.map