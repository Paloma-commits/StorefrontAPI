import client from '../database';
//import bcrypt from 'bcrypt';

export type User = {
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

  async create(
    firstname: string,
    lastname: string,
    password: string
  ): Promise<User[]> {
    try {
      const conn = await client.connect();

      const sql =
        'INSERT INTO users (firstname, lastname, password) VALUES ($1, $2, $3)';
      const result = await conn.query(sql, [firstname, lastname, password]);

      const u = result.rows[0];
      conn.release();
      return u;
    } catch (err) {
      throw new Error(`Unable to add user: ${firstname}, ${lastname} ${err}`);
    }
  }
}
