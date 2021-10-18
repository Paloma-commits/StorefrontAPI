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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const request = (0, supertest_1.default)(server_1.default);
const store = new user_1.userStore();
//const request = supertest(app);
describe('User Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have an erase method', () => {
        expect(store.delete).toBeDefined();
    });
});
describe('User Model methods', () => {
    it('create method should add a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create({
            username: 'palo',
            firstname: 'paloma',
            lastname: 'laso',
            password: 'password123',
        });
        expect(result).toBeTruthy;
    }));
    it('index method should return a list of existing users', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result[0]).toEqual(jasmine.objectContaining([
            {
                firstname: 'paloma',
                lastname: 'laso',
            },
        ]));
    }));
    it('show method should return the correct user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.show(1);
        expect(result).toEqual(jasmine.objectContaining({
            username: 'palo',
            firstname: 'paloma',
            lastname: 'laso',
        }));
    }));
    it('delete method should erase the correct user', () => __awaiter(void 0, void 0, void 0, function* () {
        store.delete(1);
        const result = yield store.index();
        expect(result).toEqual([]);
    }));
});
describe('User Test Endpoints', () => {
    it('Check if server runs, should return 200 status', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/');
        expect(response.status).toBe(200);
    }));
    it('Test Create should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/users').send({
            username: 'palo',
            firstname: 'paloma',
            lastname: 'laso',
            password: 'password123',
        });
        expect(response.status).toBe(200);
    }));
    it('Test Index returns array of users', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/users');
        expect(response.status).toBe(200);
    }));
    it('Test Show returns specified user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/users/1');
        expect(response.status).toBe(200);
    }));
    it('delete method should erase the correct user and return empty array', () => __awaiter(void 0, void 0, void 0, function* () {
        store.delete(1);
        const result = yield store.index();
        expect(result).toEqual([]);
    }));
});
