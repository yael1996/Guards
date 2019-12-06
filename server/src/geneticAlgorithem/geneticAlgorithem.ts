declare var require: any;
var geneticalgorithm = require("geneticalgorithm");
import { CrossOver } from "./crossOver";
import { Fitness } from "./fitness";
import { Mutation } from "./mutation";
import { Shift, Month } from "../mongo/models/concreteBoard";
import { models } from "../mongo/connection";
import { Constraint } from "../mongo/models/User";
import { GeneratFirstPopulation } from "../utiles/bordCreator/generatFirstPopulation";

export class GeneticAlgorithm {
  private POPULATION_SIZE = 100; // get from config
  private algorithm;
  private month: Month;
  private bordId: string;
  private workersConstraints: { [id: string]: Constraint[] };
  private workersDissatisfied: { [id: string]: number };
  constructor() {}

  public async runGeneticAlgorithm(bordId: string, month: Month) {
    this.bordId = bordId;
    this.month = month;

    const firstPopulation = await this.getFirstPopulation();
    const config = this.getConfiguration(firstPopulation);
    this.algorithm = geneticalgorithm(config);
    return this.getBestReasult();
  }

  private getConfiguration(firstPopulation: Shift[][] = []): any {
    const config = {
      mutationFunction: new Mutation().getMutation,
      crossoverFunction: new CrossOver().getCrossOver,
      fitnessFunction: new Fitness().getFitness,
      population: firstPopulation,
      populationSize: firstPopulation.length // defaults to 100
    };
  }

  private async getBestReasult() {
    await this.algorithm.evolve();
    const best = await this.algorithm.best();
    await this.updateDissatisfiedInDB(best);
    return best;
  }

  private async getFirstPopulation() {
    const bord = await models.board.findById(this.bordId);
    const population = new GeneratFirstPopulation(bord, this.month);
    return await population.buildFirstPopulation(this.POPULATION_SIZE);
  }

  private async getBordById(boardId: string) {
    return await models.board.findById(boardId);
  }

  private async updateDissatisfiedInDB(best: Shift[]) {
    // ToDo
  }

  private async getWorkersData(allWorkers: string[]) {
    this.workersConstraints = {};
    this.workersDissatisfied = {};

    for (let workerId in allWorkers) {
      const user = await models.user.findById(workerId);
      if (!user) {
        //ToDo
      }
      this.workersConstraints[workerId] = this.getWorkerConstraints(user);
      this.workersDissatisfied[workerId] = this.getWorkerDissatisfieds(user);
    }
  }

  private getWorkerConstraints(user) {
    // ToDo - refactor or get from db
    return user.monthlyConstraints.find(
      x => x.month.year == this.month.month && x.month.year == this.month.year
    );
  }

  private getWorkerDissatisfieds(user) {
    return user.unSatisfiedConstraints;
  }

  private async getWorkersId(): Promise<string[]> {
    const bord = await models.board.findById(this.bordId);
    if (!bord) {
      //ToDo
    }
    return bord.workerIds;
  }
}
