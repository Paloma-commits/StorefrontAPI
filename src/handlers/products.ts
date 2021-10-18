import express, { Request, Response } from 'express';
import { Product, productStore } from '../models/product';
import verifyUser from './verifyUser';

const store = new productStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (_req: Request, res: Response) => {
  const product = await store.show(_req.body.id);

  try {
    res.send(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const prod: Product = {
    name: req.body.name,
    price: req.body.price,
  };
  try {
    const newprod = await store.create(prod);
    res.json(newprod);
  } catch (err) {
    res.status(400);
    res.json(err);
    console.log(err);
  }
};

const erase = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id);
  res.json(deleted);
};
//here go all the routes with the different functions that products has in the model

const product_routes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyUser, create);
  app.delete('/products/:id', erase);
};

export default product_routes;
