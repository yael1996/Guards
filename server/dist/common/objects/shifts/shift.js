"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Shift = /** @class */ (function () {
    function Shift(shiftTime, shiftType) {
        //this.id =
        this.shiftTime = shiftTime;
        this.shiftType = shiftType;
        this.workersIds = new Array();
    }
    Shift.prototype.addWorkerToShift = function (workerId) {
        this.workersIds.push(workerId);
    };
    return Shift;
}());
exports.Shift = Shift;
//# sourceMappingURL=shift.js.map