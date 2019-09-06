"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./api/app");
var routes_1 = require("./api/routes");
var Server = /** @class */ (function () {
    function Server() {
        this.app = new app_1.App().app;
        this.routs = new routes_1.Routes().appRouts;
        this.port = process.env.PORT || 3000;
        this.initRouts();
        this.listen();
    }
    Server.prototype.initRouts = function () {
        this.app.use("/", this.routs);
        // this.app.get("/", (req, res) => {
        //   res.send("Welcome");
        // });
    };
    Server.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("Server started on port: " + _this.port);
        });
    };
    return Server;
}());
var server = new Server();
//# sourceMappingURL=server.js.map