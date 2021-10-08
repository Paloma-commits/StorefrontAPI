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

describe('User Model create method', () => {

  it('create method should add a user', async () => {
    const result = await store.create({
      username: 'palo',
      firstname: 'paloma',
      lastname: 'laso',
      password: 'password123',
    });
    expect(result).toEqual(jasmine.objectContaining({
      //id: 1,
      username: 'palo',
      firstname: 'paloma',
      lastname: 'laso',
      //password: 'password123',
    }));
  });
});

describe('User model methods', () => {
  beforeAll(async () => {
    await store.create({
      username: 'palo',
      firstname: 'paloma',
      lastname: 'laso',
      password: 'children',
    });
  });

  it('index method should return a list of existing users', async () => {
    // const result = await store.index();
    // expect(result).toEqual(jasmine.objectContaining([{
    //   //id: 1,
    //   username: 'palo',
    //   firstname: 'paloma',
    //   lastname: 'laso',
    // }]));
  });

  it('show method should return the correct user', async () => {
  //   const result = await store.show(2);
  //   expect(result).toEqual(jasmine.objectContaining({
  //     //id: 1,
  //     username: 'palo',
  //     firstname: 'paloma',
  //     lastname: 'laso',
  //   }));
  });
});
