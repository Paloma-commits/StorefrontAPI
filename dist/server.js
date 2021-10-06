"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const products_1 = __importDefault(require("./handlers/products"));
const user_1 = __importDefault(require("./handlers/user"));
const orders_1 = __importDefault(require("./handlers/orders"));
const app = (0, express_1.default)();
const address = '0.0.0.0:3000';
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
//give access to the routes from the server
(0, products_1.default)(app);
(0, user_1.default)(app);
(0, orders_1.default)(app);
exports.default = app;
//"test": "ENV=test && db-migrate --env test up && jasmine-ts && db-migrate db:drop test",
//"start": "nodemon src/server.ts",
