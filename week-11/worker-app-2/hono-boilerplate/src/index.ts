import { Hono } from "hono";
import userRouter from "./routes/user";
import postRouter from "./routes/post";
import tagRouter from "./routes/tag";

const app = new Hono();

app.route("/api/v1/users", userRouter);
app.route("/api/v1/posts", postRouter);
app.route("/api/v1/tags", tagRouter);

export default app;