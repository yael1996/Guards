"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var App = /** @class */ (function () {
    function App() {
        this.app = express_1.default();
        this.config();
    }
    App.prototype.config = function () {
        // this._app.use(express.static("../src"));
        // support application/json
        this.app.use(body_parser_1.default.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
    };
    return App;
}());
exports.App = App;
//# sourceMappingURL=app.js.map