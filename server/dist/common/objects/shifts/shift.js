"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Shift {
    constructor(shiftTime, shiftType) {
        //this.id =
        this.shiftTime = shiftTime;
        this.shiftType = shiftType;
        this.workersIds = new Array();
    }
    addWorkerToShift(workerId) {
        this.workersIds.push(workerId);
    }
}
exports.Shift = Shift;
//# sourceMappingURL=shift.js.map