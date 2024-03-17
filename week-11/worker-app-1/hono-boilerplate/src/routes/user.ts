import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from "@prisma/extension-accelerate";
import { z } from "zod";
import bcrypt from 'bcryptjs';
import { sign } from "hono/jwt";

const router = new Hono();

type User = {
    name: string;
    email: string;
    password: string;
}

const singupSchema = z.object({
    name: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(4).max(10)
})

router.post("/signup", async (c: any) => {
    const { name, email, password }: User = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    if (!singupSchema.safeParse({ name, email, password }).success) {
        return c.json({
            message: "Invalid Input"
        }, 401)
    }

    try {
        await prisma.user.create({
            data: {
                name,
                email,
                password: bcrypt.hashSync(password, 8)
            }
        })
        return c.json({
            message: "Successfully registered"
        })
    } catch (error: any) {
        return c.json({
            message: "Email is already in use"
        }, 401)
    }
});

router.post("/signin", async (c: any) => {
    const { email, password } = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const user: { id: string, password: string } | null = await prisma.user.findUnique({
        where: {
            email: email,
        },
        select: {
            id: true,
            password: true
        }
    })

    if (user === null || !bcrypt.compareSync(password, user?.password)) {
        return c.json({
            message: "Email doesn't found / Password is incorrect"
        }, 404)
    }

    const token: string = await sign({ userId: user.id }, c.env.JWT_SECRET);
    return c.json({
        message: `Bearer ${token}`
    }
    );
})


export default router;