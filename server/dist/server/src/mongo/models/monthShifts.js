"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var shift_1 = require("./shift");
var MonthShifts = /** @class */ (function () {
    function MonthShifts() {
        var schema = new mongoose_1.Schema({
            monthId: {
                month: { type: Number, required: true },
                year: { type: Number, required: true }
            },
            shifts: [{ type: new shift_1.Shift().model, ref: "Constraint" }]
        });
        this._model = mongoose_1.model("MonthShift", schema);
    }
    Object.defineProperty(MonthShifts.prototype, "model", {
        get: function () {
            return this._model;
        },
        enumerable: true,
        configurable: true
    });
    return MonthShifts;
}());
exports.MonthShifts = MonthShifts;
//# sourceMappingURL=monthShifts.js.map