import client from "../database";

export type Order = {
    id: number;
    prod_id: number,
    quantity: number,
    user_id: number,
    status: string
}

export class orderStore {

    async current_order(user_id: number): Promise<Order[]> {
        try {
            const conn = await client.connect();

            const sql = 'SELECT * FROM orders WHERE user_id=($1)';

            const result = await conn.query(sql, [user_id]);

            conn.release()

            return result.rows[0]

        } catch (err) {
            throw Error(`unable to show the order for user, ${user_id}`)
        }

    }

}
