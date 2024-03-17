import { Context, Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { z } from "zod";
import authMiddleware from "../middleware/authMiddleware";

const router = new Hono();

const postSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(5),
    tags: z.array(z.string().optional())
})

router.get("/", async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const posts = await prisma.post.findMany({
        where: {
            isHidden: false
        },
        include: {
            tags: true,
        }
    });
    return c.json({
        posts
    });
});

type Post = {
    title: string;
    description: string;
    tags: string[];
}

router.post("/", authMiddleware, async (c: Context | any) => {
    const body: Post = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const userId: string = c.req.userId;

    if (!postSchema.safeParse(body).success) {
        return c.json({
            message: "Invalid input"
        }, 401);
    }

    try {
        await prisma.post.create({
            data: {
                title: body.title,
                description: body.description,
                tags: {
                    create: body.tags.map((tag: string) => { return { name: tag } })
                },
                userId: userId
            },
            include: {
                tags: true
            }
        })

        return c.json({
            data: "You've successfully added the blog"
        })
    } catch (error: any) {
        return c.json({
            message: "There is something wrong on the server, try again later"
        }, 500);
    }
});

router.get("/:id", async (c: Context) => {
    const id = c.req.param("id");

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());


    const post = await prisma.post.findUnique({
        where: {
            id: id,
            isHidden: false
        },
        include: {
            tags: true
        }
    });

    if (!post) {
        return c.json({
            message: "post doesn't found"
        }, 404);
    }
    return c.json({
        post
    });
});

router.put("/:id", authMiddleware, async (c: Context | any) => {
    const body: Post = await c.req.json();
    const id = c.req.param("id");
    const userId = c.req.userId;
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const postExist = await prisma.post.findUnique({
        where: {
            id: id,
            isHidden: false
        },
        include: {
            tags: true
        }
    });

    if (!postExist) {
        return c.json({
            message: "Blog doesn't found"
        }, 404);
    }

    try {
        const result = await prisma.post.update({
            where: {
                id: id,
                userId: userId
            },
            data: {
                title: body.title || postExist.title,
                description: body.description || postExist.description,
                tags: {
                    deleteMany: {},
                    create: (body.tags.length > 0
                        ? body.tags.map((tag: string) => { return { name: tag } })
                        : postExist.tags
                    )
                }
            },
            include: {
                tags: true
            }
        });
        return c.json({
            result
        });
    } catch (error: any) {
        return c.json({
            message: "Unrestriction"
        }, 411);
    }
});

router.delete("/:id", authMiddleware, async (c: Context | any) => {
    const id = c.req.param("id");
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
        });
        return c.json({
            message: "Post successfully deleted"
        });
    } catch (error: any) {
        return c.json({
            message: "Unrestriction"
        }, 411);
    }
})

export default router;