var geneticAlgorithmConstructor = require("geneticalgorithm");
var crossover = require("./crossover");
var fitness = require("./fitness");
var mutation = require("./mutation");

var config = {
  mutationFunction: mutation.action,
  crossoverFunction: crossover.action,
  fitnessFunction: fitness.action,
  population: [],
  populationSize: 250 // defaults to 100
};

module.exports = {
  run: function() {
    var geneticalgorithm = geneticAlgorithmConstructor(config);
    geneticalgorithm.evolve();
    var best = geneticalgorithm.best();
  }
};
