declare var require: any;
var geneticalgorithm = require("geneticalgorithm");
import { CrossOver } from "./crossOver";
import { Fitness } from "./fitness";
import { Mutation } from "./mutation";
import { Shift } from "../../../../common/objects/shifts/shift";

export class GeneticAlgorithm {
  private algorithm;
  constructor(
    firstPopulation: Array<Array<Shift>> = [],
    populationSize: number = 250
  ) {
    const config = this.configure(populationSize, firstPopulation);
    this.algorithm = geneticalgorithm(config);
  }

  private configure(
    populationSize: number,
    firstPopulation: Array<Array<Shift>>
  ): any {
    return {
      mutationFunction: new Mutation().doAction,
      crossoverFunction: new CrossOver().doAction,
      fitnessFunction: new Fitness().doAction,
      population: firstPopulation,
      populationSize: populationSize // defaults to 100
    };
  }

  public run() {
    this.algorithm.evolve();
    let best = this.algorithm.best();
    return best;
  }
}
