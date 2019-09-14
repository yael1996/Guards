import { ConstraintService } from "../../services/constraintService";
import { Router } from "express";
import { Constraint } from "../../../../common/objects/constraints/constraint";

export class ConstraintsController {
  public routs: Router;
  private constraintService: ConstraintService;

  constructor() {
    this.routs = Router();
    this.constraintService = new ConstraintService();
    this.InitRoutes();
  }

  private async InitRoutes() {
    this.routs.post("/addConstraint", async (req, res) => {
      await this.constraintService.addConstraint(req, res);
    });

    this.routs.post("/deleteConstraint", async (req, res) => {
      await this.constraintService.deleteConstraint(req, res);
    });

    this.routs.post("/getWorkerConstraint", async (req, res) => {
      await this.constraintService.getWorkerConstraints(req, res);
    });

    this.routs.post("/getMonthConstraint", async (req, res) => {
      await this.constraintService.getMonthConstraints(req, res);
    });
  }
}
