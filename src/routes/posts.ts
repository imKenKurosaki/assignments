import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import authMiddleware from "../middleware/middleware";
import { z } from "zod";

const router = new Hono();

type Post = {
    id: string;
    title: string;
    body: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}

const postSchema = z.object({
    title: z.string().min(3),
    body: z.string().min(3)
})

router.get("/", async (c: any) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const posts: Array<Post> = await prisma.post.findMany({
        where: {
            isHidden: false
        }
    });
    return c.json({
        posts: posts
    })
});

router.post("/", authMiddleware, async (c: any) => {
    const { title, body } = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    if (!postSchema.safeParse({ title, body }).success) {
        return c.json({
            message: "Invalid Input"
        }, 401);
    }

    await prisma.post.create({
        data: {
            title,
            body,
            userId: c.req.userId
        }
    })
    return c.json({
        message: "Post successfully created"
    })
})

router.get("/:id", async (c: any) => {
    const id = c.req.param('id');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const post: Post | null = await prisma.post.findUnique({
        where: {
            id: id,
            isHidden: false
        }
    });

    return c.json({
        post
    })
});

router.put("/:id", authMiddleware, async (c: any) => {
    const { title, body } = await c.req.json();
    const id = c.req.param('id');
    const userId = c.req.userId;
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const exisPost: Post | null = await prisma.post.findUnique({
        where: {
            id: id,
            isHidden: false
        }
    });

    if (!exisPost) {
        return c.json({
            message: "Post not found"
        }, 404)
    }

    try {
        await prisma.post.update({
            where: {
                id: id,
                userId: userId
            },
            data: {
                title: title || exisPost.title,
                body: body || exisPost.body
            }
        });
        return c.json({
            message: "Post successfully updated"
        })

    } catch (error: any) {
        return c.json({
            message: "Restriction post / only owner can modify this post"
        })
    }
});

router.delete("/:id", authMiddleware, async (c: any) => {
    const id = c.req.param('id');
    const userId = c.req.userId;
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        await prisma.post.update({
            where: {
                id: id,
                userId: userId,
                isHidden: false
            },
            data: {
                isHidden: true
            }
        })
        return c.json({
            message: "Post successfully deleted"
        })
    } catch (error: any) {
        return c.json({
            message: "Restriction post / only owner can modify this post"
        })
    }
})

export default router;