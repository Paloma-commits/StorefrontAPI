import express, { Request, Response } from 'express';
import { User, userStore } from '../models/user';
//import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
//import client from '/../database';

//creating an instance of the class
const user_store = new userStore();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await user_store.index();
    res.json(users);
  } catch (err) {
    res.status(400)
    res.json(err)
  }
};

const show = async (_req: Request, res: Response) => {
  const show_id = _req.body.id;

  try {
    const showed_user = await user_store.show(show_id);
    res.json(showed_user);

  } catch (err) {
    res.status(400)
    res.json(err)

  }
};

const create = async (_req: Request, res: Response) => {
  const user: User = {
    id: parseInt(_req.params.id),
    firstname: _req.body.title,
    lastname: _req.body.lastname,
    password: _req.body.password,
  };

  try {
    const new_user = await user_store.create(user);
    res.json(new_user);

  } catch (err) {
    res.status(400)
    res.json(err)
  }

};

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    id: req.body.id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
  }
  try {
      const u = await user_store.authenticate(user.id, user.password)
      var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET);
      res.json(token)
  } catch(error) {
      res.status(401)
      res.json({ error })
  }
}

const user_routes = (app: express.Application) => {
  app.get('/users', index),
  app.get('/users/:id', show),
  app.post('/users/:id', create);
  app.get('/users/authenticate/:id', authenticate)
};

export default user_routes;
