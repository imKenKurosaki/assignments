import { Context, Next } from "hono";
import { Jwt } from "hono/utils/jwt";


const authMiddleware = async (c: Context | any, next: Next) => {
    const tokenToVerify: string = c.req.header("Authorization")?.split("Bearer ")[1];
    const secretKey = c.env.SECRET;

    if (!tokenToVerify) {
        return c.json({
            message: "Anuthorized Token"
        });
    };

    try {
        const decodedPayLoad = await Jwt.verify(tokenToVerify, secretKey);
        c.req.userId = decodedPayLoad;
        await next();
    } catch (error: any) {
        return c.json({
            message: "Anuthorized Token"
        });
    }
}

export default authMiddleware;