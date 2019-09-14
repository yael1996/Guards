import { DBConnection } from "../dbConnection";

export class ShiftDal {
  private model;

  constructor() {
    this.model = DBConnection.Models.Shift;
  }

  public async insert(shift: string) {
    //const shiftModel = new DBConnection.Models.Shift(month);
    //return await shiftModel.save();
    return await this.model.create({ shift: shift });
  }

  public async remove(shiftId: string) {
    return await this.model.findByIdAndRemove(shiftId);
  }

  public async addWorker(shiftId: string, workerId: String) {
    return await this.model.findByIdAndUpdate(shiftId, {
      $push: { workersIds: workerId }
    });
  }

  public async removeWorker(shiftId: string, workerId: String) {
    return await this.model.findByIdAndUpdate(shiftId, {
      $pull: { workersIds: workerId }
    });
  }

  public async updateTime(shiftId: string, shiftTime) {
    return await this.model.findByIdAndUpdate(shiftId, {
      $pull: { shiftTime: shiftTime }
    });
  }

  public async getByMonth(month: string) {
    return await this.model.find({ month: month });
  }
}
