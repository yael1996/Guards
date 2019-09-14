"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var constraint_1 = require("./constraint");
var MonthConstraints = /** @class */ (function () {
    function MonthConstraints() {
        var schema = new mongoose_1.Schema({
            monthId: {
                month: { type: Number, required: true },
                year: { type: Number, required: true }
            },
            constraints: [new constraint_1.Constraint().model]
        });
        this._model = mongoose_1.model("MonthConstraints", schema);
    }
    Object.defineProperty(MonthConstraints.prototype, "model", {
        get: function () {
            return this._model;
        },
        enumerable: true,
        configurable: true
    });
    return MonthConstraints;
}());
exports.MonthConstraints = MonthConstraints;
//# sourceMappingURL=monthConstraints.js.map