import { verify } from "hono/jwt";

const authMiddleware = async (c: any, next: any) => {
    const authHeader = c.req.header('Authorization');

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return c.json({
            message: "Invalid token"
        }, 403);
    }

    try {
        const token: string = authHeader.split(" ")[1];
        const decodedPayload: { userId: string } = await verify(token, c.env.JWT_SECRET);

        if (decodedPayload.userId) {
            c.req.userId = decodedPayload.userId;
            await next();
        }
    } catch (error: any) {
        return c.json({
            message: "Invalid token"
        }, 403)
    }
}

export default authMiddleware;