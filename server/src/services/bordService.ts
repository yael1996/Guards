import { Bord } from "../../../common/objects/bord/bord";
import { BordDal } from "../mongo/dal/bordDal";

export class BordService {
  private dal: BordDal;

  constructor() {
    this.dal = new BordDal();
  }

  public async getBordById(req, res) {
    try {
      const bordId = req.query.bord;
      const result = await this.dal.getById(bordId);
      return res.send(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  public async addNewBord(req, res) {
    try {
      const bord = JSON.stringify(req.body.bord as Bord);
      await this.dal.insert(bord);
    } catch (error) {
      return res.status(400).send(error);
    }
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
