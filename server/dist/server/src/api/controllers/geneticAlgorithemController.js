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
var express_1 = require("express");
var generatFirstPopulation_1 = require("../../service/bordCreator/generatFirstPopulation");
var geneticAlgorithem_1 = require("../../service/geneticAlgorithem/geneticAlgorithem");
var bord_1 = require("../../../../common/objects/bord");
var hour_1 = require("../../../../common/objects/hour");
var regularDaySettings_1 = require("../../../../common/objects/settings/regularDaySettings");
var shiftSettings_1 = require("../../../../common/objects/settings/shiftSettings");
var daySettings_1 = require("../../../../common/objects/settings/daySettings");
var boardSettings_1 = require("../../../../common/objects/settings/boardSettings");
var monthConstraints_1 = require("../../../../common/objects/month/monthConstraints");
var GeneticAlgorithemController = /** @class */ (function () {
    function GeneticAlgorithemController() {
        var _this = this;
        this.generateFirstPopulation = function (populationSize) {
            var name = "test";
            var owner = "111";
            var numShiftsPerWorker = 10;
            var a = _this.getDefultRegularDaySettings();
            var bordSettings = new boardSettings_1.BordSettings(a);
            var bord = new bord_1.Bord(name, owner, numShiftsPerWorker, bordSettings);
            bord.addWorker("1");
            bord.addWorker("2");
            bord.addWorker("3");
            bord.addWorker("4");
            bord.addWorker("5");
            var monthConstraints = new monthConstraints_1.MonthConstraints();
            var firstPopulation = new generatFirstPopulation_1.GeneratFirstPopulation(bord, monthConstraints);
            return firstPopulation.buildFirstPopulation(5);
        };
        this.getDefultRegularDaySettings = function () {
            var numShiftsInday = 1;
            var startTime = new hour_1.Hour(8);
            var numPeople = 2;
            var shiftLength = 4;
            var daySettings = new daySettings_1.DaySettings(numShiftsInday, startTime);
            var shiftSettings = new shiftSettings_1.ShiftSettings(numPeople, shiftLength);
            var regularDays = [1, 2, 3, 4];
            return new regularDaySettings_1.RegularDaySettings(daySettings, shiftSettings, regularDays);
        };
        this.routs = express_1.Router();
        this.InitRoutes();
    }
    GeneticAlgorithemController.prototype.InitRoutes = function () {
        var _this = this;
        this.routs.get("/run", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var populationSize, population, algo, best;
            return __generator(this, function (_a) {
                populationSize = 10;
                population = this.generateFirstPopulation(populationSize);
                algo = new geneticAlgorithem_1.GeneticAlgorithm(population, populationSize);
                best = algo.run();
                res.json({ best: JSON.stringify(best) });
                return [2 /*return*/];
            });
        }); });
    };
    return GeneticAlgorithemController;
}());
exports.GeneticAlgorithemController = GeneticAlgorithemController;
//# sourceMappingURL=geneticAlgorithemController.js.map