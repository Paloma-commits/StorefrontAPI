import client from '../database';
import bcrypt from 'bcrypt';

const pepper = process.env.BCRYPT_PASSWORD!;
const saltRounds = process.env.SALT_ROUNDS!;

export type User = {
  //id: number;
  username: string;
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
  async show(id: number): Promise<User> {
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
        'INSERT INTO users (username, firstname, lastname, password) VALUES ($1, $2, $3, $4) RETURNING *';

      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));
      const result = await conn.query(sql, [
        u.username,
        u.firstname,
        u.lastname,
        hash,
      ]);

      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Unable to add user: ${u.username} : ${err}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    const conn = await client.connect();

    const sql = 'SELECT password FROM users WHERE username = ($1)';

    const result = await conn.query(sql, [username]);

    console.log(password + pepper);

    if (result.rows.length) {
      const user = result.rows[0];
      console.log(user);

      if (bcrypt.compareSync(password + pepper, user.password)) {
        return user;
      }
    }

    return null;
  }
}
