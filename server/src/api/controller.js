//var users = require("../service/users");
import { GeneticAlgorithem } from "../service/geneticAlgorithem/geneticAlgorithem";
import { MonthGurdsCreator } from "../service/bordCreator/monthGurdsCreator";

var controllers = {
  logIn: function(req, res) {
    // users.find(req, res, function(err, user) {
    //     if (err) res.send(err);
    //     res.json(user);
    //   });
  },
  constraints: function(req, res) {},
  createGuardBoard: function(req, res) {
    let bord = MonthGurdsCreator();
    bord.buildMonth();
  },
  runGeneticAlgorithem: function(req, res) {
    let algorithem = GeneticAlgorithem();
    algorithem.run();
  }
};

module.exports = controllers;
