import { Bord } from "../../../common/objects/bord/bord";
import { BordSettings } from "../../../common/objects/settings/boardSettings";
import { GeneratFirstPopulation } from "../utiles/bordCreator/generatFirstPopulation";
import { RegularDaySettings } from "../../../common/objects/settings/regularDaySettings";
import { Hour } from "../../../common/objects/time/hour";
import { DaySettings } from "../../../common/objects/settings/daySettings";
import { ShiftSettings } from "../../../common/objects/settings/shiftSettings";
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

  public runAlgorithem(bordId: string, month: Month) {
    const population = this.generateFirstPopulation(bordId, month);
    const algo = new GeneticAlgorithm(population);
    return algo.run();
  }

  generateFirstPopulation = (
    bordId: string,
    month: Month
  ): Array<Array<Shift>> => {
    const bord: Bord = this.bordService.getBordById(bordId);
    const firstPopulation = new GeneratFirstPopulation(bord, month);
    return firstPopulation.buildFirstPopulation(POPULATION_SIZE);
  };
}
