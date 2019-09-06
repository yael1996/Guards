declare var require: any;
var geneticalgorithm = require("geneticalgorithm");
import { CrossOver } from "./crossOver";
import { Fitness } from "./fitness";
import { Mutation } from "./mutation";
import { Shift } from "../../../../common/objects/shifts/shift";

export class GeneticAlgorithm {
  private config;
  private algorithm;

  constructor(
    populationSize: number = 250,
    firstPopulation: Array<Array<Shift>> = []
  ) {
    this.config = this.configure(populationSize, firstPopulation);
    this.algorithm = geneticalgorithm(this.config);
  }

  private configure(
    populationSize: number,
    firstPopulation: Array<Array<Shift>>
  ): any {
    return {
      mutationFunction: Mutation,
      crossoverFunction: CrossOver,
      fitnessFunction: Fitness,
      population: firstPopulation,
      populationSize: populationSize // defaults to 100
    };
  }

  public run() {
    this.algorithm.evolve();
    var best = this.algorithm.best();
  }
}
