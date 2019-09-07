"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shift_1 = require("../../../../common/objects/shifts/shift");
var shiftTypeEnum_1 = require("../../../../common/objects/shifts/shiftTypeEnum");
var emptyMonthBord_1 = require("./emptyMonthBord");
var shiftTime_1 = require("../../../../common/objects/shifts/shiftTime");
var GeneratFirstPopulation = /** @class */ (function () {
    function GeneratFirstPopulation(bord, month) {
        this.month = month;
        this.bord = bord;
        this.emptyBord = new emptyMonthBord_1.EmptyMonthBord(this.month, this.bord.settings);
    }
    GeneratFirstPopulation.prototype.buildFirstPopulation = function (populationSize) {
        var monthShiftsOptions = new Array();
        for (var i = 0; i < populationSize; i++) {
            var monthShift = this.fillOneMonthWithShifts();
            monthShiftsOptions.push(monthShift);
        }
        return monthShiftsOptions;
    };
    GeneratFirstPopulation.prototype.fillOneMonthWithShifts = function () {
        var monthShift = new Array();
        var specialDates = this.emptyBord.specialDates;
        var specialDays = this.emptyBord.specialDays;
        var regularDays = this.emptyBord.regularDays;
        this.fillShiftsByType(specialDates, this.bord.settings.specialDates, shiftTypeEnum_1.SHIFT_TYPE.special_date, monthShift);
        this.fillShiftsByType(specialDays, this.bord.settings.specialDays, shiftTypeEnum_1.SHIFT_TYPE.special_day, monthShift);
        this.fillShiftsByType(regularDays, this.bord.settings.regularDays, shiftTypeEnum_1.SHIFT_TYPE.regular_day, monthShift);
        return monthShift;
    };
    GeneratFirstPopulation.prototype.fillShiftsByType = function (days, settings, type, monthShift) {
        for (var _i = 0, days_1 = days; _i < days_1.length; _i++) {
            var day = days_1[_i];
            var startShift = new Date(day.getFullYear(), day.getMonth(), day.getDay(), settings.daySettings.startHour.hour, settings.daySettings.startHour.min);
            for (var i = 1; i <= settings.daySettings.numShiftsInDay; i++) {
                var shiftTime = this.getShiftTime(startShift, settings.shiftSettings);
                var numWorkers = settings.shiftSettings.numWorkersInShift;
                var shift = this.createNewShift(shiftTime, type, numWorkers);
                monthShift.push(shift);
                startShift = shift.shiftTime.toTime;
            }
        }
    };
    GeneratFirstPopulation.prototype.getShiftTime = function (startShift, shiftSettings) {
        var toTime = new Date(startShift.getFullYear(), startShift.getMonth(), startShift.getDay(), startShift.getHours() + shiftSettings.shiftLengthInHouers);
        return new shiftTime_1.ShiftTime(startShift, toTime);
    };
    GeneratFirstPopulation.prototype.createNewShift = function (shiftTime, type, numWorkers) {
        var shift = new shift_1.Shift(shiftTime, type);
        var numAddedWorkers = 0;
        while (numAddedWorkers < numWorkers) {
            var workerId = this.getRandomWorkerId();
            if (!this.isWorkerAlreadyInShift(shift, workerId)) {
                shift.addWorkerToShift(workerId);
                numAddedWorkers++;
            }
        }
        return shift;
    };
    GeneratFirstPopulation.prototype.getRandomWorkerId = function () {
        return this.bord.workersIds[Math.floor(Math.random() * this.bord.workersIds.length)];
    };
    GeneratFirstPopulation.prototype.isWorkerAlreadyInShift = function (shift, workerId) {
        return shift.workersIds.includes(workerId);
    };
    return GeneratFirstPopulation;
}());
exports.GeneratFirstPopulation = GeneratFirstPopulation;
//# sourceMappingURL=generatFirstPopulation.js.map