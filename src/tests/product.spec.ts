import { productStore } from '../models/product';

import supertest from 'supertest';
import app from '../server';
const request = supertest(app);

const store = new productStore();

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
  it('create method should add a product', async () => {
    const result = await store.create({
      //id: 1,
      name: 'Catan',
      price: 40,
    });
    expect(result).toEqual({
      id: 1,
      name: 'Catan',
      price: 40,
    });
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        name: 'Catan',
        price: 40,
      },
    ]);
  });

  it('show method should return the correct product', async () => {
    const result = await store.show(1);
    expect(result).toEqual({
      id: 1,
      name: 'Catan',
      price: 40,
    });
  });
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
