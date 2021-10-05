import { userStore } from '../models/user';
//import client from '../database';
import supertest from 'supertest';
import app from '../server';

const store = new userStore()
const request = supertest(app);
let userToken = ''

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

  beforeAll(async () => {
    await store.create({
      username: 'peppap',
      firstname: 'Peppa',
      lastname: 'Pig',
      password: 'children',
    })
  })

  it('create method should add a user', async () => {
    const result = await store.create({
      username: 'peppap',
      firstname: 'Peppa',
      lastname: 'Pig',
      password: 'children',
    });
    expect(result).toEqual({
      id: '1',
      username: 'peppap',
      firstname: 'Peppa',
      lastname: 'Pig',
      password: 'children',
    });
  });

  it('index method should return a list of existing users', async () => {
    const result = await store.index();
    expect(result[0]).toEqual(jasmine.objectContaining({
      id: '1',
        username: 'peppap',
        firstname: 'Peppa',
        lastname: 'Pig',
        password: 'children',
    }))
  });

  it('show method should return the correct user', async () => {
    const result = await store.show('1');
    expect(result).toEqual(jasmine.objectContaining({
      id: '1',
      username: 'peppap',
      firstname: 'Peppa',
      lastname: 'Pig',
      password: 'children',
    }))
  });
});
