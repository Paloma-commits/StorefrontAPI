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
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const order_store = new order_1.orderStore();
const order_routes = (app) => {
    app.get('/orders/:id', order_by_userid);
    app.post('/orders', create);
    app.post('/orders/:id/products', add_order);
};
exports.default = order_routes;
const add_order = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ord = {
        quantity: _req.body.quantity,
        order_id: _req.body.order_id,
        product_id: _req.body.product_id,
    };
    try {
        const addedProduct = yield order_store.add_order(ord);
        res.json(addedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const order_by_userid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_store.order_by_userid(req.body.user_id);
    res.json(orders);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ord = {
            //id: req.body.id,
            user_id: req.body.user_id,
            status: req.body.status,
        };
        const new_order = yield order_store.create(ord);
        res.json(new_order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
