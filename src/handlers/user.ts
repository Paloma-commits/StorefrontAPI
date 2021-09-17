import express, { Request, Response } from 'express';
import { User, userStore } from '../models/user';
//import client from '/../database';

//creating an instance of the class
const user_store = new userStore();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await user_store.index();
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (_req: Request, res: Response) => {
  const show_id = _req.body.id;

  try {
    const showed_user = await user_store.show(show_id);
    res.json(showed_user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (_req: Request, res: Response) => {
  const firstname: string = _req.body.title;
  const lastname: string = _req.body.lastname;
  const password: string = _req.body.password;

  try {
    const new_user = await user_store.create(firstname, lastname, password);
    res.json(new_user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const user_routes = (app: express.Application) => {
  app.get('/users', index),
    app.get('/users/:id', show),
    app.post('/users', create);
};

export default user_routes;
