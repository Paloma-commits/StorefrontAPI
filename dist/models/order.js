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
exports.orderStore = void 0;
const database_1 = __importDefault(require("../database"));
class orderStore {
    create(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *;';
                const result = yield conn.query(sql, [o.user_id, o.status]);
                const new_order = result.rows[0];
                return new_order;
                conn.release();
            }
            catch (err) {
                console.log(err);
                throw new Error(`could not create order ${err}`);
            }
        });
    }
    add_order(ord) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
                const result = yield conn.query(sql, [
                    ord.quantity,
                    ord.order_id,
                    ord.product_id,
                ]);
                const order = result.rows[0];
                conn.release();
                return order;
            }
            catch (err) {
                throw new Error(`Could not add product ${ord.product_id} to order ${ord.order_id}: ${err}`);
            }
        });
    }
    order_by_userid(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM orders where user_id = ($1) AND status = 'active'";
                const result = yield conn.query(sql, [userid]);
                conn.release;
                return result.rows;
            }
            catch (err) {
                throw Error(`Unable to show the orders, ${err}`);
            }
        });
    }
}
exports.orderStore = orderStore;
