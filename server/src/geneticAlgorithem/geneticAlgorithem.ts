declare var require: any;
var geneticalgorithm = require("geneticalgorithm");
import { CrossOver } from "./crossOver";
import { Fitness } from "./fitness";
import { Mutation } from "./mutation";
import { Shift, Month } from "../mongo/models/concreteBoard";
import { GeneratFirstPopulation } from "../utiles/bordCreator/generatFirstPopulation";
import { DBHelper } from "../utiles/DBHelper";

export class GeneticAlgorithm {
  private POPULATION_SIZE = 30; // get from config
  private algorithm;
  private month: Month;
  private bordId: string;
  private db: DBHelper;

  constructor() {}

  public async runGeneticAlgorithm(
    bordId: string,
    month: Month,
    amountShiftsPart = 0.3,
    equityPart = 0.3,
    satisfiedPeoplePart = 0.4
  ) {
    this.bordId = bordId;
    this.month = month;
    this.db = new DBHelper();

    let allWorkers = await this.db.getAllWorkers(this.bordId);
    let workersDissatisfied = await this.db.getWorkerDissatisfieds(allWorkers);
    let workersConstraints = await this.db.getWorkerConstraints(
      allWorkers,
      this.month
    );

    const firstPopulation = await this.getFirstPopulation();
    const config = await this.getConfiguration(
      allWorkers,
      workersDissatisfied,
      workersConstraints,
      amountShiftsPart,
      equityPart,
      satisfiedPeoplePart,
      firstPopulation
    );
    this.algorithm = await geneticalgorithm(config);
    return await this.getBestReasult();
  }

  private async getConfiguration(
    allWorkers,
    workersDissatisfied,
    workersConstraints,
    amountShiftsPart,
    equityPart,
    satisfiedPeoplePart,
    firstPopulation: Shift[][] = []
  ) {
    const config = {
      mutationFunction: new Mutation().getMutation,
      crossoverFunction: new CrossOver().getCrossOver,
      fitnessFunction: new Fitness(
        workersDissatisfied,
        workersConstraints,
        allWorkers,
        amountShiftsPart,
        equityPart,
        satisfiedPeoplePart
      ).getFitness,
      population: firstPopulation,
      populationSize: firstPopulation.length // defaults to 100
    };

    return config;
  }

  private async getBestReasult() {
    await this.algorithm
      .evolve()
      .evolve()
      .evolve()
      .evolve()
      .evolve()
      .evolve()
      .evolve()
      .evolve()
      .evolve()
      .evolve()
      .evolve();
    const best: Shift[] = await this.algorithm.best();
    await this.db.saveBestToDB(best, this.month, this.bordId);
    return best;
  }

  public getBestFitness() {
    const bestFitness = this.algorithm.bestScore();
    return bestFitness;
  }

  private async getFirstPopulation() {
    //const bord = this.db.getTestBord();
    const bord = await this.db.getBordById(this.bordId);
    const population = new GeneratFirstPopulation(bord, this.month);
    return await population.buildFirstPopulation(this.POPULATION_SIZE);
  }
}
