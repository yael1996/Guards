"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//var users = require("../service/users");
var geneticAlgorithem_1 = require("../service/geneticAlgorithem/geneticAlgorithem");
var controllers = {
    logIn: function (req, res) {
        // users.find(req, res, function(err, user) {
        //     if (err) res.send(err);
        //     res.json(user);
        //   });
    },
    constraints: function (req, res) { },
    runGeneticAlgorithem: function (req, res) {
        var algorithem = geneticAlgorithem_1.GeneticAlgorithem();
        algorithem.run();
    }
};
module.exports = controllers;
//# sourceMappingURL=controller.js.map