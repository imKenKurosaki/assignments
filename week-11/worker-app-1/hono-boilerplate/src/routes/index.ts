import { Hono } from "hono";
import userRouter from "./user";
import postsRouter from "./posts";

const router = new Hono();

router.route("/users", userRouter);
router.route("/posts", postsRouter);

export default router;