import { Router } from "express";
import { GeneratFirstPopulation } from "../../service/bordCreator/generatFirstPopulation";
import { Shift } from "../../../../common/objects/shifts/shift";
import { Bord } from "../../../../common/objects/bord";
import { MonthConstraints } from "../../../../common/objects/month/monthConstraints";
import { RegularDaySettings } from "../../../../common/objects/settings/regularDaySettings";
import { Hour } from "../../../../common/objects/hour";
import { DaySettings } from "../../../../common/objects/settings/daySettings";
import { ShiftSettings } from "../../../../common/objects/settings/shiftSettings";
import { BordSettings } from "../../../../common/objects/settings/boardSettings";
import { GeneticAlgorithm } from "../../service/geneticAlgorithem/geneticAlgorithem";

export class GeneticAlgorithemController {
  public routs: Router;

  constructor() {
    this.routs = Router();
    this.InitRoutes();
  }

  private InitRoutes() {
    this.routs.get("/run", async (req, res) => {
      const populationSize = 10;
      const population = this.generateFirstPopulation(populationSize);
      const algo = new GeneticAlgorithm(population, populationSize);
      let best = algo.run();
      res.json({ best: JSON.stringify(best) });
    });
  }

  generateFirstPopulation = (populationSize: number): Array<Array<Shift>> => {
    const name = "test";
    const owner = "111";
    const numShiftsPerWorker = 10;
    let a = this.getDefultRegularDaySettings();
    const bordSettings = new BordSettings(a);

    const bord: Bord = new Bord(name, owner, numShiftsPerWorker, bordSettings);
    bord.addWorker("1");
    bord.addWorker("2");
    bord.addWorker("3");
    bord.addWorker("4");
    bord.addWorker("5");

    const monthConstraints: MonthConstraints = new MonthConstraints();

    const firstPopulation = new GeneratFirstPopulation(bord, monthConstraints);
    return firstPopulation.buildFirstPopulation(5);
  };

  getDefultRegularDaySettings = (): RegularDaySettings => {
    const numShiftsInday = 1;
    const startTime = new Hour(8);
    const numPeople = 2;
    const shiftLength = 4;

    const daySettings: DaySettings = new DaySettings(numShiftsInday, startTime);
    const shiftSettings: ShiftSettings = new ShiftSettings(
      numPeople,
      shiftLength
    );
    const regularDays: Array<number> = [1, 2, 3, 4];
    return new RegularDaySettings(daySettings, shiftSettings, regularDays);
  };
}
