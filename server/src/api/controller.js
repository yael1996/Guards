//var users = require("../service/users");
import { GeneticAlgorithem } from "../service/geneticAlgorithem/geneticAlgorithem";

var controllers = {
  logIn: function(req, res) {
    // users.find(req, res, function(err, user) {
    //     if (err) res.send(err);
    //     res.json(user);
    //   });
  },
  constraints: function(req, res) {},
  runGeneticAlgorithem: function(req, res) {
    let algorithem = GeneticAlgorithem();
    algorithem.run();
  }
};

module.exports = controllers;
