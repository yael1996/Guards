"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Constraint = /** @class */ (function () {
    function Constraint() {
        var schema = new mongoose_1.Schema({
            // id: { type: String, required: true, unique: true },
            shiftTime: { type: mongoose_1.Schema.Types.Mixed, required: true },
            workerId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "User",
                required: true,
                unique: true
            },
            reason: { type: String, required: false }
        });
        this._model = mongoose_1.model("Constraint", schema);
    }
    Object.defineProperty(Constraint.prototype, "model", {
        get: function () {
            return this._model;
        },
        enumerable: true,
        configurable: true
    });
    return Constraint;
}());
exports.Constraint = Constraint;
//# sourceMappingURL=constraint.js.map