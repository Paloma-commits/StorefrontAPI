import client from "../database";
//import bcrypt from 'bcrypt';


export type User = {
    firstname: string,
    lastname: string,
    password: string
}

export class userStore {
    //all the methods to this class are below

    //show users
    async index(): Promise<User[]> {
        const conn = await client.connect()
        const sql = ' SELECT * FROM users '
        const result = await conn.query(sql)
        conn.release() // we need to close the connection to the db!
        return result.rows

    }

    //show specific users
    async show(id : string): Promise<User[]> {
        try{
            const conn = await client.connect()
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id])
            conn.release()
    
            return result.rows[0]
        }catch(err){
            throw Error(`Unable to locate the user: ${id}, ${err}`)
        }
        
    }

    async create(user: User): Promise<User[]> {
        try {
            const conn = await client.connect()

            const sql = 'INSERT INTO users (firstname, lastname, password) VALUES ($1, $2, $3)'
            const result = await conn.query(sql, [user.firstname, user.lastname, user.password])
            const u = result.rows[0];
            conn.release()
            return u;

        } catch (err) {
            throw Error(`Unable to add user: ${user}`);
        }

    }
}


