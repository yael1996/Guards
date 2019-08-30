import { geneticalgorithm } from "../../node_modules/geneticalgorithm";
import { CrossOver } from "./crossOver";
import { Fitness } from "./fitness";
import { Mutation } from "./mutation";

export class geneticAlgorithm {
  private config;

  constructor() {
    this.config = {
      mutationFunction: Mutation,
      crossoverFunction: CrossOver,
      fitnessFunction: Fitness,
      population: [],
      populationSize: 250 // defaults to 100
    };
  }

  public run() {
    var geneticalgorithm = geneticAlgorithmConstructor(this.config);
    geneticalgorithm.evolve();
    var best = geneticalgorithm.best();
  }
}
