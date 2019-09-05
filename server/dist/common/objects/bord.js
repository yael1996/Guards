"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bord {
    constructor(name, description, ownerId, bordSettings, numShiftsForWorker) {
        //this.id =  generate id
        this.id = "123";
        this.name = name;
        this.description = description;
        this.ownerId = ownerId;
        this.settings = bordSettings;
        this.numShiftsForWorker = numShiftsForWorker;
        this.workersIds = new Array();
    }
    addWorker(workerId) {
        this.workersIds.push(workerId);
    }
}
exports.Bord = Bord;
//# sourceMappingURL=bord.js.map