import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

type Todo = {
    title: string;
    description: string | null;
    done: boolean;
    id: string;
}

export async function createTodo(userId: string, title: string, description: string): Promise<Todo> {
    const todo = prisma.todo.create({
        data: {
            title: title,
            description: description,
            user_id: userId
        }, 
        select: {
            title: true,
            description: true,
            done: true,
            id: true
        }
    })
    return todo;
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
export async function updateTodo(todoId: string): Promise<Todo> {
    const todo = prisma.todo.update({
        where: {
            id: todoId
        },
        data: {
            done: true
        }
    });
    return todo;   
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
export async function getTodos(userId: string): Promise<Array<Todo>> {
    const todos = prisma.todo.findMany({
        where: {
            user_id: userId
        }
    });
    return todos;
}