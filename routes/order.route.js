import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStastus,
} from "../controller/order.controller.js";
import {
  bodyValidator,
  refreshTokenValidator,
  stockCheak,
} from "../middlewares/validator.middleware.js";
import {
  createOrderSchema,
  updateOrderStatusSchema,
} from "../schemas/order.schema.js";

const orderRouter = new Router();

orderRouter.get("/", getAllOrders);

orderRouter.get("/userId", getUserOrders);

orderRouter.post(
  "/",
  refreshTokenValidator,
  bodyValidator(createOrderSchema),
  stockCheak,
  createOrder,
);

orderRouter.patch(
  "/:id",
  bodyValidator(updateOrderStatusSchema),
  updateOrderStastus,
);

export default orderRouter;
