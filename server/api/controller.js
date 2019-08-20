//var users = require("../service/users");
var genetic_algorithem = require("../service/geneticAlgorithem/genetic_algorithem");
var bord_creator = require("../service/bord_creator/month_creator");

var controllers = {
  log_in: function(req, res) {
    // users.find(req, res, function(err, user) {
    //     if (err) res.send(err);
    //     res.json(user);
    //   });
  },
  constraints: function(req, res) {},
  create_guard_board: function(req, res) {
    bord_creator();
  },
  run_genetic_algorithem: function(req, res) {
    genetic_algorithem.run();
  }
};

module.exports = controllers;
