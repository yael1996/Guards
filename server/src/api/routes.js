var controller = require("./controller");

module.exports = function(app) {
  app.route("/logIn").post(controller.logIn);
  app.route("/constraints").post(controller.constraints);
  app.route("/createGuardBoard").get(controller.createGuardBoard);
  app.route("/runGeneticAlgorithem").get(controller.runGeneticAlgorithem);
};
