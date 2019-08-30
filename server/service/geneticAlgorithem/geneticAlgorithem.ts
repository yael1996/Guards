declare var require: any;

var geneticalgorithm = require("geneticalgorithm");
import { CrossOver } from "./crossOver";
import { Fitness } from "./fitness";
import { Mutation } from "./mutation";

export class geneticAlgorithm {
  private config;
  private algorithm;

  constructor() {
    this.config = {
      mutationFunction: Mutation,
      crossoverFunction: CrossOver,
      fitnessFunction: Fitness,
      population: [],
      populationSize: 250 // defaults to 100
    };

    this.algorithm = geneticalgorithm(this.config);
  }

  public run() {
    this.algorithm.evolve();
    var best = this.algorithm.best();
  }
}
