import express, { Request, Response } from 'express';
import { Order, orderStore } from '../models/order';

const order_store = new orderStore();

const current_order = async (_req: Request, res: Response) => {
  console.log(_req.params);
  const order = await order_store.current_order(_req.params.id);
  res.json(order);
};

const order_routes = (app: express.Application) => {
  app.get('/orders/id', current_order);
};

export default order_routes;
