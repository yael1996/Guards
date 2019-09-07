"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constraintService_1 = require("../dal/constraintService");
var Fitness = /** @class */ (function () {
    function Fitness() {
        // getFitness
        this.doAction = function (month, phenotype) {
            // use phenotype and possibly some other information
            // to determine the fitness number.  Higher is better, lower is worse.
            var fitness = 0;
            return fitness;
        };
        this.constraintsService = new constraintService_1.ConstraintService();
    }
    Fitness.prototype.workersConstraints = function (shift, month) {
        var numSatisfiedWorkers = 0;
        for (var _i = 0, _a = shift.workersIds; _i < _a.length; _i++) {
            var worker = _a[_i];
            if (!this.constraintsService.isShiftInWorkerConstraints(worker, shift.shiftTime, month))
                // maby + more then one
                numSatisfiedWorkers++;
        }
        return numSatisfiedWorkers;
    };
    Fitness.prototype.avalibleShifts = function () {
        //ToDo
        return true;
    };
    return Fitness;
}());
exports.Fitness = Fitness;
//# sourceMappingURL=fitness.js.map