"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Bord = /** @class */ (function () {
    function Bord() {
        var schema = new mongoose_1.Schema({
            id: {
                type: String,
                required: true,
                unique: true
            },
            name: { type: String, required: true },
            description: { type: String },
            ownerId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
            settings: { type: mongoose_1.Schema.Types.Mixed, required: true },
            workersIds: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
            numShiftsForWorker: { type: Number }
        });
        this._model = mongoose_1.model("Bord", schema);
    }
    Object.defineProperty(Bord.prototype, "model", {
        get: function () {
            return this._model;
        },
        enumerable: true,
        configurable: true
    });
    return Bord;
}());
exports.Bord = Bord;
//# sourceMappingURL=bord.js.map