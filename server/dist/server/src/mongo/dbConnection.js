"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var bord_1 = require("./models/bord");
var user_1 = require("./models/user");
var shift_1 = require("./models/shift");
var constraint_1 = require("./models/constraint");
var DBConnection = /** @class */ (function () {
    function DBConnection() {
        // ToDo : replace mongoUrl with process.env.MONGO_URI and add config
        var mongoURL = "mongodb://ec2-3-9-169-24.eu-west-2.compute.amazonaws.com:27017/guards";
        mongoose_1.connect(mongoURL, { useNewUrlParser: true });
        this.db = mongoose_1.connection;
        this.db.on("open", this.connected);
        this.db.on("error", this.error);
        this.models = {
            Bord: new bord_1.Bord().model,
            Shift: new shift_1.Shift().model,
            User: new user_1.User().model,
            Constraint: new constraint_1.Constraint().model
        };
    }
    Object.defineProperty(DBConnection, "Models", {
        get: function () {
            if (!DBConnection.instance) {
                DBConnection.instance = new DBConnection();
            }
            return DBConnection.instance.models;
        },
        enumerable: true,
        configurable: true
    });
    DBConnection.prototype.connected = function () {
        console.log("Mongoose has connected");
    };
    DBConnection.prototype.error = function (error) {
        console.log("Mongoose has errored", error);
    };
    return DBConnection;
}());
exports.DBConnection = DBConnection;
//# sourceMappingURL=dbConnection.js.map