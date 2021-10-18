import client from '../database';

export type Order = {
  id?: number;
  user_id: number;
  status: string;
};

export type Order_Product = {
  id?: number;
  quantity: number;
  order_id: number;
  product_id: number;
};

export class orderStore {
  async create(o: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *;';

      const result = await conn.query(sql, [o.user_id, o.status]);
      const new_order = result.rows[0];

      return new_order;
      conn.release();
    } catch (err) {
      console.log(err);
      throw new Error(`could not create order ${err}`);
    }
  }

  async add_order(ord: Order_Product): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';

      const result = await conn.query(sql, [
        ord.quantity,
        ord.order_id,
        ord.product_id,
      ]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${ord.product_id} to order ${ord.order_id}: ${err}`
      );
    }
  }

  async order_by_userid(userid: number): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT * FROM orders where user_id = ($1) AND status = 'active'";
      const result = await conn.query(sql, [userid]);
      conn.release;
      return result.rows;
    } catch (err) {
      throw Error(`Unable to show the orders, ${err}`);
    }
  }
}
