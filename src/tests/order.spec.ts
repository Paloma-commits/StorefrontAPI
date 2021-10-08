import { Order, orderStore } from '../models/order';
import { User, userStore } from '../models/user';
import { Product, productStore } from '../models/product';
import supertest from 'supertest';
import app from '../server';
import client from '../database';
const request = supertest(app);

const orderModel = new orderStore();
const userModel = new userStore();
const productModel = new productStore();

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
    beforeAll(async () => {
        await userModel.create({
            username: 'tester',
            firstname: 'Test',
            lastname: 'User',
            password: 'test123',
        });

        await productModel.create({
            name: 'Catan',
            price: 40,
        });

        await orderModel.create({
            //id:1,
            user_id: 1,
            status: 'active',
        });
    });

    it('Create method should return an order', async () => {
        const result = await orderModel.create({
            user_id: 1,
            status: 'active',
        });
        expect(result).toEqual(
            jasmine.objectContaining({
                user_id: '1'
            })
        );
    });

    it('Add order', async () => {
        const result = await orderModel.add_order({
            quantity: 2,
            order_id: 1,
            product_id: 1,
        });

        expect(result).toEqual(
            jasmine.objectContaining({
                order_id: '1'
            })
        );
    });

});

describe('Testing EndPoints', () => {
    beforeAll(async () => {
        await userModel.create({
            username: 'tester',
            firstname: 'Test',
            lastname: 'User',
            password: 'test123',
        });

        await productModel.create({
            name: 'Catan',
            price: 40,
        });

        await orderModel.add_order({
            quantity: 2,
            order_id: 1,
            product_id: 1,
        });
    });

    it('Check if server runs with a 200 status', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });

    it('Test "create_order" should return a created order', async () => {
        const response = await request.post('/orders').send({
            user_id: 1,
            status: 'active',
        });
        expect(response.status).toBe(200);
    });

    it('Test "add_order" should return a created order', async () => {
        const response = await request.post('/orders/1/products').send({
            quantity: 2,
            order_id: 1,
            product_id: 1,
        });
        expect(response.status).toBe(200);
    });
});

