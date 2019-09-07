"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var guid_typescript_1 = require("guid-typescript");
var Bord = /** @class */ (function () {
    function Bord(name, ownerId, numShiftsForWorker, bordSettings, description) {
        this.id = guid_typescript_1.Guid.create().toString();
        this.name = name;
        this.description = description;
        this.ownerId = ownerId;
        this.settings = bordSettings;
        this.numShiftsForWorker = numShiftsForWorker;
        this.workersIds = new Array();
    }
    Bord.prototype.addWorker = function (workerId) {
        this.workersIds.push(workerId);
    };
    return Bord;
}());
exports.Bord = Bord;
//# sourceMappingURL=bord.js.map