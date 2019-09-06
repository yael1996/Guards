"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var geneticAlgorithemController_1 = require("./controllers/geneticAlgorithemController");
var Routes = /** @class */ (function () {
    function Routes() {
        this.appRouts = express_1.Router();
        this.initMainRout();
        this.initOtherRouts();
    }
    Routes.prototype.initMainRout = function () {
        this.appRouts.get("/api", function (req, res) {
            return res.json({ application: "App is good" });
        });
    };
    Routes.prototype.initOtherRouts = function () {
        this.appRouts.use("/geneticAlgo", new geneticAlgorithemController_1.GeneticAlgorithemController().routs);
    };
    return Routes;
}());
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map