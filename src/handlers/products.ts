import express, { Request, Response } from 'express';
import { Product, productStore } from '../models/product';

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
  const product = _req.params.id;

  try {
    const prod = await store.show(product);

    res.send(prod);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (_req: Request, res: Response) => {
  const id: number = _req.body.id;
  const name: string = _req.body.name;
  const price: string = _req.body.price;

  try {
    const new_prod = await store.create(name, price);
    res.send(new_prod);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//here go all the routes with the different functions that products has in the model

const product_routes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products/create', create);
};

export default product_routes;
