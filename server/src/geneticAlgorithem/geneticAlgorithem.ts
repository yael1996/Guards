declare var require: any;
var geneticalgorithm = require("geneticalgorithm");
import { CrossOver } from "./crossOver";
import { Fitness } from "./fitness";
import { Mutation } from "./mutation";
import { Shift } from "../mongo/models/concreteBoard";

export class GeneticAlgorithm {
  private algorithm;

  constructor() {}

  public runAlgorithm() {}

  public configure(firstPopulation: Array<Array<Shift>> = []): any {
    const config = {
      mutationFunction: new Mutation().getMutation,
      crossoverFunction: new CrossOver().getCrossOver,
      fitnessFunction: new Fitness().getFitness,
      population: firstPopulation,
      populationSize: firstPopulation.length // defaults to 100
    };

    this.algorithm = geneticalgorithm(config);
  }

  public run() {
    this.algorithm.evolve();
    // best
    return this.algorithm.best();
  }
}
