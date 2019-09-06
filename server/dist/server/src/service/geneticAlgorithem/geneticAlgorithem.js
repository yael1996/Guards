"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var geneticalgorithm = require("geneticalgorithm");
var crossOver_1 = require("./crossOver");
var fitness_1 = require("./fitness");
var mutation_1 = require("./mutation");
var GeneticAlgorithm = /** @class */ (function () {
    function GeneticAlgorithm(populationSize, firstPopulation) {
        if (populationSize === void 0) { populationSize = 250; }
        if (firstPopulation === void 0) { firstPopulation = []; }
        this.config = this.configure(populationSize, firstPopulation);
        this.algorithm = geneticalgorithm(this.config);
    }
    GeneticAlgorithm.prototype.configure = function (populationSize, firstPopulation) {
        return {
            mutationFunction: mutation_1.Mutation,
            crossoverFunction: crossOver_1.CrossOver,
            fitnessFunction: fitness_1.Fitness,
            population: firstPopulation,
            populationSize: populationSize // defaults to 100
        };
    };
    GeneticAlgorithm.prototype.run = function () {
        this.algorithm.evolve();
        var best = this.algorithm.best();
    };
    return GeneticAlgorithm;
}());
exports.GeneticAlgorithm = GeneticAlgorithm;
//# sourceMappingURL=geneticAlgorithem.js.map