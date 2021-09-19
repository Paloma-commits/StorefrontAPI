import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

const pepper= BCRYPT_PASSWORD;
const saltRounds = SALT_ROUNDS;


export type User = {
  id: number,
  firstname: string;
  lastname: string;
  password: string;
};

export class userStore {
  //all the methods to this class are below

  //show users
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = ' SELECT * FROM users ';
      const result = await conn.query(sql);
      conn.release(); // we need to close the connection to the db!
      return result.rows;
    } catch (err) {
      throw new Error(`Unable to show the users with err: ${err}`);
    }
  }

  //show specific users
  async show(id: string): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to locate the user: ${id}, ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const conn = await client.connect();

      const sql =
        'INSERT INTO users (firstname, lastname, password) VALUES ($1, $2, $3)';

        const hash = bcrypt.hashSync(
          u.password + pepper, 
          parseInt(saltRounds)
       );
      const result = await conn.query(sql, [u.id, hash]);

      const user = result.rows[0];
      conn.release();
      return user;

    } catch (err) {
      throw new Error(`Unable to add user: ${u} ${err}`);
    }
  }
}
