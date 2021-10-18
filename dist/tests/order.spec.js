"use strict";
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
// describe('Test Methods returning values are correct ', () => {
//   beforeAll(async () => {
//     await userModel.create({
//       username: 'tester',
//       firstname: 'Test',
//       lastname: 'User',
//       password: 'test123',
//     });
//     await productModel.create({
//       name: 'Catan',
//       price: 40,
//     });
//     // await orderModel.create({
//     //   //id:1,
//     //   user_id: 1,
//     //   status: 'active',
//     // });
//   });
//   it('Create method should return an order', async () => {
//     const result = await orderModel.create({
//       user_id: 1,
//       status: 'active',
//     });
//     expect(result).toEqual(
//       jasmine.objectContaining({
//         user_id: '1',
//       })
//     );
//   });
//   it('Add order', async () => {
//     const result = await orderModel.add_order({
//       quantity: 2,
//       order_id: 1,
//       product_id: 1,
//     });
//     expect(result).toEqual(
//       jasmine.objectContaining({
//         order_id: '1',
//       })
//     );
//   });
// //clean up test after creating data
//   it('delete method should erase the user', async () => {
//     userModel.delete(1);
//     const result = await userModel.index();
//     expect(result).toEqual([]);
//   });
//    it('delete method should erase the product', async () => {
//     productModel.delete(1);
//     const result = await productModel.index();
//     expect(result).toEqual([]);
//   });
// });
// describe('Testing EndPoints', () => {
//   beforeAll(async () => {
//     await userModel.create({
//       username: 'tester',
//       firstname: 'Test',
//       lastname: 'User',
//       password: 'test123',
//     });
//     await productModel.create({
//       name: 'Catan',
//       price: 40,
//     });
//   });
//   it('Check if server runs with a 200 status', async () => {
//     const response = await request.get('/');
//     expect(response.status).toBe(200);
//   });
//   it('Test "create_order" should return a created order', async () => {
//     const response = await request.post('/orders').send({
//       user_id: 1,
//       status: 'active',
//     });
//     expect(response.status).toBe(200);
//   });
//   it('Test "add_order" should return a created order', async () => {
//     const response = await request.post('/orders/1/products').send({
//       quantity: 2,
//       order_id: 1,
//       product_id: 1,
//     });
//     expect(response.status).toBe(200);
//   });
//   it('delete method should erase the correct user', async () => {
//     userModel.delete(1);
//     const result = await userModel.index();
//     expect(result).toEqual([]);
//   });
//    it('delete method should erase the product', async () => {
//     productModel.delete(1);
//     const result = await productModel.index();
//     expect(result).toEqual([]);
//   });
// });
