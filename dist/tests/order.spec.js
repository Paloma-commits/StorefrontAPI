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
const order_1 = require("../models/order");
const user_1 = require("../models/user");
const product_1 = require("../models/product");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const request = (0, supertest_1.default)(server_1.default);
const orderModel = new order_1.orderStore();
const userModel = new user_1.userStore();
const productModel = new product_1.productStore();
describe('Order Model', () => {
    describe('Test Method Exists -', () => {
        it('Create method should exist', () => {
            expect(orderModel.create).toBeDefined();
        });
        it('Create method should exist', () => {
            expect(orderModel.add_order).toBeDefined();
        });
    });
});
describe('Test Methods returning values are correct ', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield userModel.create({
            username: 'tester',
            firstname: 'Test',
            lastname: 'User',
            password: 'test123',
        });
        yield productModel.create({
            name: 'Catan',
            price: 40,
        });
        // await orderModel.create({
        //   //id:1,
        //   user_id: 1,
        //   status: 'active',
        // });
    }));
    it('Create method should return an order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield orderModel.create({
            user_id: 1,
            status: 'active',
        });
        expect(result).toEqual(jasmine.objectContaining({
            user_id: '1',
            status: 'active'
        }));
    }));
    it('Add order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield orderModel.add_order({
            quantity: 2,
            order_id: 1,
            product_id: 1,
        });
        expect(result).toEqual(jasmine.objectContaining({
            quantity: 2,
            order_id: 1,
            product_id: 1,
        }));
    }));
    //clean up test after creating data
    it('delete method should erase the user', () => __awaiter(void 0, void 0, void 0, function* () {
        userModel.delete(1);
        const result = yield userModel.index();
        expect(result).toEqual([]);
    }));
    it('delete method should erase the product', () => __awaiter(void 0, void 0, void 0, function* () {
        productModel.delete(1);
        const result = yield productModel.index();
        expect(result).toEqual([]);
    }));
});
describe('Testing EndPoints', () => {
    it('Check if server runs with a 200 status', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/');
        expect(response.status).toBe(200);
    }));
    it('Test "create_order" should return a created order', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/orders').send({
            user_id: 1,
            status: 'active',
        });
        expect(response.status).toBe(200);
    }));
    it('Test "add_order" should return a created order', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/orders/1/products').send({
            quantity: 2,
            order_id: 1,
            product_id: 1,
        });
        expect(response.status).toBe(200);
    }));
    //clean up after tests are done
    it('delete method should erase the correct user', () => __awaiter(void 0, void 0, void 0, function* () {
        userModel.delete(1);
        const result = yield userModel.index();
        expect(result).toEqual([]);
    }));
    it('delete method should erase the product', () => __awaiter(void 0, void 0, void 0, function* () {
        productModel.delete(1);
        const result = yield productModel.index();
        expect(result).toEqual([]);
    }));
});
