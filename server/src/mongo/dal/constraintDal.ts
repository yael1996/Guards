import { DBConnection } from "../dbConnection";
import { ConstraintModel } from "../models/constraint";

export class ConstraintDal {
  private model: ConstraintModel;

  constructor() {
    this.model = DBConnection.Models.Constraint;
  }

  public async insert(constraint: string) {
    //const shiftModel = new DBConnection.Models.Shift(month);
    //return await shiftModel.save();
    return await this.model.create({ constraint });
  }

  public async remove(workerId: string, shiftTime: string) {
    return await this.model.remove({
      $and: [{ workerId: workerId }, { shiftTime: shiftTime }]
    });
  }

  public async update(workerId: string, shiftTime: string) {}

  public async getByMonth(month: string) {
    return await this.model.find({ month: month });
  }

  public async getByWorker(workerId: string) {
    return await this.model.find({ workerId: workerId });
  }
}
