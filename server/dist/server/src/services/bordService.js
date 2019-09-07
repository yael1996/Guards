"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bord_1 = require("../../../common/objects/bord/bord");
var boardSettings_1 = require("../../../common/objects/settings/boardSettings");
var hour_1 = require("../../../common/objects/time/hour");
var daySettings_1 = require("../../../common/objects/settings/daySettings");
var shiftSettings_1 = require("../../../common/objects/settings/shiftSettings");
var regularDaySettings_1 = require("../../../common/objects/settings/regularDaySettings");
var BordService = /** @class */ (function () {
    function BordService() {
    }
    BordService.prototype.getBordById = function (bordId) {
        // create regular settings
        var numShiftsInday = 1;
        var startTime = new hour_1.Hour(8);
        var numPeople = 2;
        var shiftLength = 4;
        var daySettings = new daySettings_1.DaySettings(numShiftsInday, startTime);
        var shiftSettings = new shiftSettings_1.ShiftSettings(numPeople, shiftLength);
        var regularDays = [1, 2, 3, 4];
        var regularSettings = new regularDaySettings_1.RegularDaySettings(daySettings, shiftSettings, regularDays);
        //create bord
        var name = "test";
        var owner = "111";
        var numShiftsPerWorker = 10;
        var bordSettings = new boardSettings_1.BordSettings(regularSettings);
        var bord = new bord_1.Bord(name, owner, numShiftsPerWorker, bordSettings);
        // add workers to bord
        bord.addWorker("1");
        bord.addWorker("2");
        bord.addWorker("3");
        bord.addWorker("4");
        bord.addWorker("5");
        return bord;
    };
    BordService.prototype.addNewBord = function (bord) {
        return true;
    };
    BordService.prototype.getAllBords = function () {
        return null;
    };
    BordService.prototype.AddWorkerToBord = function (workerId, bordId) {
        return true;
    };
    BordService.prototype.RemoveWorkerFromBord = function (workerId, bordId) {
        return true;
    };
    return BordService;
}());
exports.BordService = BordService;
//# sourceMappingURL=bordService.js.map