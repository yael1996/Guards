"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CrossOver = /** @class */ (function () {
    function CrossOver() {
        var _this = this;
        this.getCrossOver = function (phenoTypeA, phenoTypeB) {
            // use phenoTypeA and B to create phenotype result 1 and 2
            return _this.combineShifts(phenoTypeA, phenoTypeB);
        };
    }
    CrossOver.prototype.combineShifts = function (phenoTypeA, phenoTypeB) {
        // assume that phenoTypeA and phenoTypeB are the same length
        var index = phenoTypeA.length / 2;
        var partOfA = phenoTypeA.slice(0, index);
        var partOfB = phenoTypeB.slice(index, phenoTypeB.length);
        return [partOfA, partOfB];
    };
    return CrossOver;
}());
exports.CrossOver = CrossOver;
//# sourceMappingURL=crossOver.js.map