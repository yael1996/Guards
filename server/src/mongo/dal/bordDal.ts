import { DBConnection } from "../dbConnection";

export class BordDal {
  private model;

  constructor() {
    this.model = DBConnection.Models.Bord;
  }

  public async insert(bord) {
    const bordModel = new DBConnection.Models.Bord(bord);
    await bordModel.save();
  }

  public async remove(id: string) {
    await this.model.findByIdAndRemove(id);
  }

  public async update(id: string, newBord) {
    await this.model.findByIdAndUpdate(id, newBord);
  }

  public async getAll() {
    const allBords = await this.model.find({});
  }
}
