// import client from "../database";

// export class DashboardQueries {
//     // Get all products that have been included in orders
//     async productsInOrders(user_id: Number): Promise<{name: string, price: number, order_id: string}[]> {
//       try {
//         //@ts-ignore
//         const conn = await client.connect()
//         const sql = 'SELECT name, price, id FROM products INNER JOIN orders ON product.id = order_products.id'
  
//         const result = await conn.query(sql)
  
//         conn.release()
  
//         return result.rows
//       } catch (err) {
//         throw new Error(`unable get products and orders: ${err}`)
//       } 
//     }
//   }