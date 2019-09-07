"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var generatFirstPopulation_1 = require("../utiles/bordCreator/generatFirstPopulation");
var geneticAlgorithem_1 = require("../geneticAlgorithem/geneticAlgorithem");
var bordService_1 = require("./bordService");
var POPULATION_SIZE = 10; // 250
var AlgorithemService = /** @class */ (function () {
    function AlgorithemService() {
        var _this = this;
        this.generateFirstPopulation = function (bordId, month) {
            var bord = _this.bordService.getBordById(bordId);
            var firstPopulation = new generatFirstPopulation_1.GeneratFirstPopulation(bord, month);
            return firstPopulation.buildFirstPopulation(POPULATION_SIZE);
        };
        this.bordService = new bordService_1.BordService();
    }
    AlgorithemService.prototype.runAlgorithem = function (bordId, month) {
        var population = this.generateFirstPopulation(bordId, month);
        var algo = new geneticAlgorithem_1.GeneticAlgorithm(population);
        return algo.run();
    };
    return AlgorithemService;
}());
exports.AlgorithemService = AlgorithemService;
//# sourceMappingURL=algorithemService.js.map