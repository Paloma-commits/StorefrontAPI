import express, { Request, Response } from 'express';
import { User, userStore } from '../models/user';
import jwt from 'jsonwebtoken';

//creating an instance of the class
const user_store = new userStore();
const token_secret = process.env.TOKEN_SECRET!;

const index = async (_req: Request, res: Response) => {
  try {
    const users = await user_store.index();
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  const user = await user_store.show(req.body.id);

  try {
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    //id: parseInt(req.params.id),
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
  };

  try {
    const new_user = await user_store.create(user);
    var token = jwt.sign({ user: new_user }, token_secret);
    res.json(token);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    //id: req.body.id,
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
  };
  try {
    const u = await user_store.authenticate(user.username, user.password);
    var token = jwt.sign({ user: u }, token_secret);
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};

const erase = async (req: Request, res: Response) => {
  const deleted = await user_store.delete(req.body.id);
  res.json(deleted);
};

const user_routes = (app: express.Application) => {
  app.get('/users', index);
  app.get('/users/:id', show);
  app.post('/users/', create);
  app.get('/users/authenticate/:id', authenticate);
  app.delete('/users/:id', erase);
};

export default user_routes;
