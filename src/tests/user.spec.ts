import { userStore } from '../models/user';
//import client from '../database';
//import supertest from 'supertest';

const store = new userStore();
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
  // beforeAll(async () => {
  //   await store.create({
  //     username: 'peppap',
  //     firstname: 'Peppa',
  //     lastname: 'Pig',
  //     password: 'children',
  //   });
  // });

  it('create method should add a user', async () => {
    const result = await store.create({
      username: 'palo',
      firstname: 'paloma',
      lastname: 'laso',
      password: 'password123',
    });
    expect(result).toEqual({
      id: 1,
      username: 'palo',
      firstname: 'paloma',
      lastname: 'laso',
      password: '$2b$10$fnQKnrYg3JIRB3mC2vCP0exL9QwlMIWkGWn0GjHxkrrPLSd68LaBG',
    });
  });

  it('index method should return a list of existing users', async () => {
    const result = await store.index();
    expect(result[0]).toEqual({
        id: 1,
        username: 'palo',
        firstname: 'paloma',
        lastname: 'laso',
        password: '$2b$10$fnQKnrYg3JIRB3mC2vCP0exL9QwlMIWkGWn0GjHxkrrPLSd68LaBG',
    });
  });

  it('show method should return the correct user', async () => {
    const result = await store.show(1);
    expect(result).toEqual({
        id: 1,
        username: 'palo',
        firstname: 'paloma',
        lastname: 'laso',
        password:
          '$2b$10$fnQKnrYg3JIRB3mC2vCP0exL9QwlMIWkGWn0GjHxkrrPLSd68LaBG',
      })
  });
});
