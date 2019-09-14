"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var User = /** @class */ (function () {
    function User() {
        var schema = new mongoose_1.Schema({
            id: {
                type: String,
                required: true,
                unique: true
            },
            firstName: { type: String },
            lastName: { type: String },
            email: { type: String, required: true, unique: true },
            tokens: { type: [String] },
            userType: {
                type: String,
                enum: ["MANAGER", "WORKER"],
                required: true
            }
        });
        this._model = mongoose_1.model("User", schema);
    }
    Object.defineProperty(User.prototype, "model", {
        get: function () {
            return this._model;
        },
        enumerable: true,
        configurable: true
    });
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map