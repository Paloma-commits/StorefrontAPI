import express, { Request, Response } from 'express';
import { Order, orderStore } from '../models/order';

const order_store = new orderStore();


const order_routes = (app: express.Application) => {
  app.get('/orders/:id', current_order);
  app.post('/orders', create)
  app.post('/orders/:id/products', addProduct)
};

export default order_routes;


const addProduct = async (_req: Request, res: Response) => {
  const orderId: string = _req.params.id
  const productId: string = _req.body.productId
  const quantity: number = parseInt(_req.body.quantity)

  try {
    const addedProduct = await order_store.addProduct(quantity, orderId, productId)
    res.json(addedProduct)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const current_order = async (req: Request, res: Response) => {
  console.log(req.params);
  const order = await order_store.current_order(req.params.id);
  res.json(order);
};

const create = async (req: Request, res: Response) => {
  try {
    const ord: Order = {
      id: req.body.id,
      user_id: req.body.user_id,
      status: req.body.status,
    };

    const new_order = await order_store.create(ord);
    res.json(new_order);
    
  } catch (err) {
    res.status(400);
    res.json(err);
  }
}