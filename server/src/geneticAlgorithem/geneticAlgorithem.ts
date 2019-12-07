// declare var require: any;
// var geneticalgorithm = require("geneticalgorithm");
// import { CrossOver } from "./crossOver";
// import { Fitness } from "./fitness";
// import { Mutation } from "./mutation";
// import { Shift } from "../../../common/objects/shifts/shift";
//
// export class GeneticAlgorithm {
//   private algorithm;
//   constructor(firstPopulation: Array<Array<Shift>> = []) {
//     const config = this.configure(firstPopulation);
//     this.algorithm = geneticalgorithm(config);
//   }
//
//   private configure(firstPopulation: Array<Array<Shift>>): any {
//     return {
//       mutationFunction: new Mutation().getMutation,
//       crossoverFunction: new CrossOver().getCrossOver,
//       fitnessFunction: new Fitness().getFitness,
//       population: firstPopulation,
//       populationSize: firstPopulation.length // defaults to 100
//     };
//   }
//
//   public run() {
//     this.algorithm.evolve();
//     // best
//     return this.algorithm.best();
//   }
// }
