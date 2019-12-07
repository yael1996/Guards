declare var require: any;
var geneticalgorithm = require("geneticalgorithm");
import { CrossOver } from "./crossOver";
import { Fitness } from "./fitness";
import { Mutation } from "./mutation";
import { Shift, Month } from "../mongo/models/concreteBoard";
import { GeneratFirstPopulation } from "../utiles/bordCreator/generatFirstPopulation";
import {
  Board,
  BoardSettings,
  RegularDaySettings,
  DaySettings,
  ShiftSettings,
  SpecialDatesSettings,
  SpecialDaysSettings
} from "../mongo/models/board";
import { DBHelper } from "../utiles/DBHelper";
import { models } from "mongoose";

export class GeneticAlgorithm {
  private POPULATION_SIZE = 100; // get from config
  private algorithm;
  private month: Month;
  private bordId: string;
  private db: DBHelper;

  constructor() {}

  public async runGeneticAlgorithm(bordId: string, month: Month) {
    this.bordId = bordId;
    this.month = month;
    this.db = new DBHelper();

    const firstPopulation = await this.getFirstPopulation();
    const config = this.getConfiguration(firstPopulation);
    this.algorithm = geneticalgorithm(config);
    return this.getBestReasult();
  }

  private async getConfiguration(firstPopulation: Shift[][] = []) {
    let allWorkers = await this.db.getAllWorkers(this.bordId);
    let workersDissatisfied = await this.db.getWorkerDissatisfieds(allWorkers);
    let workersConstraints = await this.db.getWorkerConstraints(
      allWorkers,
      this.month
    );

    const config = {
      mutationFunction: new Mutation().getMutation,
      crossoverFunction: new CrossOver().getCrossOver,
      fitnessFunction: new Fitness(
        workersDissatisfied,
        workersConstraints,
        allWorkers
      ).getFitness,
      population: firstPopulation,
      populationSize: firstPopulation.length // defaults to 100
    };

    return config;
  }

  private async getBestReasult() {
    await this.algorithm.evolve();
    const best = await this.algorithm.best();
    await this.db.updateDissatisfiedInDB(best);
    return best;
  }

  private async getFirstPopulation() {
    //const bord = await this.db.getBordById(this.bordId);
    const bord = this.getTestBord();
    const population = new GeneratFirstPopulation(bord, this.month);
    return await population.buildFirstPopulation(this.POPULATION_SIZE);
  }

  private getTestBord(): Board {
    let daySettings: DaySettings = {
      numShiftsInDay: 2,
      startHour: { hour: 10, minute: 0 }
    };

    let shiftSettings: ShiftSettings = {
      numWorkersInShift: 2,
      shiftLengthInHours: 4
    };

    let regularDaySettings: RegularDaySettings = {
      days: [1, 2, 3, 4],
      shiftSettings: shiftSettings,
      daySettings: daySettings
    };

    let specialDaySettings: SpecialDaysSettings = {
      days: null,
      shiftSettings: shiftSettings,
      daySettings: daySettings
    };

    let specialDateSettings: SpecialDatesSettings = {
      dates: null,
      shiftSettings: shiftSettings,
      daySettings: daySettings
    };

    let settings: BoardSettings = {
      regularDaySettings: regularDaySettings,
      specialDaysSettings: specialDaySettings,
      specialDatesSettings: specialDateSettings
    };

    let board = new models.board({
      name: "test",
      description: "test",
      ownerId: "5deb83d26ab2e3d9e344343d",
      boardSettings: settings,
      workerIds: [
        "5deb83df7d397ebd14092577",
        "5deb83e70f2f65f48ebc6a50",
        "5deb83f37dcda30838421318",
        "5deb83fb6a7dc10bc8f85ebd",
        "5deb840375bd721e8353a9bd",
        "5deb840b2942a44aa2c00a00",
        "5deb8413b38c88f38b86aa2d",
        "5deb841b12294e2e588ce76e"
      ]
    });

    return board;
  }
}
