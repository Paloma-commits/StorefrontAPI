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
const product_1 = require("../models/product");
const verifyUser_1 = __importDefault(require("./verifyUser"));
const store = new product_1.productStore();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield store.index();
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const show = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield store.show(_req.body.id);
    try {
        res.send(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prod = {
        name: req.body.name,
        price: req.body.price,
    };
    try {
        const newprod = yield store.create(prod);
        res.json(newprod);
    }
    catch (err) {
        res.status(400);
        res.json(err);
        console.log(err);
    }
    //   try{
    //     jwt.verify(req.body.token, process.env.TOKEN_SECRET!);
    //   }catch(err){
    //     res.status(401);
    //     res.json(`Invalid token ${err}`)
    //     return
    //   }
    //   //const authorizationHeader = req.headers.authorization;
    //   //const token = authorizationHeader!.split(' ')[1];
    //   //jwt.verify(token, process.env.TOKEN_SECRET!);
});
//here go all the routes with the different functions that products has in the model
const product_routes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyUser_1.default, create);
};
exports.default = product_routes;
