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
describe('Product Model methods', () => {
    it('create method should add a product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create({
            //id: 1,
            name: 'Catan',
            price: 40,
        });
        expect(result).toEqual({
            id: 1,
            name: 'Catan',
            price: 40,
        });
    }));
    it('index method should return a list of products', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result).toEqual([
            {
                id: 1,
                name: 'Catan',
                price: 40,
            },
        ]);
    }));
    it('show method should return the correct product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.show(1);
        expect(result).toEqual({
            id: 1,
            name: 'Catan',
            price: 40,
        });
    }));
});
// describe('Products Test Endpoints', () => {
//   beforeAll(async () => {
//     await store.create({
//       name: 'sweater',
//       price: 65,
//     });
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
//   it('Test Create should return created Product', async () => {
//     const response = await request.post('/products').send({
//       name: 'bycicle',
//       price: 650,
//     });
//     expect(response.status).toBe(200);
//   });
// });
