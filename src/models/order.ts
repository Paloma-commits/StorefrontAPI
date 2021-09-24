import client from '../database';

export type Order = {
  id: number;
  user_id: number;
  status: string;
};

export class orderStore {
  async create(o: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'INSER INTO orders (users_id, status) VALUES ($1, $2);';

      const result = await conn.query(sql, [o.user_id, o.status]);
      const new_order = result.rows[0];
      conn.release();

      return new_order;
    } catch (err) {
      throw new Error(`could not create order ${err}`);
    }
  }

  async addProduct(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<Order> {
    try {
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';

      const conn = await client.connect();

      const result = await conn.query(sql, [quantity, orderId, productId]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }

  async current_order(user_id: string): Promise<Order[]> {
    try {
      const conn = await client.connect();

      const sql =
        'SELECT * FROM order_products WHERE user_id=($1) INNER JOIN orders ON order.id = orders.id;';

      const result = await conn.query(sql, [user_id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw Error(`unable to show the order for user, ${user_id}`);
    }
  }
}
