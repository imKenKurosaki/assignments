import { client } from "..";
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function createTodo(userId: number, title: string, description: string) {
    const query = `INSERT INTO todos (user_id, title, description) 
                    VALUES ($1, $2, $3) RETURNING *`;
    const values = [userId, title, description];
    const todo = await client.query(query, values);
    return todo.rows[0];    
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
    const query = `UPDATE todos SET done = $1 WHERE id = $2 RETURNING done`;
    const todo = await client.query(query, [true, todoId]);

    return todo.rows[0];
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
    const query = `SELECT * FROM todos WHERE id = $1`;
    const todos = await client.query(query, [userId]);
    return todos.rows;
}