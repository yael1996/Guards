var controller = require("./controller");

module.exports = function(app) {
  app.route("/log_in").post(controller.log_in);
  app.route("/constraints").post(controller.constraints);
  app.route("/create_guard_board").get(controller.create_guard_board);
};
