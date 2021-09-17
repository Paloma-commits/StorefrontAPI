import express, {Request, Response} from 'express';
import { Product, productStore } from '../models/products';

const store =  new productStore();

const index = async(_req: Request, res:Response) => {
    const products = await store.index()
    res.json(products)
}

const show= async(_req: Request, res:Response, id: string) => {
    const product = _req.params.id



}

const create = async(_req: Request, res:Response) => {

}





//here go all the routes with the different functions that products has in the model

const product_routes = (app : express.Application) => {
    app.get('/products', index)
    //app.get('/products/:id', show),
    //app.post('/products/create', create)
}

export default product_routes