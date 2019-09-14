"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Shift = /** @class */ (function () {
    function Shift() {
        var schema = new mongoose_1.Schema({
            // id: { type: String, required: true, unique: true },
            shiftTime: { type: mongoose_1.Schema.Types.Mixed, required: true, unique: true },
            shiftType: {
                type: String,
                enum: ["REGULAR_DAY", "SPECIAL_DAY", "SPECIAL_DATE"],
                required: true
            },
            workersIds: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }]
        });
        this._model = mongoose_1.model("Shift", schema);
    }
    Object.defineProperty(Shift.prototype, "model", {
        get: function () {
            return this._model;
        },
        enumerable: true,
        configurable: true
    });
    return Shift;
}());
exports.Shift = Shift;
//# sourceMappingURL=shift.js.map