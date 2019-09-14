"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var month_1 = require("../time/month");
var ShiftTime = /** @class */ (function () {
    function ShiftTime(fromTime, toTime) {
        this.fromTime = fromTime;
        this.toTime = toTime;
        this.month = this.getShiftMonth(toTime);
    }
    ShiftTime.prototype.getShiftMonth = function (toTime) {
        return new month_1.Month(toTime.getFullYear(), toTime.getMonth());
    };
    return ShiftTime;
}());
exports.ShiftTime = ShiftTime;
//# sourceMappingURL=shiftTime.js.map