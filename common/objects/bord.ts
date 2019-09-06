import { BordSettings } from "./settings/boardSettings";

export class Bord {
  public id: string;
  public name: string;
  public description: string;
  public ownerId: string;
  public settings: BordSettings;
  public workersIds: Array<string>;
  public numShiftsForWorker: number;

  constructor(
    name: string,
    ownerId: string,
    numShiftsForWorker: number,
    description?: string,
    bordSettings?: BordSettings
  ) {
    //this.id =  generate id
    this.id = "123";
    this.name = name;
    this.description = description;
    this.ownerId = ownerId;
    this.settings = bordSettings ? bordSettings : new BordSettings();
    this.numShiftsForWorker = numShiftsForWorker;
    this.workersIds = new Array<string>();
  }

  public addWorker(workerId: string): void {
    this.workersIds.push(workerId);
  }
}
