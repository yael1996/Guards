"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("underscore");
var ConstraintService = /** @class */ (function () {
    function ConstraintService() {
    }
    ConstraintService.prototype.getWorkerConstraintsByMonth = function (workerId, month) {
        return null;
    };
    ConstraintService.prototype.addWorkerConstraint = function (constraint) {
        return true;
    };
    ConstraintService.prototype.isShiftInWorkerConstraints = function (workerId, shiftTime, month) {
        var workerConstrains = this.getWorkerConstraintsByMonth(workerId, month);
        return !!workerConstrains.find(function (c) { return _.isEqual(c.shiftTime, shiftTime); });
    };
    return ConstraintService;
}());
exports.ConstraintService = ConstraintService;
//# sourceMappingURL=constraintService.js.map