"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var geneticalgorithm = require("geneticalgorithm");
var crossOver_1 = require("./crossOver");
var fitness_1 = require("./fitness");
var mutation_1 = require("./mutation");
var GeneticAlgorithm = /** @class */ (function () {
    function GeneticAlgorithm(firstPopulation) {
        if (firstPopulation === void 0) { firstPopulation = []; }
        var config = this.configure(firstPopulation);
        this.algorithm = geneticalgorithm(config);
    }
    GeneticAlgorithm.prototype.configure = function (firstPopulation) {
        return {
            mutationFunction: new mutation_1.Mutation().getMutation,
            crossoverFunction: new crossOver_1.CrossOver().getCrossOver,
            fitnessFunction: new fitness_1.Fitness().getFitness,
            population: firstPopulation,
            populationSize: firstPopulation.length // defaults to 100
        };
    };
    GeneticAlgorithm.prototype.run = function () {
        this.algorithm.evolve();
        // best
        return this.algorithm.best();
    };
    return GeneticAlgorithm;
}());
exports.GeneticAlgorithm = GeneticAlgorithm;
//# sourceMappingURL=geneticAlgorithem.js.map