import { userStore } from '../models/user';
import supertest from 'supertest';
import app from '../server';
const request = supertest(app);

const store = new userStore();
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
  it('create method should add a user', async () => {
    const result = await store.create({
      username: 'palo',
      firstname: 'paloma',
      lastname: 'laso',
      password: 'password123',
    });
    expect(result).toBeTruthy;
  });

  it('index method should return a list of existing users', async () => {
    const result = await store.index();
    expect(result).toEqual(
      jasmine.objectContaining([
        {
          firstname: 'paloma',
          lastname: 'laso',
        },
      ])
    );
  });

  it('show method should return the correct user', async () => {
    const result = await store.show(1);
    expect(result).toEqual(
      jasmine.objectContaining({
        username: 'palo',
        firstname: 'paloma',
        lastname: 'laso',
      })
    );
  });
});

describe('User Test Endpoints', () => {
  it('Check if server runs, should return 200 status', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });

  it('Test Create should create a new user', async () => {
    const response = await request.post('/users').send({
      username: 'palo',
      firstname: 'paloma',
      lastname: 'laso',
      password: 'password123',
    });
    expect(response.status).toBe(200);
  });

  it('Test Index returns array of users', async () => {
    const response = await request.get('/users');
    expect(response.status).toBe(200);
  });

  it('Test Show returns specified user', async () => {
    const response = await request.get('/users/1');
    expect(response.status).toBe(200);
  });
});
