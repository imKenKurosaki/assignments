import { Context, Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const router = new Hono();

router.get("/:tag", async (c: Context) => {
    const tag = c.req.param("tag");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const posts = await prisma.tag.findMany({
            where: {
                name: tag
            },
            select: {
                posts: {
                    where: {
                        isHidden: false
                    }
                }
            }
        });

        if (!posts.length) {
            return c.json({
                message: "No post in this tag"
            })
        }

        return c.json({
            posts: posts.map((post: any) => {
                return {
                    id: post.posts[0].id,
                    title: post.posts[0].title,
                    description: post.posts[0].description,
                    createdAt: post.posts[0].createdAt,
                    userId: post.posts[0].userId
                }
            })
        });
    } catch (error: any) {
        return c.json({
            message: "Something wrong with the server"
        }, 500)
    }
});

export default router;