import cookieParser from "cookie-parser";
import express from "express";
import errorHandler from "./middlewares/error.middleware.js";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import orderRouter from "./routes/order.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

app.use(errorHandler);

export default app;
