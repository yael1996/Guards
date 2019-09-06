"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mutation = /** @class */ (function () {
    function Mutation() {
        var _this = this;
        this.doAction = function (oldPhenotype) {
            // use oldPhenotype and some random
            // function to make a change to your
            // phenotype
            var resultPhenotype = oldPhenotype;
            return _this.switchTwoShifts(resultPhenotype);
        };
    }
    Mutation.prototype.switchTwoShifts = function (resultPhenotype) {
        // can do for and switch more then two
        var randomIndex1 = this.getRandomShiftIndex(resultPhenotype);
        var randomIndex2 = this.getRandomShiftIndex(resultPhenotype);
        var temp = resultPhenotype[randomIndex1];
        resultPhenotype[randomIndex1] = resultPhenotype[randomIndex2];
        resultPhenotype[randomIndex2] = temp;
        return resultPhenotype;
    };
    Mutation.prototype.getRandomShiftIndex = function (oldPhenotype) {
        return Math.floor(Math.random() * oldPhenotype.length);
    };
    return Mutation;
}());
exports.Mutation = Mutation;
//# sourceMappingURL=mutation.js.map