import express, { Request, Response } from 'express';
import {User, userStore} from '../models/users'
//import client from '/../database';

const index = async(_req: Request, res: Response) => {
    //const users = await userStore.index()
    //res.json(users)
}

const user_routes = (app: express.Application) => {
    app.get('/users', index)
}

