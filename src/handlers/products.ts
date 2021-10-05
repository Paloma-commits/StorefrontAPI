import express, { Request, Response } from 'express';
import { Product, productStore } from '../models/product';
import jwt from 'jsonwebtoken';
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

  //   const prod: Product = {
  //     //id: req.body.id,
  //     name: req.body.name,
  //     price: req.body.price,
  //   };

  //   try{
  //     jwt.verify(req.body.token, process.env.TOKEN_SECRET!);

  //   }catch(err){
  //     res.status(401);
  //     res.json(`Invalid token ${err}`)
  //     return
  //   }
  //   //const authorizationHeader = req.headers.authorization;
  //   //const token = authorizationHeader!.split(' ')[1];
  //   //jwt.verify(token, process.env.TOKEN_SECRET!);

  // try{
  //   const newProd = await store.create(prod);
  //   res.json(newProd);

  // } catch (err) {
  //   res.status(401);
  //   res.json('Access denied, invalid token');
  //   return;
  // }
};
//here go all the routes with the different functions that products has in the model

const product_routes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyUser, create);
};

export default product_routes;
