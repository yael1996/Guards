"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Month = /** @class */ (function () {
    function Month() {
        var schema = new mongoose_1.Schema({
            month: { type: Number, required: true },
            year: { type: Number, required: true }
        });
        this._model = mongoose_1.model("Month", schema);
    }
    Object.defineProperty(Month.prototype, "model", {
        get: function () {
            return this._model;
        },
        enumerable: true,
        configurable: true
    });
    return Month;
}());
exports.Month = Month;
//# sourceMappingURL=month.js.map