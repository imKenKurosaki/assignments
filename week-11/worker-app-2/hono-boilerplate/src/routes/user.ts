import { Context, Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { Jwt } from "hono/utils/jwt";

const router = new Hono();

const singupSchema = z.object({
    email: z.string().email(),
    name: z.string().min(3).max(20),
    password: z.string().min(4).max(10)
});

const singinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4).max(10)
})

type User = {
    email: string;
    name: string;
    password: string;
}

router.post("/signup", async (c: Context) => {
    const { email, name, password }: User = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    if (!singupSchema.safeParse({ email, name, password }).success) {
        return c.json({
            message: "Invalid requirements input"
        }, 401);
    }

    try {
        await prisma.user.create({
            data: {
                email,
                name,
                password: bcrypt.hashSync(password, 10)
            }
        })
        return c.json({
            message: "Account successfully created"
        })
    } catch (error: any) {
        return c.json({
            message: "Email is already exist, try another one"
        }, 401);
    }
});

router.post("/signin", async (c: Context) => {
    const { email, password } = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    if (!singinSchema.safeParse({ email, password }).success) {
        return c.json({
            message: "Invalid requirements input"
        }, 401);
    }

    const userExist = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if(!userExist || !bcrypt.compareSync(password, userExist.password)) {
        return c.json({
            message: "Email doesn't exist / Password is incorrect"
        }, 401);
    }

    const token = await Jwt.sign(userExist.id, c.env.SECRET);
    return c.json({
        data: {
            message: "You've successfully login",
            token: `Bearer ${token}`
        }
    })
});

export default router;