import { QueryResult } from "pg";
import { client } from "..";

/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */

export async function createUser(username: string, password: string, name: string) {
    const query: string = `INSERT INTO users (username, password, name) VALUES ($1, $2, $3)`;
    await client.query(query, [username, password, name]); 
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
    const query: string = `SELECT id, username, name FROM users WHERE id = $1`;
    const user: any = await client.query(query, [userId]);
    return user.rows[0];
}
