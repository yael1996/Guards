"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constraintService_1 = require("../services/constraintService");
var Fitness = /** @class */ (function () {
    function Fitness() {
        var _this = this;
        this.getFitness = function (monthShifts) {
            // use phenotype and possibly some other information
            // to determine the fitness number.  Higher is better, lower is worse.
            var fitness = 0;
            fitness += _this.workersConstraints(monthShifts);
            return fitness;
        };
        this.constraintsService = new constraintService_1.ConstraintService();
    }
    Fitness.prototype.workersConstraints = function (monthShifts) {
        var numSatisfiedWorkers = 0;
        for (var _i = 0, monthShifts_1 = monthShifts; _i < monthShifts_1.length; _i++) {
            var shift = monthShifts_1[_i];
            var month = shift.shiftTime.getShiftMonth();
            for (var _a = 0, _b = shift.workersIds; _a < _b.length; _a++) {
                var worker = _b[_a];
                if (!this.constraintsService.isShiftInWorkerConstraints(worker, shift.shiftTime, month))
                    // maby + more then one
                    numSatisfiedWorkers++;
            }
        }
        return numSatisfiedWorkers;
    };
    Fitness.prototype.avalibleShifts = function () {
        // ford farcenson
        return true;
    };
    return Fitness;
}());
exports.Fitness = Fitness;
//# sourceMappingURL=fitness.js.map