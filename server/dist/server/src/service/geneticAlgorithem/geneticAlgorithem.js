"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var geneticalgorithm = require("geneticalgorithm");
const crossOver_1 = require("./crossOver");
const fitness_1 = require("./fitness");
const mutation_1 = require("./mutation");
class GeneticAlgorithm {
    constructor() {
        this.config = {
            mutationFunction: mutation_1.Mutation,
            crossoverFunction: crossOver_1.CrossOver,
            fitnessFunction: fitness_1.Fitness,
            population: [],
            populationSize: 250 // defaults to 100
        };
        this.algorithm = geneticalgorithm(this.config);
    }
    run() {
        this.algorithm.evolve();
        var best = this.algorithm.best();
    }
}
exports.GeneticAlgorithm = GeneticAlgorithm;
//# sourceMappingURL=geneticAlgorithem.js.map