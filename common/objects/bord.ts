import { BordSettings } from "./settings/boardSettings";

export class Bord {
  public id: string;
  public name: string;
  public description: string;
  public ownerId: string;
  public settings: BordSettings;
  public workersIds: Array<string>;

  constructor(
    name: string,
    description: string,
    ownerId: string,
    bordSettings: BordSettings
  ) {
    //this.id =  generate id
    this.name = name;
    this.description = description;
    this.ownerId = ownerId;
    this.settings = bordSettings;
    this.workersIds = new Array<string>();
  }

  public addWorker(workerId: string): void {
    this.workersIds.push(workerId);
  }
}
