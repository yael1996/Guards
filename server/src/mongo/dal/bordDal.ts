import { DBConnection } from "../dbConnection";

export class BordDal {
  private model;

  constructor() {
    this.model = DBConnection.Models.Bord;
  }

  public async insert(bord: string) {
    const bordModel = new DBConnection.Models.Bord(bord);
    return await bordModel.save();
  }

  public async remove(id: string) {
    return await this.model.findByIdAndRemove(id);
  }

  public async addWorker(bordId, worker) {
    return await this.model.findByIdAndUpdate(bordId, {
      $push: { workersIds: worker }
    });
  }

  public async removeWorker(bordId, worker) {
    return await this.model.findByIdAndUpdate(bordId, {
      $pull: { workersIds: worker }
    });
  }

  public async getAll() {
    return await this.model.find({});
  }

  public async getById(bordId: string) {
    return await this.model.find({ id: bordId });
  }
}
