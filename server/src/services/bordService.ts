import { Bord } from "../../../common/objects/bord/bord";
import { BordDal } from "../mongo/dal/bordDal";
import { Hour } from "../../../common/objects/time/hour";
import { DaySettings } from "../../../common/objects/settings/daySettings";
import { ShiftSettings } from "../../../common/objects/settings/shiftSettings";
import { RegularDaySettings } from "../../../common/objects/settings/regularDaySettings";
import { BordSettings } from "../../../common/objects/settings/boardSettings";

export class BordService {
  private dal: BordDal;

  constructor() {
    this.dal = new BordDal();
  }

  public async getdById(req, res) {
    try {
      const bordId = req.query.bord;
      const result = await this.dal.getById(bordId);
      return res.send(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  public async getdBordById(bordId) {
    return await this.dal.getById(bordId);
  }

  public async getOwnerBords(req, res) {}

  public async getworkerBords(req, res) {}

  public async addNewBord(req, res) {
    try {
      // const bord = JSON.stringify(req.body.bord as Bord);
      const bord = JSON.stringify(this.getTestBord());
      await this.dal.insert(bord);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  private getTestBord() {
    //create regular settings
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

  public async deleteBord(req, res) {
    try {
      const bordId = req.query.bord;
      await this.dal.remove(bordId);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  public async getAllBords(req, res) {
    try {
      const result = await this.dal.getAll();
      return res.send(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  public async AddWorkerToBord(req, res) {
    try {
      const bordId = req.query.bord;
      const worker = req.query.worker;
      await this.dal.addWorker(bordId, worker);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  public async RemoveWorkerFromBord(req, res) {
    try {
      const bordId = req.query.bord;
      const worker = req.query.worker;
      await this.dal.addWorker(bordId, worker);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
