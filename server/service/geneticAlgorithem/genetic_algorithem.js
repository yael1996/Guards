var geneticAlgorithmConstructor = require("geneticalgorithm");
var crossover = require("./crossover");
var fitness = require("./fitness");
var mutation = require("./mutation");

var config = {
  mutationFunction: mutation.action,
  crossoverFunction: crossover.action,
  fitnessFunction: fitness.action,
  population: [
    [1, 2, 5, 4, 3],
    [1, 5, 4, 2, 3],
    [1, 5, 2, 3, 4],
    [1, 2, 4, 5, 3],
    [1, 4, 2, 5, 3],
    [2, 1, 3, 5, 4],
    [2, 5, 3, 1, 4],
    [2, 3, 4, 1, 5],
    [2, 4, 3, 5, 1],
    [2, 3, 1, 5, 4],
    [3, 5, 1, 2, 4],
    [3, 5, 4, 1, 2],
    [3, 1, 4, 5, 2],
    [3, 4, 2, 1, 5],
    [3, 4, 1, 5, 2],
    [4, 3, 5, 2, 1],
    [4, 1, 2, 5, 3],
    [4, 2, 1, 5, 3],
    [4, 5, 1, 3, 2],
    [4, 1, 3, 5, 2],
    [5, 1, 4, 2, 3],
    [5, 3, 4, 1, 2],
    [5, 2, 1, 3, 4],
    [5, 4, 1, 2, 3],
    [5, 1, 3, 4, 2]
  ],
  populationSize: 100000 // defaults to 100
};

module.exports = {
  run: function(req, res) {
    var geneticalgorithm = geneticAlgorithmConstructor(config);
    geneticalgorithm.evolve();
    var best = geneticalgorithm.best();
    var bestScore = geneticalgorithm.bestScore();
    console.log("best: " + best);
    console.log("bestScore: " + bestScore);
  }
};
