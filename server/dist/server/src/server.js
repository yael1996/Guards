"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var port = process.env.PORT || 3000;
// var routes = require("./api/routes");
// routes(app);
app.get("/", function (req, res) {
    res.send("Welcome");
});
app.listen(port, function () {
    console.log("Server started on port: " + port);
});
//# sourceMappingURL=server.js.map