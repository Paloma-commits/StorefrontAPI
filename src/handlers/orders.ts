import express, { Request, Response } from 'express';
import { Order, orderStore, Order_Product } from '../models/order';
import verifyUser from './verifyUser';

const order_store = new orderStore();

const order_routes = (app: express.Application) => {
  app.get('/orders/:id', order_by_userid);
  app.post('/orders', create);
  app.post('/orders/:id/products', add_order);
};

export default order_routes;

const add_order = async (_req: Request, res: Response) => {
  const ord: Order_Product = {
    quantity: _req.body.quantity,
    order_id: _req.body.order_id,
    product_id: _req.body.product_id,
  };

  try {
    const addedProduct = await order_store.add_order(ord);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const order_by_userid = async (req: Request, res: Response) => {
  const orders = await order_store.order_by_userid(req.body.user_id);
  res.json(orders);
};

const create = async (req: Request, res: Response) => {
  try {
    const ord: Order = {
      //id: req.body.id,
      user_id: req.body.user_id,
      status: req.body.status,
    };

    const new_order = await order_store.create(ord);
    res.json(new_order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
