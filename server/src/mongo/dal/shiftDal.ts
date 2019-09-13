import { DBConnection } from "../dbConnection";

export class ShiftDal {
  private model;

  constructor() {
    this.model = DBConnection.Models.Shift;
  }

  public async insert(shift) {
    const shiftModel = new DBConnection.Models.Shift(shift);
    await shiftModel.save();
  }

  public async remove(id: string) {
    await this.model.findByIdAndRemove(id);
  }

  public async update(id: string, newShift) {
    await this.model.findByIdAndUpdate(id, newShift);
  }

  public async getAll() {
    const allShifts = await this.model.find({});
  }
}
