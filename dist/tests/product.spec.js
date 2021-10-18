"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const request = (0, supertest_1.default)(server_1.default);
const store = new product_1.productStore();
describe('Product Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
});
// describe('Product Model methods', () => {
//   it('create method should add a product', async () => {
//     const result = await store.create({
//       name: 'Catan',
//       price: 40,
//     });
//     expect(result).toEqual(
//       jasmine.objectContaining({
//         name: 'Catan',
//         price: 40,
//       })
//     );
//   });
//   it('index method should return a list of products', async () => {
//     const result = await store.index();
//     expect(result).toEqual(
//       jasmine.objectContaining([
//         {
//           id: 1,
//           name: 'Catan',
//           price: 40,
//         },
//       ])
//     );
//   });
//   it('show method should return the correct product', async () => {
//     const result = await store.show(1);
//     expect(result).toEqual({
//       id: 1,
//       name: 'Catan',
//       price: 40,
//     });
//   });
// });
// describe('Products Test Endpoints', () => {
//   it('Test Create should not create Product without being authorised', async () => {
//     const response = await request.post('/products').send({
//       name: 'bycicle',
//       price: 650,
//     });
//     expect(response.status).toBe(401);
//   });
//   it('Check if server runs, should return 200 status', async () => {
//     const response = await request.get('/');
//     expect(response.status).toBe(200);
//   });
//   it('Test Index returns array of products', async () => {
//     const response = await request.get('/products');
//     expect(response.status).toBe(200);
//   });
//   it('Test Show returns specified products', async () => {
//     const response = await request.get('/products/1');
//     expect(response.status).toBe(200);
//   });
//   it('delete method should erase the correct product', async () => {
//     store.delete(1);
//     const result = await store.index();
//     expect(result).toEqual([]);
//    });
// });
