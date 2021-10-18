"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//creating an instance of the class
const user_store = new user_1.userStore();
const token_secret = process.env.TOKEN_SECRET;
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_store.index();
        res.json(users);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_store.show(req.body.id);
    try {
        res.json(user);
    }
    catch (err) {
        console.log(err);
        res.status(400);
        res.json(err);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        //id: parseInt(req.params.id),
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
    };
    try {
        const new_user = yield user_store.create(user);
        var token = jsonwebtoken_1.default.sign({ user: new_user }, token_secret);
        res.json(token);
    }
    catch (err) {
        console.log(err);
        res.status(400);
        res.json(err);
    }
});
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        //id: req.body.id,
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
    };
    try {
        const u = yield user_store.authenticate(user.username, user.password);
        var token = jsonwebtoken_1.default.sign({ user: u }, token_secret);
        res.json(token);
    }
    catch (error) {
        res.status(401);
        res.json({ error });
    }
});
const erase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield user_store.delete(req.body.id);
    res.json(deleted);
});
const user_routes = (app) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users/', create);
    app.get('/users/authenticate/:id', authenticate);
    app.delete('/users/:id', erase);
};
exports.default = user_routes;
