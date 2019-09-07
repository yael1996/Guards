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
      const constraint = req.body.constraint as Constraint;
      const isSucceeded = this.constraintService.addWorkerConstraint(
        constraint
      );
      res.json({ success: isSucceeded });
    });
  }
}
