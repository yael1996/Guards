"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shift_1 = require("../../../../common/objects/shifts/shift");
const shiftTypeEnum_1 = require("../../../../common/objects/shifts/shiftTypeEnum");
const emptyMonthBord_1 = require("./emptyMonthBord");
const shiftTime_1 = require("../../../../common/objects/shifts/shiftTime");
var _ = require("underscore");
class generatFirstPopulation {
    constructor(bord, monthConstraints) {
        this.constraints = monthConstraints.constraints;
        this.month = monthConstraints.month;
        this.bord = bord;
        this.emptyBord = new emptyMonthBord_1.EmptyMonthBord(this.month, this.bord.settings);
    }
    buildFirstPopulation(numOptions) {
        let monthShiftsOptions = new Array();
        for (let i = 0; i < numOptions; i++) {
            let monthShift = this.fillOneMonthWithShifts();
            monthShiftsOptions.push(monthShift);
        }
        return monthShiftsOptions;
    }
    fillOneMonthWithShifts() {
        let monthShift = new Array();
        let specialDates = this.emptyBord.specialDates;
        let specialDays = this.emptyBord.specialDays;
        let regularDays = this.emptyBord.regularDays;
        this.fillShiftsByType(specialDates, this.bord.settings.specialDates, shiftTypeEnum_1.SHIFT_TYPE.special_date, monthShift);
        this.fillShiftsByType(specialDays, this.bord.settings.specialDays, shiftTypeEnum_1.SHIFT_TYPE.special_day, monthShift);
        this.fillShiftsByType(regularDays, this.bord.settings.regularDays, shiftTypeEnum_1.SHIFT_TYPE.regular_day, monthShift);
        return monthShift;
    }
    fillShiftsByType(days, settings, type, monthShift) {
        for (let day of days) {
            let startShift = day.setHours(settings.daySettings.startTimeInDay);
            for (var i = 1; i <= settings.daySettings.numShiftsInDay; i++) {
                let shiftTime = this.getShiftTime(startShift, settings.shiftSettings);
                let numWorkers = settings.shiftSettings.numWorkersInShift;
                let shift = this.createNewShift(shiftTime, type, numWorkers);
                monthShift.push(shift);
                startShift = shift.shiftTime.toTime;
            }
        }
    }
    getShiftTime(startShift, shiftSettings) {
        let toTime = startShift.addHours(shiftSettings.shiftLengthInHouers);
        return new shiftTime_1.ShiftTime(startShift, toTime);
    }
    createNewShift(shiftTime, type, numWorkers) {
        let shift = new shift_1.Shift(shiftTime, type);
        let numAddedWorkers = 0;
        while (numAddedWorkers < numWorkers) {
            let workerId = this.getRandomWorkerId();
            if (this.canWorkerDoTheShift(shift, workerId)) {
                shift.addWorkerToShift(workerId);
                numAddedWorkers++;
            }
        }
        return shift;
    }
    getRandomWorkerId() {
        return this.bord.workersIds[Math.floor(Math.random() * this.bord.workersIds.length)];
    }
    canWorkerDoTheShift(shift, workerId) {
        return (!this.isWorkerAlreadyInShift(shift, workerId) &&
            !this.isShiftInWorkersConstraints(shift, workerId) &&
            this.isWorkerHasAvalibleShifts());
    }
    isWorkerAlreadyInShift(shift, workerId) {
        return shift.workersIds.includes(workerId);
    }
    isShiftInWorkersConstraints(shift, workerId) {
        let workerConstraints = this.constraints.find(c => (c.workerId = workerId));
        return !!workerConstraints.constraints.find(c => _.isEqual(c.shiftTime, shift.shiftTime));
    }
    isWorkerHasAvalibleShifts() {
        //ToDo
        return true;
    }
}
exports.generatFirstPopulation = generatFirstPopulation;
//# sourceMappingURL=generatFirstPopulation.js.map