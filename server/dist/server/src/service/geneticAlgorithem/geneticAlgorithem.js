"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var geneticalgorithm = require("geneticalgorithm");
var crossOver_1 = require("./crossOver");
var fitness_1 = require("./fitness");
var mutation_1 = require("./mutation");
var GeneticAlgorithm = /** @class */ (function () {
    function GeneticAlgorithm(firstPopulation, populationSize) {
        if (firstPopulation === void 0) { firstPopulation = []; }
        if (populationSize === void 0) { populationSize = 250; }
        var config = this.configure(populationSize, firstPopulation);
        this.algorithm = geneticalgorithm(config);
    }
    GeneticAlgorithm.prototype.configure = function (populationSize, firstPopulation) {
        return {
            mutationFunction: new mutation_1.Mutation().doAction,
            crossoverFunction: new crossOver_1.CrossOver().doAction,
            fitnessFunction: new fitness_1.Fitness().doAction,
            population: firstPopulation,
            populationSize: populationSize // defaults to 100
        };
    };
    GeneticAlgorithm.prototype.run = function () {
        this.algorithm.evolve();
        var best = this.algorithm.best();
        return best;
    };
    return GeneticAlgorithm;
}());
exports.GeneticAlgorithm = GeneticAlgorithm;
//# sourceMappingURL=geneticAlgorithem.js.map