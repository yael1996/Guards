"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var month_1 = require("./month");
var MonthConstraints = /** @class */ (function () {
    function MonthConstraints(month) {
        this.month = month ? month : this.getCurrentMonth();
        this.constraints = new Array();
        //this.shifts = new Array<WorkerShifts>();
    }
    MonthConstraints.prototype.getCurrentMonth = function () {
        var today = new Date();
        return new month_1.Month(today.getFullYear(), today.getMonth() + 1);
    };
    return MonthConstraints;
}());
exports.MonthConstraints = MonthConstraints;
//# sourceMappingURL=monthConstraints.js.map