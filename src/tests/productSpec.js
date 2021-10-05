import { productStore } from '../models/product';
//productStore = require('../models/product')
// import client from '../database'
// import supertest from 'supertest';
// import app from '../server'

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
//   it('create method should add a product', async () => {
//     const result = await store.create({
//       name: 'Catan',
//       price: 40,
//     });
//     expect(result).toEqual({
//       id: '1',
//       name: 'Catan',
//       price: 40,
//     });
//   });

//   it('index method should return a list of books', async () => {
//     const result = await store.index();
//     expect(result).toEqual([
//       {
//         id: '1',
//         name: 'Catan',
//         price: 40,
//       },
//     ]);
//   });

//   it('show method should return the correct book', async () => {
//     const result = await store.show('1');
//     expect(result).toEqual({
//       id: '1',
//       name: 'Catan',
//       price: 40,
//     });

});



