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
const user_1 = require("../models/user");
//import client from '../database';
//import supertest from 'supertest';
const store = new user_1.userStore();
//const request = supertest(app);
let userToken = '';
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
});
describe('User Model methods', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield store.create({
            username: 'peppap',
            firstname: 'Peppa',
            lastname: 'Pig',
            password: 'children',
        });
    }));
    it('create method should add a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create({
            username: 'palo',
            firstname: 'paloma',
            lastname: 'laso',
            password: 'password123',
        });
        expect(result).toEqual({
            username: 'palo',
            firstname: 'paloma',
            lastname: 'laso',
            password: 'password123',
        });
    }));
    it('index method should return a list of existing users', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result[0]).toEqual(jasmine.objectContaining({
            id: 1,
            username: 'palo',
            firstname: 'paloma',
            lastname: 'laso',
            password: '$2b$10$neBd4zDSMhYk3qxpYLxX8.WYssypJWTk22ISpeHEGH0etBcOv/Tnm',
        }));
    }));
    it('show method should return the correct user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.show(1);
        expect(result).toEqual(jasmine.objectContaining({
            id: 1,
            username: 'palo',
            firstname: 'paloma',
            lastname: 'laso',
            password: '$2b$10$neBd4zDSMhYk3qxpYLxX8.WYssypJWTk22ISpeHEGH0etBcOv/Tnm',
        }));
    }));
});
