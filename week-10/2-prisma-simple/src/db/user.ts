import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */

type User = {
    id: string;
    username: string;
    name: string;
}

export async function createUser(username: string, password: string, name: string): Promise<User> {
    const user = prisma.user.create({
        data: {
            username: username,
            password: password,
            name: name
        },
        select: {
            id: true,
            username: true,
            name: true
        }
    })
    return user;
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: string): Promise<User | null> {
    const user = prisma.user.findUnique({
        where: {
            id: userId
        }, 
        select: {
            id: true,
            username: true,
            name: true
        }
    });
    return user;
}
