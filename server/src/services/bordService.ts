import { Bord } from "../../../common/objects/bord/bord";
import { BordSettings } from "../../../common/objects/settings/boardSettings";
import { Hour } from "../../../common/objects/time/hour";
import { DaySettings } from "../../../common/objects/settings/daySettings";
import { ShiftSettings } from "../../../common/objects/settings/shiftSettings";
import { RegularDaySettings } from "../../../common/objects/settings/regularDaySettings";

export class BordService {
  constructor() {}

  public getBordById(bordId: string): Bord {
    // create regular settings
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
    const regularSettings = new RegularDaySettings(
      daySettings,
      shiftSettings,
      regularDays
    );

    //create bord
    const name = "test";
    const owner = "111";
    const numShiftsPerWorker = 10;
    const bordSettings = new BordSettings(regularSettings);
    const bord: Bord = new Bord(name, owner, numShiftsPerWorker, bordSettings);

    // add workers to bord
    bord.addWorker("1");
    bord.addWorker("2");
    bord.addWorker("3");
    bord.addWorker("4");
    bord.addWorker("5");

    return bord;
  }

  public addNewBord(bord: Bord): void {}

  public getAllBords(): Array<Bord> {
    return null;
  }

  public joinBord(): void {}

  public leaveBord(): void {}
}
