"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var regularDaySettings_1 = require("./regularDaySettings");
var daySettings_1 = require("./daySettings");
var hour_1 = require("../hour");
var shiftSettings_1 = require("./shiftSettings");
var BordSettings = /** @class */ (function () {
    function BordSettings(regularDays, specialDays, specialDates) {
        this.bordId = "123"; //ToDo generate
        this.regularDays = regularDays
            ? regularDays
            : this.getDefultRegularDaySettings();
        this.specialDays = specialDays;
        this.specialDates = specialDates;
    }
    BordSettings.prototype.getDefultRegularDaySettings = function () {
        var numShiftsInday = 1;
        var startTime = new hour_1.Hour(8);
        var numPeople = 2;
        var shiftLength = 4;
        var daySettings = new daySettings_1.DaySettings(numShiftsInday, startTime);
        var shiftSettings = new shiftSettings_1.ShiftSettings(numPeople, shiftLength);
        var regularDays = [1, 2, 3, 4];
        return new regularDaySettings_1.RegularDaySettings(daySettings, shiftSettings, regularDays);
    };
    return BordSettings;
}());
exports.BordSettings = BordSettings;
//# sourceMappingURL=boardSettings.js.map