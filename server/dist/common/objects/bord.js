"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bord = /** @class */ (function () {
    function Bord(name, description, ownerId, bordSettings) {
        //this.id =  generate id
        this.name = name;
        this.description = description;
        this.ownerId = ownerId;
        this.settings = bordSettings;
        this.workersIds = new Array();
    }
    Bord.prototype.addWorker = function (workerId) {
        this.workersIds.push(workerId);
    };
    return Bord;
}());
exports.Bord = Bord;
