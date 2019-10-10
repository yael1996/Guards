"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var bord_1 = require("../../../common/objects/bord/bord");
var bordDal_1 = require("../mongo/dal/bordDal");
var hour_1 = require("../../../common/objects/time/hour");
var daySettings_1 = require("../../../common/objects/settings/daySettings");
var shiftSettings_1 = require("../../../common/objects/settings/shiftSettings");
var regularDaySettings_1 = require("../../../common/objects/settings/regularDaySettings");
var boardSettings_1 = require("../../../common/objects/settings/boardSettings");
var BordService = /** @class */ (function () {
    function BordService() {
        this.dal = new bordDal_1.BordDal();
    }
    BordService.prototype.getdById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var bordId, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        bordId = req.query.bord;
                        return [4 /*yield*/, this.dal.getById(bordId)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.send(result)];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, res.status(400).send(error_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BordService.prototype.getdBordById = function (bordId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dal.getById(bordId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BordService.prototype.getOwnerBords = function (req, res) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    BordService.prototype.getworkerBords = function (req, res) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    BordService.prototype.addNewBord = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var bord, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        bord = JSON.stringify(this.getTestBord());
                        return [4 /*yield*/, this.dal.insert(bord)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, res.status(400).send(error_2)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BordService.prototype.getTestBord = function () {
        //create regular settings
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
    BordService.prototype.deleteBord = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var bordId, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        bordId = req.query.bord;
                        return [4 /*yield*/, this.dal.remove(bordId)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, res.status(400).send(error_3)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BordService.prototype.getAllBords = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.dal.getAll()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.send(result)];
                    case 2:
                        error_4 = _a.sent();
                        return [2 /*return*/, res.status(400).send(error_4)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BordService.prototype.AddWorkerToBord = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var bordId, worker, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        bordId = req.query.bord;
                        worker = req.query.worker;
                        return [4 /*yield*/, this.dal.addWorker(bordId, worker)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        return [2 /*return*/, res.status(400).send(error_5)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BordService.prototype.RemoveWorkerFromBord = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var bordId, worker, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        bordId = req.query.bord;
                        worker = req.query.worker;
                        return [4 /*yield*/, this.dal.addWorker(bordId, worker)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        return [2 /*return*/, res.status(400).send(error_6)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return BordService;
}());
exports.BordService = BordService;
//# sourceMappingURL=bordService.js.map