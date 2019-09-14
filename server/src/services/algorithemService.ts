import { Bord } from "../../../common/objects/bord/bord";
import { GeneratFirstPopulation } from "../utiles/bordCreator/generatFirstPopulation";
import { GeneticAlgorithm } from "../geneticAlgorithem/geneticAlgorithem";
import { Shift } from "../../../common/objects/shifts/shift";
import { BordService } from "./bordService";
import { Month } from "../../../common/objects/time/month";

const POPULATION_SIZE: number = 10; // 250

export class AlgorithemService {
  private bordService: BordService;

  constructor() {
    this.bordService = new BordService();
  }

  public async runAlgorithem(bordId: string, month: Month) {
    const population = await this.generateFirstPopulation(bordId, month);
    const algo = new GeneticAlgorithm(population);
    const best = await algo.run();
    return best;
  }

  generateFirstPopulation = async (bordId: string, month: Month) => {
    const bord: Bord = await this.bordService.getdBordById(bordId);
    const firstPopulation = new GeneratFirstPopulation(bord, month);
    return firstPopulation.buildFirstPopulation(POPULATION_SIZE);
  };
}
